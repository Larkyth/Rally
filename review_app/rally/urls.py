from django.urls import include, path
from .views import GetUserView, index, SignupView, LoginView
from knox.views import LogoutView

urlpatterns = [
    path('', include('knox.urls')),
    path('index', index, name='index'),
    path('signup', SignupView.as_view(), name='signup'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='knox_logout'),
    path('getuser', GetUserView.as_view(), name='getuser'),
]