import './Home.scss';

import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui';
import React from 'react';

import welcomeImage from '../../../assets/images/welcome_image.svg';

const Home: React.FC<{}> = () => {
  return (
    <>
      <EuiFlexGroup
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <EuiFlexItem grow={false} className="home__welcome-image">
          <img
            src={welcomeImage}
            alt="Bienvenido a Estimación Demográfica"
            className="euiIcon"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
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
        <EuiFlexItem grow={false}>
          <EuiTitle size="m">
            <h3 style={{ textAlign: 'center' }}>
              Bienvenido a Estimación Demográfica
            </h3>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill>
            Crear conjunto de datos
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default Home;
