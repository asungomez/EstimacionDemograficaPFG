import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

// import CreateDataSetMapDataSelectDataArrayItem from './CreateDataSetMapDataSelectDataArrayItem/CreateDataSetMapDataSelectDataArrayItem';

// export type CreateDataSetMapDataSelectDataArrayProps = {
//   data: any;
//   onError: (message: string) => void;
//   onCancel: () => void;
//   onSelect: (data: any[]) => void;
// };

// // export type DataArrayType = {
// //   path: string[];
// //   data: any[][];
// // };

// const extractArrays = (data: any, path: string[]): DataArrayType[] => {
//   const arrays: DataArrayType[] = [];
//   for (const key in data) {
//     if (typeof data[key] === 'object') {
//       if (Array.isArray(data[key]) && data[key].length > 0) {
//         arrays.push({
//           path: [...path, key],
//           data: data[key],
//         });
//       } else {
//         const nestedArrays = extractArrays(data[key], [...path, key]);
//         arrays.push(...nestedArrays);
//       }
//     }
//   }
//   return arrays;
// };

// const CreateDataSetMapDataSelectDataArray: React.FC<CreateDataSetMapDataSelectDataArrayProps> = ({
//   data,
//   onError,
//   onCancel,
//   onSelect,
// }) => {
//   const [arrays] = useState(extractArrays(data, []));
//   const [selectedArray, setSelectedArray] = useState(0);

//   const selectArray = () => {
//     const dataArray = arrays[selectedArray].data;
//     if (typeof dataArray[0] === 'object') {
//       onSelect(dataArray);
//     } else {
//       onSelect(dataArray.map(element => '' + element));
//     }
//   };

//   if (arrays.length === 0) {
//     onError('Tu fichero de datos debe contener al menos una lista.');
//     return null;
//   } else if (arrays.length === 1) {
//     selectArray();
//     return null;
//   }
//   const lists = arrays.map((array, index) => (
//     <CreateDataSetMapDataSelectDataArrayItem
//       index={index}
//       isSelected={index === selectedArray}
//       onSelect={setSelectedArray}
//       array={array}
//       key={index}
//     />
//   ));

//   return (
//     <EuiFlexGroup direction="column">
//       <EuiFlexItem grow={false}>
//         <EuiText>Selecciona la lista de textos a analizar.</EuiText>
//       </EuiFlexItem>
//       <EuiFlexItem grow={false}>{lists}</EuiFlexItem>
//       <EuiFlexItem grow={false}>
//         <EuiFlexGroup direction="row" alignItems="center">
//           <EuiFlexItem grow={false}>
//             <EuiButton fill onClick={selectArray}>
//               Continuar
//             </EuiButton>
//           </EuiFlexItem>
//           <EuiFlexItem grow={false}>
//             <EuiButtonEmpty color="danger" onClick={onCancel}>
//               Cancelar
//             </EuiButtonEmpty>
//           </EuiFlexItem>
//         </EuiFlexGroup>
//       </EuiFlexItem>
//     </EuiFlexGroup>
//   );
// };

// export default React.memo(CreateDataSetMapDataSelectDataArray);
