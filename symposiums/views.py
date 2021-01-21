import json

from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .serializers import MemberSerializer, ChannelSerializer


class Channel(ViewSet):
    """ channel detail view
    """
    serializer_class = ChannelSerializer

    @property
    def _model(self):
        return self.serializer_class.Meta.model

    def get(self, request, id):
        serializer = self.serializer_class(
            instance=get_object_or_404(
                self._model,
                id=id
            )
        )
        return Response(serializer.data, status=200)


class Session(AsyncJsonWebsocketConsumer):
    pass