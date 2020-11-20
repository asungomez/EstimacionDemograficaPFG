import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthenticationContext } from './contexts/AuthenticationContext';
import AppRouter from './routers/AppRouter';

const App: React.FC<{}> = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  return (
    <BrowserRouter>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, userHasAuthenticated, user, setUser }}
      >
        <AppRouter />
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
};

export default App;
