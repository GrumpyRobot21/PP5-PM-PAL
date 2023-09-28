from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, DocumentViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'documents', DocumentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    
]
