# Generated by Django 4.0.2 on 2022-03-02 10:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0005_userprofile_why_hire_me_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='display_testimonial',
            new_name='display_testimonials',
        ),
    ]