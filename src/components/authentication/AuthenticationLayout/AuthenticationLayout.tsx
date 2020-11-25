import './AuthenticationLayout.scss';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';

import sideImage from '../../../assets/images/authentication_image.svg';
import lockImage from '../../../assets/images/lock.svg';
import AuthenticationRouter from '../../../routers/AuthenticationRouter';
import Footer from './Footer/Footer';

export type AuthenticationLayoutProps = {
  error?: boolean;
};

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
  error = false,
}) => (
  <div className="landing-container scroll-landing">
    <EuiFlexGroup
      direction="row"
      alignItems="flexStart"
      wrap
      className="landing-page-wrapper"
    >
      <EuiFlexItem>
        <div className="titlePane-panel" />
      </EuiFlexItem>
      <EuiFlexItem className="landing-container-body">
        <EuiFlexGroup
          gutterSize="xl"
          alignItems="center"
          justifyContent="center"
          direction="row"
          wrap
          className="authentication-page-container"
        >
          <EuiFlexItem grow={false} className="authentication-feed-container">
            <EuiFlexGroup
              gutterSize="l"
              alignItems="center"
              justifyContent="center"
              direction="column"
              responsive
              className="landing-image landingImage-unedIcon"
            >
              <EuiFlexItem>
                <img
                  src={error ? lockImage : sideImage}
                  alt="Estimación Demográfica"
                  className="euiIcon"
                />
                <EuiSpacer size="m" />
                <EuiTitle size="m">
                  <h3>PFG Estimación demográfica</h3>
                </EuiTitle>

                <EuiText color="subdued" size="xs" textAlign="center">
                  Imagen creada por{' '}
                  <a
                    href="https://www.freepik.es/vectores/datos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    stories
                  </a>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false} className="authentication-form-container">
            <AuthenticationRouter />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem className="landing-container-wrapper-footer">
        <Footer />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);

export default AuthenticationLayout;
