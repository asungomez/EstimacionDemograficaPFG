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

import logo from '../../../../assets/images/logo_uned.svg';
import { useAuthenticationContext } from '../../../../contexts/AuthenticationContext';
import AuthenticationService from '../../../../services/AuthenticationService';
import EuiCustomLink from '../../../common/eui/EuiCustomLink';

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
          <EuiCustomLink to="/panel">
            <EuiHeaderLogo iconType={logo}>
              Estimación demográfica
            </EuiHeaderLogo>
          </EuiCustomLink>
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
              <EuiCustomLink to="/panel/cuenta">
                <EuiButtonEmpty color="text" iconType="user">
                  Perfil
                </EuiButtonEmpty>
              </EuiCustomLink>
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
