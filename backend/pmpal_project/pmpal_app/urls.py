from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, DocumentViewSet, CustomObtainAuthToken, register_user, update_profile
from django.contrib import admin
from . import views
from .views import UserProfileUpdateView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'documents', DocumentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/login/', CustomObtainAuthToken.as_view(), name='login'),
    path('api/register/', register_user, name='register-user'),
    path('api/update_profile/', views.update_profile, name='update_profile'),
    path('api/users/<int:user_id>/', UserProfileUpdateView.as_view(), name='user-profile'),
    path('user-profile/', UserProfileUpdateView.as_view(), name='user-profile'),  
]
