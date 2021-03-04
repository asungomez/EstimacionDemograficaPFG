import './DashboardLayout.scss';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
} from '@elastic/eui';
import React from 'react';

import DashboardRouter from '../../../routers/DashboardRouter';
import Header from './Header/Header';
import SideNav from './SideNav/SideNav';

const DashboardLayout: React.FC<{}> = () => (
  <div>
    <header>
      <Header />
    </header>
    <EuiPage className="dashboard-wrapper">
      <div className="dashboard-sidebar">
        <SideNav />
      </div>
      <div className="dashboard-content">
        <EuiPageBody>
          <EuiPageContent className="dashboard-content-body">
            <EuiPageContentBody>
              <DashboardRouter />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </div>
    </EuiPage>
  </div>
);

export default DashboardLayout;
