import React from 'react';

export type CreateDataSetMapDataProps = {
  data: any;
};

const CreateDataSetMapData: React.FC<CreateDataSetMapDataProps> = ({
  data,
}) => {
  console.log(data);
  return <>Map data</>;
};

export default CreateDataSetMapData;