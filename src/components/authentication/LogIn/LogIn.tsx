import {
  EuiButton,
  EuiButtonEmpty,
  EuiCallOut,
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiHorizontalRule,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import useLogin from '../../../hooks/useLogin';
import AuthenticationService from '../../../services/AuthenticationService';
import EuiCustomLink from '../../common/EuiCustomLink';
import LogInMessage, { LogInMessageType } from './LogInMessage/LogInMessage';

type LogInFormValues = {
  email: string;
  password: string;
};

const initialValues: LogInFormValues = {
  email: '',
  password: '',
};

const schema: Yup.ObjectSchema<LogInFormValues> = Yup.object().shape({
  password: Yup.string().required('Introduce tu contraseña'),
  email: Yup.string()
    .required('Introduce tu email')
    .email('No es una dirección de email válida'),
});

const LogIn: React.FC<{}> = () => {
  const [error, setError] = useState<string>(null);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const [message, setMessage] = useState<LogInMessageType>(
    new URLSearchParams(location.search).get('message') as LogInMessageType
  );
  const email = new URLSearchParams(location.search).get('email');
  const logIn = useLogin('/dashboard');

  const submit = (values: LogInFormValues) => {
    setError(null);
    setSubmitting(true);
    setMessage(null);
    AuthenticationService.logIn(values.email, values.password)
      .then(() => {
        setSubmitting(false);
        logIn();
      })
      .catch(error => {
        if (error.code === 'UserNotConfirmedException') {
          setMessage('needsConfirmation');
        } else if (error.code === 'UserNotFoundException') {
          setMessage('notExistent');
        } else {
          setError(error.message);
        }
        setSubmitting(false);
      });
  };

  return (
    <EuiFlexGroup direction="column" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiText size="m" textAlign="center">
          <EuiTitle size="m">
            <h2>Iniciar sesión</h2>
          </EuiTitle>
        </EuiText>
      </EuiFlexItem>
      <EuiSpacer size="xs" />
      <EuiFlexItem grow={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submit}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => (
            <EuiForm component="form" onSubmit={handleSubmit}>
              {!!error && (
                <>
                  <EuiCallOut color="danger" title="Ha habido un error">
                    {error}
                  </EuiCallOut>
                  <EuiSpacer />
                </>
              )}
              {!!message && !error && (
                <>
                  <LogInMessage
                    type={message as LogInMessageType}
                    email={email}
                  />
                  <EuiSpacer />
                </>
              )}
              <EuiFormRow
                label="Email"
                isInvalid={errors.email && touched.email}
                error={errors.email}
              >
                <EuiFieldText
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  icon="email"
                />
              </EuiFormRow>
              <EuiFormRow
                label="Contraseña"
                isInvalid={errors.password && touched.password}
                error={errors.password}
              >
                <EuiFieldPassword
                  name="password"
                  type="dual"
                  value={values.password}
                  onChange={handleChange}
                />
              </EuiFormRow>
              <EuiSpacer size="xl" />
              <EuiFormRow>
                <EuiFlexGroup direction="row">
                  <EuiFlexItem>
                    <EuiButton
                      type="submit"
                      color="primary"
                      fill
                      isLoading={submitting}
                      fullWidth
                    >
                      Iniciar sesión
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiCustomLink to="/recuperar-contrasena">
                      <EuiButtonEmpty type="submit" color="primary">
                        Olvidé mi contraseña
                      </EuiButtonEmpty>
                    </EuiCustomLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
              <EuiHorizontalRule />
              <EuiText textAlign="center">
                ¿No tienes cuenta aún?{' '}
                <EuiCustomLink to="/registro">Regístrate</EuiCustomLink>
              </EuiText>
            </EuiForm>
          )}
        </Formik>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default LogIn;
