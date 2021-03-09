import React from 'react';

import { DataItem } from '../CreateDataSetMapData/CreateDataSetMapData';

export type CDSSaveProps = {
  data: DataItem[];
  onCancel: () => void;
};
const CDSSave: React.FC<CDSSaveProps> = ({ data, onCancel }) => {
  return <>Save</>;
};

export default CDSSave;
