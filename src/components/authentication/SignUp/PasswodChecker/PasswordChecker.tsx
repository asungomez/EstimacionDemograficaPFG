import { EuiListGroup, EuiListGroupItem } from '@elastic/eui';
import React from 'react';

import { usePasswordContext } from '../../../../contexts/PasswordContext';

export type PasswordCheckerProps = {
  password: string;
};

const PasswordChecker: React.FC<PasswordCheckerProps> = ({ password }) => {
  const { policy } = usePasswordContext();
  const policyItems = policy.map((item, index) => {
    const checked = item.rule.test(password);
    return (
      <EuiListGroupItem
        label={item.message}
        color={checked ? 'primary' : 'subdued'}
        size="s"
        key={index}
        iconType={checked ? 'check' : 'cross'}
      />
    );
  });
  return <EuiListGroup gutterSize="s">{policyItems}</EuiListGroup>;
};

export default PasswordChecker;
