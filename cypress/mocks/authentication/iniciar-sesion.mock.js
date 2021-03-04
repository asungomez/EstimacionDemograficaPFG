import { mockResponse, setRequestAlias } from '../utils';

const mockLogin = (responseType, statusCode) => {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    'authentication/iniciar-sesion-responses',
    responseType,
    statusCode,
    'login'
  );
};

export const iniciarSesionUsuarioNoConfirmado = () => {
  mockLogin('noConfirmado', 400);
};

export const iniciarSesionUsuarioNoExiste = () => {
  mockLogin('noExiste', 400);
};

export const iniciarSesionContrasenaIncorrecta = () => {
  mockLogin('noAutorizado', 400);
};

export const iniciarSesionEstablecerAlias = () => {
  setRequestAlias('POST', 'https://cognito-idp.us-east-2.amazonaws.com/', 'login');
};