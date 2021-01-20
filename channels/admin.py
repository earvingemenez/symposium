from django.contrib import admin
from .models import Channel, Member

class MemberAdmin(admin.TabularInline):
    extra = 1
    model = Member
    readonly_fields = ('date_joined',)


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    inlines = (MemberAdmin,)
    list_display = ('host', 'name', 'date_created', 'date_updated')