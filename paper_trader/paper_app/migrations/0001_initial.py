# Generated by Django 4.2.4 on 2023-10-28 16:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('ticker', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('auth0_id', models.CharField(max_length=255, unique=True)),
                ('balance_usd', models.DecimalField(decimal_places=2, default=1000000, max_digits=15)),
            ],
        ),
        migrations.CreateModel(
            name='UserCoin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=8, default=0, max_digits=15)),
                ('coin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='paper_app.coin')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='paper_app.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=8, max_digits=15)),
                ('transaction_price_usd', models.DecimalField(decimal_places=2, max_digits=15)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('coin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='paper_app.coin')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='paper_app.userprofile')),
            ],
        ),
        migrations.AddField(
            model_name='coin',
            name='users',
            field=models.ManyToManyField(through='paper_app.UserCoin', to='paper_app.userprofile'),
        ),
    ]
