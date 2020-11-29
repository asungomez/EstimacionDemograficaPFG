import { EuiSideNav } from '@elastic/eui';
import React, { useState } from 'react';

const SideNav : React.FC<{}> = () => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const menuItems = [
    {
      name: 'Datos',
      id: 0,
      items: [
        {
          name: 'Lorem',
          id: 1,
          onClick: () => {},
        },
        {
          name: 'Ipsum',
          id: 2,
          onClick: () => {},
        },
      ],
    },
    {
      name: 'Informes',
      id: 3,
      items: [
        {
          name: 'Lorem',
          id: 4,
          onClick: () => {},
        },
        {
          name: 'Ipsum',
          id: 5,
          onClick: () => {},
        },
      ],
    },
  ];

  return (
    <EuiSideNav 
      className="side-nav"
      toggleOpenOnMobile={() => toggleOpenOnMobile()}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={menuItems}
    />
  )
};

export default SideNav;