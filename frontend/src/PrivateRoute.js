import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to="/welcome" replace state={{ from: location }} />;
};

export default PrivateRoute;
