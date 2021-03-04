import {
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';

import CreateDataSetMapData from './CreateDataSetMapData/CreateDataSetMapData';
import CreateDataSetUploadFile from './CreateDataSetUploadFile/CreateDataSetUploadFile';

type CreateDataSetStatus = 'upload' | 'map-data';

const CreateDataSet: React.FC<{}> = () => {
  const [status, setStatus] = useState<CreateDataSetStatus>('upload');

  return (
    <>
      <EuiPageHeader responsive className="dashboard-header">
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Crear conjunto de datos</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageHeader>
      {status === 'upload' ? (
        <CreateDataSetUploadFile onUpload={() => setStatus('map-data')} />
      ) : status === 'map-data' ? (
        <CreateDataSetMapData />
      ) : null}
    </>
  );
};

export default CreateDataSet;
