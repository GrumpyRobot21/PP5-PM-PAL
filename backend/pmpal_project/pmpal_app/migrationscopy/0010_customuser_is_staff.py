# Generated by Django 4.2.7 on 2023-12-02 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pmpal_app', '0009_remove_customuser_is_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_staff',
            field=models.BooleanField(default=True),
        ),
    ]