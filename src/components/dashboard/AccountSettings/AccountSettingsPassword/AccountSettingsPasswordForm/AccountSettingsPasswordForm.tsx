import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldPassword,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiInputPopover,
  EuiSpacer,
} from '@elastic/eui';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { usePasswordContext } from '../../../../../contexts/PasswordContext';
import AuthenticationService from '../../../../../services/AuthenticationService/AuthenticationService';
import PasswordChecker from '../../../../authentication/SignUp/PasswodChecker/PasswordChecker';
import EuiError from '../../../../common/eui/EuiError';

export type AccountSettingsPasswordFormProps = {
  onClose: () => void;
  onSuccess: (message: string) => void;
};

type AccountSettingsPasswordFields = 'currentPassword' | 'newPassword';

export type AccountSettingsPasswordValues = {
  [field in AccountSettingsPasswordFields]: string;
};

const initialValues: AccountSettingsPasswordValues = {
  currentPassword: '',
  newPassword: '',
};

const AccountSettingsPasswordForm: React.FC<AccountSettingsPasswordFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const { policy } = usePasswordContext();
  const [popoverOpen, setPopoverOpen] = useState(false);

  let passwordPolicy = Yup.string().required(
    'Debes introducir la nueva contraseña'
  );

  for (const requirement of policy) {
    passwordPolicy = passwordPolicy.matches(
      requirement.rule,
      requirement.error
    );
  }

  const schema: Yup.ObjectSchema<AccountSettingsPasswordValues> = Yup.object().shape(
    {
      currentPassword: Yup.string().required(
        'Debes introducir tu contraseña actual'
      ),
      newPassword: passwordPolicy,
    }
  );

  const submit = ({
    currentPassword,
    newPassword,
  }: AccountSettingsPasswordValues) => {
    setPopoverOpen(false);
    setError(null);
    setSubmitting(true);
    AuthenticationService.changePassword(currentPassword, newPassword)
      .then(() => {
        onSuccess('Contraseña actualizada');
        onClose();
        setSubmitting(false);
      })
      .catch(error => {
        setError(error.message);
        setSubmitting(false);
      });
  };

  const closePopover = () => {
    if (popoverOpen) {
      setPopoverOpen(false);
    }
  };

  const openPopover = () => {
    if (!popoverOpen) {
      setPopoverOpen(true);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
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
          {error && (
            <>
              <EuiError error={error} />
              <EuiSpacer />
            </>
          )}
          <EuiFormRow
            label="Contraseña actual"
            isInvalid={errors.currentPassword && touched.currentPassword}
            error={errors.currentPassword}
          >
            <EuiFieldPassword
              type="dual"
              name="currentPassword"
              onChange={handleChange}
              value={values.currentPassword}
              autoComplete="current-password"
            />
          </EuiFormRow>
          <EuiFormRow
            label="Nueva contraseña"
            isInvalid={errors.newPassword && touched.newPassword}
            error={errors.currentPassword}
          >
            <EuiInputPopover
              isOpen={popoverOpen}
              closePopover={closePopover}
              input={
                <EuiFieldPassword
                  name="newPassword"
                  type="dual"
                  value={values.newPassword}
                  onChange={handleChange}
                  onFocus={openPopover}
                  autoComplete="new-password"
                  onBlur={e => {
                    closePopover();
                    handleBlur(e);
                  }}
                />
              }
            >
              <PasswordChecker password={values.newPassword} />
            </EuiInputPopover>
          </EuiFormRow>
          <EuiSpacer />
          <EuiFlexGroup direction="row">
            <EuiFlexItem>
              <EuiButton fill isLoading={submitting} type="submit">
                Guardar
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButtonEmpty
                color="danger"
                onClick={onClose}
                isDisabled={submitting}
              >
                Cancelar
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      )}
    </Formik>
  );
};

export default AccountSettingsPasswordForm;
