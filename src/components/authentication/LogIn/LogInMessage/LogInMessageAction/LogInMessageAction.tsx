import { EuiButton } from '@elastic/eui';
import React, { useState } from 'react';

import AuthenticationService from '../../../../../services/AuthenticationService';

export type LogInMessageActionType = 'resendConfirmationMail';

type LogInMessageActionDescription = {
  [action in LogInMessageActionType]: {
    icon: string;
    action: () => void;
    text: string;
  };
};

export type LogInMessageActionProps = {
  type: LogInMessageActionType;
  email?: string;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
};

const LogInMessageAction: React.FC<LogInMessageActionProps> = ({
  type,
  email,
  onError,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
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

  const actions: LogInMessageActionDescription = {
    resendConfirmationMail: {
      icon: 'refresh',
      action: resendConfirmationEmail,
      text: 'Enviar de nuevo',
    },
  };

  return (
    <EuiButton
      iconType={actions[type].icon}
      onClick={actions[type].action}
      isLoading={loading}
    >
      {actions[type].text}
    </EuiButton>
  );
};

export default LogInMessageAction;
