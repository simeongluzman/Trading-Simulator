import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CryptoData from './components/CoinData';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import Trade from './components/trade/Trade';
import WelcomePage from './components/WelcomePage';
import PrivateRoute from './PrivateRoute';
import AccountInfo from './components/AccountInfo'; // Import the AccountInfo component
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, grey, red, purple } from '@mui/material/colors';

const RedirectIfAuthenticated = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Navigate to="/home" replace /> : <WelcomePage />;
};

const theme = createTheme({
  palette: {
    background: {
      default: purple[700], // Replace this with the color used in your BitcoinData component
    },
  },
});

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/welcome" element={<RedirectIfAuthenticated />} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/prices" element={<PrivateRoute><CryptoData /></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><AccountInfo /></PrivateRoute>} />
        <Route path="/trade" element={<PrivateRoute><Trade /></PrivateRoute>} />
        <Route path="*" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
