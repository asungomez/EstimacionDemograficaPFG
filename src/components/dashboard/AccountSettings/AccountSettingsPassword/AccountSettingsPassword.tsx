import {
  EuiButton,
  EuiDescribedFormGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import AccountSettingsPasswordForm from './AccountSettingsPasswordForm/AccountSettingsPasswordForm';

export type AccountSettingsPasswordProps = {
  onSuccess: (message: string) => void;
};

const AccountSettingsPassword: React.FC<AccountSettingsPasswordProps> = ({
  onSuccess,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <EuiDescribedFormGroup
      title={<h3>Contraseña</h3>}
      description={
        <EuiText>
          Tu contraseña sirve para verificar que eres tú. Debe cumplir unos
          requisitos mínimos de seguridad.
        </EuiText>
      }
    >
      {editing ? (
        <AccountSettingsPasswordForm
          onClose={() => setEditing(false)}
          onSuccess={onSuccess}
        />
      ) : (
        <EuiFlexGroup direction="row" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={() => setEditing(true)}>
              Modificar contraseña
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </EuiDescribedFormGroup>
  );
};

export default AccountSettingsPassword;
