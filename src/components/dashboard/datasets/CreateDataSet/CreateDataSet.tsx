import {
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';

import Parser from '../../../../parser/Parser';
import CreateDataSetMapData from './CreateDataSetMapData/CreateDataSetMapData';
import CreateDataSetSelectFormat from './CreateDataSetSelectFormat/CreateDataSetSelectFormat';
import CreateDataSetUploadFile from './CreateDataSetUploadFile/CreateDataSetUploadFile';

type CreateDataSetStatus = 'upload' | 'map-data' | 'select-format';

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
            setData(data);
            setStatus('map-data');
          })
          .catch(() => {});
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
      {status === 'upload' ? (
        <CreateDataSetUploadFile onUpload={parseFiles} />
      ) : status === 'map-data' ? (
        <CreateDataSetMapData data={data} />
      ) : status === 'select-format' ? (
        <CreateDataSetSelectFormat />
      ) : null}
    </>
  );
};

export default CreateDataSet;
