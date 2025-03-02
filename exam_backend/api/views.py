from django.http import JsonResponse
from rest_framework.decorators import api_view

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import StudentDetails

@api_view(["GET"])
def home(request):
    return JsonResponse({"message":"Welcome to the Django API Backend!"})

# API endpoint for student login
class StudentLoginView(APIView):

    def get(self, request):
        return JsonResponse({"error":"Direct access not allowed" },status=403)

    def post(self, request):
        reg = request.data.get("reg")
        password = request.data.get("password")

        try:
            # Get user linked to student
            student = StudentDetails.objects.get(reg=reg)
            user = student.user  # Get linked user

            # Authenticate user
            authenticated_user = authenticate(username=user.username, password=password)

            if authenticated_user:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(authenticated_user)
                return Response({
                    "message": "Login successful",
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                    "status":status.HTTP_200_OK
                }, status=status.HTTP_200_OK)

            return Response({
                "error": "Invalid credentials",
                "status":status.HTTP_401_UNAUTHORIZED
                }, status=status.HTTP_401_UNAUTHORIZED)

        except StudentDetails.DoesNotExist:
            return Response({
                "error": "Student not found",
                "status":status.HTTP_404_NOT_FOUND
                }, status=status.HTTP_404_NOT_FOUND)
