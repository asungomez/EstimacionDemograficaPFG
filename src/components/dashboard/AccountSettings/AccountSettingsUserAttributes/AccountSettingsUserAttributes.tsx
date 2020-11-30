import {
  EuiButton,
  EuiButtonEmpty,
  EuiDescribedFormGroup,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import AuthenticationService from '../../../../services/AuthenticationService';
import EuiError from '../../../common/eui/EuiError';

type AccountSettingsUserAttributesFields = 'firstName' | 'lastName';

export type AccountSettingsUserAttributesValues = {
  [field in AccountSettingsUserAttributesFields]?: string;
};

const schema: Yup.ObjectSchema<AccountSettingsUserAttributesValues> = Yup.object().shape(
  {
    firstName: Yup.string(),
    lastName: Yup.string(),
  }
);

const AccountSettingsUserAttributes: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>(null);
  const [editing, setEditing] = useState(false);

  const initialValues: AccountSettingsUserAttributesValues = {
    firstName: '',
    lastName: '',
  };

  const submit = (values: AccountSettingsUserAttributesValues) => {
    setSubmitting(true);
    setSubmitError(null);
    AuthenticationService.updateUserProfile(values)
      .then(() => {
        // TODO success
        setEditing(false);
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
    handleChange(event);
  };

  const cancelEdition = (update: (field: string, value: string) => void) => {
    for (const field in initialValues) {
      update(
        field,
        initialValues[field as AccountSettingsUserAttributesFields]
      );
    }
    setEditing(false);
  };

  return (
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
            {submitError && <EuiError error={submitError} />}
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
