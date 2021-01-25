from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from rest_framework.serializers import Serializer, ModelSerializer


class AuthSerializer(Serializer):
    """ authentication serializer
    """
    user = None
    _error = _("Invalid Credentials. Please try again.")

    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id',)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(AuthSerializer, self).__init__(*args, **kwargs)

    def validate(self, data):
        """ validate user
        """
        email, password = data.values()
        
        if not email or not password:
            raise serializers.ValidationError(self._error, code="authorization")

        self.user = authenticate(request=self.request,
                        email=email, password=password)
        
        if not self.user:
            raise serializers.ValidationError(self._error, code="authorization")

        return data


class UserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name', 'last_name')