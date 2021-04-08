import {
  EuiAccordion,
  EuiCheckbox,
  EuiListGroup,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';
import React from 'react';

type CDSMapDataAttributeItemProps = {
  dataKey: string;
  items: string[];
  isSelected: boolean;
  onSelect: () => void;
};

const CDSMapDataAttributeItem: React.FC<CDSMapDataAttributeItemProps> = ({
  dataKey,
  items,
  isSelected,
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
        id={`checkbox-text-${dataKey}`}
        onChange={onClick}
        label={dataKey}
        checked={isSelected}
      />
      <EuiSpacer />
      <EuiAccordion id={`accordion-text-${dataKey}`} buttonContent="Contenido">
        <EuiListGroup
          listItems={items.map(item => ({
            label: <>{item}</>,
          }))}
        />
      </EuiAccordion>
    </EuiPanel>
  );
};

export default CDSMapDataAttributeItem;
