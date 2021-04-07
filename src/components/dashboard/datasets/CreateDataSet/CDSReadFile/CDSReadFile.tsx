import { EuiFlexGroup, EuiFlexItem, EuiLoadingSpinner } from '@elastic/eui';
import React, { useEffect, useState } from 'react';

import useReadFile from '../../../../../hooks/useReadFile';
import {
  DataArrayType,
  FileType,
  ParserDefinition,
} from '../../../../../parser/Parser';
import CDSError from '../CDSError/CDSError';
import CDSReadFileCreateParser from './CDSReadFileCreateParser/CDSReadFileCreateParser';
import CDSReadFileDisplayContents from './CDSReadFileDisplayContents/CDSReadFileDisplayContents';
import CDSReadFileSelectArray from './CDSReadFileSelectArray/CDSReadFileSelectArray';
import CDSReadFileSelectFormat from './CDSReadFileSelectFormat/CDSReadFileSelectFormat';

export type CDSReadFileProps = {
  file: File;
  onRead: (array: DataArrayType) => void;
  onCancel: () => void;
};

type CDSReadFileStatus =
  | 'select-format'
  | 'create-parser'
  | 'display-contents'
  | 'select-array'
  | 'error';

const parsingErrorMessage =
  'El formato del fichero no es válido.' +
  ' Un fichero de datos debe contener al menos una lista. La lista debe ser de ' +
  'cadenas de caracteres, de listas de cadenas de caracteres o de objetos con ' +
  'al menos una clave en común.';

const CDSReadFile: React.FC<CDSReadFileProps> = ({
  file,
  onRead,
  onCancel,
}) => {
  const { data, loading, error, retry } = useReadFile(file);
  const [status, setStatus] = useState<CDSReadFileStatus>('select-format');

  useEffect(() => {
    if (!loading) {
      if (error) {
        if (error === 'custom-filetype') {
          setStatus('select-format');
        } else {
          setStatus('error');
        }
      } else if (data) {
        setStatus('display-contents');
      }
    }
  }, [data, loading, error]);

  const returnToSelectFormat = () => setStatus('select-format');

  const confirmDataContents = () => {
    if (data.arrays.length === 1) {
      onRead(data.arrays[0]);
    } else {
      setStatus('select-array');
    }
  };

  const onSelectFormat = (format: FileType) => {
    if (format !== 'custom') {
      retry(format);
    } else {
      setStatus('create-parser');
    }
  };

  const onCreateParser = (parser: ParserDefinition) => {
    retry('custom', parser);
  };

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        {loading ? (
          <EuiLoadingSpinner size="xl" />
        ) : status === 'error' ? (
          <CDSError message={parsingErrorMessage} onCancel={onCancel} />
        ) : status === 'select-format' ? (
          <CDSReadFileSelectFormat
            onSelect={onSelectFormat}
            onCancel={onCancel}
          />
        ) : status === 'create-parser' ? (
          <CDSReadFileCreateParser
            onCreate={onCreateParser}
            onCancel={onCancel}
          />
        ) : status === 'display-contents' ? (
          <CDSReadFileDisplayContents
            contents={data}
            onConfirm={confirmDataContents}
            onReject={returnToSelectFormat}
          />
        ) : status === 'select-array' ? (
          <CDSReadFileSelectArray
            arrays={data.arrays}
            onCancel={onCancel}
            onSelect={onRead}
          />
        ) : null}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CDSReadFile;
