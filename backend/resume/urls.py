from django.urls import path
from . import apis

urlpatterns = [
    # User Public Profile pages API
    path(
        "profile/<str:username>/home/",
        apis.HomeProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/about-me/",
        apis.AboutMeProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/contact-me/",
        apis.ContactMeProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/contact-me/send/",
        apis.ContactMessageSend.as_view(),
    ),
    path(
        "profile/<str:username>/resume/",
        apis.ResumeProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/portfolio/",
        apis.PortfolioProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/portfolio/<str:slug>/",
        apis.PortfolioDetailProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/blog/",
        apis.BlogProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/blog/post/<str:slug>/",
        apis.BlogDetailProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/blog/search/<str:query>/",
        apis.BlogSearchPage.as_view(),
    ),
    path(
        "profile/<str:username>/blog/category/<str:category_name>/",
        apis.BlogCategoryPage.as_view(),
    ),
    path(
        "profile/<str:username>/appointments/",
        apis.AppointmentProfilePage.as_view(),
    ),
    path(
        "profile/<str:username>/appointments/request/",
        apis.RequestedAppointmentForm.as_view(),
    ),
    # User Dashboard APIs
    path(
        "dashboard/statistics/",
        apis.Staticstics.as_view(),
    ),
]
