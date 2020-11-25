import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AuthenticationService from '../../../services/AuthenticationService';
import EuiCustomLink from '../../common/EuiCustomLink';
import EuiError from '../../common/EuiError';

const ERROR_TYPES = ['confirmacion_fallida', 'usuario_no_existe', 'default'] as const
type ErrorType = typeof ERROR_TYPES[number]

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
  const history = useHistory();
  const message = new URLSearchParams(location.search).get('message');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);

  const resendConfirmationEmail = () => {
    const email = new URLSearchParams(location.search).get('email');
    if (email) {
      setError(null);
      setLoading(true);
      AuthenticationService.resendConfirmationMessage(email)
        .then(() => {
          history.push('/iniciar-sesion?message=registered?email=' + email);
        })
        .catch(error => {
          if (error.code === 'AlreadyConfirmed') {
            history.push('/iniciar-sesion?message=confirmed');
          }
          else {
            setError(error.message);
            setLoading(false);
          }
        });
    } else {
      setError('No se pudo enviar el mensaje de confirmación.');
    }
  };

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
    default: {
      title: 'Ha habido un error',
      description: 'Por favor, inténtalo de nuevo más tarde.',
    }
  };

  let type: ErrorType = 'default';
  ERROR_TYPES.forEach(errorType => {
    if (message === errorType) {
      type = errorType;
    }
  });


  return (
    <EuiFlexGroup direction="column" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiTitle>
          <h2>{errors[type].title}</h2>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText>{errors[type].description}</EuiText>
      </EuiFlexItem>
      {error && (
        <EuiFlexItem grow={false}>
          <EuiError error={error} />
        </EuiFlexItem>
      )}
      {errors[type].action && (
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={() => errors[type].action.callback()}
            isLoading={loading}
          >
            {errors[type].action.name}
          </EuiButton>
        </EuiFlexItem>
      )}
      <EuiFlexItem grow={false}>
        <EuiCustomLink to="/">Volver al inicio</EuiCustomLink>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default ErrorView;
