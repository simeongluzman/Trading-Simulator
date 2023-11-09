// WelcomePage.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const WelcomePage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        Welcome to PaperTrader!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a platform for paper trading cryptocurrencies.
        You can view real-time prices and even simulate trades.
        To get started, please log in.
      </Typography>
      <Button variant="contained" color="primary" onClick={loginWithRedirect}>
        Log In
      </Button>
    </Container>
  );
};

export default WelcomePage;
