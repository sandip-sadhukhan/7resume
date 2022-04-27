from .models import Blog, Message
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
