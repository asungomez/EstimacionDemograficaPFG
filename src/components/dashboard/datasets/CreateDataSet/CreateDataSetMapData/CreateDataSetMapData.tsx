import React, { useState } from 'react';

import { ParsedDataItem } from '../../../../../services/DataSetService/utils/DataSetServiceTypes';
import CreateDataSetMapDataConfirmation from './CreateDataSetMapDataConfirmation/CreateDataSetMapDataConfirmation';
import CreateDataSetMapDataError from './CreateDataSetMapDataError/CreateDataSetMapDataError';
import CreateDataSetMapDataSelectDataArray from './CreateDataSetMapDataSelectDataArray/CreateDataSetMapDataSelectDataArray';
import CreateDataSetMapDataSelectFields from './CreateDataSetMapDataSelectFields/CreateDataSetMapDataSelectFields';

export type CreateDataSetMapDataProps = {
  data: any;
  onCancel: () => void;
  onBack: () => void;
};

type CreateDataSetMapDataStatus =
  | 'select-data-array'
  | 'map-fields'
  | 'present-parsed-data'
  | 'error';

const CreateDataSetMapData: React.FC<CreateDataSetMapDataProps> = ({
  data,
  onCancel,
  onBack,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [parsedData, setParsedData] = useState<ParsedDataItem[]>(null);

  let initialStatus: CreateDataSetMapDataStatus = 'select-data-array';
  if (Array.isArray(data)) {
    if (data.length > 0) {
      if (typeof data[0] === 'object') {
        if (Array.isArray(data[0])) {
          initialStatus = 'error';
          setErrorMessage(
            'Los elementos de la lista de datos deben ser objetos o cadenas de caracteres'
          );
        } else {
          initialStatus = 'map-fields';
        }
      } else {
        setParsedData(data.map(item => ({ text: '' + item })));
        initialStatus = 'present-parsed-data';
      }
    } else {
      initialStatus = 'error';
      setErrorMessage('La lista de datos debe tener al menos un elemento.');
    }
  }
  const [status, setStatus] = useState<CreateDataSetMapDataStatus>(
    initialStatus
  );

  const mappingError = (error: string) => {
    setErrorMessage(error);
    setStatus('error');
  };

  const selectDataArray = (dataArray: any[]) => {
    if (typeof dataArray[0] === 'object') {
      if (Array.isArray(dataArray[0])) {
        setErrorMessage(
          'Los elementos de la lista de datos deben ser objetos o cadenas de caracteres'
        );
        setStatus('error');
      } else {
        setStatus('map-fields');
      }
    } else {
      setParsedData(
        dataArray.map(dataItem => ({
          text: dataItem,
        }))
      );
      setStatus('present-parsed-data');
    }
  };

  return status === 'error' ? (
    <CreateDataSetMapDataError
      message={errorMessage}
      onCancel={onCancel}
      onBack={onBack}
    />
  ) : status === 'select-data-array' ? (
    <CreateDataSetMapDataSelectDataArray
      data={data}
      onError={mappingError}
      onSelect={selectDataArray}
      onCancel={onCancel}
    />
  ) : status === 'map-fields' ? (
    <CreateDataSetMapDataSelectFields />
  ) : status === 'present-parsed-data' ? (
    <CreateDataSetMapDataConfirmation data={parsedData} />
  ) : null;
};

export default CreateDataSetMapData;
