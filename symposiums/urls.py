from django.urls import path
from .views import Channel, Channels, Session

urlpatterns = [
    path('', Channels.as_view({
        'get': 'get'
    }), name="channels"),
    path('<int:id>/', Channel.as_view({
        'get': 'get'
    }), name="channel"),
]

channelpatterns = [
    path('sessions/<str:id>/', Session.as_asgi()),
]