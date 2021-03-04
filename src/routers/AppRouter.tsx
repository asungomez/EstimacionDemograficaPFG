import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticationLayout from '../components/authentication/AuthenticationLayout/AuthenticationLayout';
import NotFound from '../components/common/NotFound/NotFound';
import DashboardLayout from '../components/dashboard/DashboardLayout/DashboardLayout';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

const AppRouter: React.FC<{}> = () => {
  return (
    <Switch>
      <UnauthenticatedRoute
        path={['/', '/iniciar-sesion', '/registro', '/recuperar-contrasena']}
        exact
      >
        <AuthenticationLayout />
      </UnauthenticatedRoute>
      <AuthenticatedRoute path={['/panel']}>
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
