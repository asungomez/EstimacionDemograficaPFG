import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthenticationContext } from '../contexts/AuthenticationContext';

const UnauthenticatedRoute: React.FC<any> = ({ children, ...routeProps }) => {
  const { isAuthenticated } = useAuthenticationContext();
  return (
    <Route {...routeProps}>
      {!isAuthenticated ? children : <Redirect to="/dashboard" />}
    </Route>
  );
};

export default UnauthenticatedRoute;
