import {
  EuiButton,
  EuiButtonEmpty,
  EuiCallOut,
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
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import AuthenticationService from '../../../../services/AuthenticationService/AuthenticationService';
import EuiCustomLink from '../../../common/eui/EuiCustomLink';
import RequestResetPasswordMessage, {
  RequestResetPasswordMessageType,
} from './RequestResetPasswordMessage/RequestResetPasswordMessage';

export type RequestResetPasswordFormValues = {
  email: string;
};

const initialValues: RequestResetPasswordFormValues = {
  email: '',
};

const schema: Yup.ObjectSchema<RequestResetPasswordFormValues> = Yup.object().shape(
  {
    email: Yup.string()
      .required('Introduce tu email')
      .email('No es una dirección de email válida'),
  }
);

const RequestResetPassword: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>(null);
  const [message, setMessage] = useState<RequestResetPasswordMessageType>(null);
  const [email, setEmail] = useState('');
  const history = useHistory();

  const submit = ({ email }: RequestResetPasswordFormValues) => {
    setSubmitting(true);
    setError(null);
    setMessage(null);

    AuthenticationService.requestResetPassword(email)
      .then(() => {
        setSubmitting(false);
        history.push(
          '/iniciar-sesion?message=resetPasswordRequested&email=' + email
        );
      })
      .catch(error => {
        if (error.code === 'UserNotFoundException') {
          setMessage('notRegistered');
        } else if (error.code === 'UserNotConfirmedException') {
          setMessage('needsConfirmation');
        } else {
          setError(error.message);
        }
        setSubmitting(false);
      });
  };

  const changeEmail = (
    event: React.ChangeEvent<any>,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    setEmail(event.target.value);
    handleChange(event);
  };

  return (
    <EuiFlexGroup direction="column" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiText size="m" textAlign="center">
          <EuiTitle size="m">
            <h2>Restaurar contraseña</h2>
          </EuiTitle>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submit}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => (
            <EuiForm component="form" onSubmit={handleSubmit}>
              <EuiText size="s">
                Escribe tu dirección de correo electrónico. Te enviaremos un
                mensaje con instrucciones para restaurar tu contraseña.
              </EuiText>
              <EuiSpacer />
              {!!error && (
                <>
                  <EuiCallOut color="danger" title="Ha habido un error">
                    {error}
                  </EuiCallOut>
                  <EuiSpacer />
                </>
              )}
              {!error && message && (
                <>
                  <RequestResetPasswordMessage type={message} email={email} />
                  <EuiSpacer />
                </>
              )}
              <EuiFormRow
                label="Email"
                isInvalid={errors.email && touched.email}
                error={errors.email}
                fullWidth
              >
                <EuiFieldText
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={e => changeEmail(e, handleChange)}
                  icon="email"
                  fullWidth
                />
              </EuiFormRow>
              <EuiSpacer />
              <EuiFlexGroup direction="row">
                <EuiFlexItem>
                  <EuiButton
                    type="submit"
                    color="primary"
                    fill
                    isLoading={submitting}
                    fullWidth
                  >
                    Restaurar contraseña
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCustomLink to="/iniciar-sesion">
                    <EuiButtonEmpty>Cancelar</EuiButtonEmpty>
                  </EuiCustomLink>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiForm>
          )}
        </Formik>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default RequestResetPassword;
