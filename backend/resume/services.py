from typing import Optional
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.shortcuts import get_object_or_404
from accounts.models import UserAccount
from .models import Blog, Message, RequestedAppointment, Service, UserProfile
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


def saveGeneralSettings(
    *,
    user: UserAccount,
    display_resume: bool,
    display_portfolio: bool,
    display_blog: bool,
    display_appointments: bool,
    display_services: bool,
    display_fun_facts: bool,
    display_pricing_plans: bool,
    display_testimonials: bool,
    display_clients: bool,
    display_contact_form: bool,
    blog_allow_search_box: bool,
    blog_allow_categories: bool,
    blog_allow_latest_posts: bool,
    blog_allow_popular_posts: bool,
    post_allow_search_box: bool,
    post_allow_latest_posts: bool,
    post_allow_related_posts: bool,
    post_allow_tags: bool,
    project_allow_related_posts: bool,
):
    userProfile: UserProfile = user.user_profile  # type: ignore

    userProfile.display_resume = display_resume
    userProfile.display_portfolio = display_portfolio
    userProfile.display_blog = display_blog
    userProfile.display_appointments = display_appointments
    userProfile.display_services = display_services
    userProfile.display_fun_facts = display_fun_facts
    userProfile.display_pricing_plans = display_pricing_plans
    userProfile.display_testimonials = display_testimonials
    userProfile.display_clients = display_clients
    userProfile.display_contact_form = display_contact_form
    userProfile.blog_allow_search_box = blog_allow_search_box
    userProfile.blog_allow_categories = blog_allow_categories
    userProfile.blog_allow_latest_posts = blog_allow_latest_posts
    userProfile.blog_allow_popular_posts = blog_allow_popular_posts
    userProfile.post_allow_search_box = post_allow_search_box
    userProfile.post_allow_latest_posts = post_allow_latest_posts
    userProfile.post_allow_related_posts = post_allow_related_posts
    userProfile.post_allow_tags = post_allow_tags
    userProfile.project_allow_related_posts = project_allow_related_posts

    userProfile.save()


def saveSEOSettings(*, user: UserAccount, meta_description: str) -> None:
    userProfile: UserProfile = user.user_profile  # type: ignore

    userProfile.meta_description = meta_description
    userProfile.save()


def saveAboutMeSettings(
    *,
    user: UserAccount,
    name: str,
    profile_picture: Optional[InMemoryUploadedFile] = None,
    nationality: Optional[str] = None,
    about_me: Optional[str] = None,
    my_positions: str,
    video_description: Optional[str] = None,
    resume: Optional[InMemoryUploadedFile] = None,
) -> None:
    userProfile: UserProfile = user.user_profile  # type: ignore

    user.name = name
    user.save()

    if profile_picture is not None:
        userProfile.profile_picture = profile_picture
    if nationality is not None:
        userProfile.nationality = nationality
    if about_me is not None:
        userProfile.about_me = about_me
    userProfile.my_positions = my_positions
    if video_description is not None:
        userProfile.video_description = video_description
    if resume is not None:
        userProfile.resume = resume

    userProfile.save()


def saveContactInformation(
    *,
    user: UserAccount,
    address: str,
    gmap_iframe: str,
    phone: str,
    email: str,
) -> None:
    userProfile: UserProfile = user.user_profile  # type: ignore

    userProfile.address = address
    userProfile.gmap_iframe = gmap_iframe
    userProfile.phone = phone
    userProfile.email = email

    userProfile.save()


def saveStatisticalSettings(
    *,
    user: UserAccount,
    projects: int,
    meetings: int,
    happy_clients: int,
    awards_won: int,
    experience: int,
):
    userProfile: UserProfile = user.user_profile  # type: ignore

    userProfile.projects = projects
    userProfile.meetings = meetings
    userProfile.happy_clients = happy_clients
    userProfile.awards_won = awards_won
    userProfile.experience = experience

    userProfile.save()


def saveSocialLinksSettings(
    *,
    user: UserAccount,
    facebook: str,
    twitter: str,
    instagram: str,
    whatsapp: str,
    youtube: str,
    linkedin: str,
    snapchat: str,
    github: str,
    pinterest: str,
    reddit: str,
    stackoverflow: str,
    behance: str,
    skype: str,
    vimeo: str,
    codepen: str,
    dribble: str,
    dropbox: str,
    flickr: str,
    rss: str,
    soundcloud: str,
    tumblr: str,
    yelp: str,
):
    userProfile: UserProfile = user.user_profile  # type: ignore

    userProfile.facebook = facebook
    userProfile.twitter = twitter
    userProfile.instagram = instagram
    userProfile.whatsapp = whatsapp
    userProfile.youtube = youtube
    userProfile.linkedin = linkedin
    userProfile.snapchat = snapchat
    userProfile.github = github
    userProfile.pinterest = pinterest
    userProfile.reddit = reddit
    userProfile.stackoverflow = stackoverflow
    userProfile.behance = behance
    userProfile.skype = skype
    userProfile.vimeo = vimeo
    userProfile.codepen = codepen
    userProfile.dribble = dribble
    userProfile.dropbox = dropbox
    userProfile.flickr = flickr
    userProfile.rss = rss
    userProfile.soundcloud = soundcloud
    userProfile.tumblr = tumblr
    userProfile.yelp = yelp

    userProfile.save()


def createService(
    *,
    user: UserAccount,
    title: str,
    description: str,
    image: Optional[InMemoryUploadedFile] = None,
) -> None:
    userProfile: UserProfile = user.user_profile  # type: ignore

    service = Service.objects.create(
        user_profile=userProfile,
        title=title,
        description=description,
    )

    if image is not None:
        service.image = image
        service.save()


def getService(
    *,
    user: UserAccount,
    serviceId: int,
) -> Service:
    userProfile: UserProfile = user.user_profile  # type: ignore

    service = get_object_or_404(
        Service,
        user_profile=userProfile,
        id=serviceId,
    )

    return service


def editService(
    *,
    user: UserAccount,
    serviceId: int,
    title: str,
    description: str,
    image: Optional[InMemoryUploadedFile] = None,
) -> None:
    userProfile: UserProfile = user.user_profile  # type: ignore

    service = get_object_or_404(
        Service,
        user_profile=userProfile,
        id=serviceId,
    )

    service.title = title
    service.description = description
    if image is not None:
        service.image = image

    service.save()


def deleteService(
    *,
    user: UserAccount,
    serviceId: int,
) -> None:
    service = getService(user=user, serviceId=serviceId)

    service.delete()
