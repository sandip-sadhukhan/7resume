# Generated by Django 4.0.2 on 2022-03-01 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0002_alter_userprofile_latitude_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='awards_won',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='experience',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='happy_clients',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='meetings',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='projects',
            field=models.IntegerField(default=0),
        ),
    ]