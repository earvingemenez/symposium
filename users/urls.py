from django.urls import path
from .views import Login, Auth


urlpatterns = [
    path('login/', Login.as_view(), name="login"),
    path('auth/', Auth.as_view({
        'get': 'get'
    }), name="auth"),
]