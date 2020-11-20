import {
  EuiCallOut,
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

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
  const location = useLocation();
  const message = new URLSearchParams(location.search).get('message');

  const submit = (values: LogInFormValues) => {};

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
              {!!message && (
                <>
                  <LogInMessage type={message as LogInMessageType} />
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
            </EuiForm>
          )}
        </Formik>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default LogIn;
