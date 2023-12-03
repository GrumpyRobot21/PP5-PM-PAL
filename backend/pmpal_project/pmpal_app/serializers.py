from rest_framework import serializers
from .models import Task, Document, UserProfile, CustomUser

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'details', 'completion_date', 'status']

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'document_file']

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {
            'username': obj.user.username,
            'email': obj.user.email,
            'telephone': obj.user.phone,
            'name': obj.user.name,
        }

    class Meta:
        model = UserProfile
        fields = ['name', 'telephone', 'user' ]
        
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ( 'username', 'email','phone','password')
