import { EuiIcon, EuiText, EuiTreeView } from '@elastic/eui';
import { Node } from '@elastic/eui/src/components/tree_view/tree_view';
import React from 'react';

import { FileContents } from '../../../../../../parser/Parser';

const buildChildrenNodes = (data: any, depth: string): Node[] => {
  const children = [];
  if (typeof data !== 'object') {
    children.push({
      label: data,
      id: `${depth}_0`,
    });
  } else if (Array.isArray(data)) {
    data.forEach((element, index) => {
      const elementDepth = `${depth}_${index}`;
      children.push({
        label: '' + index,
        id: elementDepth,
        children: buildChildrenNodes(element, elementDepth),
        icon: <EuiIcon type="arrowRight" />,
        iconWhenExpanded: <EuiIcon type="arrowDown" />,
      });
    });
  } else {
    for (const key in data) {
      const element = data[key];
      const elementDepth = `${depth}_${key}`;
      children.push({
        label: key,
        id: elementDepth,
        children: buildChildrenNodes(element, elementDepth),
        icon: <EuiIcon type="arrowRight" />,
        iconWhenExpanded: <EuiIcon type="arrowDown" />,
      });
    }
  }
  return children;
};

export type CDSFileContentsProps = {
  contents: FileContents;
};

const CDSFileContents: React.FC<CDSFileContentsProps> = ({ contents }) => {
  if (typeof contents.content !== 'object') {
    return <EuiText>{contents.content}</EuiText>;
  }
  return (
    <EuiTreeView
      items={buildChildrenNodes(contents.content, 'tree')}
      aria-label="File contents tree"
      display="compressed"
    />
  );
};

export default CDSFileContents;
