import { EuiPage } from '@elastic/eui';
import React from 'react';

import Header from './Header/Header';

const DashboardLayout: React.FC<{}> = () => (
  <div>
    <header>
      <Header />
    </header>
    <EuiPage>Dashboard</EuiPage>
  </div>
);

export default DashboardLayout;
