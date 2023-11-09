import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../crypto_icons/btc.png'; 

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
}));

const BitcoinData = () => {
  const [btcData, setBtcData] = useState({ askPrice: 'Loading...', bidPrice: 'Loading...' });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/btc_price/');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      const { message } = JSON.parse(event.data);
    
      if (message[1] && typeof message[1] === 'object' && message[1].a && message[1].b) {
        setBtcData({
          askPrice: message[1].a[0],
          bidPrice: message[1].b[0],
        });
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      console.error('Chat socket closed unexpectedly');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
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
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <img src={logo} alt="Bitcoin Logo" style={{ height: '40px' }} />
              <Typography variant="h5" component="div">
                Real-Time Bitcoin Data
              </Typography>
              <Typography variant="h6" component="div">
                Ask Price: {btcData.askPrice}
              </Typography>
              <Typography variant="h6" component="div">
                Bid Price: {btcData.bidPrice}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        {/* Add more Grid items for more cryptocurrencies here */}
      </Grid>
    </Box>
  );
};

export default BitcoinData;
