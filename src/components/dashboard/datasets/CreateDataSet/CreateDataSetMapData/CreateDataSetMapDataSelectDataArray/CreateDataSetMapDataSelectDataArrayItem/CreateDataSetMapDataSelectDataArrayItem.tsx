import {
  EuiAccordion,
  EuiCheckbox,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';
import React from 'react';

import CreateDataSetFileContents from '../../../CreateDataSetConfirmation/CreateDataSetFileContents/CreateDataSetFileContents';
import { DataArrayType } from '../CreateDataSetMapDataSelectDataArray';

export type CreateDataSetMapDataSelectDataArrayItemProps = {
  index: number;
  isSelected: boolean;
  array: DataArrayType;
  onSelect: (index: number) => void;
};

const CreateDataSetMapDataSelectDataArrayItem: React.FC<CreateDataSetMapDataSelectDataArrayItemProps> = ({
  index,
  isSelected,
  array,
  onSelect,
}) => (
  <EuiPanel paddingSize="s">
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="row" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiCheckbox
              id={`array_${index}_checkbox`}
              checked={isSelected}
              onChange={e => {
                if (e.target.checked) {
                  onSelect(index);
                }
              }}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiCode>{array.path.join('.')}</EuiCode>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiAccordion
          id={`array_${index}_accordion`}
          buttonContent="Ver elementos del arreglo"
        >
          <EuiSpacer />
          <CreateDataSetFileContents data={array.data} />
        </EuiAccordion>
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPanel>
);

export default CreateDataSetMapDataSelectDataArrayItem;
