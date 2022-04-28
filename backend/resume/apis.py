from django.http import HttpRequest, HttpResponse
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status, permissions, serializers
from accounts.models import UserAccount
from .models import Blog, BlogCategory, RequestedAppointment
from . import selectors, services


class HomeProfilePage(APIView):
    """Get the all data for home profile page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str) -> Response:
        homeSectionData = selectors.getHomeSectionData(username=username)

        return Response(homeSectionData)


class AboutMeProfilePage(APIView):
    """Get the all data for about me profile page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str) -> Response:
        aboutSectionData = selectors.getAboutMeSectionData(username=username)

        return Response(aboutSectionData)


class ContactMeProfilePage(APIView):
    """Get the all data for contact me profile page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str) -> Response:
        contactMeSectionData = selectors.getContactMeSectionData(
            username=username
        )

        return Response(contactMeSectionData)


class ContactMessageSend(APIView):
    """Sending Contact Message to User"""

    permission_classes = (permissions.AllowAny,)

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=100)
        email = serializers.EmailField(max_length=100)
        message = serializers.CharField()

    def post(self, request: Request, username: str) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createContactMessage(
            username=username, **serializer.validated_data
        )

        return Response(status=status.HTTP_201_CREATED)


class ResumeProfilePage(APIView):
    """Get the all data for contact me profile page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str) -> Response:
        resumeSectionData = selectors.getResumeSectionData(username=username)

        return Response(resumeSectionData)


class PortfolioProfilePage(APIView):
    """Get the all data for portfolio profile page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str) -> Response:
        portfolioSectionData = selectors.getPortfolioSectionData(
            username=username
        )

        return Response(portfolioSectionData)


class PortfolioDetailProfilePage(APIView):
    """Get the all data for single portfolio item"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str, slug: str) -> Response:
        portfolioDetailSectionData = selectors.getPortfolioDetailSectionData(
            username=username, slug=slug
        )

        return Response(portfolioDetailSectionData)


class BlogProfilePage(APIView):
    """Get the all data for blog page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str) -> Response:
        blogSectionData = selectors.getBlogSectionData(username=username)

        return Response(blogSectionData)


class BlogDetailProfilePage(APIView):
    """Get data for blog detail page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str, slug: str):
        singleBlogSectionData = selectors.getBlogDetailSectionData(
            username=username, slug=slug
        )

        return Response(singleBlogSectionData)


class BlogSearchPage(APIView):
    """Get data for blog search page"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str, query: str) -> Response:
        blogSearchData = selectors.getBlogSearchData(
            username=username, query=query
        )

        return Response(blogSearchData)


class BlogCategoryPage(APIView):
    """Get data for blog category page"""

    permission_classes = (permissions.AllowAny,)

    def get(
        self, request: Request, username: str, category_name: str
    ) -> Response:
        blogCategoryData = selectors.getBlogCategoryData(
            username=username, categoryName=category_name
        )

        return Response(blogCategoryData)


# Appointment Page
class AppointmentProfilePage(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, username: str) -> Response:
        appointmentProfileData = selectors.getAppointmentSectionData(
            username=username
        )

        return Response(appointmentProfileData)


# request appointment form submission
class RequestedAppointmentForm(APIView):
    permission_classes = (permissions.AllowAny,)

    class InputSerializer(serializers.Serializer):
        subject = serializers.CharField(max_length=300)
        name = serializers.CharField(max_length=50)
        email = serializers.EmailField(max_length=200)
        phone = serializers.CharField(max_length=20)
        appointment_time = serializers.DateTimeField()
        message = serializers.CharField()

    def post(self, request: Request, username: str) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createAppointmentRequest(
            username=username, **serializer.validated_data
        )

        return Response(status=status.HTTP_201_CREATED)


class Staticstics(APIView):
    """Data for statistics page"""

    def get(self, request):
        statisticsData = selectors.getStatisticsData(user=request.user)

        return Response(statisticsData)
