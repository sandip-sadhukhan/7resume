from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, serializers
from accounts.models import UserAccount
from .models import Blog, Message, Project, RequestedAppointment
from .selectors import (
    getAboutMeSectionData,
    getAppointmentSectionData,
    getBlogDetailSectionData,
    getBlogSectionData,
    getContactMeSectionData,
    getHomeSectionData,
    getPortfolioDetailSectionData,
    getPortfolioSectionData,
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


# Portfolio Page
class PortfolioProfilePageView(APIView):
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
            "data": getPortfolioSectionData(user),
        }

        return Response(data)


# Portfolio Page
class PortfolioDetailProfilePageView(APIView):
    def get(self, request: HttpRequest, username: str, slug: str):
        try:
            user = UserAccount.objects.get(username=username)
            portfolio = Project.objects.get(slug=slug, display_project=True)
        except UserAccount.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "error": "Username not exists",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Project.DoesNotExist:  # type: ignore
            return Response(
                {
                    "success": False,
                    "error": "Portfolio not exists",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "success": True,
            "data": getPortfolioDetailSectionData(user, portfolio),
        }

        return Response(data)


# Blog Page
class BlogProfilePageView(APIView):
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
            "data": getBlogSectionData(user),
        }

        return Response(data)


class BlogDetailProfilePageView(APIView):
    def get(self, request: HttpRequest, username: str, slug: str):
        try:
            user = UserAccount.objects.get(username=username)
            blog = Blog.objects.get(
                slug=slug,
                display_article=True,
            )
        except UserAccount.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "error": "Username not exists",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Blog.DoesNotExist:  # type: ignore
            return Response(
                {
                    "success": False,
                    "error": "Blog not exists",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # increase views counter
        blog.views += 1
        blog.save()

        data = {
            "success": True,
            "data": getBlogDetailSectionData(user, blog),
        }

        return Response(data)


# Appointment Page
class AppointmentProfilePageView(APIView):
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
            "data": getAppointmentSectionData(user),
        }

        return Response(data)


# request appointment form submission
class RequestedAppointmentFormView(APIView):
    class RequestedAppointmentSerializer(serializers.ModelSerializer):
        class Meta:
            model = RequestedAppointment
            fields = (
                "subject",
                "name",
                "email",
                "phone",
                "appointment_time",
                "message",
            )

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

        serializer = self.RequestedAppointmentSerializer(
            data=request.data,
        )
        if serializer.is_valid():
            RequestedAppointment.objects.create(
                user_profile=user.user_profile,
                subject=serializer.data["subject"],
                name=serializer.data["name"],
                email=serializer.data["email"],
                phone=serializer.data["phone"],
                appointment_time=serializer.data["appointment_time"],
                message=serializer.data["message"],
            )
            return Response(
                {
                    "success": True,
                    "message": "Appointment Booked Successfully!",
                }
            )
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
