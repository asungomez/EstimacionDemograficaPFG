import { mockResponse } from '../utils';

const mockLogin = (fixtureFile, responseType, statusCode) => {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    fixtureFile,
    responseType,
    statusCode,
    'login'
  );
};

export const iniciarSesionUsuarioNoConfirmado = () => {
  mockLogin('authentication/iniciar-sesion-responses', 'noConfirmado', 400);
}