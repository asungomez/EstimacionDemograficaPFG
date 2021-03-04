import { EuiSideNav } from '@elastic/eui';
import React, { useState } from 'react';

const SideNav: React.FC<{}> = () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const menuItems = [
    {
      name: 'Datos',
      id: 'data-sets',
      onClick: () => {},
      items: [
        {
          name: 'Crear conjunto de datos',
          id: 'create-data-sets',
          onClick: () => {},
        },
      ],
    },
    {
      name: 'Informes',
      id: 'reports',
      onClick: () => {},
      items: [
        {
          name: 'Crear informe',
          id: 'create-report',
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
  );
};

export default SideNav;
