import {
  EuiButton,
  EuiButtonEmpty,
  EuiCallOut,
  EuiFieldPassword,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiInputPopover,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { usePasswordContext } from '../../../../contexts/PasswordContext';
import AuthenticationService from '../../../../services/AuthenticationService/AuthenticationService';
import EuiCustomLink from '../../../common/eui/EuiCustomLink';
import PasswordChecker from '../../SignUp/PasswodChecker/PasswordChecker';
import SetNewPasswordMessage, {
  SetNewPasswordMessageType,
} from './SetNewPasswordMessage/SetNewPasswordMessage';

export type SetNewPasswordFormValues = {
  password: string;
};

export type SetNewPasswordProps = {
  email: string;
  code: string;
};

const initialValues: SetNewPasswordFormValues = {
  password: '',
};

const SetNewPassword: React.FC<SetNewPasswordProps> = ({ email, code }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [message, setMessage] = useState<SetNewPasswordMessageType>(null);
  const history = useHistory();
  const { policy } = usePasswordContext();

  const submit = ({ password }: SetNewPasswordFormValues) => {
    closePopover();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    AuthenticationService.resetPassword(email, password, code)
      .then(() => {
        setSubmitting(false);
        history.push('/iniciar-sesion?message=resetPasswordSucceeded');
      })
      .catch(error => {
        if (error.code === 'InvalidCodeException') {
          setMessage('expiredCode');
        } else {
          setError(error.message);
        }
        setSubmitting(false);
      });
  };

  let passwordPolicy = Yup.string().required('Introduce tu contraseña');

  for (const requirement of policy) {
    passwordPolicy = passwordPolicy.matches(
      requirement.rule,
      requirement.error
    );
  }

  const schema: Yup.ObjectSchema<SetNewPasswordFormValues> = Yup.object().shape(
    {
      password: passwordPolicy,
    }
  );

  const openPopover = () => setPopoverOpen(true);
  const closePopover = () => setPopoverOpen(false);

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
          {({
            handleSubmit,
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
          }) => (
            <EuiForm component="form" onSubmit={handleSubmit}>
              <EuiText size="s">Introduce tu nueva contraseña</EuiText>
              <EuiSpacer />
              {!!error && (
                <>
                  <EuiCallOut color="danger" title="Ha habido un error">
                    {error}
                  </EuiCallOut>
                  <EuiSpacer />
                </>
              )}
              {!error && !!message && (
                <>
                  <SetNewPasswordMessage type={message} email={email} />
                  <EuiSpacer />
                </>
              )}
              <EuiFormRow
                label="Contraseña"
                isInvalid={errors.password && touched.password}
                error={errors.password}
                fullWidth
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

export default SetNewPassword;
