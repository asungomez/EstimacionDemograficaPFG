import './CDSError.scss';

import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui';
import React from 'react';

import errorImage from '../../../../../assets/images/parsing_error.svg';

export type CDSErrorProps = {
  message: string;
  onCancel: () => void;
};

const CDSError: React.FC<CDSErrorProps> = ({ message, onCancel }) => {
  return (
    <EuiFlexGroup direction="column" alignItems="center">
      <EuiFlexItem grow={false} className="create-data-set__error-image">
        <img
          src={errorImage}
          alt="Error en el análisis del fichero"
          className="euiIcon"
        />
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
      <EuiFlexItem grow={false}>
        <EuiTitle>
          <h3>No se pudo analizar el fichero</h3>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText>{message}</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton fill onClick={onCancel}>
          Atrás
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CDSError;
