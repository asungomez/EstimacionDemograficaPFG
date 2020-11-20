import { EuiButton } from '@elastic/eui';
import React from 'react';

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
};

const LogInMessageAction: React.FC<LogInMessageActionProps> = ({ type }) => {
  const resendConfirmationEmail = () => {};

  const actions: LogInMessageActionDescription = {
    resendConfirmationMail: {
      icon: 'refresh',
      action: resendConfirmationEmail,
      text: 'Enviar de nuevo',
    },
  };

  return (
    <EuiButton iconType={actions[type].icon} onClick={actions[type].action}>
      {actions[type].text}
    </EuiButton>
  );
};

export default LogInMessageAction;
