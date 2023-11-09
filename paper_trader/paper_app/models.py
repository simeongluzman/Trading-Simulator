from django.db import models




class UserProfile(models.Model):
    auth0_id = models.CharField(max_length=255, unique=True)
    balance_usd = models.DecimalField(max_digits=15, decimal_places=2, default=1000000)
    btc = models.DecimalField(max_digits=15, decimal_places=8, default=0)
    eth = models.DecimalField(max_digits=15, decimal_places=8, default=0)
    ltc = models.DecimalField(max_digits=15, decimal_places=8, default=0)
    xrp = models.DecimalField(max_digits=15, decimal_places=8, default=0)
    bch = models.DecimalField(max_digits=15, decimal_places=8, default=0)

class Transaction(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    coin_ticker = models.CharField(max_length=5, default='btc')  # e.g., "btc", "eth", etc.
    amount = models.DecimalField(max_digits=15, decimal_places=8)  # Amount of coin bought/sold (negative for sell)
    transaction_price_usd = models.DecimalField(max_digits=15, decimal_places=2)  # Price of the coin at the time of transaction
    timestamp = models.DateTimeField(auto_now_add=True)  # Time of transaction
