from django.urls import path
from django.http import JsonResponse

def test_api(request):
    return JsonResponse({"message": "API is working!"})

urlpatterns = [
    path("", test_api),
]
