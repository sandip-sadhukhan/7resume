from typing import Optional
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import InMemoryUploadedFile
from accounts.models import UserAccount
from .models import Blog, Message, RequestedAppointment, UserProfile
from . import selectors


def createContactMessage(
    *, username: str, name: str, email: str, message: str
) -> None:
    user = selectors.findUserFromUsername(username=username)

    Message.objects.create(
        user_profile=user.user_profile,  # type: ignore
        name=name,
        email=email,
        message=message,
    )


def increaseBlogViewCounter(blog: Blog) -> None:
    blog.views += 1
    blog.save()


def createAppointmentRequest(
    *,
    username: str,
    subject: str,
    name: str,
    email: str,
    phone: str,
    appointment_time: str,
    message: str,
) -> None:
    user = selectors.findUserFromUsername(username=username)
    userProfile = user.user_profile  # type: ignore

    RequestedAppointment.objects.create(
        user_profile=userProfile,
        subject=subject,
        name=name,
        email=email,
        phone=phone,
        appointment_time=appointment_time,
        message=message,
    )


def changeUserFields(
    *, user: UserAccount, name: str, username: str, email: str, password: str
) -> None:

    # match password
    if not user.check_password(password):
        raise ValidationError(message="Wrong password!")

    # name change
    user.name = name

    # username change
    if (
        UserAccount.objects.filter(username=username)
        .exclude(username=user.username)
        .count()
        > 0
    ):
        raise ValidationError("Username is already exists")
    else:
        user.username = username

    # email change
    if (
        UserAccount.objects.filter(email=email)
        .exclude(email=user.email)
        .count()
        > 0
    ):
        raise ValidationError("Email is already exists")
    else:
        user.email = email

    user.save()


def saveWebsiteSettings(
    *,
    user: UserAccount,
    site_title: Optional[str],
    webmaster_email: Optional[str],
    favicon: Optional[InMemoryUploadedFile] = None,
    start_page_background: Optional[InMemoryUploadedFile] = None,
    about_me_image: Optional[InMemoryUploadedFile] = None,
    contact_form_image: Optional[InMemoryUploadedFile] = None,
) -> None:
    userProfile: UserProfile = user.user_profile  # type:ignore

    userProfile.site_title = site_title
    userProfile.webmaster_email = webmaster_email

    if favicon is not None:
        userProfile.favicon = favicon
    if start_page_background is not None:
        userProfile.start_page_background = start_page_background
    if about_me_image is not None:
        userProfile.about_me_image = about_me_image
    if contact_form_image is not None:
        userProfile.contact_form_image = contact_form_image

    userProfile.save()
