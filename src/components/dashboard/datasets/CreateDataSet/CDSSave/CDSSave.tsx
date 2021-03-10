import React from 'react';
import { DataItem } from '../../../../../models/DataSet';


export type CDSSaveProps = {
  data: DataItem[];
  onCancel: () => void;
};
const CDSSave: React.FC<CDSSaveProps> = ({ data, onCancel }) => {
  return <>Save</>;
};

export default CDSSave;
