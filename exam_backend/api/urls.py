from django.urls import path
from django.http import JsonResponse
from .views import StudentLoginView

def test_api(request):
    return JsonResponse({"message": "API is working!"})

urlpatterns = [
    path("", test_api),
     path("login/", StudentLoginView.as_view(), name="student-login"),
]
