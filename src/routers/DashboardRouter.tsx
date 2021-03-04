import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';

import AccountSettings from '../components/dashboard/AccountSettings/AccountSettings';
import Home from '../components/dashboard/Home/Home';
import DataSetsRouter from './DataSetsRouter';

const DashboardRouter: React.FC<RouteComponentProps<{}>> = ({ match }) => {
  const { url } = match;
  return (
    <Switch>
      <Route exact path={url + '/cuenta'} component={AccountSettings} />
      <Route path={url + '/datos'} component={DataSetsRouter} />
      <Route exact path={url} component={Home} />
    </Switch>
  );
};

export default withRouter(DashboardRouter);
