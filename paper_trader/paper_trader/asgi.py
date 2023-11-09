import os
from django.urls import path
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from paper_app.consumers import KrakenConsumer  # assuming the consumer is in the paper_app directory

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'paper_trader.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            [
                path("ws/prices/", KrakenConsumer.as_asgi()),
            ]
        )
    ),
})
