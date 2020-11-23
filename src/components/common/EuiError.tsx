import { EuiCallOut } from '@elastic/eui';
import React from 'react';

export type EuiErrorProps = {
  error: string;
};

const EuiError: React.FC<EuiErrorProps> = ({ error }) => (
  <EuiCallOut color="danger" iconType="alert" title={error} />
);

export default EuiError;
