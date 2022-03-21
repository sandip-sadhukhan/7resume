from django.urls import path
from . import views

urlpatterns = [
    path(
        "signup/",
        views.SignupView.as_view(),
        name="signup",
    ),
    path(
        "get-user/",
        views.GetUserInformation.as_view(),
        name="get-user",
    ),
]
