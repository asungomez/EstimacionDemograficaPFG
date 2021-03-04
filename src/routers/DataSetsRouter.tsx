import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';

import CreateDataSet from '../components/dashboard/datasets/CreateDataSet/CreateDataSet';
import DataSetsList from '../components/dashboard/datasets/DataSetsList/DataSetsList';

const DataSetsRouter: React.FC<RouteComponentProps<{}>> = ({ match }) => {
  const { url } = match;
  return (
    <Switch>
      <Route exact path={url} component={DataSetsList} />
      <Route exact path={url + '/crear'} component={CreateDataSet} />
    </Switch>
  );
};

export default withRouter(DataSetsRouter);
