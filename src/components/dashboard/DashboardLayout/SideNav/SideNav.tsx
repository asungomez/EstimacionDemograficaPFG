import { EuiSideNav } from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SideNav: React.FC<{}> = () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const history = useHistory();

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const menuItems = [
    {
      name: 'Datos',
      id: 'data-sets',
      onClick: () => history.push('/panel/datos'),
      items: [
        {
          name: 'Crear conjunto de datos',
          id: 'create-data-sets',
          onClick: () => history.push('/panel/datos/crear'),
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
