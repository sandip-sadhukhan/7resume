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
    path(
        "profile/<str:username>/contact-me/send/",
        apis.ContactMessageSend.as_view(),
    ),
    path(
        "profile/<str:username>/resume/",
        apis.ResumeProfilePageView.as_view(),
    ),
    path(
        "profile/<str:username>/portfolio/",
        apis.PortfolioProfilePageView.as_view(),
    ),
    path(
        "profile/<str:username>/portfolio/<str:slug>/",
        apis.PortfolioDetailProfilePageView.as_view(),
    ),
]
