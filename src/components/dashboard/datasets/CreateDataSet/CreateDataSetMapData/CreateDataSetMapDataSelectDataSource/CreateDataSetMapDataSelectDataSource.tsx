import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import CreateDataSetMapDataSelectDataSourceItem from './CreateDataSetMapDataSelectDataSourceItem/CreateDataSetMapDataSelectDataSourceItem';

export type CreateDataSetMapDataSelectDataSourceProps = {
  data: any;
  onError: (message: string) => void;
  onCancel: () => void;
  onSelect: (data: any[]) => void;
};

export type DataArrayType = {
  path: string[];
  data: any[][];
};

const extractArrays = (data: any, path: string[]): DataArrayType[] => {
  const arrays: DataArrayType[] = [];
  for (const key in data) {
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key])) {
        arrays.push({
          path: [...path, key],
          data: data[key],
        });
      } else {
        const nestedArrays = extractArrays(data[key], [...path, key]);
        arrays.push(...nestedArrays);
      }
    }
  }
  return arrays;
};

const CreateDataSetMapDataSelectDataSource: React.FC<CreateDataSetMapDataSelectDataSourceProps> = ({
  data,
  onError,
  onCancel,
  onSelect,
}) => {
  const arrays = extractArrays(data, []);
  const [selectedArray, setSelectedArray] = useState(0);

  const selectArray = () => {
    onSelect(arrays[selectedArray].data.map(element => '' + element));
  };

  if (arrays.length === 0) {
    onError('Tu fichero de datos debe contener al menos una lista.');
    return null;
  }

  const lists = arrays.map((array, index) => (
    <CreateDataSetMapDataSelectDataSourceItem
      index={index}
      isSelected={index === selectedArray}
      onSelect={setSelectedArray}
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

export default React.memo(CreateDataSetMapDataSelectDataSource);
