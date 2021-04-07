import {
  EuiAccordion,
  EuiCheckbox,
  EuiCode,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';
import React from 'react';

import { DataArrayType } from '../../../../../../../parser/Parser';
import CDSFileContents from '../../CDSFileContents/CDSFileContents';

export type CDSReadFileSelectArrayItemProps = {
  index: number;
  isSelected: boolean;
  array: DataArrayType;
  onSelect: () => void;
};

const CDSReadFileSelectArrayItem: React.FC<CDSReadFileSelectArrayItemProps> = ({
  index,
  isSelected,
  array,
  onSelect,
}) => {
  const onClick = () => {
    if (!isSelected) {
      onSelect();
    }
  };

  return (
    <EuiPanel>
      <EuiCheckbox
        id={`checkbox-array-${index}`}
        onChange={onClick}
        label={<EuiCode>{array.path.join('.')}</EuiCode>}
        checked={isSelected}
      />
      <EuiSpacer />
      <EuiAccordion id={`accordion-array-${index}`} buttonContent="Contenido">
        <CDSFileContents contents={{ content: array.data }} />
      </EuiAccordion>
    </EuiPanel>
  );
};

export default CDSReadFileSelectArrayItem;
