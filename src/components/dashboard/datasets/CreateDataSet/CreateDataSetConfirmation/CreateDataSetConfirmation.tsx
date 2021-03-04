import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
} from '@elastic/eui';
import React from 'react';

import CreateDataSetFileContents from './CreateDataSetFileContents/CreateDataSetFileContents';

export type CreateDataSetConfirmationProps = {
  data: any;
};

const CreateDataSetConfirmation: React.FC<CreateDataSetConfirmationProps> = ({
  data,
}) => {
  console.log(data);
  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiText>Contenido del fichero</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiPanel>
          <CreateDataSetFileContents data={data} />
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText>¿Es correcto?</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup
          direction="row"
          alignItems="center"
          justifyContent="flexStart"
        >
          <EuiFlexItem grow={false}>
            <EuiButton fill>Sí</EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty color="danger">No</EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CreateDataSetConfirmation;
