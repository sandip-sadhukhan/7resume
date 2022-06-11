from django.forms import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status, permissions, serializers

from .models import (
    Education,
    Experiences,
    PricingPlan,
    Project,
    ProjectCategory,
    Service,
    UserProfile,
)
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

    def get(self, request: Request) -> Response:
        statisticsData = selectors.getStatisticsData(user=request.user)

        return Response(statisticsData)


class EditProfile(APIView):
    """Set and get edit profile page data"""

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=255)
        username = serializers.CharField(max_length=255)
        email = serializers.CharField(max_length=255)
        password = serializers.CharField(max_length=255)

    def get(self, request: Request) -> Response:
        data = selectors.getEditProfileData(user=request.user)

        return Response(data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            services.changeUserFields(
                user=request.user, **serializer.validated_data
            )
        except ValidationError as e:
            return Response(
                {"error": e.args[0]}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response()


class WebsiteSettings(APIView):
    """Set or get website settings"""

    class InputSerializer(serializers.Serializer):
        site_title = serializers.CharField(max_length=200, required=False)
        webmaster_email = serializers.EmailField(
            max_length=100, required=False
        )
        favicon = serializers.ImageField(required=False)
        start_page_background = serializers.ImageField(required=False)
        about_me_image = serializers.ImageField(required=False)
        contact_form_image = serializers.ImageField(required=False)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserProfile
            fields = (
                "site_title",
                "webmaster_email",
                "favicon",
                "start_page_background",
                "about_me_image",
                "contact_form_image",
            )

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(instance=request.user.user_profile)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.saveWebsiteSettings(
            user=request.user, **serializer.validated_data
        )
        outputSerializer = self.OutputSerializer(
            instance=request.user.user_profile
        )

        return Response(outputSerializer.data)


class GeneralSettings(APIView):
    """Get or set general settings"""

    class InputSerializer(serializers.Serializer):
        display_resume = serializers.BooleanField(required=True)
        display_portfolio = serializers.BooleanField(required=True)
        display_blog = serializers.BooleanField(required=True)
        display_appointments = serializers.BooleanField(required=True)
        display_services = serializers.BooleanField(required=True)
        display_fun_facts = serializers.BooleanField(required=True)
        display_pricing_plans = serializers.BooleanField(required=True)
        display_testimonials = serializers.BooleanField(required=True)
        display_clients = serializers.BooleanField(required=True)
        display_contact_form = serializers.BooleanField(required=True)
        blog_allow_search_box = serializers.BooleanField(required=True)
        blog_allow_categories = serializers.BooleanField(required=True)
        blog_allow_latest_posts = serializers.BooleanField(required=True)
        blog_allow_popular_posts = serializers.BooleanField(required=True)
        post_allow_search_box = serializers.BooleanField(required=True)
        post_allow_latest_posts = serializers.BooleanField(required=True)
        post_allow_related_posts = serializers.BooleanField(required=True)
        post_allow_tags = serializers.BooleanField(required=True)
        project_allow_related_posts = serializers.BooleanField(required=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserProfile
            fields = [
                "display_resume",
                "display_portfolio",
                "display_blog",
                "display_appointments",
                "display_services",
                "display_fun_facts",
                "display_pricing_plans",
                "display_testimonials",
                "display_clients",
                "display_contact_form",
                "blog_allow_search_box",
                "blog_allow_categories",
                "blog_allow_latest_posts",
                "blog_allow_popular_posts",
                "post_allow_search_box",
                "post_allow_latest_posts",
                "post_allow_related_posts",
                "post_allow_tags",
                "project_allow_related_posts",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(instance=request.user.user_profile)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:

        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.saveGeneralSettings(
            user=request.user, **serializer.validated_data
        )

        return Response({"message": "General Settings Saved"})


class SEOSettings(APIView):
    """Get or set seo related settings"""

    class InputSerializer(serializers.Serializer):
        meta_description = serializers.CharField(required=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserProfile
            fields = ["meta_description"]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(instance=request.user.user_profile)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.saveSEOSettings(
            user=request.user, **serializer.validated_data
        )

        return Response({"message": "SEO settings updated"})


class AboutMeSettings(APIView):
    """About me related settings"""

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=255, min_length=3)
        profile_picture = serializers.ImageField(required=False)
        nationality = serializers.CharField(max_length=50, required=False)
        about_me = serializers.CharField(required=False)
        my_positions = serializers.CharField(min_length=3)
        video_description = serializers.CharField(
            max_length=100, required=False
        )
        resume = serializers.FileField(required=False)

    class OutputSerializer(serializers.ModelSerializer):
        name = serializers.CharField(source="user.name")

        class Meta:
            model = UserProfile
            fields = (
                "name",
                "profile_picture",
                "nationality",
                "about_me",
                "my_positions",
                "video_description",
                "resume",
            )

    def get(self, request: Request) -> Response:
        userProfile: UserProfile = request.user.user_profile
        serializer = self.OutputSerializer(instance=userProfile)

        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.saveAboutMeSettings(
            user=request.user, **serializer.validated_data
        )

        return Response({"message": "Settings Saved!"})


class ContactInformationSettings(APIView):
    """Get and save contact information"""

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserProfile
            fields = ["address", "gmap_iframe", "phone", "email"]

    class InputSerializer(serializers.Serializer):
        address = serializers.CharField()
        gmap_iframe = serializers.CharField(max_length=2000)
        phone = serializers.CharField()
        email = serializers.CharField()

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(instance=request.user.user_profile)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.saveContactInformation(
            user=request.user, **serializer.validated_data
        )

        return Response({"message": "Contact Information is saved!"})


class StatisticsSettings(APIView):
    """
    API endpoint, User can save & get Statistics Settings
    """

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserProfile
            fields = [
                "projects",
                "meetings",
                "happy_clients",
                "awards_won",
                "experience",
            ]

    class InputSerializer(serializers.Serializer):
        projects = serializers.IntegerField()
        meetings = serializers.IntegerField()
        happy_clients = serializers.IntegerField()
        awards_won = serializers.IntegerField()
        experience = serializers.IntegerField()

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(instance=request.user.user_profile)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.saveStatisticalSettings(
            user=request.user, **serializer.validated_data
        )

        return Response({"message": "Statistics Settings is saved!"})


class SocialLinksSettings(APIView):
    """
    API endpoint, User can save & get Social Links Settings
    """

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserProfile
            fields = [
                "facebook",
                "twitter",
                "instagram",
                "whatsapp",
                "youtube",
                "linkedin",
                "snapchat",
                "github",
                "pinterest",
                "reddit",
                "stackoverflow",
                "behance",
                "skype",
                "vimeo",
                "codepen",
                "dribble",
                "dropbox",
                "flickr",
                "rss",
                "soundcloud",
                "tumblr",
                "yelp",
            ]

    class InputSerializer(serializers.Serializer):
        facebook = serializers.URLField(max_length=200, allow_blank=True)
        twitter = serializers.URLField(max_length=200, allow_blank=True)
        instagram = serializers.URLField(max_length=200, allow_blank=True)
        whatsapp = serializers.URLField(max_length=200, allow_blank=True)
        youtube = serializers.URLField(max_length=200, allow_blank=True)
        linkedin = serializers.URLField(max_length=200, allow_blank=True)
        snapchat = serializers.URLField(max_length=200, allow_blank=True)
        github = serializers.URLField(max_length=200, allow_blank=True)
        pinterest = serializers.URLField(max_length=200, allow_blank=True)
        reddit = serializers.URLField(max_length=200, allow_blank=True)
        stackoverflow = serializers.URLField(max_length=200, allow_blank=True)
        behance = serializers.URLField(max_length=200, allow_blank=True)
        skype = serializers.URLField(max_length=200, allow_blank=True)
        vimeo = serializers.URLField(max_length=200, allow_blank=True)
        codepen = serializers.URLField(max_length=200, allow_blank=True)
        dribble = serializers.URLField(max_length=200, allow_blank=True)
        dropbox = serializers.URLField(max_length=200, allow_blank=True)
        flickr = serializers.URLField(max_length=200, allow_blank=True)
        rss = serializers.URLField(max_length=200, allow_blank=True)
        soundcloud = serializers.URLField(max_length=200, allow_blank=True)
        tumblr = serializers.URLField(max_length=200, allow_blank=True)
        yelp = serializers.URLField(max_length=200, allow_blank=True)

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(instance=request.user.user_profile)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.saveSocialLinksSettings(
            user=request.user, **serializer.validated_data
        )

        return Response({"message": "Social Links Settings is saved!"})


class ServiceList(APIView):
    """
    API endpoint, where user can create a service
    and fetch all the services of a particular user
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=200)
        description = serializers.CharField()
        image = serializers.ImageField(required=False)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Service
            fields = ["id", "title", "image"]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.services,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createService(user=request.user, **serializer.validated_data)

        return Response(
            {"message": "Service created successfully"},
            status=status.HTTP_201_CREATED,
        )


class ServiceDetail(APIView):
    """
    API endpoint, where user can edit their service
    and delete their service
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=200)
        description = serializers.CharField()
        image = serializers.ImageField(required=False)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Service
            fields = ["id", "title", "description", "image"]

    def get(self, request: Request, id: int) -> Response:
        service = selectors.getService(user=request.user, serviceId=id)
        serializer = self.OutputSerializer(instance=service)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editService(
            user=request.user, serviceId=id, **serializer.validated_data
        )

        return Response({"message": "Service is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteService(
            user=request.user,
            serviceId=id,
        )

        return Response({"message": "Service is deleted!"})


class PricingPlansList(APIView):
    """
    API endpoint, where user can create a pricing plans
    and fetch all the pricing plan of a particular user
    """

    class InputSerializer(serializers.Serializer):
        display_plan = serializers.BooleanField()
        plan_name = serializers.CharField(max_length=200)
        plan_price = serializers.CharField(max_length=20)
        price_duration = serializers.CharField(max_length=50)
        plan_currency = serializers.CharField(max_length=20)
        is_featured = serializers.BooleanField()
        feature_comment = serializers.CharField(
            max_length=200,
            allow_blank=True,
        )
        features = serializers.CharField()
        plan_icon = serializers.ImageField(required=False)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = PricingPlan
            fields = [
                "id",
                "plan_name",
                "plan_price",
                "plan_icon",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.pricing_plans,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createPricingPlan(
            user=request.user, **serializer.validated_data
        )

        return Response(
            {"message": "Pricing plan created successfully"},
            status=status.HTTP_201_CREATED,
        )


class PricingPlansDetail(APIView):
    """
    API endpoint, where user can edit their price plans
    and delete their price plan
    """

    class InputSerializer(serializers.Serializer):
        display_plan = serializers.BooleanField()
        plan_name = serializers.CharField(max_length=200)
        plan_price = serializers.CharField(max_length=20)
        price_duration = serializers.CharField(max_length=50)
        plan_currency = serializers.CharField(max_length=20)
        is_featured = serializers.BooleanField()
        feature_comment = serializers.CharField(
            max_length=200,
            allow_blank=True,
        )
        features = serializers.CharField()
        plan_icon = serializers.ImageField(required=False)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = PricingPlan
            fields = [
                "id",
                "display_plan",
                "plan_name",
                "plan_price",
                "price_duration",
                "plan_currency",
                "is_featured",
                "feature_comment",
                "features",
                "plan_icon",
            ]

    def get(self, request: Request, id: int) -> Response:
        pricingPlan = selectors.getPricingPlan(
            user=request.user, pricingPlanId=id
        )
        serializer = self.OutputSerializer(instance=pricingPlan)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editPricingPlan(
            user=request.user, pricingPlanId=id, **serializer.validated_data
        )

        return Response({"message": "Pricing Plan is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deletePricingPlan(
            user=request.user,
            pricingPlanId=id,
        )

        return Response({"message": "Pricing Plan is deleted!"})


class EducationList(APIView):
    """
    API endpoint, where user can create a education field
    and fetch all the education field of a particular user
    """

    class InputSerializer(serializers.Serializer):
        school = serializers.CharField(max_length=200)
        field = serializers.CharField(max_length=100)
        image = serializers.ImageField()
        description = serializers.CharField(allow_blank=True)
        date_from = serializers.DateField()
        date_to = serializers.DateField(required=False)
        currently_studying = serializers.BooleanField()

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Education
            fields = [
                "id",
                "image",
                "school",
                "field",
                "date_from",
                "date_to",
                "currently_studying",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.educations,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createEducation(
            user=request.user, **serializer.validated_data
        )

        return Response(
            {"message": "Education created successfully"},
            status=status.HTTP_201_CREATED,
        )


class EducationDetail(APIView):
    """
    API endpoint, where user can edit their education
    and delete their education
    """

    class InputSerializer(serializers.Serializer):
        school = serializers.CharField(max_length=200)
        field = serializers.CharField(max_length=100)
        image = serializers.ImageField(required=False)
        description = serializers.CharField(allow_blank=True)
        date_from = serializers.DateField()
        date_to = serializers.DateField(required=False)
        currently_studying = serializers.BooleanField()

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Education
            fields = [
                "id",
                "image",
                "school",
                "field",
                "description",
                "date_from",
                "date_to",
                "currently_studying",
            ]

    def get(self, request: Request, id: int) -> Response:
        education = selectors.getEducation(user=request.user, educationId=id)
        serializer = self.OutputSerializer(instance=education)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editEducation(
            user=request.user, educationId=id, **serializer.validated_data
        )

        return Response({"message": "Education is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteEducation(
            user=request.user,
            educationId=id,
        )

        return Response({"message": "Education is deleted!"})


class ExperienceList(APIView):
    """
    API endpoint, where user can create a experience field
    and fetch all the experience field of a particular user
    """

    class InputSerializer(serializers.Serializer):
        company = serializers.CharField(max_length=200)
        image = serializers.ImageField()
        position = serializers.CharField(max_length=100)
        description = serializers.CharField(allow_blank=True)
        date_from = serializers.DateField()
        date_to = serializers.DateField(required=False)
        currently_working = serializers.BooleanField()

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Experiences
            fields = [
                "id",
                "company",
                "image",
                "position",
                "date_from",
                "date_to",
                "currently_working",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.experiences,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createExperience(
            user=request.user, **serializer.validated_data
        )

        return Response(
            {"message": "Experience created successfully"},
            status=status.HTTP_201_CREATED,
        )


class ExperienceDetail(APIView):
    """
    API endpoint, where user can edit their experience
    and delete their experience
    """

    class InputSerializer(serializers.Serializer):
        company = serializers.CharField(max_length=200)
        image = serializers.ImageField(required=False)
        position = serializers.CharField(max_length=100)
        description = serializers.CharField(allow_blank=True)
        date_from = serializers.DateField()
        date_to = serializers.DateField(required=False)
        currently_working = serializers.BooleanField()

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Experiences
            fields = [
                "id",
                "company",
                "image",
                "position",
                "description",
                "date_from",
                "date_to",
                "currently_working",
            ]

    def get(self, request: Request, id: int) -> Response:
        experience = selectors.getExperience(
            user=request.user,
            experienceId=id,
        )
        serializer = self.OutputSerializer(instance=experience)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editExperience(
            user=request.user,
            experienceId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Experience is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteExperience(
            user=request.user,
            experienceId=id,
        )

        return Response({"message": "Experience is deleted!"})


class ProjectCategoryList(APIView):
    """
    API endpoint, where user can create and fetch
    all the project category field of a particular user
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=100)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = ProjectCategory
            fields = ["id", "title"]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.project_categories,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createProjectCategory(
            user=request.user, **serializer.validated_data
        )

        return Response(
            {"message": "Project category created successfully"},
            status=status.HTTP_201_CREATED,
        )


class ProjectCategoryDetail(APIView):
    """
    API endpoint, where user can edit & delete
    their project category
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=100)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = ProjectCategory
            fields = ["id", "title"]

    def get(self, request: Request, id: int) -> Response:
        projectCategory = selectors.getProjectCategory(
            user=request.user,
            projectCategoryId=id,
        )
        serializer = self.OutputSerializer(instance=projectCategory)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editProjectCategory(
            user=request.user,
            projectCategoryId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Project Category is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteProjectCategory(
            user=request.user,
            projectCategoryId=id,
        )

        return Response({"message": "Project Category is deleted!"})


class ProjectList(APIView):
    """
    API endpoint, where user can create a project
    and fetch all the projects of a particular user
    """

    class InputSerializer(serializers.Serializer):
        display_project = serializers.BooleanField()
        category_id = serializers.IntegerField()
        title = serializers.CharField(max_length=200)
        link = serializers.URLField(max_length=500, allow_blank=True)
        published = serializers.DateField()
        featured_image = serializers.ImageField()
        description = serializers.CharField()
        meta_description = serializers.CharField(allow_blank=True)
        facebook = serializers.URLField(max_length=500, blank=True)
        twitter = serializers.URLField(max_length=500, blank=True)
        pinterest = serializers.URLField(max_length=500, blank=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Project
            fields = [
                "id",
                "title",
                "category",
                "featured_image",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.user_profile_projects,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createProject(user=request.user, **serializer.validated_data)

        return Response(
            {"message": "Project created successfully"},
            status=status.HTTP_201_CREATED,
        )


class ProjectDetail(APIView):
    """
    API endpoint, where user can edit their project
    and delete their project
    """

    class InputSerializer(serializers.Serializer):
        display_project = serializers.BooleanField()
        category_id = serializers.IntegerField()
        title = serializers.CharField(max_length=200)
        link = serializers.URLField(max_length=500, allow_blank=True)
        published = serializers.DateField()
        featured_image = serializers.ImageField(allow_blank=True)
        description = serializers.CharField()
        meta_description = serializers.CharField(allow_blank=True)
        facebook = serializers.URLField(max_length=500, blank=True)
        twitter = serializers.URLField(max_length=500, blank=True)
        pinterest = serializers.URLField(max_length=500, blank=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Project
            fields = [
                "id",
                "display_project",
                "category",
                "title",
                "link",
                "published",
                "featured_image",
                "description",
                "meta_description",
                "facebook",
                "twitter",
                "pinterest",
            ]

    def get(self, request: Request, id: int) -> Response:
        project = selectors.getProject(
            user=request.user,
            projectId=id,
        )
        serializer = self.OutputSerializer(instance=project)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editProject(
            user=request.user,
            projectId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Project is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteProject(
            user=request.user,
            projectId=id,
        )

        return Response({"message": "Project is deleted!"})
