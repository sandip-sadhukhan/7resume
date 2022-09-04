from rest_framework import serializers
from .models import (
    Appointment,
    Blog,
    Education,
    Experiences,
    PricingPlan,
    Project,
    ProjectCategory,
    Service,
    Skill,
    Tags,
    Testimonial,
    Client,
)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = (
            "id",
            "title",
            "description",
            "image",
        )


class PricingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPlan
        fields = (
            "id",
            "plan_name",
            "plan_price",
            "price_duration",
            "plan_currency",
            "is_featured",
            "feature_comment",
            "features",
            "plan_icon_path",
        )


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = (
            "id",
            "name",
            "image_path",
            "position",
            "rating",
            "message",
        )


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = (
            "id",
            "name",
            "image_path",
        )


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiences
        fields = (
            "id",
            "company",
            "image_path",
            "position",
            "description",
            "date_from",
            "date_to",
            "currently_working",
        )


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = (
            "id",
            "school",
            "image_path",
            "field",
            "description",
            "date_from",
            "date_to",
            "currently_studying",
        )


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = (
            "id",
            "title",
            "level",
        )


class ProjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            "id",
            "category_name",
            "title",
            "slug",
            "featured_image_path",
        )


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            "id",
            "category_name",
            "title",
            "slug",
            "link",
            "published",
            "featured_image_path",
            "description",
            "meta_description",
            "facebook",
            "twitter",
            "pinterest",
        )


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = (
            "id",
            "title",
        )


class BlogShortSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.title")

    class Meta:
        model = Blog
        fields = (
            "id",
            "featured_image",
            "views",
            "slug",
            "title",
            "updated_at",
            "category_name",
            "short_description",
        )


class BlogShortGridSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = (
            "id",
            "featured_image",
            "title",
            "slug",
            "updated_at",
        )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ("title",)


class BlogSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.title")
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Blog
        fields = (
            "id",
            "slug",
            "featured_image",
            "title",
            "author",
            "updated_at",
            "category_name",
            "views",
            "description",
            "meta_description",
            "tags",
        )


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = (
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
        )
