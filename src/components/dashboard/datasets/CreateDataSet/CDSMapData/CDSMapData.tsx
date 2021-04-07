import React, { useState } from 'react';

import { DataItem } from '../../../../../models/DataSet';
import { DataArrayType, RawDataItem } from '../../../../../parser/Parser';
import CDSMapDataDisplay from './CDSMapDataText/CDSMapDataDisplay/CDSMapDataDisplay';
import CDSMapDataText from './CDSMapDataText/CDSMapDataText';

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
  | 'select-attributes'
  | 'display-mapped-data';

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

  const onFinish = () => onMap(processedData);

  return status === 'select-text' ? (
    <CDSMapDataText
      data={dataToProcess}
      onCancel={onCancel}
      onSelect={selectTextKey}
    />
  ) : status === 'select-author' ? (
    <>Author</>
  ) : status === 'select-attributes' ? (
    <>Attributes</>
  ) : (
    <CDSMapDataDisplay onAccept={onFinish} />
  );
};

export default CDSMapData;
