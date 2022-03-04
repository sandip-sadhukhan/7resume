from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)


class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, name, password=None):
        if not username:
            raise ValueError("Users must have an Username.")
        if not email:
            raise ValueError("Users must have an email address.")
        if not name:
            raise ValueError("Users must have a name.")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, username=username)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, name, password):
        user = self.create_user(username, email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    Custom User Model for Backend
    """

    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["name", "email"]

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email
