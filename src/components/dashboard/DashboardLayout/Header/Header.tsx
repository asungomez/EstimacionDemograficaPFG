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
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';

import logo from '../../../../assets/images/logo_uned.svg';
import { useAuthenticationContext } from '../../../../contexts/AuthenticationContext';
import AuthenticationService from '../../../../services/AuthenticationService';
import './Header.scss';

const Header: React.FC<{}> = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { userHasAuthenticated, user } = useAuthenticationContext();

  const togglePopover = () => setPopoverOpen(open => !open);

  const logOut = () => {
    AuthenticationService.logOut()
      .then(() => {
        userHasAuthenticated(false);
      })
      .catch(() => {});
  };

  return (
    <EuiHeader position="static">
      <EuiHeaderSection grow side="left">
        <EuiHeaderSectionItem>
          <EuiHeaderLogo iconType={logo}>Estimación demográfica</EuiHeaderLogo>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      <EuiHeaderSection grow={false} side="right">
        <EuiHeaderSectionItem border="left">
          <EuiPopover
            isOpen={popoverOpen}
            closePopover={() => setPopoverOpen(false)}
            anchorPosition="downRight"
            button={
              <EuiHeaderSectionItemButton onClick={togglePopover}>
                <EuiIcon type="gear" />
              </EuiHeaderSectionItemButton>
            }
          >
            <EuiPopoverTitle className="header__email">
              {user.email}
            </EuiPopoverTitle>
            <EuiFlexGroup direction="column" alignItems="flexStart">
              <EuiButtonEmpty color="text" iconType="user">
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
