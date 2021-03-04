import { EuiIcon, EuiText, EuiTreeView } from '@elastic/eui';
import { Node } from '@elastic/eui/src/components/tree_view/tree_view';
import React from 'react';

export type CreateDataSetFileContentsProps = {
  data: any;
};

const buildChildrenNodes = (data: any, deep: string): Node[] => {
  const children = [];
  if (typeof data !== 'object') {
    children.push({
      label: data,
      id: `${deep}_0`,
    });
  } else if (Array.isArray(data)) {
    data.forEach((element, index) =>
      children.push({
        label: index,
        id: `${deep}_${index}`,
        children: buildChildrenNodes(element, `${deep}_${index}`),
        icon: <EuiIcon type="arrowRight" />,
        iconWhenExpanded: <EuiIcon type="arrowDown" />,
      })
    );
  } else {
    for (const key in data) {
      const element = data[key];
      children.push({
        label: key,
        id: `${deep}_${key}`,
        children: buildChildrenNodes(element, `${deep}_${key}`),
        icon: <EuiIcon type="arrowRight" />,
        iconWhenExpanded: <EuiIcon type="arrowDown" />,
      });
    }
  }
  return children;
};

const CreateDataSetFileContents: React.FC<CreateDataSetFileContentsProps> = ({
  data,
}) => {
  if (typeof data !== 'object') {
    return <EuiText>{data}</EuiText>;
  }
  return (
    <EuiTreeView
      items={buildChildrenNodes(data, 'tree')}
      aria-label="File contents tree"
      display="compressed"
    />
  );
};

export default CreateDataSetFileContents;
