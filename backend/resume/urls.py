from django.urls import path
from . import apis

urlpatterns = [
    path(
        "profile/<str:username>/home/",
        apis.HomeProfilePageView.as_view(),
    ),
    path(
        "profile/<str:username>/about-me/",
        apis.AboutMeProfilePageView.as_view(),
    ),
    path(
        "profile/<str:username>/contact-me/",
        apis.ContactMeProfilePageView.as_view(),
    ),
]
