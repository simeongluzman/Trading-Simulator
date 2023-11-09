import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

import Portfolio from './Portfolio';
import CoinSelector from './CoinSelector';
import Input from './Input';
import Actions from './Actions';
import Summary from './Summary';
import PriceTable from './PriceTable';

// 1. Style the background of the Trade component
const StyledCard = styled(Card)({
  background: '#f4f4f9',  // A nice off-white color for the background
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Slight shadow for depth
  borderRadius: '12px',  // Rounded edges for aesthetic
  padding: '20px',  // Padding inside the card
  margin: '20px 0'  // Margin outside the card
});

// 2. Style the tables
const StyledTableContainer = styled(Box)({
  background: '#e0e0e0',  // Light grey background for the tables
  borderRadius: '8px',  // Rounded edges
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',  // Slight shadow for depth
  padding: '16px',  // Padding inside the container
  marginBottom: '20px'  // Margin between table containers
});



const coinMappings = {
  'XBT/USD': 'btc',
  'ETH/USD': 'eth',
  'LTC/USD': 'ltc',
  'XRP/USD': 'xrp',
  'BCH/USD': 'bch',
};

const Trade = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const initialPortfolio = {
    balance: 'Loading...',
    coins: {
      btc: 'Loading...',
      eth: 'Loading...',
      ltc: 'Loading...',
      xrp: 'Loading...',
      bch: 'Loading...'
    }
  };
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [selectedCoin, setSelectedCoin] = useState('btc');
  const [tradeAmount, setTradeAmount] = useState('');

  // State to keep track of the current price of the coins
  const [coinPrices, setCoinPrices] = useState({
    btc: 'Loading...',
    eth: 'Loading...',
    ltc: 'Loading...',
    xrp: 'Loading...',
    bch: 'Loading...'
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch portfolio data
      fetch(`http://localhost:8000/get_portfolio/${user.sub}`)
        .then(response => response.json())
        .then(data => setPortfolio(data));

      // WebSocket logic to update prices
      const socket = new WebSocket('ws://localhost:8000/ws/prices/');
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data[3] && coinMappings[data[3]]) {
          const coin = coinMappings[data[3]];
          const askPrice = data[1].a[0];
          setCoinPrices(prevPrices => ({
            ...prevPrices,
            [coin]: askPrice
          }));
        }
      };
      return () => {
        socket.close();
      };
    }
  }, [isAuthenticated, user]);

  const handleBuy = () => {
    tradeRequest('buy');
  };

  const handleSell = () => {
    tradeRequest('sell');
  };

  const tradeRequest = (tradeType) => {
    fetch(`http://localhost:8000/trade/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.sub,
        coin: selectedCoin,
        amount: tradeAmount,
        trade_type: tradeType,
        agreed_price: coinPrices[selectedCoin]  // Send the agreed price
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Trade executed successfully.');
          fetch(`http://localhost:8000/get_portfolio/${user.sub}`)
            .then(response => response.json())
            .then(data => setPortfolio(data));
        } else {
          alert('Trade execution failed.');
        }
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }




  return (
    isAuthenticated && (
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6}>
              <StyledTableContainer>
                <Portfolio user={user} portfolio={portfolio} />
                <Summary portfolio={portfolio} coinPrices={coinPrices} />
              </StyledTableContainer>
            </Grid>
            <Grid item xs={6}>
              <StyledTableContainer>
                <PriceTable coinPrices={coinPrices} />
              </StyledTableContainer>
            </Grid>
          </Grid>

          {/* Coin Selection and Trade Actions */}
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <CoinSelector selectedCoin={selectedCoin} onSelectCoin={setSelectedCoin} />
            </Grid>
            <Grid item>
              <Input
                tradeAmount={tradeAmount}
                onAmountChange={e => {
                  if (e.target.value === '' || !isNaN(e.target.value)) {
                    setTradeAmount(e.target.value);
                  }
                }}
                expectedAmount={tradeAmount * (coinPrices[selectedCoin] || 0)}
              />
            </Grid>
            <Grid item>
              <Actions onBuy={handleBuy} onSell={handleSell} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    )
  );



};

export default Trade;
