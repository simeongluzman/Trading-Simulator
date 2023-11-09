
from django.contrib import admin
from django.urls import path
from paper_app import views

# ... other imports ...

urlpatterns = [
    path('admin/', admin.site.urls),
    path('check_user/', views.check_user, name='check_user'),
    path('get_portfolio/<str:user_id>/', views.get_portfolio, name='get_portfolio'),
    path('trade/', views.trade, name='trade'),
]
