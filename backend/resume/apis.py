from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, serializers
from accounts.models import UserAccount
from .models import Message
from .selectors import (
    getAboutMeSectionData,
    getContactMeSectionData,
    getHomeSectionData,
    getResumeSectionData,
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


# Contact Me form submit
class ContactMessageSend(APIView):
    class MessageSerializer(serializers.ModelSerializer):
        class Meta:
            model = Message
            fields = ("name", "email", "message")

    def post(self, request, username, format=None):
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

        serializer = self.MessageSerializer(data=request.data)
        if serializer.is_valid():
            Message.objects.create(
                user_profile=user.user_profile,
                name=serializer.data["name"],
                email=serializer.data["email"],
                message=serializer.data["message"],
            )
            return Response(
                {"success": True, "message": "Message Sent Successfully!"}
            )
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


# Resume Page
class ResumeProfilePageView(APIView):
    def get(self, request: HttpRequest, username: str):
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
            "data": getResumeSectionData(user),
        }

        return Response(data)
