import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import { DataArrayType } from '../../../../../../parser/Parser';
import CDSReadFileSelectArrayItem from './CDSReadFileSelectArrayItem/CDSReadFileSelectArrayItem';

export type CDSReadFileSelectArrayProps = {
  arrays: DataArrayType[];
  onSelect: (array: DataArrayType) => void;
  onCancel: () => void;
};

const CDSReadFileSelectArray: React.FC<CDSReadFileSelectArrayProps> = ({
  arrays,
  onSelect,
  onCancel,
}) => {
  const [selectedArray, setSelectedArray] = useState(0);

  const selectArray = () => {
    onSelect(arrays[selectedArray]);
  };

  const lists = arrays.map((array, index) => (
    <CDSReadFileSelectArrayItem
      index={index}
      isSelected={index === selectedArray}
      onSelect={() => setSelectedArray(index)}
      array={array}
      key={index}
    />
  ));

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiText>Selecciona la lista de textos a analizar.</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>{lists}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="row" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={selectArray}>
              Continuar
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty color="danger" onClick={onCancel}>
              Cancelar
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CDSReadFileSelectArray;
