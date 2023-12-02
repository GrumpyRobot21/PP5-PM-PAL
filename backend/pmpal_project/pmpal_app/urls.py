from django.contrib import admin  # Import the admin module
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, DocumentViewSet, CustomObtainAuthToken, custom_auth_token, register_user, update_profile, get_user_profile, UserProfileUpdateView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'documents', DocumentViewSet, basename='document')

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin URLs
    path('', include(router.urls)),
    path('api/login/', CustomObtainAuthToken.as_view(), name='login'),
    path('api/register/', register_user, name='register-user'),
    path('api/update_profile/', update_profile, name='update_profile'),
    path('api/user-profile', UserProfileUpdateView.as_view(), name='user-profile'), 
    path('api/user-profile', get_user_profile, name='get_user_profile'),
    path('api/token/', custom_auth_token, name='custom_auth_token'),
]

