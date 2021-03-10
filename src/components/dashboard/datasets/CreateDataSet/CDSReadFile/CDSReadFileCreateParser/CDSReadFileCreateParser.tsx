import {
  EuiAccordion,
  EuiButton,
  EuiButtonEmpty,
  EuiCheckbox,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSuperSelect,
  EuiSuperSelectOption,
  EuiText,
} from '@elastic/eui';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import {
  NewLineFormat,
  newLineFormats,
  ParserDefinition,
  SkipEmptyLineOption,
  skipEmptyLinesOptions,
} from '../../../../../../parser/Parser';

const initialValues: ParserDefinition = {
  delimiter: '',
  newLineFormat: 'guess',
  headers: true,
  quoteChar: '',
  escapeChar: '',
  skipEmptyLines: 'yes',
};

const schema: Yup.ObjectSchema<ParserDefinition> = Yup.object().shape({
  delimiter: Yup.string()
    .required('Introduce un carácter delimitador')
    .length(1, 'El delimitador debe ser un único carácter.'),
  newLineFormat: Yup.mixed(),
  headers: Yup.boolean(),
  quoteChar: Yup.string().length(
    1,
    'El marcador de texto debe ser un único carácter.'
  ),
  escapeChar: Yup.string().length(1, 'El carácter de escape debe ser único.'),
  skipEmptyLines: Yup.mixed(),
});

export type CDSReadFileCreateParserProps = {
  onCreate: (parser: ParserDefinition) => void;
  onCancel: () => void;
};

const CDSReadFileCreateParser: React.FC<CDSReadFileCreateParserProps> = ({
  onCancel,
  onCreate,
}) => {
  const newLineOptions: EuiSuperSelectOption<
    NewLineFormat
  >[] = newLineFormats.map(format => ({
    value: format.name,
    inputDisplay: <EuiText>{format.label}</EuiText>,
  }));
  const emptyLinesOptions: EuiSuperSelectOption<
    SkipEmptyLineOption
  >[] = skipEmptyLinesOptions.map(option => ({
    value: option.name,
    inputDisplay: <EuiText>{option.label}</EuiText>,
  }));
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onCreate}
    >
      {({ handleSubmit, handleChange, setValues, values, errors, touched }) => (
        <EuiForm component="form" onSubmit={handleSubmit}>
          <EuiFormRow
            label="Carácter delimitador"
            helpText="El carácter delimitador separa los diferentes campos de un registro. Debe ser un carácter único."
            isInvalid={errors.delimiter && touched.delimiter}
            error={errors.delimiter}
          >
            <EuiFieldText
              name="delimiter"
              value={values.delimiter}
              onChange={handleChange}
              maxLength={1}
            />
          </EuiFormRow>
          <EuiFormRow
            helpText="Selecciona esta opción si la primera línea del fichero de datos representa las cabeceras de columna."
            isInvalid={errors.headers && touched.headers}
            error={errors.headers}
          >
            <EuiCheckbox
              id="headers"
              name="headers"
              onChange={handleChange}
              label="Cabeceras"
              checked={values.headers}
            />
          </EuiFormRow>
          <EuiSpacer />
          <EuiAccordion
            id="advanced-options"
            buttonContent="Opciones avanzadas"
          >
            <EuiSpacer />
            <EuiFormRow
              label="Separador de línea"
              helpText="Selecciona el separador de línea para diferenciar los registros. Si no se especifica, el analizador lo inferirá en base al contenido del fichero"
              isInvalid={errors.newLineFormat && touched.newLineFormat}
              error={errors.newLineFormat}
            >
              <EuiSuperSelect
                name="newLineFormat"
                options={newLineOptions}
                valueOfSelected={values.newLineFormat}
                onChange={value =>
                  setValues({
                    ...values,
                    newLineFormat: value,
                  })
                }
              />
            </EuiFormRow>
            <EuiFormRow
              label="Marcador de texto"
              helpText="El marcador de texto sirve para señalar cadenas de texto. Habitualmente se usan comillas."
              isInvalid={errors.quoteChar && touched.quoteChar}
              error={errors.quoteChar}
            >
              <EuiFieldText
                name="quoteChar"
                value={values.quoteChar}
                onChange={handleChange}
                maxLength={1}
              />
            </EuiFormRow>
            <EuiFormRow
              label="Carácter de escape"
              helpText="El carácter de escape sirve para escapar el marcador de texto. Por defecto se utiliza el propio marcado de texto."
              isInvalid={errors.escapeChar && touched.escapeChar}
              error={errors.escapeChar}
            >
              <EuiFieldText
                name="escapeChar"
                value={values.escapeChar}
                onChange={handleChange}
                maxLength={1}
              />
            </EuiFormRow>
            <EuiFormRow
              label="Omitir líneas en blanco"
              helpText="Las líneas en blanco pueden ser únicamente cadenas vacías, o también cadenas compuestas de espacios en blanco."
              isInvalid={errors.skipEmptyLines && touched.skipEmptyLines}
              error={errors.skipEmptyLines}
            >
              <EuiSuperSelect
                name="skipEmptyLines"
                options={emptyLinesOptions}
                valueOfSelected={values.skipEmptyLines}
                onChange={value =>
                  setValues({
                    ...values,
                    skipEmptyLines: value,
                  })
                }
              />
            </EuiFormRow>
          </EuiAccordion>
          <EuiSpacer />
          <EuiFlexGroup direction="row" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton fill type="submit">
                Continuar
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

export default CDSReadFileCreateParser;
