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
import AuthenticationRouter from '../../../routers/AuthenticationRouter';
import Footer from './Footer/Footer';

const AuthenticationLayout: React.FC<{}> = () => (
  <div className="landing-container scroll-landing">
    <EuiFlexGroup
      direction="row"
      alignItems="flexStart"
      wrap
      className="landing-page-wrapper"
    >
      <EuiFlexItem>
        <div className="titlePane-panel" />
        <EuiTitle size="m" className="landing-container-title">
          <h3>UNED</h3>
        </EuiTitle>
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
                  src={sideImage}
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
