from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from .models import Task, Document, CustomUser
from .serializers import TaskSerializer, DocumentSerializer, UserProfileSerializer 
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import UserProfile
from .serializers import UserProfileSerializer, CustomUserSerializer
from rest_framework import generics

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': CustomUserSerializer(user).data})

custom_auth_token = CustomAuthToken.as_view()

def index(request):
    return JsonResponse({'message': 'Welcome to the PM-PAL API'})

@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'OPTIONS':
        response = Response()
        response['Access-Control-Allow-Methods'] = 'POST'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        telephone = request.data.get('telephone')
        email = request.data.get('email')
        if not username or not password:
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use CustomUser.objects.create_user if you are using a custom user model
            CustomUser(username=username, password=password, email=email, phone=telephone).save()
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        # response = super().post(request, *args, **kwargs)
        username = request.data.get('username')
        password = request.data.get('password').strip()
        userdata = CustomUser.objects.filter(username=username, password=password) 
        print('password', password)
        print('username', username)
        print('userdata', userdata)
        print('userdata.email', userdata[0].email)
        if userdata.exists():
            return Response({'token': 'token', 'user_id': userdata[0].email})
        
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Document.objects.filter(task__user=self.request.user)

    def perform_create(self, serializer):
        task_id = self.request.data.get('task_id')
        task = get_object_or_404(Task, pk=task_id, user=self.request.user)
        serializer.save(task=task)

def obtain_auth_token(request):
    user = request.user
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_200_OK)

class UserProfileUpdateView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
       return self.request.user.profile

    def get(self, request, *args, **kwargs):
       instance = self.get_object()
       serializer = self.get_serializer(instance)
       return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def get_user_profile(request, user_id):
    if request.user.id != user_id:
        return Response({'error': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

    profile = get_object_or_404(UserProfile, user_id=user_id)
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    updated_data = request.data
    user.first_name = updated_data.get('name', user.first_name)
    user.last_name = updated_data.get('telephone', user.last_name)
    user.email = updated_data.get('email', user.email)
    new_password = updated_data.get('password')
    if new_password:
        user.set_password(new_password)
    user.save()
    return Response({'message': 'Profile updated successfully.'}, status=status.HTTP_200_OK)

class UserProfileDetailView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
