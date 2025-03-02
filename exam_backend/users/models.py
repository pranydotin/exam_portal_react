from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now

class Users(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    is_student = models.BooleanField(default=True)

    def __str__(self):
        return self.username


class StudentDetails(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    reg=models.CharField(max_length=10, unique=True)
    dob = models.DateField()
    course = models.CharField(max_length=100)
    batch = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.user.username} - {self.reg}"