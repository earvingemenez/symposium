from django.urls import path
from .views import Channel

urlpatterns = [
    path('<int:id>/', Channel.as_view({
        'get': 'get'
    }), name="channel"),
]