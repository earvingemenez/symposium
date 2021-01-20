from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.serializers import Serializer, ModelSerializer

from users.serializers import UserSerializer
from .models import Member, Channel


class MemberSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Member
        fields = (
            'id',
            'user',
            'channel',
            'date_joined',
        )


class ChannelSerializer(ModelSerializer):
    members = serializers.SerializerMethodField()

    def get_members(self, instance):
        return MemberSerializer(
            Member.objects.filter(channel=instance),
            many=True
        ).data
    
    class Meta:
        model = Channel
        fields = (
            'id',
            'host',
            'name',
            'date_created',
            'members',
        )