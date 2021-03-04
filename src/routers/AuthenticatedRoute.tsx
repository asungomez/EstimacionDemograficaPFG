import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { useAuthenticationContext } from '../contexts/AuthenticationContext';

const AuthenticatedRoute: React.FC<any> = ({ children, ...routeProps }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuthenticationContext();
  return (
    <Route {...routeProps}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={`/iniciar-sesion?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
};

export default AuthenticatedRoute;
