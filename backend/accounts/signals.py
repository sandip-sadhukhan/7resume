from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserAccount
from resume.models import UserProfile, Appointment


@receiver(post_save, sender=UserAccount)
def createUserProfileAndAppointment(sender, instance, created, **kwargs):
    if created:
        # create user profile
        userProfile = UserProfile.objects.create(user=instance)
        # create appointment
        Appointment.objects.create(user_profile=userProfile)
