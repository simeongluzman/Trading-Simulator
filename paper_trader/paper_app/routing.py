from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/prices/$', consumers.KrakenConsumer.as_asgi()),
]
