from rest_framework import serializers
from .models import PricingPlan, Service, Testimonial, Client


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
