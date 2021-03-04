import { EuiButton } from '@elastic/eui';
import React, { useState } from 'react';

import AuthenticationService from '../../../../../../services/AuthenticationService/AuthenticationService';

export type SetNewPasswordMessageActionType = 'resendPasswordEmail';

type SetNewPasswordMessageActionDescription = {
  [action in SetNewPasswordMessageActionType]: {
    icon: string;
    action: () => void;
    text: string;
  };
};

export type SetNewPasswordMessageActionProps = {
  type: SetNewPasswordMessageActionType;
  email?: string;
  color: 'primary' | 'success' | 'warning' | 'danger';
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
};

const mapColor = (
  color: 'primary' | 'success' | 'warning' | 'danger'
): 'primary' | 'text' | 'warning' | 'danger' =>
  color === 'success' ? 'text' : color;

const SetNewPasswordMessageAction: React.FC<SetNewPasswordMessageActionProps> = ({
  type,
  email,
  onError,
  onSuccess,
  color,
}) => {
  const [loading, setLoading] = useState(false);

  const resendPasswordEmail = () => {
    if (email) {
      setLoading(true);
      AuthenticationService.requestResetPassword(email)
        .then(() => {
          setLoading(false);
          onSuccess(
            'Mensaje enviado con éxito, consulta tu bandeja de entrada'
          );
        })
        .catch(error => {
          setLoading(false);
          onError(error.message);
        });
    } else {
      onError('No se pudo enviar el mensaje');
    }
  };

  const actions: SetNewPasswordMessageActionDescription = {
    resendPasswordEmail: {
      icon: 'refresh',
      action: resendPasswordEmail,
      text: 'Enviar de nuevo',
    },
  };

  return (
    <EuiButton
      iconType={actions[type].icon}
      onClick={actions[type].action}
      isLoading={loading}
      color={mapColor(color)}
    >
      {actions[type].text}
    </EuiButton>
  );
};

export default SetNewPasswordMessageAction;
