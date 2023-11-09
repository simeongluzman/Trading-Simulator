import json
import asyncio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer

class KrakenConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        asyncio.create_task(self.fetch_kraken_data())

    async def fetch_kraken_data(self):
        kraken_url = "wss://ws.kraken.com"
        kraken_channel_name = "ticker"
        kraken_pairs = ["XBT/USD", "ETH/USD", "LTC/USD", "XRP/USD", "BCH/USD"]  # Top 5 coins as an example

        async with websockets.connect(kraken_url) as websocket:
            for pair in kraken_pairs:
                await websocket.send(json.dumps({
                    "event": "subscribe",
                    "pair": [pair],
                    "subscription": {"name": kraken_channel_name}
                }))

            while True:
                response = await websocket.recv()
                data = json.loads(response)
                print(f"Received data from frontend: {data}")
                await self.send(text_data=json.dumps(data))
