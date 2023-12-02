from rest_framework import serializers
from .models import Task, Document, UserProfile
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'details', 'completion_date', 'status']

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'document_file']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['name', 'telephone', 'user', 'email']

    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {
            'username': obj.user.username,
            'email': obj.user.email
        }

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'name', 'telephone']
