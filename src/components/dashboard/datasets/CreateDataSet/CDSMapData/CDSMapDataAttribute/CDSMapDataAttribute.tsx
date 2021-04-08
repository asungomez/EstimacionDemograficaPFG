import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';

import { DataArrayType, RawDataItem } from '../../../../../../parser/Parser';
import CDSMapDataAttributeItem from './CDSMapDataAttributeItem/CDSMapDataAttributeItem';

type CDSMapDataAttributeProps = {
  data: DataArrayType;
  onSelect: (key: string) => void;
  onCancel: () => void;
  description: string;
  skippable?: boolean;
  onSkip?: () => void;
};

export const listItems = (data: RawDataItem[], key: string): string[] =>
  data.map((item: RawDataItem) => (item as RawDataItem)[key]);

const CDSMapDataAttribute: React.FC<CDSMapDataAttributeProps> = ({
  data,
  onSelect,
  onCancel,
  description,
  skippable = false,
  onSkip,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(data.commonKeys[0]);

  const selectKey = () => onSelect(selectedKey);

  useEffect(() => {
    setSelectedKey(data.commonKeys[0]);
  }, [data]);

  const candidateKeys = data.commonKeys.map(key => (
    <EuiFlexItem grow={false} key={key}>
      <CDSMapDataAttributeItem
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
        <EuiText>{description}</EuiText>
      </EuiFlexItem>
      {candidateKeys}
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="row" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={selectKey}>
              Continuar
            </EuiButton>
          </EuiFlexItem>
          {skippable && (
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty onClick={onSkip}>Omitir</EuiButtonEmpty>
            </EuiFlexItem>
          )}
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

export default CDSMapDataAttribute;
