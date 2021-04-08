import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';

import { DataArrayType, RawDataItem } from '../../../../../../parser/Parser';
import CDSMapDataMetadataItem from './CDSMapDataMetadataItem/CDSMapDataMetadataItem';

type CDSMapDataMetadataProps = {
  data: DataArrayType;
  onSelect: (attributes: { [attribute: string]: string }) => void;
  onCancel: () => void;
};

type MetaDataMapping = {
  [key: string]: {
    store: boolean;
    name: string;
  };
};

const buildInitialMapping = (data: DataArrayType): MetaDataMapping => {
  const mapping: MetaDataMapping = {};
  for (const key of data.commonKeys) {
    mapping[key] = {
      store: true,
      name: key,
    };
  }
  return mapping;
};

const listItems = (data: RawDataItem[], key: string): string[] =>
  data.map((item: RawDataItem) => (item as RawDataItem)[key]);

const CDSMapDataMetadata: React.FC<CDSMapDataMetadataProps> = ({
  data,
  onSelect,
  onCancel,
}) => {
  const [mapping, setMapping] = useState<MetaDataMapping>(
    buildInitialMapping(data)
  );

  useEffect(() => {
    setMapping(buildInitialMapping(data));
  }, [data]);

  const selectMetadata = () => {
    const attributes: { [attribute: string]: string } = {};
    for (const key in mapping) {
      if (mapping[key].store) {
        attributes[key] = mapping[key].name;
      }
    }
    onSelect(attributes);
  };

  const toggleAttribute = (key: string) => {
    setMapping(mapping => ({
      ...mapping,
      [key]: {
        ...mapping[key],
        store: !mapping[key].store,
      },
    }));
  };

  const renameAttribute = (key: string, name: string) => {
    setMapping(mapping => ({
      ...mapping,
      [key]: {
        ...mapping[key],
        name,
      },
    }));
  };

  const metadata = data.commonKeys.map(key => (
    <EuiFlexItem grow={false} key={key}>
      <CDSMapDataMetadataItem
        name={mapping[key].name}
        items={listItems(data.data as RawDataItem[], key)}
        isSelected={mapping[key].store}
        onToggle={() => toggleAttribute(key)}
        onRename={name => renameAttribute(key, name)}
      />
    </EuiFlexItem>
  ));

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiText>Selecciona los metadatos que deseas almacenar</EuiText>
      </EuiFlexItem>
      {metadata}
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="row" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={selectMetadata}>
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

export default CDSMapDataMetadata;
