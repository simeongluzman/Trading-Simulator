from channels.routing import ProtocolTypeRouter, URLRouter
import paper_app.routing

application = ProtocolTypeRouter({
    "websocket": URLRouter(paper_app.routing.websocket_urlpatterns),
})
