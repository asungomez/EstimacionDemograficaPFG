import {
  EuiButton,
  EuiButtonEmpty,
  EuiCheckboxGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';
import React, { useState } from 'react';

export type CreateDataSetMapDataSelectAttributesProps = {
  candidateFields: string[];
  onSelect: (fieldNames: string[]) => void;
  onCancel: () => void;
};

export const checkboxId = (index: number) => `checkbox_${index}`;
export const indexFromId = (id: string) => +id.split('_')[1];

const CreateDataSetMapDataSelectAttributes: React.FC<CreateDataSetMapDataSelectAttributesProps> = ({
  candidateFields,
  onSelect,
  onCancel,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const checkBoxes = candidateFields.map((field, index) => ({
    label: field,
    id: checkboxId(index),
  }));

  const changeSelection = (id: string) => {
    const index = indexFromId(id);
    if (selectedOptions.includes(index)) {
      setSelectedOptions(options => options.filter(option => option !== index));
    } else {
      setSelectedOptions(options => [...options, index]);
    }
  };

  const selectAttributes = () => {
    onSelect(
      candidateFields.filter((_, index) => selectedOptions.includes(index))
    );
  };

  const idToSelectedMap: any = {};
  candidateFields.forEach((_, index) => {
    idToSelectedMap[checkboxId(index)] = selectedOptions.includes(index);
  });

  return (
    <EuiFlexGroup direction="column">
      <EuiFormRow label="¿Cuáles de los siguientes atributos quieres almacenar en el conjunto de datos?">
        <EuiCheckboxGroup
          options={checkBoxes}
          onChange={changeSelection}
          idToSelectedMap={idToSelectedMap}
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiFlexGroup direction="row" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton fill onClick={selectAttributes}>
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

export default CreateDataSetMapDataSelectAttributes;
