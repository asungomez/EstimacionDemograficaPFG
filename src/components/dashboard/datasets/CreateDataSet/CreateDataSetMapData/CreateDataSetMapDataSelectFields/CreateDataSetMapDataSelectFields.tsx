import React, { useState } from 'react';

import { ParsedDataItem } from '../../../../../../services/DataSetService/utils/DataSetServiceTypes';
import { DataItem } from '../CreateDataSetMapData';
import CreateDataSetMapDataSelectFieldsText from './CreateDataSetMapDataSelectFieldsText/CreateDataSetMapDataSelectFieldsText';

type CreateDataSetMapDataSelectFieldsStatus =
  | 'select-text-field'
  | 'select-user-fields'
  | 'select-attributes';

export type CreateDataSetMapDataSelectFieldsProps = {
  data: DataItem[];
  onSelect: (parsedData: ParsedDataItem[]) => void;
  onCancel: () => void;
  onError: (message: string) => void;
};

const commonKeys = (data: DataItem[]) => {
  let keysIntersection = Object.keys(data[0]);
  for (const item of data) {
    const objectKeys = Object.keys(item);
    keysIntersection = keysIntersection.filter(key => objectKeys.includes(key));
  }
  return keysIntersection;
};

const CreateDataSetMapDataSelectFields: React.FC<CreateDataSetMapDataSelectFieldsProps> = ({
  data,
  onCancel,
  onSelect,
  onError,
}) => {
  const [parsedData, setParsedData] = useState<ParsedDataItem[]>(null);
  const [candidateFields, setCandidateFields] = useState<string[]>(
    commonKeys(data)
  );
  const [status, setStatus] = useState<CreateDataSetMapDataSelectFieldsStatus>(
    'select-text-field'
  );
  if (candidateFields.length === 0) {
    onError('Los objetos de datos deben tener al menos un campo');
    return null;
  }
  if (candidateFields.length === 1) {
    const keyName = candidateFields[0];
    onSelect(data.map(item => ({ text: '' + item[keyName] })));
    return null;
  }

  const selectTextField = (field: string) => {
    const newCandidateFields = candidateFields.filter(
      fieldName => fieldName !== field
    );
    const newParsedData = data.map(item => ({
      text: item[field],
    }));
    console.log(newCandidateFields);
    console.log(newParsedData);
    setParsedData(newParsedData);
    setCandidateFields(newCandidateFields);
    if (newCandidateFields.length > 0) {
      setStatus('select-user-fields');
    } else {
      onSelect(newParsedData);
    }
  };
  return status === 'select-text-field' ? (
    <CreateDataSetMapDataSelectFieldsText
      candidateFields={candidateFields}
      onCancel={onCancel}
      onSelect={selectTextField}
    />
  ) : status === 'select-user-fields' ? (
    <>Select user fields</>
  ) : null;
};

export default CreateDataSetMapDataSelectFields;
