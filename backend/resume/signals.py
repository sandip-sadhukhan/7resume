from django.db.models.signals import pre_save

# from django.dispatch import receiver
from .models import Blog, Project
from .utils import unique_slug_generator


def generate_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


pre_save.connect(generate_slug, sender=Project)
pre_save.connect(generate_slug, sender=Blog)
