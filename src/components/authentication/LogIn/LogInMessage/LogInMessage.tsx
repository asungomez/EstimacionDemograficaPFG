import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React from 'react';

import LogInMessageAction, {
  LogInMessageActionType,
} from './LogInMessageAction/LogInMessageAction';

export type LogInMessageType = 'confirmed';

type LogInMessageDefinition = {
  [type in LogInMessageType]: {
    title: string;
    description: string;
    color: 'primary' | 'success' | 'warning' | 'danger';
    action?: LogInMessageActionType;
  };
};

const messageDefinition: LogInMessageDefinition = {
  confirmed: {
    title: 'Comprueba tu bandeja de entrada',
    description: 'Te hemos enviado un enlace de confirmación',
    color: 'primary',
    action: 'resendConfirmationMail',
  },
};

export type LogInMessageProps = {
  type: LogInMessageType;
};

const LogInMessage: React.FC<LogInMessageProps> = ({ type }) => {
  return (
    <EuiCallOut
      title={messageDefinition[type].title}
      color={messageDefinition[type].color}
    >
      <EuiText>{messageDefinition[type].description}</EuiText>

      {messageDefinition[type].action && (
        <>
          <EuiSpacer />
          <EuiFlexGroup direction="row" justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <LogInMessageAction type={messageDefinition[type].action} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </>
      )}
    </EuiCallOut>
  );
};

export default LogInMessage;
