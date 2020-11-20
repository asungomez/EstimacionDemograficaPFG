import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/authentication/LogIn/LogIn';
import ResetPassword from '../components/authentication/ResetPassword/ResetPassword';
import SignUp from '../components/authentication/SignUp/SignUp';

const AuthenticationRouter: React.FC<{}> = () => {
  return (
    <Switch>
      <Route path={['/', '/login']} exact component={Login} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/sign-up" component={SignUp} />
    </Switch>
  );
};

export default AuthenticationRouter;
