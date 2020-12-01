import {
  EuiButton,
  EuiDescribedFormGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import AccountSettingsCancelModal from './AccountSettingsCancelModal/AccountSettingsCancelModal';

const AccountSettingsCancel: React.FC<{}> = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <EuiDescribedFormGroup
        title={<h3>Cancelar cuenta</h3>}
        description={
          <EuiText>Si cancelas tu cuenta, todos tus datos se perderán.</EuiText>
        }
      >
        <EuiFlexGroup direction="row">
          <EuiFlexItem grow={false}>
            <EuiButton fill color="danger" onClick={() => setOpenModal(true)}>
              Cancelar cuenta
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiDescribedFormGroup>
      {openModal && <AccountSettingsCancelModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default AccountSettingsCancel;
