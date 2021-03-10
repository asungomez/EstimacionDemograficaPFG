import React, { useState } from 'react';

// import { ParsedDataItem } from '../../../../../../services/DataSetService/utils/DataSetServiceTypes';
// import { DataItem } from '../CreateDataSetMapData';
// import CreateDataSetMapDataSelectAttributes from './CreateDataSetMapDataSelectAttributes/CreateDataSetMapDataSelectAttributes';
// import CreateDataSetMapDataSelectField from './CreateDataSetMapDataSelectField/CreateDataSetMapDataSelectField';

// type CreateDataSetMapDataSelectFieldsStatus =
//   | 'initial'
//   | 'select-text-field'
//   | 'select-user-fields'
//   | 'select-attributes';

// export type CreateDataSetMapDataSelectFieldsProps = {
//   data: DataItem[];
//   onSelect: (parsedData: ParsedDataItem[]) => void;
//   onCancel: () => void;
//   onError: (message: string) => void;
// };

// const commonKeys = (data: DataItem[]) => {
//   let keysIntersection = Object.keys(data[0]);
//   for (const item of data) {
//     const objectKeys = Object.keys(item);
//     keysIntersection = keysIntersection.filter(key => objectKeys.includes(key));
//   }
//   return keysIntersection;
// };

// const CreateDataSetMapDataSelectFields: React.FC<CreateDataSetMapDataSelectFieldsProps> = ({
//   data,
//   onCancel,
//   onSelect,
//   onError,
// }) => {
//   const [parsedData, setParsedData] = useState<ParsedDataItem[]>(null);
//   const [candidateFields, setCandidateFields] = useState<string[]>(
//     commonKeys(data)
//   );
//   const [status, setStatus] = useState<CreateDataSetMapDataSelectFieldsStatus>(
//     'initial'
//   );

//   if (status === 'initial') {
//     if (candidateFields.length === 0) {
//       onError('Los objetos de datos deben tener al menos un campo');
//       return null;
//     }
//     if (candidateFields.length === 1) {
//       const keyName = candidateFields[0];
//       onSelect(data.map(item => ({ text: '' + item[keyName] })));
//       return null;
//     }
//     setStatus('select-text-field');
//   }

//   const selectTextField = (field: string) => {
//     const newCandidateFields = candidateFields.filter(
//       fieldName => fieldName !== field
//     );
//     const newParsedData = data.map(item => ({
//       text: item[field],
//     }));
//     setParsedData(newParsedData);
//     setCandidateFields(newCandidateFields);
//     if (newCandidateFields.length > 0) {
//       setStatus('select-user-fields');
//     } else {
//       onSelect(newParsedData);
//     }
//   };

//   const selectUserField = (field: string) => {
//     if (field) {
//       const newCandidateFields = candidateFields.filter(
//         fieldName => fieldName !== field
//       );
//       const newParsedData = data.map((item, index) => ({
//         author: item[field],
//         ...parsedData[index],
//       }));
//       setParsedData(newParsedData);
//       setCandidateFields(newCandidateFields);
//       if (newCandidateFields.length > 0) {
//         setStatus('select-attributes');
//       } else {
//         onSelect(newParsedData);
//       }
//     } else {
//       setStatus('select-attributes');
//     }
//   };

//   const selectAttributes = (fields: string[]) => {
//     let newParsedData = [...parsedData];
//     if (fields.length > 0) {
//       newParsedData = newParsedData.map((item, index) => {
//         const newItem: ParsedDataItem = { ...item, tags: {} };
//         for (const field of fields) {
//           newItem.tags[field] = data[index][field];
//         }
//         return newItem;
//       });
//     }
//     console.log(newParsedData);
//     setParsedData(newParsedData);
//     onSelect(newParsedData);
//   };

//   return status === 'select-text-field' || status === 'select-user-fields' ? (
//     <CreateDataSetMapDataSelectField
//       candidateFields={candidateFields}
//       onCancel={onCancel}
//       onSelect={
//         status === 'select-text-field' ? selectTextField : selectUserField
//       }
//       fieldToSelect={status === 'select-text-field' ? 'text' : 'user'}
//     />
//   ) : status === 'select-attributes' ? (
//     <CreateDataSetMapDataSelectAttributes
//       candidateFields={candidateFields}
//       onCancel={onCancel}
//       onSelect={selectAttributes}
//     />
//   ) : null;
// };

// export default CreateDataSetMapDataSelectFields;
