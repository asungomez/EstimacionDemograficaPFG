import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiRadioGroup,
  EuiSpacer,
} from '@elastic/eui';
import React, { useState } from 'react';

export type CreateDataSetMapDataSelectFieldsTextProp = {
  candidateFields: string[];
  onSelect: (fieldName: string) => void;
  onCancel: () => void;
};

const radioId = (index: number) => `radio_${index}`;
const indexFromId = (id: string) => +id.split('_')[1];

const CreateDataSetMapDataSelectFieldsText: React.FC<CreateDataSetMapDataSelectFieldsTextProp> = ({
  candidateFields,
  onCancel,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const radioOptions = candidateFields.map((field, index) => ({
    id: radioId(index),
    label: field,
  }));
  const changeSelection = (selectedId: string) =>
    setSelectedOption(indexFromId(selectedId));

  const selectField = () => onSelect(candidateFields[selectedOption]);

  return (
    <EuiFlexGroup direction="column">
      <EuiFormRow label="¿Cuál de los siguientes campos se corresponde con el texto a analizar?">
        <EuiRadioGroup
          options={radioOptions}
          idSelected={radioId(selectedOption)}
          onChange={changeSelection}
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiFlexGroup direction="row" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton fill onClick={selectField}>
            Continuar
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty color="danger" onClick={onCancel}>
            Cancelar
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexGroup>
  );
};

export default CreateDataSetMapDataSelectFieldsText;
