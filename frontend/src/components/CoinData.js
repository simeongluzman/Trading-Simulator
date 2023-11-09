import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import btcLogo from '../crypto_icons/btc.png';
import ethLogo from '../crypto_icons/eth.png';  // Add logos for other coins similarly
import ltcLogo from '../crypto_icons/ltc.png';
import xrpLogo from '../crypto_icons/xrp.png';
import bchLogo from '../crypto_icons/bch.png';

const coinLogos = {
  btc: btcLogo,
  eth: ethLogo,  // Add other coins here
  ltc: ltcLogo,
  xrp: xrpLogo,
  bch: bchLogo,
};

const coinMappings = {
  'XBT/USD': 'btc',
  'ETH/USD': 'eth',
  'LTC/USD': 'ltc',
  'XRP/USD': 'xrp',
  'BCH/USD': 'bch',
};

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
}));

const CryptoData = () => {
  const initialData = {
    btc: { askPrice: 'Loading...', bidPrice: 'Loading...', volume: 'Loading...', dailyChange: 'Loading...', low: 'Loading...', high: 'Loading...', name: 'Bitcoin' },
    eth: { askPrice: 'Loading...', bidPrice: 'Loading...', volume: 'Loading...', dailyChange: 'Loading...', low: 'Loading...', high: 'Loading...', name: 'Ethereum' },
    ltc: { askPrice: 'Loading...', bidPrice: 'Loading...', volume: 'Loading...', dailyChange: 'Loading...', low: 'Loading...', high: 'Loading...', name: 'Litecoin' },
    xrp: { askPrice: 'Loading...', bidPrice: 'Loading...', volume: 'Loading...', dailyChange: 'Loading...', low: 'Loading...', high: 'Loading...', name: 'Ripple' },
    bch: { askPrice: 'Loading...', bidPrice: 'Loading...', volume: 'Loading...', dailyChange: 'Loading...', low: 'Loading...', high: 'Loading...', name: 'Bitcoin Cash' },
    // Add other coins with initial data here
  };

  const [cryptoData, setCryptoData] = useState(initialData);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/prices/');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data[3] && coinMappings[data[3]]) {
        const coin = coinMappings[data[3]];
        const askPrice = data[1].a[0];
        const bidPrice = data[1].b[0];
        const volume = data[1].v[0];
        const dailyChange = data[1].p[1];
        const low = data[1].l[0];
        const high = data[1].h[0];

        setCryptoData(prevData => ({
          ...prevData,
          [coin]: {
            ...prevData[coin],
            askPrice: askPrice,
            bidPrice: bidPrice,
            volume: volume,
            dailyChange: dailyChange,
            low: low,
            high: high
          },
        }));
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      // Close the socket when the component is unmounted
      socket.close();
    };

  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid container spacing={4} justifyContent="center">
        {Object.keys(cryptoData).map(coin => (
          <Grid key={coin} item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <img src={coinLogos[coin]} alt={`${cryptoData[coin].name} Logo`} style={{ height: '40px' }} />
                <Typography variant="h5" component="div">
                  {cryptoData[coin].name} Data
                </Typography>
                <Typography variant="h6" component="div">
                  Ask Price: {cryptoData[coin].askPrice}
                </Typography>
                <Typography variant="h6" component="div">
                  Bid Price: {cryptoData[coin].bidPrice}
                </Typography>
                <Typography variant="h6" component="div">
                  Volume: {cryptoData[coin].volume}
                </Typography>
                <Typography variant="h6" component="div">
                  Daily Change: {cryptoData[coin].dailyChange}%
                </Typography>
                <Typography variant="h6" component="div">
                  24h Low: {cryptoData[coin].low}
                </Typography>
                <Typography variant="h6" component="div">
                  24h High: {cryptoData[coin].high}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CryptoData;
