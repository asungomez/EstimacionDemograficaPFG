import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSelectable,
  EuiSelectableOption,
  EuiSpacer,
} from '@elastic/eui';
import React, { useState } from 'react';

import Parser, { FileType } from '../../../../../parser/Parser';

export type CreateDataSetSelectFormatProps = {
  onSelect: (type: FileType) => void;
  onCancel: () => void;
};

const CreateDataSetSelectFormat: React.FC<CreateDataSetSelectFormatProps> = ({
  onSelect,
  onCancel,
}) => {
  const initialOptions: EuiSelectableOption[] = Parser.supportedFormats().map(
    (format, index) => ({
      label: format.name,
      key: format.type,
      checked: index === 0 ? 'on' : undefined,
    })
  );
  const [options, setOptions] = useState(initialOptions);
  const onChange = (options: EuiSelectableOption[]) => setOptions(options);
  const selectFormat = () => {
    if (options.find(option => option.checked === 'on')) {
      const selectedFormat = options.filter(
        option => option.checked === 'on'
      )[0].key as FileType;
      onSelect(selectedFormat);
    }
  };
  return (
    <>
      <EuiForm
        component="form"
        onSubmit={e => {
          e.preventDefault();
          selectFormat();
        }}
      >
        <EuiFormRow
          label="Selecciona el formato del fichero"
          helpText="El formato personalizado permite definir la estructura del fichero."
        >
          <EuiSelectable
            options={options}
            singleSelection="always"
            onChange={onChange}
            listProps={{
              singleSelection: 'always',
              bordered: true,
            }}
          >
            {list => list}
          </EuiSelectable>
        </EuiFormRow>
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
    </>
  );
};

export default CreateDataSetSelectFormat;
