from django.conf import settings

def IS_PRODUCTION(request):
    return {'IS_PRODUCTION': settings.IS_PRODUCTION}