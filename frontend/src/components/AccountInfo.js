import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AccountInfo = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Avatar alt={user.name} src={user.picture} sx={{ width: 80, height: 80, mb: 2 }} />
            <Typography variant="h5" component="div">{user.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{user.email}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Update Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    )
  );
};

export default AccountInfo;
