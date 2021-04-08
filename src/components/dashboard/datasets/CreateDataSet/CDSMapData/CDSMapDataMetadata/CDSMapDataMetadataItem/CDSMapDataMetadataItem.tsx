import {
  EuiAccordion,
  EuiCheckbox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLink,
  EuiListGroup,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

import CDSMapDataMetadataItemName from './CDSMapDataMetadataItemName/CDSMapDataMetadataItemName';

type CDSMapDataMetadataItemProps = {
  name: string;
  items: string[];
  isSelected: boolean;
  onToggle: () => void;
  onRename: (name: string) => void;
};

const CDSMapDataMetadataItem: React.FC<CDSMapDataMetadataItemProps> = ({
  name,
  items,
  isSelected,
  onToggle,
  onRename,
}) => {
  const [renaming, setRenaming] = useState(false);

  const rename = (name: string) => {
    setRenaming(false);
    onRename(name);
  };

  const startRenaming = () => setRenaming(true);
  const cancelRenaming = () => setRenaming(false);

  return (
    <EuiPanel>
      {renaming ? (
        <CDSMapDataMetadataItemName
          name={name}
          onRename={rename}
          onCancel={cancelRenaming}
        />
      ) : (
        <EuiFlexGroup direction="row" alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiCheckbox
              id={`checkbox-metadata-${name}`}
              onChange={onToggle}
              label={name}
              checked={isSelected}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiLink onClick={startRenaming}>
              <EuiFlexGroup
                direction="row"
                gutterSize="xs"
                alignItems="flexStart"
              >
                <EuiFlexItem grow={false}>
                  <EuiIcon type="pencil" />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiText size="xs">Cambiar nombre</EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiLink>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}

      <EuiSpacer />
      <EuiAccordion id={`accordion-text-${name}`} buttonContent="Contenido">
        <EuiListGroup
          listItems={items.map(item => ({
            label: <>{item}</>,
          }))}
        />
      </EuiAccordion>
    </EuiPanel>
  );
};

export default CDSMapDataMetadataItem;
