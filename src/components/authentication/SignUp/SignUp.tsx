import {
  EuiButton,
  EuiCallOut,
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiInputPopover,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { usePasswordContext } from '../../../contexts/PasswordContext';
import AuthenticationService from '../../../services/AuthenticationService';
import EuiCustomLink from '../../common/EuiCustomLink';
import PasswordChecker from './PasswodChecker/PasswordChecker';

type SignUpFormValues = {
  email: string;
  password: string;
};

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
};

const SignUp: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { policy } = usePasswordContext();
  const history = useHistory();

  let passwordPolicy = Yup.string().required('Password is required');

  for (const requirement of policy) {
    passwordPolicy = passwordPolicy.matches(
      requirement.rule,
      requirement.error
    );
  }

  const schema: Yup.ObjectSchema<SignUpFormValues> = Yup.object().shape({
    password: passwordPolicy,
    email: Yup.string()
      .required('Introduce tu email')
      .email('No es una dirección de email válida'),
  });

  const openPopover = () => setPopoverOpen(true);
  const closePopover = () => setPopoverOpen(false);

  const submit = (values: SignUpFormValues) => {
    setSubmitting(true);
    closePopover();
    AuthenticationService.signUp(values.email, values.password)
      .then(() => {
        history.push('/iniciar-sesion?message=confirmed');
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setSubmitting(false);
      });
  };

  return (
    <EuiFlexGroup direction="column" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiText size="m" textAlign="center">
          <EuiTitle size="m">
            <h2>Crear una cuenta</h2>
          </EuiTitle>
        </EuiText>
      </EuiFlexItem>
      <EuiSpacer size="xs" />
      <EuiFlexItem grow={false}>
        <EuiText size="s" textAlign="center">
          ¿Ya te has registrado?{' '}
          <EuiCustomLink to="/iniciar-sesion">Inicia sesión</EuiCustomLink>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={submit}
        >
          {({
            handleSubmit,
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
          }) => (
            <EuiForm component="form" onSubmit={handleSubmit}>
              {!!error && (
                <>
                  <EuiCallOut color="danger" title="Ha habido un error">
                    {error}
                  </EuiCallOut>
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
                <EuiInputPopover
                  isOpen={popoverOpen}
                  closePopover={closePopover}
                  input={
                    <EuiFieldPassword
                      name="password"
                      type="dual"
                      value={values.password}
                      onChange={handleChange}
                      onFocus={openPopover}
                      onBlur={e => {
                        closePopover();
                        handleBlur(e);
                      }}
                    />
                  }
                >
                  <PasswordChecker password={values.password} />
                </EuiInputPopover>
              </EuiFormRow>
              <EuiSpacer size="xl" />
              <EuiFormRow>
                <EuiButton
                  type="submit"
                  color="primary"
                  fill
                  isLoading={submitting}
                  fullWidth
                >
                  Crear cuenta
                </EuiButton>
              </EuiFormRow>
              <EuiFormRow>
                <EuiText color="subdued" size="s">
                  Al registrarte, confirmas haber leído y aceptado nuestros{' '}
                  <EuiLink
                    href="https://descargas.uned.es/publico/pdf/Politica_privacidad_UNED.pdf"
                    target="blank"
                  >
                    Términos de Servicio
                  </EuiLink>
                  .
                </EuiText>
              </EuiFormRow>
            </EuiForm>
          )}
        </Formik>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default SignUp;