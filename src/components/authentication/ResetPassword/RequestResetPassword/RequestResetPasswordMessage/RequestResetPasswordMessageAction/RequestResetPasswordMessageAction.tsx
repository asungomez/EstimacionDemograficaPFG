import { EuiButton } from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthenticationService from '../../../../../../services/AuthenticationService/AuthenticationService';

export type RequestResetPasswordMessageActionType =
  | 'resendConfirmationMail'
  | 'register';

type RequestResetPasswordMessageActionDescription = {
  [action in RequestResetPasswordMessageActionType]: {
    icon: string;
    action: () => void;
    text: string;
  };
};

export type RequestResetPasswordMessageActionProps = {
  type: RequestResetPasswordMessageActionType;
  email?: string;
  color: 'primary' | 'success' | 'warning' | 'danger';
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
};

const mapColor = (
  color: 'primary' | 'success' | 'warning' | 'danger'
): 'primary' | 'text' | 'warning' | 'danger' =>
  color === 'success' ? 'text' : color;

const RequestResetPasswordMessageAction: React.FC<RequestResetPasswordMessageActionProps> = ({
  type,
  email,
  onError,
  onSuccess,
  color,
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const resendConfirmationEmail = () => {
    if (email) {
      setLoading(true);
      AuthenticationService.resendConfirmationMessage(email)
        .then(() => {
          setLoading(false);
          onSuccess(
            'Mensaje enviado con éxito, consulta tu bandeja de entrada'
          );
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'AlreadyConfirmed') {
            onSuccess(error.message);
          } else {
            onError(error.message);
          }
        });
    } else {
      onError('No se pudo enviar el mensaje');
    }
  };

  const goToSignUp = () => history.push('/registro');

  const actions: RequestResetPasswordMessageActionDescription = {
    resendConfirmationMail: {
      icon: 'refresh',
      action: resendConfirmationEmail,
      text: 'Enviar de nuevo',
    },
    register: {
      icon: 'user',
      action: goToSignUp,
      text: 'Crear nueva cuenta',
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

export default RequestResetPasswordMessageAction;
