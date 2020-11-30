import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';

import AccountSettingsUserAttributes from './AccountSettingsUserAttributes/AccountSettingsUserAttributes';

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
      <EuiFlexGroup direction="column" responsive={false}>
        <EuiSpacer />
        <EuiFlexItem grow={false}>
          <AccountSettingsUserAttributes />
        </EuiFlexItem>
        <EuiHorizontalRule />
      </EuiFlexGroup>
    </>
  );
};

export default AccountSettings;
