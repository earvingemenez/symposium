import json

from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from utils.query import SerializerProperty
from .serializers import MemberSerializer, ChannelSerializer


class Channel(ViewSet, SerializerProperty):
    """ channel detail view
    """
    serializer_class = ChannelSerializer

    def get(self, request, id):
        serializer = self.serializer_class(
            instance=get_object_or_404(
                self._model,
                id=id
            )
        )
        return Response(serializer.data, status=200)


class Channels(ViewSet, SerializerProperty):
    """ channels list
    """
    serializer_class = ChannelSerializer

    def get(self, request):
        chan_ids = self.request.user.member_set.all().values_list('channel', flat=True)

        serializer = self.serializer_class(
            self._model.objects.filter(Q(host=request.user) | Q(id__in=chan_ids)),
            many=True
        )
        return Response(serializer.data, status=200)


class Session(AsyncJsonWebsocketConsumer):
    """ session updater (websocket)
    """
    room_name = None

    async def connect(self):
        """ connect to the session
        """
        self.room_name = f"session_{ self.scope['url_route']['kwargs']['id'] }"

        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        """ disconnect from the session
        """
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """ receive message data from socket
        """
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'call_message',
                'data': json.loads(text_data)
            }
        )

    async def call_message(self, event):
        """ receive message from room
        """
        await self.send_json(event.get('data'))
