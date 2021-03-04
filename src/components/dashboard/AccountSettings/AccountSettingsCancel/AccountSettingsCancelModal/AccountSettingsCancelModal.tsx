import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
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
      <EuiModal onClose={onClose}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            ¿Seguro que deseas cancelar tu cuenta?
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiText>
            Si cancelas tu cuenta, toda la información asociada a ella se
            perderá.
          </EuiText>
          <EuiText>Esta operación no se puede deshacer.</EuiText>
          {error && <EuiError error={error} />}
          <EuiSpacer />
        </EuiModalBody>
        <EuiModalFooter>
          <EuiFlexGroup
            direction="row"
            alignItems="center"
            justifyContent="flexEnd"
          >
            <EuiFlexItem grow={false}>
              <EuiButton isDisabled={loading} onClick={onClose}>
                No, volver atrás
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton
                color="danger"
                isLoading={loading}
                onClick={cancelAccount}
              >
                Sí, cancelar mi cuenta
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};

export default AccountSettingsCancelModal;
