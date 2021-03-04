import {
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';

import Parser from '../../../../parser/Parser';
import CreateDataSetConfirmation from './CreateDataSetConfirmation/CreateDataSetConfirmation';
import CreateDataSetMapData from './CreateDataSetMapData/CreateDataSetMapData';
import CreateDataSetSelectFormat from './CreateDataSetSelectFormat/CreateDataSetSelectFormat';
import CreateDataSetUploadFile from './CreateDataSetUploadFile/CreateDataSetUploadFile';

type CreateDataSetStatus =
  | 'upload'
  | 'map-data'
  | 'select-format'
  | 'present-file-contents';

const CreateDataSet: React.FC<{}> = () => {
  const [status, setStatus] = useState<CreateDataSetStatus>('upload');
  const [data, setData] = useState<any>(null);

  const parseFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      const fileType = Parser.guessFileTypeFromExtension(file.name);
      if (fileType !== 'custom') {
        Parser.parseFile(file, fileType)
          .then(data => {
            if (typeof data === 'object') {
              setData(data);
              setStatus('present-file-contents');
            } else {
              setStatus('select-format');
            }
          })
          .catch(() => setStatus('select-format'));
      } else {
        setStatus('select-format');
      }
    }
  };

  return (
    <>
      <EuiPageHeader responsive className="dashboard-header">
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Crear conjunto de datos</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageHeader>
      <EuiSpacer />
      {status === 'upload' ? (
        <CreateDataSetUploadFile onUpload={parseFiles} />
      ) : status === 'present-file-contents' ? (
        <CreateDataSetConfirmation data={data} />
      ) : status === 'map-data' ? (
        <CreateDataSetMapData data={data} />
      ) : status === 'select-format' ? (
        <CreateDataSetSelectFormat />
      ) : null}
    </>
  );
};

export default CreateDataSet;
