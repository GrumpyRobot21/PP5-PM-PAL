from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Task, Document
from .serializers import TaskSerializer, DocumentSerializer
from django.http import JsonResponse

def index(request):
        return JsonResponse({'message': 'Welcome to the PM-PAL API'})

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    authentication_classes = [TokenAuthentication]  # Use Token Authentication
    permission_classes = [IsAuthenticated]  # Require authentication for this view

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task = serializer.save(created_by=request.user)  # Assign the task to the authenticated user
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()
    authentication_classes = [TokenAuthentication]  # Use Token Authentication
    permission_classes = [IsAuthenticated]  # Require authentication for this view

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task_id = request.data.get('task_id')
        task = Task.objects.get(pk=task_id)
        document = serializer.save(task=task)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def obtain_auth_token(request):
    user = request.user
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_200_OK)
