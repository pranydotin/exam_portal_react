from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now



class StudentDetails(models.Model):
    reg = models.CharField(max_length=20, primary_key=True)  # Primary key as reg_no
    user = models.OneToOneField(User, on_delete=models.CASCADE,blank=True,null=True,editable=False)  # One-to-One link
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    dob = models.DateField()
    course = models.CharField(max_length=100)
    batch = models.CharField(max_length=50)
    department = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.user: # If user is not linked
            user = User.objects.create_user(
                username=self.reg,
                password=self.dob.strftime("%d/%m/%Y"),  # Set DOB as password
                email=self.email
            )
            self.user = user  # Link the new User to StudentDetails
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Student Detail"
        verbose_name_plural = "Student Details"

    def __str__(self):
        return f"{self.full_name} ({self.reg})"