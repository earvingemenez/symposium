from django.urls import path
from .views import Channel, Session

urlpatterns = [
    path('<int:id>/', Channel.as_view({
        'get': 'get'
    }), name="channel"),
]

channelpatterns = [
    path('session/<str:id>/', Session.as_asgi()),
]