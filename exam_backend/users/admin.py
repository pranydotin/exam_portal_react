from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models import  StudentDetails

User = get_user_model()

@admin.register(StudentDetails)
class StudentDetailsAdmin(admin.ModelAdmin):
    list_display = ['reg', 'full_name', 'email', 'dob', 'course', 'batch', 'department', 'created_at']
    search_fields = ['reg', 'full_name', 'email', 'course', 'batch', 'department']
    list_filter = ['course', 'batch', 'department']

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Limit user dropdown to only non-superusers"""
        if db_field.name == "user":
            kwargs["queryset"] = User.objects.filter(is_superuser=False)  # Exclude superusers
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def delete_model(self,request,obj):
        user=obj.user #Get linked user
        super().delete_model(request,obj)
        if user:
            user.delete()