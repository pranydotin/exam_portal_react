from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

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
