import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthenticationContext } from './contexts/AuthenticationContext';
import { User } from './models/User';
import AppRouter from './routers/AppRouter';
import AuthenticationService from './services/AuthenticationService/AuthenticationService';

const App: React.FC<{}> = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    AuthenticationService.checkAuthentication()
      .then(() => {
        AuthenticationService.getUserAttributes().then(authenticatedUser => {
          setUser(authenticatedUser);
          userHasAuthenticated(true);
          setIsAuthenticating(false);
        });
      })
      .catch(() => {
        setIsAuthenticating(false);
      });
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, userHasAuthenticated, user, setUser }}
      >
        {!isAuthenticating && <AppRouter />}
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
};

export default App;
