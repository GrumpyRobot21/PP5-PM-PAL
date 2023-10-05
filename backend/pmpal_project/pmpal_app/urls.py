from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, DocumentViewSet, CustomObtainAuthToken, register_user
from django.contrib import admin

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'documents', DocumentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/login/', CustomObtainAuthToken.as_view(), name='login'),
    path('api/register/', register_user, name='register-user'),
    
]
