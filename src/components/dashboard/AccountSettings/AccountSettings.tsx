import { EuiPageContentHeaderSection, EuiPageHeader, EuiTitle } from '@elastic/eui';
import React from 'react';

const AccountSettings: React.FC<{}> = () => {
  return (
    <>
      <EuiPageHeader responsive className="dashboard-header">
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Perfil</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageHeader>
    </>
  );
};

export default AccountSettings;
