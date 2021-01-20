from django.db import models
from django.contrib.auth import get_user_model


class Channel(models.Model):
    """ channel info
    """
    host = models.ForeignKey(get_user_model(), null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=250)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"


class Member(models.Model):
    """ channel members
    """
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.SET_NULL)
    channel = models.ForeignKey('Channel', null=True, on_delete=models.SET_NULL)

    date_joined = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} ({self.id})"