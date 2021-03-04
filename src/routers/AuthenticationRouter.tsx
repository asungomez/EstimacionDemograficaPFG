import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/authentication/LogIn/LogIn';
import ResetPassword from '../components/authentication/ResetPassword/ResetPassword';
import SignUp from '../components/authentication/SignUp/SignUp';
import ErrorView from '../components/other/ErrorView/ErrorView';

const AuthenticationRouter: React.FC<{}> = () => {
  return (
    <Switch>
      <Route path={['/', '/iniciar-sesion']} exact component={Login} />
      <Route path="/recuperar-contrasena" component={ResetPassword} />
      <Route path="/error" component={ErrorView} />
      <Route path="/registro" component={SignUp} />
    </Switch>
  );
};

export default AuthenticationRouter;
