from rest_framework import parsers, renderers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from .serializers import AuthSerializer, UserSerializer


class Login(APIView):
    """ login view
    """
    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = AuthSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, request=request)
        serializer.is_valid(raise_exception=True)

        return Response({
            'token': serializer.user.get_token().key
        }, status=200)


class Auth(ViewSet):
    """ authenticated user view
    """
    serializer_class = UserSerializer

    def get(self, request):
        serializer = self.serializer_class(
            instance=request.user
        )
        return Response(serializer.data, status=200)