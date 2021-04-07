import React from 'react';

import { DataItem } from '../../../../../models/DataSet';
import { DataArrayType } from '../../../../../parser/Parser';

export type CDSMapDataProps = {
  rawData: DataArrayType;
  onMap: (parsedData: DataItem[]) => void;
  onCancel: () => void;
};

const CDSMapData: React.FC<CDSMapDataProps> = ({
  rawData,
  onMap,
  onCancel,
}) => {
  return <>Map data</>;
};

export default CDSMapData;
