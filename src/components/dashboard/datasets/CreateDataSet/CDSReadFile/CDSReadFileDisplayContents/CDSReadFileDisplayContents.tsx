import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
} from '@elastic/eui';
import React from 'react';

import { FileContents } from '../../../../../../parser/Parser';
import CDSFileContents from '../CDSFileContents/CDSFileContents';

export type CDSReadFileDisplayContentsProps = {
  contents: FileContents;
  onConfirm: () => void;
  onReject: () => void;
};

const CDSReadFileDisplayContents: React.FC<CDSReadFileDisplayContentsProps> = ({
  contents,
  onConfirm,
  onReject,
}) => {
  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiText>Contenido del fichero</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiPanel>
          <CDSFileContents contents={contents} />
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
            <EuiButton fill onClick={onConfirm}>
              Sí
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty color="danger" onClick={onReject}>
              No
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CDSReadFileDisplayContents;
