# Generated by Django 4.2.7 on 2023-12-02 19:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pmpal_app', '0008_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='is_staff',
        ),
    ]
