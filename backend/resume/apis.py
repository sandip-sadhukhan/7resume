from django.forms import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status, permissions, serializers

from resume.serializers import TagSerializer

from .models import (
    Appointment,
    Blog,
    BlogCategory,
    Client,
    Education,
    Experiences,
    Message,
    PricingPlan,
    Project,
    ProjectCategory,
    RequestedAppointment,
    Service,
    Skill,
    SkillCategory,
    Tags,
    Testimonial,
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
        facebook = serializers.URLField(max_length=500, allow_blank=True)
        twitter = serializers.URLField(max_length=500, allow_blank=True)
        pinterest = serializers.URLField(max_length=500, allow_blank=True)

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
        featured_image = serializers.ImageField(required=False)
        description = serializers.CharField()
        meta_description = serializers.CharField(allow_blank=True)
        facebook = serializers.URLField(max_length=500, allow_blank=True)
        twitter = serializers.URLField(max_length=500, allow_blank=True)
        pinterest = serializers.URLField(max_length=500, allow_blank=True)

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


class BlogCategoryList(APIView):
    """
    API endpoint, where user can create and fetch
    all the blog category field of a particular user
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=100)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = BlogCategory
            fields = ["id", "title"]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.blog_categories,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createBlogCategory(
            user=request.user, **serializer.validated_data
        )

        return Response(
            {"message": "Blog category created successfully"},
            status=status.HTTP_201_CREATED,
        )


class BlogCategoryDetail(APIView):
    """
    API endpoint, where user can edit & delete
    their blog category
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=100)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = BlogCategory
            fields = ["id", "title"]

    def get(self, request: Request, id: int) -> Response:
        blogCategory = selectors.getBlogCategory(
            user=request.user,
            blogCategoryId=id,
        )
        serializer = self.OutputSerializer(instance=blogCategory)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editBlogCategory(
            user=request.user,
            blogCategoryId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Blog Category is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteBlogCategory(
            user=request.user,
            blogCategoryId=id,
        )

        return Response({"message": "Blog Category is deleted!"})


class BlogList(APIView):
    """
    API endpoint, where user can create a blog
    and fetch all the blogs of a particular user
    """

    class InputSerializer(serializers.Serializer):
        display_article = serializers.BooleanField()
        author = serializers.CharField(max_length=200)
        category_id = serializers.IntegerField()
        title = serializers.CharField(max_length=200)
        short_description = serializers.CharField()
        description = serializers.CharField()
        featured_image = serializers.ImageField()
        tags = serializers.CharField(max_length=500)
        meta_description = serializers.CharField(allow_blank=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Blog
            fields = [
                "id",
                "title",
                "views",
                "created_at",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.user_profile_blogs,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createBlog(user=request.user, **serializer.validated_data)

        return Response(
            {"message": "Blog created successfully"},
            status=status.HTTP_201_CREATED,
        )


class BlogDetail(APIView):
    """
    API endpoint, where user can edit their blog
    and delete their blog
    """

    class InputSerializer(serializers.Serializer):
        display_article = serializers.BooleanField()
        author = serializers.CharField(max_length=200)
        category_id = serializers.IntegerField()
        title = serializers.CharField(max_length=200)
        short_description = serializers.CharField()
        description = serializers.CharField()
        featured_image = serializers.ImageField(required=False)
        tags = serializers.CharField(max_length=500)
        meta_description = serializers.CharField(allow_blank=True)

    class OutputSerializer(serializers.ModelSerializer):
        tags = TagSerializer(read_only=True, many=True)

        class Meta:
            model = Blog
            fields = [
                "id",
                "display_article",
                "author",
                "category",
                "title",
                "short_description",
                "description",
                "featured_image",
                "tags",
                "meta_description",
            ]

    def get(self, request: Request, id: int) -> Response:
        blog = selectors.getBlog(
            user=request.user,
            blogId=id,
        )
        serializer = self.OutputSerializer(instance=blog)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editBlog(
            user=request.user,
            blogId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Blog is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteBlog(
            user=request.user,
            blogId=id,
        )

        return Response({"message": "Blog is deleted!"})


class SkillCategoryList(APIView):
    """
    API endpoint, where user can create and fetch
    all the skill category field of a particular user
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=100)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = SkillCategory
            fields = ["id", "title"]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.skill_categories,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createSkillCategory(
            user=request.user, **serializer.validated_data
        )

        return Response(
            {"message": "Skill category created successfully"},
            status=status.HTTP_201_CREATED,
        )


class SkillCategoryDetail(APIView):
    """
    API endpoint, where user can edit & delete
    their skill category
    """

    class InputSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=100)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = SkillCategory
            fields = ["id", "title"]

    def get(self, request: Request, id: int) -> Response:
        skillCategory = selectors.getSkillCategory(
            user=request.user,
            skillCategoryId=id,
        )
        serializer = self.OutputSerializer(instance=skillCategory)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editSkillCategory(
            user=request.user,
            skillCategoryId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Skill Category is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteSkillCategory(
            user=request.user,
            skillCategoryId=id,
        )

        return Response({"message": "Skill Category is deleted!"})


class SkillList(APIView):
    """
    API endpoint, where user can create a skill
    and fetch all the skills of a particular user
    """

    class InputSerializer(serializers.Serializer):
        category_id = serializers.IntegerField()
        title = serializers.CharField(max_length=200)
        level = serializers.IntegerField(min_value=0, max_value=100)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Skill
            fields = [
                "id",
                "title",
                "category",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.skills,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createSkill(user=request.user, **serializer.validated_data)

        return Response(
            {"message": "Skill created successfully"},
            status=status.HTTP_201_CREATED,
        )


class SkillDetail(APIView):
    """
    API endpoint, where user can edit their skill
    and delete their skill
    """

    class InputSerializer(serializers.Serializer):
        category_id = serializers.IntegerField()
        title = serializers.CharField(max_length=200)
        level = serializers.IntegerField(max_value=100, min_value=0)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Skill
            fields = [
                "id",
                "category",
                "title",
                "level",
            ]

    def get(self, request: Request, id: int) -> Response:
        skill = selectors.getSkill(
            user=request.user,
            skillId=id,
        )
        serializer = self.OutputSerializer(instance=skill)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editSkill(
            user=request.user,
            skillId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Skill is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteSkill(
            user=request.user,
            skillId=id,
        )

        return Response({"message": "Skill is deleted!"})


class TestimonialList(APIView):
    """
    API endpoint, where user can create a testimonial
    and fetch all the testimonials of a particular user
    """

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=100)
        image = serializers.ImageField()
        position = serializers.CharField(max_length=100)
        rating = serializers.IntegerField()
        message = serializers.CharField()

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Testimonial
            fields = [
                "id",
                "name",
                "position",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.testimonials,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createTestimonial(
            user=request.user, **serializer.validated_data
        )

        return Response(
            {"message": "Testimonial created successfully"},
            status=status.HTTP_201_CREATED,
        )


class TestimonialDetail(APIView):
    """
    API endpoint, where user can edit their testimonial
    and delete their testimonial
    """

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=100)
        image = serializers.ImageField(required=False)
        position = serializers.CharField(max_length=100)
        rating = serializers.IntegerField()
        message = serializers.CharField()

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Testimonial
            fields = [
                "id",
                "name",
                "image",
                "position",
                "rating",
                "message",
            ]

    def get(self, request: Request, id: int) -> Response:
        testimonial = selectors.getTestimonial(
            user=request.user,
            testimonialId=id,
        )
        serializer = self.OutputSerializer(instance=testimonial)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editTestimonial(
            user=request.user,
            testimonialId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Testimonial is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteTestimonial(
            user=request.user,
            testimonialId=id,
        )

        return Response({"message": "Testimonial is deleted!"})


class ClientList(APIView):
    """
    API endpoint, where user can create a client
    and fetch all the clients of a particular user
    """

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=100)
        image = serializers.ImageField()

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Client
            fields = [
                "id",
                "name",
                "image",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.clients,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createClient(user=request.user, **serializer.validated_data)

        return Response(
            {"message": "Client created successfully"},
            status=status.HTTP_201_CREATED,
        )


class ClientDetail(APIView):
    """
    API endpoint, where user can edit their client
    and delete their client
    """

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=100)
        image = serializers.ImageField(required=False)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Client
            fields = [
                "id",
                "name",
                "image",
            ]

    def get(self, request: Request, id: int) -> Response:
        client = selectors.getClient(
            user=request.user,
            clientId=id,
        )
        serializer = self.OutputSerializer(instance=client)

        return Response(serializer.data)

    def patch(self, request: Request, id: int) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editClient(
            user=request.user,
            clientId=id,
            **serializer.validated_data,
        )

        return Response({"message": "Client is saved!"})

    def delete(self, request: Request, id: int) -> Response:
        services.deleteClient(
            user=request.user,
            clientId=id,
        )

        return Response({"message": "Client is deleted!"})


class MessageList(APIView):
    """
    API endpoint, where user can fetch
    all the messages of a particular user
    """

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Message
            fields = [
                "id",
                "name",
                "email",
                "created_at",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.messages,
            many=True,
        )
        return Response(serializer.data)


class MessageDetail(APIView):
    """
    API endpoint, where user can view their message
    and delete their message
    """

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Message
            fields = [
                "id",
                "name",
                "email",
                "message",
            ]

    def get(self, request: Request, id: int) -> Response:
        message = selectors.getMessage(
            user=request.user,
            messageId=id,
        )
        serializer = self.OutputSerializer(instance=message)

        return Response(serializer.data)

    def delete(self, request: Request, id: int) -> Response:
        services.deleteMessage(
            user=request.user,
            messageId=id,
        )

        return Response({"message": "Message is deleted!"})


class AppointmentList(APIView):
    """
    API endpoint, where user can fetch
    all the appointment and edit them
    """

    class InputSerializer(serializers.Serializer):
        sunday = serializers.BooleanField()
        sunday_start_time = serializers.TimeField(allow_null=True)
        sunday_end_time = serializers.TimeField(allow_null=True)
        monday = serializers.BooleanField()
        monday_start_time = serializers.TimeField(allow_null=True)
        monday_end_time = serializers.TimeField(allow_null=True)
        tuesday = serializers.BooleanField()
        tuesday_start_time = serializers.TimeField(allow_null=True)
        tuesday_end_time = serializers.TimeField(allow_null=True)
        wednesday = serializers.BooleanField()
        wednesday_start_time = serializers.TimeField(allow_null=True)
        wednesday_end_time = serializers.TimeField(allow_null=True)
        thursday = serializers.BooleanField()
        thursday_start_time = serializers.TimeField(allow_null=True)
        thursday_end_time = serializers.TimeField(allow_null=True)
        friday = serializers.BooleanField()
        friday_start_time = serializers.TimeField(allow_null=True)
        friday_end_time = serializers.TimeField(allow_null=True)
        saturday = serializers.BooleanField()
        saturday_start_time = serializers.TimeField(allow_null=True)
        saturday_end_time = serializers.TimeField(allow_null=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Appointment
            fields = [
                "sunday",
                "sunday_start_time",
                "sunday_end_time",
                "monday",
                "monday_start_time",
                "monday_end_time",
                "tuesday",
                "tuesday_start_time",
                "tuesday_end_time",
                "wednesday",
                "wednesday_start_time",
                "wednesday_end_time",
                "thursday",
                "thursday_start_time",
                "thursday_end_time",
                "friday",
                "friday_start_time",
                "friday_end_time",
                "saturday",
                "saturday_start_time",
                "saturday_end_time",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.appointment,
        )
        return Response(serializer.data)

    def patch(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.editAppointment(
            user=request.user,
            **serializer.validated_data,
        )

        return Response({"message": "Appointment is Saved!"})


class RequestedAppointmentList(APIView):
    """
    API endpoint, where user can fetch all the
    requested appointments of a particular user
    """

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = RequestedAppointment
            fields = [
                "id",
                "subject",
                "name",
                "appointment_time",
                "created_at",
            ]

    def get(self, request: Request) -> Response:
        serializer = self.OutputSerializer(
            instance=request.user.user_profile.requested_appointments,
            many=True,
        )
        return Response(serializer.data)


class RequestedAppointmentDetail(APIView):
    """
    API endpoint, where user can view their requested
    appointments and delete their message
    """

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = RequestedAppointment
            fields = [
                "id",
                "subject",
                "name",
                "email",
                "phone",
                "appointment_time",
                "message",
                "created_at",
            ]

    def get(self, request: Request, id: int) -> Response:
        requestedAppointment = selectors.getRequestedAppointment(
            user=request.user,
            requestedAppointmentId=id,
        )
        serializer = self.OutputSerializer(instance=requestedAppointment)

        return Response(serializer.data)

    def delete(self, request: Request, id: int) -> Response:
        services.deleteRequestedAppointment(
            user=request.user,
            requestedAppointmentId=id,
        )

        return Response({"message": "Requested Appointment is deleted!"})
