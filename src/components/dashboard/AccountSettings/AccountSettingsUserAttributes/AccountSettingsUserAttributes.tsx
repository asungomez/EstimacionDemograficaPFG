import {
  EuiButton,
  EuiButtonEmpty,
  EuiDescribedFormGroup,
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { useAuthenticationContext } from '../../../../contexts/AuthenticationContext';
import AuthenticationService from '../../../../services/AuthenticationService/AuthenticationService';
import EuiError from '../../../common/eui/EuiError';

export type AccountSettingsUserAttributesProps = {
  onSuccess: (message: string) => void;
};

type AccountSettingsUserAttributesFields =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password';

export type AccountSettingsUserAttributesValues = {
  [field in AccountSettingsUserAttributesFields]?: string;
};

const schemaWithoutEmail: Yup.ObjectSchema<AccountSettingsUserAttributesValues> = Yup.object().shape(
  {
    firstName: Yup.string(),
    lastName: Yup.string(),
  }
);

const schemaWithEmail: Yup.ObjectSchema<AccountSettingsUserAttributesValues> = Yup.object().shape(
  {
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string()
      .required('El campo email no puede estar en blanco')
      .email('Debes introducir un email válido'),
    password: Yup.string().required('Debes introducir tu contraseña actual'),
  }
);

const AccountSettingsUserAttributes: React.FC<AccountSettingsUserAttributesProps> = ({
  onSuccess,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>(null);
  const [editing, setEditing] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const { user, setUser } = useAuthenticationContext();

  const initialValues: AccountSettingsUserAttributesValues = {
    firstName: user.name ? user.name : '',
    lastName: user.familyName ? user.familyName : '',
    email: user.email ? user.email : '',
    password: '',
  };

  const submit = (
    values: AccountSettingsUserAttributesValues,
    { setFieldValue }: FormikHelpers<AccountSettingsUserAttributesValues>
  ) => {
    setSubmitting(true);
    setSubmitError(null);
    const updatedValues = { ...values };
    if (
      !(
        values.firstName &&
        values.firstName.length > 0 &&
        values.firstName !== user.name
      )
    ) {
      updatedValues.firstName = '';
    }
    if (
      !(
        values.lastName &&
        values.lastName.length > 0 &&
        values.lastName !== user.familyName
      )
    ) {
      updatedValues.lastName = '';
    }
    if (
      !(values.email && values.email.length > 0 && values.email !== user.email)
    ) {
      updatedValues.email = '';
    }
    AuthenticationService.updateUserProfile(updatedValues)
      .then(() => {
        onSuccess('Perfil actualizado');
        const newUser = { ...user };
        if (updatedValues.firstName && updatedValues.firstName.length > 0) {
          newUser.name = updatedValues.firstName;
        }
        if (updatedValues.lastName && updatedValues.lastName.length > 0) {
          newUser.familyName = updatedValues.lastName;
        }
        if (updatedValues.email && updatedValues.email.length > 0) {
          setFieldValue('email', user.email);
          setFieldValue('password', '');
          // TODO display message about confirmation
        }
        setUser(newUser);
        setEditing(false);
        setEditingEmail(false);
        setSubmitting(false);
      })
      .catch(error => {
        setSubmitError(error.message);
        setSubmitting(false);
      });
  };

  const onChange = (
    event: React.ChangeEvent<any>,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    setEditing(true);
    if (event.target.name === 'email') {
      setEditingEmail(true);
    }
    handleChange(event);
  };

  const cancelEdition = (update: (field: string, value: string) => void) => {
    for (const field in initialValues) {
      update(
        field,
        initialValues[field as AccountSettingsUserAttributesFields]
      );
    }
    setSubmitError(null);
    setEditingEmail(false);
    setEditing(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editingEmail ? schemaWithEmail : schemaWithoutEmail}
      onSubmit={submit}
    >
      {({
        handleSubmit,
        errors,
        touched,
        values,
        handleChange,
        setFieldValue,
      }) => (
        <EuiForm component="form" onSubmit={handleSubmit}>
          <EuiDescribedFormGroup
            title={<h3>Datos de perfil</h3>}
            description={
              <EuiText>
                Cuando están definidos, utilizamos tu nombre y apellidos para
                dirigirnos a ti. Tu correo electrónico sirve para iniciar sesión
                y por si tenemos que ponernos en contacto contigo.
              </EuiText>
            }
          >
            {submitError && (
              <>
                <EuiError error={submitError} />
                <EuiSpacer />
              </>
            )}
            <EuiFormRow
              label="Nombre"
              isInvalid={errors.firstName && touched.firstName}
              error={errors.firstName}
            >
              <EuiFieldText
                name="firstName"
                onChange={e => onChange(e, handleChange)}
                value={values.firstName}
              />
            </EuiFormRow>
            <EuiFormRow
              label="Apellidos"
              isInvalid={errors.lastName && touched.lastName}
              error={errors.lastName}
            >
              <EuiFieldText
                name="lastName"
                onChange={e => onChange(e, handleChange)}
                value={values.lastName}
              />
            </EuiFormRow>
            <EuiFormRow
              label="Email"
              isInvalid={errors.email && touched.email}
              error={errors.email}
            >
              <EuiFieldText
                name="email"
                onChange={e => onChange(e, handleChange)}
                value={values.email}
              />
            </EuiFormRow>
            {editingEmail && (
              <EuiFormRow
                label="Contraseña"
                isInvalid={errors.password && touched.password}
                error={errors.password}
              >
                <EuiFieldPassword
                  type="dual"
                  name="password"
                  onChange={e => onChange(e, handleChange)}
                  value={values.password}
                />
              </EuiFormRow>
            )}
            {editing && (
              <>
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
                      onClick={() => cancelEdition(setFieldValue)}
                      isDisabled={submitting}
                    >
                      Cancelar
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </>
            )}
          </EuiDescribedFormGroup>
        </EuiForm>
      )}
    </Formik>
  );
};

export default AccountSettingsUserAttributes;
