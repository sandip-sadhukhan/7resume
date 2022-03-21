from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, serializers, status

User = get_user_model()


class SignupView(APIView):
    class SignUpSerializer(serializers.Serializer):
        name = serializers.CharField(required=True, min_length=3)
        username = serializers.CharField(required=True, min_length=3)
        email = serializers.CharField(required=True, min_length=3)
        password = serializers.CharField(required=True, min_length=6)

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = self.SignUpSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "error": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        name = serializer.data["name"]
        username = serializer.data["username"]
        email = serializer.data["email"]
        password = serializer.data["password"]

        try:
            User.objects.create_user(  # type: ignore
                name=name,
                username=username,
                email=email,
                password=password,
            )
            return Response(
                {
                    "success": True,
                    "message": "Signed up successfully",
                },
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError as e:
            duplicateItem = str(e.args[0]).split(".")[-1]
            return Response(
                {
                    "success": False,
                    "error": f"{duplicateItem} is already exists.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class GetUserInformation(APIView):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ("username", "name", "email")

    def get(self, request, format=None):
        user = request.user
        serializer = self.UserSerializer(instance=user)
        return Response(serializer.data)
