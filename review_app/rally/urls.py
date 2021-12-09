from django.urls import path
from .views import SignupView, index

urlpatterns = [
    path('', index, name='index'),
    path('signup', SignupView.as_view()),
]