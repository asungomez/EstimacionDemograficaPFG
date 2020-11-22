import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticationLayout from '../components/authentication/AuthenticationLayout/AuthenticationLayout';
import DashboardLayout from '../components/dashboard/DashboardLayout/DashboardLayout';
import ErrorView from '../components/other/ErrorView/ErrorView';
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
        <ErrorView />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRouter;
