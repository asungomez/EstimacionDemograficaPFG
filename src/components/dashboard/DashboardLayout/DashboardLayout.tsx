import { EuiPage } from '@elastic/eui';
import React from 'react';

import DashboardRouter from '../../../routers/DashboardRouter';
import Header from './Header/Header';

const DashboardLayout: React.FC<{}> = () => (
  <div>
    <header>
      <Header />
    </header>
    <EuiPage>
      <DashboardRouter />
    </EuiPage>
  </div>
);

export default DashboardLayout;
