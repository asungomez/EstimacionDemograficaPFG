import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { string } from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EuiCustomLink from '../../common/EuiCustomLink';

import EuiError from '../../common/EuiError';

type ErrorType = 'confirmacion_fallida' | 'usuario_no_existe';

type ErrorDescription = {
  title: string;
  description: string;
  action?: {
    name: string;
    callback: () => void;
  };
};

const ErrorView: React.FC<{}> = () => {
  const location = useLocation();
  const message = new URLSearchParams(location.search).get('message');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);

  const resendConfirmationEmail = () => {};

  const errors: { [type in ErrorType]: ErrorDescription } = {
    confirmacion_fallida: {
      title: 'No ha sido posible confirmar tu cuenta',
      description:
        'Es posible que el enlace de confirmación haya caducado. Para solucionarlo, podemos enviarte un nuevo mensaje de confirmación con un enlace válido.',
      action: {
        name: 'Reenviar mensaje',
        callback: resendConfirmationEmail,
      },
    },
    usuario_no_existe: {
      title: 'Usuario no encontrado',
      description: 'El usuario especificado no existe.',
    },
  };

  let messageDescription: ErrorDescription = {
    title: 'Ha habido un error',
    description: 'Por favor, inténtalo de nuevo más tarde.',
  };

  if (message && errors.hasOwnProperty(message)) {
    messageDescription = errors[message as ErrorType];
  }

  return (
    <EuiFlexGroup direction="column" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiTitle>
          <h2>{messageDescription.title}</h2>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText>{messageDescription.description}</EuiText>
      </EuiFlexItem>
      {error && (
        <EuiFlexItem grow={false}>
          <EuiError error={error} />
        </EuiFlexItem>
      )}
      {messageDescription.action && (
        <EuiFlexItem grow={false}>
          <EuiButton onClick={messageDescription.action.callback}>
            {messageDescription.action.name}
          </EuiButton>
        </EuiFlexItem>
      )}
      <EuiFlexItem grow={false}>
        <EuiCustomLink to="/">
          Volver al inicio
        </EuiCustomLink>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default ErrorView;
