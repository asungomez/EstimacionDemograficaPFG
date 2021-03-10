import './CreateDataSetMapDataError.scss';

// import {
//   EuiButton,
//   EuiButtonEmpty,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiText,
//   EuiTitle,
// } from '@elastic/eui';
// import React from 'react';

// import errorImage from '../../../../../../assets/images/parsing_error.svg';

// export type CreateDataSetMapDataErrorProps = {
//   onBack: () => void;
//   onCancel: () => void;
//   message: string;
// };

// const CreateDataSetMapDataError: React.FC<CreateDataSetMapDataErrorProps> = ({
//   onBack,
//   onCancel,
//   message,
// }) => {
//   return (
//     <EuiFlexGroup direction="column" alignItems="center">
//       <EuiFlexItem grow={false} className="create-data-set__error-image">
//         <img
//           src={errorImage}
//           alt="Error en el análisis del fichero"
//           className="euiIcon"
//         />
//       </EuiFlexItem>
//       <EuiFlexItem grow={false}>
//         <EuiText color="subdued" size="xs" textAlign="center">
//           Imagen creada por{' '}
//           <a
//             href="https://www.freepik.es"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             freepik
//           </a>
//         </EuiText>
//       </EuiFlexItem>
//       <EuiFlexItem grow={false}>
//         <EuiTitle>
//           <h3>No se pudo analizar el fichero</h3>
//         </EuiTitle>
//       </EuiFlexItem>
//       <EuiFlexItem grow={false}>
//         <EuiText>{message}</EuiText>
//       </EuiFlexItem>
//       <EuiFlexItem grow={false}>
//         <EuiFlexGroup direction="row" alignItems="center">
//           <EuiFlexItem grow={false}>
//             <EuiButton fill onClick={onBack}>
//               Seleccionar otro formato
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

// export default CreateDataSetMapDataError;
