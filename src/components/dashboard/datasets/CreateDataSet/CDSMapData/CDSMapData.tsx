import React, { useState } from 'react';

import { DataItem } from '../../../../../models/DataSet';
import { DataArrayType, RawDataItem } from '../../../../../parser/Parser';
import CDSMapDataAttribute from './CDSMapDataAttribute/CDSMapDataAttribute';
import CDSMapDataDisplay from './CDSMapDataDisplay/CDSMapDataDisplay';
import CDSMapDataMetadata from './CDSMapDataMetadata/CDSMapDataMetadata';

export type CDSMapDataProps = {
  rawData: DataArrayType;
  onMap: (parsedData: DataItem[]) => void;
  onCancel: () => void;
};

const initialStatus = (data: DataArrayType): CDSMapDataStatus =>
  typeof data.data[0] === 'string' || data.commonKeys.length === 1
    ? 'display-mapped-data'
    : 'select-text';

const deleteKey = (data: DataArrayType, key: string): DataArrayType => {
  const oldData = data.data as RawDataItem[];
  const newData = oldData.map(item => {
    const newItem = { ...item };
    delete newItem[key];
    return newItem;
  });
  const newKeys = data.commonKeys.filter(item => item !== key);
  return {
    path: data.path,
    data: newData,
    commonKeys: newKeys,
  };
};

type CDSMapDataStatus =
  | 'select-text'
  | 'select-author'
  | 'select-metadata'
  | 'display-mapped-data';

const buildMetadata = (
  item: RawDataItem,
  mapping: { [attribute: string]: string }
): { [attribute: string]: string } => {
  const metadata: { [attribute: string]: string } = {};
  for (const key in mapping) {
    metadata[mapping[key]] = item[key];
  }
  return metadata;
};

const CDSMapData: React.FC<CDSMapDataProps> = ({
  rawData,
  onMap,
  onCancel,
}) => {
  const [dataToProcess, setDataToProcess] = useState(rawData);
  const [processedData, setProcessedData] = useState<DataItem[]>(null);
  const [status, setStatus] = useState<CDSMapDataStatus>(
    initialStatus(rawData)
  );

  const selectTextKey = (key: string) => {
    const items = dataToProcess.data as RawDataItem[];
    setProcessedData(
      items.map((item: RawDataItem) => ({
        text: item[key],
      }))
    );
    const newDataToProcess = deleteKey(dataToProcess, key);
    setDataToProcess(newDataToProcess);
    if (newDataToProcess.commonKeys.length > 0) {
      setStatus('select-author');
    } else {
      setStatus('display-mapped-data');
    }
  };

  const selectAuthorKey = (key: string) => {
    const items = dataToProcess.data as RawDataItem[];
    setProcessedData(data =>
      data.map((procesedDataItem, index) => ({
        ...procesedDataItem,
        author: items[index][key],
      }))
    );
    const newDataToProcess = deleteKey(dataToProcess, key);
    setDataToProcess(newDataToProcess);
    if (newDataToProcess.commonKeys.length > 0) {
      setStatus('select-metadata');
    } else {
      setStatus('display-mapped-data');
    }
  };

  const selectMetadata = (attributes: { [attribute: string]: string }) => {
    const items = dataToProcess.data as RawDataItem[];
    setProcessedData(data =>
      data.map((processedDataItem, index) => ({
        ...processedDataItem,
        metadata: buildMetadata(items[index], attributes),
      }))
    );
    setStatus('display-mapped-data');
  };

  const skipAuthor = () => setStatus('select-metadata');

  const onFinish = () => onMap(processedData);

  return status === 'select-text' ? (
    <CDSMapDataAttribute
      data={dataToProcess}
      onCancel={onCancel}
      onSelect={selectTextKey}
      description="Selecciona el campo de texto"
    />
  ) : status === 'select-author' ? (
    <CDSMapDataAttribute
      data={dataToProcess}
      onCancel={onCancel}
      onSelect={selectAuthorKey}
      description="Selecciona el campo de autor"
      skippable
      onSkip={skipAuthor}
    />
  ) : status === 'select-metadata' ? (
    <CDSMapDataMetadata
      data={dataToProcess}
      onCancel={onCancel}
      onSelect={selectMetadata}
    />
  ) : (
    <CDSMapDataDisplay onAccept={onFinish} />
  );
};

export default CDSMapData;
