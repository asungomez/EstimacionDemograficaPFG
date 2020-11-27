import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import SetNewPasswordMessageAction, {
  SetNewPasswordMessageActionType,
} from './SetNewPasswordMessageAction/SetNewPasswordMessageAction';

export type SetNewPasswordMessageType = 'expiredCode';

type SetNewPasswordMessageDefinition = {
  [type in SetNewPasswordMessageType]: {
    title: string;
    description: string;
    color: 'primary' | 'success' | 'warning' | 'danger';
    action?: SetNewPasswordMessageActionType;
  };
};

const messageDefinition: SetNewPasswordMessageDefinition = {
  expiredCode: {
    title: 'Enlace inválido',
    description:
      'El enlace de restauración de contraseña ha caducado. Para volver a intentarlo, podemos enviarte un enlace nuevo a tu correo electrónico',
    color: 'danger',
    action: 'resendPasswordEmail',
  },
};

export type SetNewPasswordMessageProps = {
  type: SetNewPasswordMessageType;
  email?: string;
};

const SetNewPasswordMessage: React.FC<SetNewPasswordMessageProps> = ({
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
                  <SetNewPasswordMessageAction
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

export default SetNewPasswordMessage;
