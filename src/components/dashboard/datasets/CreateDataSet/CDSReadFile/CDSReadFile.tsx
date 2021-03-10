import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
} from '@elastic/eui';
import React from 'react';

import useReadFile from '../../../../../hooks/useReadFile';
import { FileContents } from '../../../../../parser/Parser';
import CDSError from '../CDSError/CDSError';

export type CDSReadFileProps = {
  file: File;
  onRead: (contents: FileContents) => void;
  onCancel: () => void;
};

const CDSReadFile: React.FC<CDSReadFileProps> = ({
  file,
  onRead,
  onCancel,
}) => {
  const { data, loading, error, retry } = useReadFile(file);

  const dataReady = !!data && Array.isArray(data);
  if (data) {
    console.log(data);
  }

  let errorMessage: string;
  if (error === 'parsing-error') {
    errorMessage =
      'El formato del fichero no es válido.' +
      ' Un fichero de datos debe contener al menos una lista. La lista debe ser de ' +
      'cadenas de caracteres o de objetos con al menos una clave en común.';
  }

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        {loading ? (
          <EuiLoadingSpinner size="xl" />
        ) : error ? (
          <CDSError message={errorMessage} />
        ) : (
          <>Read file</>
        )}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="row" alignItems="center">
          {dataReady && (
            <EuiFlexItem grow={false}>
              <EuiButton fill onClick={() => onRead(data)}>
                Continuar
              </EuiButton>
            </EuiFlexItem>
          )}
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty color="danger" onClick={onCancel}>
              Cancelar
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CDSReadFile;
