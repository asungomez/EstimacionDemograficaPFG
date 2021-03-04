import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiGlobalToastList,
  EuiHorizontalRule,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import React, { useState } from 'react';

import AccountSettingsCancel from './AccountSettingsCancel/AccountSettingsCancel';
import AccountSettingsPassword from './AccountSettingsPassword/AccountSettingsPassword';
import AccountSettingsUserAttributes from './AccountSettingsUserAttributes/AccountSettingsUserAttributes';

const AccountSettings: React.FC<{}> = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (text: string, color: 'success' | 'danger') => {
    setToasts(toasts =>
      toasts.concat([
        {
          id: '' + toasts.length,
          title: text,
          color: color,
        },
      ])
    );
  };

  const removeToast = (removedToast: Toast) => {
    setToasts(toasts => toasts.filter(toast => toast.id !== removedToast.id));
  };

  const successMessage = (message: string) => addToast(message, 'success');

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
          <AccountSettingsUserAttributes onSuccess={successMessage} />
        </EuiFlexItem>
        <EuiHorizontalRule />
      </EuiFlexGroup>
      <EuiFlexGroup direction="column" responsive={false}>
        <EuiSpacer />
        <EuiFlexItem grow={false}>
          <AccountSettingsPassword onSuccess={successMessage} />
        </EuiFlexItem>
        <EuiHorizontalRule />
      </EuiFlexGroup>
      <EuiFlexGroup direction="column" responsive={false}>
        <EuiSpacer />
        <EuiFlexItem grow={false}>
          <AccountSettingsCancel />
        </EuiFlexItem>
        <EuiHorizontalRule />
      </EuiFlexGroup>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </>
  );
};

export default AccountSettings;
