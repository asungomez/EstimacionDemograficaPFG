import { EuiLink } from '@elastic/eui';
import React from 'react';

const Footer: React.FC<{}> = () => (
  <>
    <EuiLink
      href="https://github.com/asungomez/EstimacionDemograficaPFG"
      target="_blank"
    >
      Github
    </EuiLink>
    <EuiLink
      href="https://descargas.uned.es/publico/pdf/Politica_privacidad_UNED.pdf"
      target="_blank"
    >
      Política de privacidad
    </EuiLink>
  </>
);

export default Footer;
