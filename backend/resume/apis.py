from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from accounts.models import UserAccount
from .selectors import (
    getAboutMeSectionData,
    getContactMeSectionData,
    getHomeSectionData,
)


# Home Page
class HomeProfilePageView(APIView):
    """
    Get the all data for home profile page
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, username, format=None):
        try:
            user = UserAccount.objects.get(username=username)
        except UserAccount.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "error": "Username not exists",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "success": True,
            "data": getHomeSectionData(user),
        }

        return Response(data)


# About Me
class AboutMeProfilePageView(APIView):
    """
    Get the all data for about me profile page
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, username, format=None):
        try:
            user = UserAccount.objects.get(username=username)
        except UserAccount.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "error": "Username not exists",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "success": True,
            "data": getAboutMeSectionData(user),
        }

        return Response(data)


# Contact Me
class ContactMeProfilePageView(APIView):
    """
    Get the all data for contact me profile page
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, username, format=None):
        try:
            user = UserAccount.objects.get(username=username)
        except UserAccount.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "error": "Username not exists",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "success": True,
            "data": getContactMeSectionData(user),
        }

        return Response(data)
