import { EuiLink } from '@elastic/eui';
import React from 'react';
import { useHistory } from 'react-router';

const isModifiedEvent = (event: any) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = (event: any) => event.button === 0;

const isTargetBlank = (event: any) => {
  const target = event.target.getAttribute('target');
  return target && target !== '_self';
};

type EuiCustomLinkProps = {
  to: string;
  [prop: string]: any;
};

const EuiCustomLink: React.FC<EuiCustomLinkProps> = ({ to, ...rest }) => {
  const history = useHistory();

  function onClick(event: any) {
    if (event.defaultPrevented) {
      return;
    }

    // Let the browser handle links that open new tabs/windows
    if (
      isModifiedEvent(event) ||
      !isLeftClickEvent(event) ||
      isTargetBlank(event)
    ) {
      return;
    }

    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault();

    // Push the route to the history.
    history.push(to);
  }

  // Generate the correct link href (with basename accounted for)
  const href = history.createHref({ pathname: to });

  const props = { ...rest, href, onClick };
  return <EuiLink {...props} />;
};

export default EuiCustomLink;
