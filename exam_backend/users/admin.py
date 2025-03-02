from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models import Users, StudentDetails

User = get_user_model()


class StudentDetailsInline(admin.StackedInline):
    model = StudentDetails
    extra = 0

@admin.register(User)
class CustomUserAdmin(UserAdmin):  # Extend default UserAdmin
    list_display = ('username', 'email', 'phone_number','is_staff', 'is_active', 'is_admin')
    search_fields = ('username', 'email','phone_number')
    list_filter = ('is_staff', 'is_active', 'is_admin')
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('is_admin','phone_number')}),  # Add your custom fields
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('phone_number', 'is_admin')}),  # Ensure phone_number is visible during user creation
    )
    inlines = [StudentDetailsInline]


    def get_readonly_fields(self, request, obj=None):
        if obj:
            if obj.is_student:
                return self.readonly_fields + ('is_admin',)  # Disable is_admin
            if obj.is_admin:
                return self.readonly_fields + ('is_student',)  # Disable is_student
        return self.readonly_fields