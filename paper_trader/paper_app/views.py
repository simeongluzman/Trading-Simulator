from django.shortcuts import render
from django.http import JsonResponse
from .models import UserProfile
from django.views.decorators.csrf import csrf_exempt
import logging
from decimal import Decimal
import json

logger = logging.getLogger(__name__)

@csrf_exempt
def check_user(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        auth0_id = data.get('auth0_id')
        if not UserProfile.objects.filter(auth0_id=auth0_id).exists():
            UserProfile.objects.create(auth0_id=auth0_id)
        return JsonResponse({"status": "success"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_portfolio(request, user_id):
    try:
        profile = UserProfile.objects.get(auth0_id=user_id)
        data = {
            'balance': profile.balance_usd,
            'coins': {
                'btc': profile.btc,
                'eth': profile.eth,
                'ltc': profile.ltc,
                'xrp': profile.xrp,
                'bch': profile.bch
            }
        }
        return JsonResponse(data)
    except UserProfile.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def trade(request):
    try:
        data = json.loads(request.body)
        
        user_id = data.get('user_id')
        coin = data.get('coin')
        amount = Decimal(data.get('amount'))
        trade_type = data.get('trade_type')
        agreed_price = Decimal(data.get('agreed_price'))  # Get the price user saw on frontend

        profile = UserProfile.objects.get(auth0_id=user_id)

        if trade_type == "buy":
            # No longer fetching from Redis, but using agreed price
            cost = agreed_price * amount
            if cost > profile.balance_usd:
                return JsonResponse({'success': False, 'message': 'Insufficient funds'})

            setattr(profile, coin, getattr(profile, coin) + amount)
            profile.balance_usd -= cost

        elif trade_type == "sell":
            proceeds = agreed_price * amount
            if getattr(profile, coin) < amount:
                return JsonResponse({'success': False, 'message': 'Insufficient coin amount'})

            setattr(profile, coin, getattr(profile, coin) - amount)
            profile.balance_usd += proceeds

        profile.save()

        return JsonResponse({'success': True, 'portfolio': {
            'balance': profile.balance_usd,
            'coins': {
                'btc': profile.btc,
                'eth': profile.eth,
                'ltc': profile.ltc,
                'xrp': profile.xrp,
                'bch': profile.bch
            }
        }})

    except UserProfile.DoesNotExist:
        logger.error("User not found with ID: %s", user_id)
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        logger.error("Exception in trade: %s", str(e))
        return JsonResponse({"error": str(e)}, status=500)
