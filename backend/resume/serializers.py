from rest_framework import serializers
from .models import (
    Education,
    Experiences,
    PricingPlan,
    Service,
    Skill,
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
