import './Header.scss';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPopover,
  EuiPopoverTitle,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../../../assets/images/logo_uned.svg';
import { useAuthenticationContext } from '../../../../contexts/AuthenticationContext';
import useLogout from '../../../../hooks/useLogout';

const Header: React.FC<{}> = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { user } = useAuthenticationContext();
  const history = useHistory();
  const logOut = useLogout();

  const togglePopover = () => setPopoverOpen(open => !open);

  return (
    <EuiHeader position="static">
      <EuiHeaderSection grow side="left">
        <EuiHeaderSectionItem>
          <EuiHeaderLogo iconType={logo} onClick={() => history.push('/panel')}>
            Estimación demográfica
          </EuiHeaderLogo>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      <EuiHeaderSection grow={false} side="right">
        <EuiHeaderSectionItem border="left">
          <EuiPopover
            isOpen={popoverOpen}
            closePopover={() => setPopoverOpen(false)}
            anchorPosition="downRight"
            button={
              <EuiHeaderSectionItemButton
                onClick={togglePopover}
                aria-label="Opciones"
              >
                <EuiIcon type="gear" />
              </EuiHeaderSectionItemButton>
            }
          >
            <EuiPopoverTitle className="header__email">
              {user.email}
            </EuiPopoverTitle>
            <EuiFlexGroup direction="column" alignItems="flexStart">
              <EuiButtonEmpty
                color="text"
                iconType="user"
                onClick={() => {
                  history.push('/panel/cuenta');
                  setPopoverOpen(false);
                }}
              >
                Perfil
              </EuiButtonEmpty>
              <EuiButtonEmpty color="text" iconType="exit" onClick={logOut}>
                Cerrar sesión
              </EuiButtonEmpty>
            </EuiFlexGroup>
          </EuiPopover>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

export default Header;
