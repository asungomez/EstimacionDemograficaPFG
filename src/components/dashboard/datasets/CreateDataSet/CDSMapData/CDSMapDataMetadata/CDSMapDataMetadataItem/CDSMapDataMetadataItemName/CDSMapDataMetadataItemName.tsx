import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

type CDSMapDataMetadataItemNameProps = {
  name: string;
  onRename: (name: string) => void;
  onCancel: () => void;
};

type FormValues = {
  name: string;
};

const schema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
  name: Yup.string().required('Introduce un nombre'),
});

const CDSMapDataMetadataItemName: React.FC<CDSMapDataMetadataItemNameProps> = ({
  name,
  onRename,
  onCancel,
}) => {
  const initialValues: FormValues = {
    name,
  };

  const submit = ({ name }: FormValues) => {
    onRename(name);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={submit}
    >
      {({ handleSubmit, errors, touched, values, handleChange }) => (
        <EuiForm component="form" onSubmit={handleSubmit}>
          <EuiFormRow
            label="Nombre"
            isInvalid={errors.name && touched.name}
            error={errors.name}
          >
            <EuiFieldText
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
          </EuiFormRow>
          <EuiSpacer />
          <EuiFlexGroup direction="row" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton fill type="submit">
                Guardar
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty color="danger" onClick={onCancel}>
                Cancelar
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      )}
    </Formik>
  );
};

export default CDSMapDataMetadataItemName;
