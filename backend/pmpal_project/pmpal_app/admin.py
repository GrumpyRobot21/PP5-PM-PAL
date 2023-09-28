from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Task, Document

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'name', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'name', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('username', 'email', 'name')
    ordering = ('username',)

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'details', 'completion_date', 'status')
    list_filter = ('status',)
    search_fields = ('title', 'details')

class DocumentAdmin(admin.ModelAdmin):
    list_display = ('task', 'document_file')
    search_fields = ('task__title',)

# Register the models and the custom admin classes
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Document, DocumentAdmin)
