import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import { DataArrayType, RawDataItem } from '../../../../../../parser/Parser';
import CDSMapDataTextItem from './CDSMapDataTextItem/CDSMapDataTextItem';

type CDSMapDataTextProps = {
  data: DataArrayType;
  onSelect: (key: string) => void;
  onCancel: () => void;
};

const listItems = (data: RawDataItem[], key: string): string[] =>
  data.map((item: RawDataItem) => (item as RawDataItem)[key]);

const CDSMapDataText: React.FC<CDSMapDataTextProps> = ({
  data,
  onSelect,
  onCancel,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(data.commonKeys[0]);

  const selectKey = () => onSelect(selectedKey);

  const candidateKeys = data.commonKeys.map(key => (
    <EuiFlexItem grow={false} key={key}>
      <CDSMapDataTextItem
        dataKey={key}
        items={listItems(data.data as RawDataItem[], key)}
        isSelected={selectedKey === key}
        onSelect={() => setSelectedKey(key)}
      />
    </EuiFlexItem>
  ));
  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiText>Selecciona el campo de texto</EuiText>
      </EuiFlexItem>
      {candidateKeys}
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="row" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={selectKey}>
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

export default CDSMapDataText;
