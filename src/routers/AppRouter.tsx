import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticationLayout from '../components/authentication/AuthenticationLayout/AuthenticationLayout';
import DashboardLayout from '../components/dashboard/DashboardLayout/DashboardLayout';
import NotFound from '../components/other/NotFound/NotFound';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

const AppRouter: React.FC<{}> = () => {
  return (
    <Switch>
      <UnauthenticatedRoute
        path={['/', '/iniciar-sesion', '/registro', '/reset-password']}
        exact
      >
        <AuthenticationLayout />
      </UnauthenticatedRoute>
      <AuthenticatedRoute path={['/console']}>
        <DashboardLayout />
      </AuthenticatedRoute>
      <Route path="/error">
        <AuthenticationLayout error={true} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRouter;
