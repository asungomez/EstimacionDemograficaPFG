import React from 'react';

import { DataItem } from '../CreateDataSetMapData/CreateDataSetMapData';

export type CDSMapDataProps = {
  rawData: any[];
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
