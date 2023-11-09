// HomePage.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { blue } from '@mui/material/colors';

const HomePage = () => {
  const HighlightedText = styled(Typography)({
    color: blue[500],
    fontWeight: 'bold',
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Container maxWidth="sm">
        <Typography variant="h2" gutterBottom>
          <HighlightedText>Welcome Home!</HighlightedText>
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is your dashboard. Here you can view real-time cryptocurrency prices,
          make trades, participate in competitions, and more.
        </Typography>
      </Container>
    </Box>
  );
};

export default HomePage;