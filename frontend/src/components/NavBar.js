import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth0 } from '@auth0/auth0-react';
import { grey, red } from '@mui/material/colors';

const StyledAppBar = styled(AppBar)({
  background: grey[800],
  position: 'sticky',
  top: 0,
  transition: '0.3s',
});

const StyledButton = styled(Button)({
  color: 'white',
  marginRight: '15px',
  borderColor: 'white',
  '&:hover': {
    color: grey[300],
    borderColor: grey[300],
  },
});

const LogoutButton = styled(Button)({
  color: 'white',
  borderColor: 'white',
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
});

const StyledNavLink = styled(NavLink)({
  textDecoration: 'none',
  '&.active': {
    fontWeight: 'bold',
  },
});

const Navbar = () => {
  const { user, logout } = useAuth0();

  return (
    <StyledAppBar elevation={0}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Avatar src={user?.picture} alt={user?.name} sx={{ mr: 2 }} />
          <Typography variant="h5" component="div" sx={{ mr: 2 }}>
            {user?.name}
          </Typography>
          <Typography variant="h6" component="div">
            My Crypto App
          </Typography>
        </Box>
        <StyledButton component={StyledNavLink} to="/home" variant="outlined">Home</StyledButton>
        <StyledButton component={StyledNavLink} to="/prices" variant="outlined">Prices</StyledButton>
        <StyledButton component={StyledNavLink} to="/account" variant="outlined">Account</StyledButton>
        <StyledButton component={StyledNavLink} to="/trade" variant="outlined">Trade</StyledButton>
        <Box sx={{ ml: 2 }}>
          <LogoutButton variant="outlined" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </LogoutButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
