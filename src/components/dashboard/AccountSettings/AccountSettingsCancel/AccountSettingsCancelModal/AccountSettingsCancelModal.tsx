import { EuiConfirmModal, EuiOverlayMask } from '@elastic/eui';
import React, { useState } from 'react';

import useLogout from '../../../../../hooks/useLogout';
import AuthenticationService from '../../../../../services/AuthenticationService/AuthenticationService';
import EuiError from '../../../../common/eui/EuiError';

export type AccountSettingsCancelModalProps = {
  onClose: () => void;
};

const AccountSettingsCancelModal: React.FC<AccountSettingsCancelModalProps> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const logout = useLogout();

  const cancelAccount = () => {
    setError(null);
    setLoading(true);
    AuthenticationService.cancelAccount()
      .then(() => {
        setLoading(false);
        logout();
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };
  return (
    <EuiOverlayMask>
      <EuiConfirmModal
        title="¿Seguro que deseas cancelar tu cuenta?"
        onCancel={onClose}
        onConfirm={cancelAccount}
        cancelButtonText="No, volver atrás"
        confirmButtonText="Sí, cancelar mi cuenta"
        buttonColor="danger"
        defaultFocusedButton="confirm"
        confirmButtonDisabled={loading}
      >
        <p>
          Si cancelas tu cuenta, toda la información asociada a ella se perderá.
        </p>
        <p>Esta operación no se puede deshacer.</p>
        {error && <EuiError error={error} />}
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};

export default AccountSettingsCancelModal;
