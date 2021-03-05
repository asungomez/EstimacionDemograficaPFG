import React, { useState } from 'react';

import CreateDataSetMapDataError from './CreateDataSetMapDataError/CreateDataSetMapDataError';
import CreateDataSetMapDataSelectDataSource from './CreateDataSetMapDataSelectDataSource/CreateDataSetMapDataSelectDataSource';

export type CreateDataSetMapDataProps = {
  data: any;
  onCancel: () => void;
  onBack: () => void;
};

type CreateDataSetMapDataStatus =
  | 'select-data-source'
  | 'select-text-source'
  | 'error';

const CreateDataSetMapData: React.FC<CreateDataSetMapDataProps> = ({
  data,
  onCancel,
  onBack,
}) => {
  let initialStatus: CreateDataSetMapDataStatus = 'select-data-source';
  if (Array.isArray(data)) {
    initialStatus = 'select-text-source';
  }
  const [status, setStatus] = useState<CreateDataSetMapDataStatus>(
    initialStatus
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const mappingError = (error: string) => {
    setErrorMessage(error);
    setStatus('error');
  };

  const selectDataArray = (dataArray: any[]) => {
    console.log(dataArray);
    setStatus('select-text-source');
  };

  return status === 'error' ? (
    <CreateDataSetMapDataError
      message={errorMessage}
      onCancel={onCancel}
      onBack={onBack}
    />
  ) : status === 'select-data-source' ? (
    <CreateDataSetMapDataSelectDataSource
      data={data}
      onError={mappingError}
      onSelect={selectDataArray}
      onCancel={onCancel}
    />
  ) : (
    <>Is array</>
  );
};

export default CreateDataSetMapData;
