import React from 'react';

import { ParsedDataItem } from '../../../../../../services/DataSetService/utils/DataSetServiceTypes';

export type CreateDataSetMapDataConfirmationProps = {
  data: ParsedDataItem[];
};

const CreateDataSetMapDataConfirmation: React.FC<CreateDataSetMapDataConfirmationProps> = ({
  data,
}) => {
  console.log(data);
  return <>Confirmation</>;
};

export default CreateDataSetMapDataConfirmation;
