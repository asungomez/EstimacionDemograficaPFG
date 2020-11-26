import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import RequestResetPasswordMessageAction, {
  RequestResetPasswordMessageActionType,
} from './RequestResetPasswordMessageAction/RequestResetPasswordMessageAction';

export type RequestResetPasswordMessageType =
  | 'notRegistered'
  | 'needsConfirmation';

type RequestResetPasswordMessageDefinition = {
  [type in RequestResetPasswordMessageType]: {
    title: string;
    description: string;
    color: 'primary' | 'success' | 'warning' | 'danger';
    action?: RequestResetPasswordMessageActionType;
  };
};

const messageDefinition: RequestResetPasswordMessageDefinition = {
  notRegistered: {
    title: 'Usuario no registrado',
    description:
      'Puedes crear una cuenta usando esta dirección de correo electrónico',
    color: 'danger',
    action: 'register',
  },
  needsConfirmation: {
    title: 'Esta cuenta no está confirmada',
    description:
      'Haz click en el enlace de confirmación que te enviamos por correo electrónico. Si no lo has recibido, podemos enviártelo otra vez',
    color: 'danger',
    action: 'resendConfirmationMail',
  },
};

export type RequestResetPasswordMessageProps = {
  type: RequestResetPasswordMessageType;
  email?: string;
};

const RequestResetPasswordMessage: React.FC<RequestResetPasswordMessageProps> = ({
  type,
  email,
}) => {
  const [error, setError] = useState<string>(null);
  const [success, setSuccess] = useState<string>(null);

  return (
    <EuiCallOut
      title={error ? error : success ? success : messageDefinition[type].title}
      color={
        error ? 'danger' : success ? 'success' : messageDefinition[type].color
      }
      iconType={error ? 'alert' : success ? 'check' : null}
    >
      {!error && !success && (
        <>
          <EuiText>{messageDefinition[type].description}</EuiText>

          {messageDefinition[type].action && (
            <>
              <EuiSpacer />
              <EuiFlexGroup direction="row" justifyContent="flexEnd">
                <EuiFlexItem grow={false}>
                  <RequestResetPasswordMessageAction
                    type={messageDefinition[type].action}
                    email={email}
                    onError={setError}
                    onSuccess={setSuccess}
                    color={
                      error
                        ? 'danger'
                        : success
                        ? 'success'
                        : messageDefinition[type].color
                    }
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </>
          )}
        </>
      )}
    </EuiCallOut>
  );
};

export default RequestResetPasswordMessage;
