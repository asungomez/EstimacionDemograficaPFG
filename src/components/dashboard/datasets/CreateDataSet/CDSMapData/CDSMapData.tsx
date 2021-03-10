import React from 'react';

import { FileContents } from '../../../../../parser/Parser';
import { DataItem } from '../CreateDataSetMapData/CreateDataSetMapData';

export type CDSMapDataProps = {
  rawData: FileContents;
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
