# Generated by Django 4.2.4 on 2023-10-29 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paper_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='bch',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='btc',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='eth',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='ltc',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='xrp',
            field=models.FloatField(default=0),
        ),
    ]
