import './CreateDataSetUploadFile.scss';

import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';
import React from 'react';

import uploadImage from '../../../../../assets/images/upload_image.svg';

export type CreateDataSetUploadFileProps = {
  onUpload: () => void;
};

const CreateDataSetUploadFile: React.FC<CreateDataSetUploadFileProps> = ({
  onUpload,
}) => (
  <EuiFlexGroup direction="column" alignItems="center">
    <EuiFlexItem grow={false} className="create-data-set__upload-image">
      <img src={uploadImage} alt="Selecciona un fichero" className="euiIcon" />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiText color="subdued" size="xs" textAlign="center">
        Imagen creada por{' '}
        <a
          href="https://www.freepik.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          freepik
        </a>
      </EuiText>
    </EuiFlexItem>
    <EuiFlexItem grow={false} style={{ width: '100%' }}>
      <EuiFilePicker
        initialPromptText="Selecciona un fichero"
        fullWidth
        display="large"
        onChange={onUpload}
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);

export default CreateDataSetUploadFile;
