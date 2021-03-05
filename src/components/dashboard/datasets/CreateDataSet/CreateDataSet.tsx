import {
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';

import Parser, { FileType } from '../../../../parser/Parser';
import CreateDataSetConfirmation from './CreateDataSetConfirmation/CreateDataSetConfirmation';
import CreateDataSetMapData from './CreateDataSetMapData/CreateDataSetMapData';
import CreateDataSetParsingError from './CreateDataSetParsingError/CreateDataSetParsingError';
import CreateDataSetSelectFile from './CreateDataSetSelectFile/CreateDataSetSelectFile';
import CreateDataSetSelectFormat from './CreateDataSetSelectFormat/CreateDataSetSelectFormat';

type CreateDataSetStatus =
  | 'select-file'
  | 'map-data'
  | 'select-format'
  | 'present-file-contents'
  | 'parsing-error';

const CreateDataSet: React.FC<{}> = () => {
  const [status, setStatus] = useState<CreateDataSetStatus>('select-file');
  const [data, setData] = useState<any>(null);
  const [file, setFile] = useState<File>(null);

  const cancel = () => {
    setData(null);
    setFile(null);
    setStatus('select-file');
  };

  const selectFile = (file: File) => {
    const fileType = Parser.guessFileTypeFromExtension(file.name);
    setFile(file);
    if (fileType !== 'custom') {
      Parser.parseFile(file, fileType)
        .then(data => {
          if (typeof data === 'object') {
            setData(data);
            setStatus('present-file-contents');
          } else {
            selectFormatManually();
          }
        })
        .catch(() => selectFormatManually());
    } else {
      selectFormatManually();
    }
  };

  const selectFileType = (fileType: FileType) => {
    Parser.parseFile(file, fileType)
      .then(data => {
        if (typeof data === 'object') {
          setData(data);
          setStatus('present-file-contents');
        } else {
          selectFormatManually();
        }
      })
      .catch(() => parsingError());
  };

  const selectFormatManually = () => {
    setData(null);
    setStatus('select-format');
  };
  const startMappingData = () => setStatus('map-data');
  const parsingError = () => setStatus('parsing-error');

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
      {status === 'select-file' ? (
        <CreateDataSetSelectFile onSelect={selectFile} />
      ) : status === 'present-file-contents' ? (
        <CreateDataSetConfirmation
          data={data}
          onConfirm={startMappingData}
          onReject={selectFormatManually}
        />
      ) : status === 'map-data' ? (
        <CreateDataSetMapData data={data} />
      ) : status === 'select-format' ? (
        <CreateDataSetSelectFormat
          onSelect={selectFileType}
          onCancel={cancel}
        />
      ) : status === 'parsing-error' ? (
        <CreateDataSetParsingError
          onCancel={cancel}
          onBack={selectFormatManually}
        />
      ) : null}
    </>
  );
};

export default CreateDataSet;
