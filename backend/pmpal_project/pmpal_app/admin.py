from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Task, Document

from django.contrib.auth.admin import UserAdmin

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

    # Customize filter_horizontal for the required fields
    filter_horizontal = ()

    # Remove fields related to permissions and groups
    filter_horizontal = ()
    list_filter = ()
    filter_horizontal = ()
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Important dates', {'fields': ('last_login',)}),
    )


class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'details', 'completion_date', 'status')
    list_filter = ('status',)  # Adjusted list_filter

class DocumentAdmin(admin.ModelAdmin):
    list_display = ('task', 'document_file')
    search_fields = ('task__title',)

# Register the models and the custom admin classes
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Document, DocumentAdmin)

