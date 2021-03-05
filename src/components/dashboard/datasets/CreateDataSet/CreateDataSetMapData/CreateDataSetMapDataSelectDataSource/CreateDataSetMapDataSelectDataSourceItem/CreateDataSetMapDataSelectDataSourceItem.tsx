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
import { DataArrayType } from '../CreateDataSetMapDataSelectDataSource';

export type CreateDataSetMapDataSelectDataSourceItemProps = {
  index: number;
  isSelected: boolean;
  array: DataArrayType;
  onSelect: (index: number) => void;
};

const CreateDataSetMapDataSelectDataSourceItem: React.FC<CreateDataSetMapDataSelectDataSourceItemProps> = ({
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

export default CreateDataSetMapDataSelectDataSourceItem;
