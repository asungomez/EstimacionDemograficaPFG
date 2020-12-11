import { mockRedirect, mockResponse } from '../utils';
import config from '../../utils/config';

const mockConfirmacion = (destination) => {
  mockRedirect('GET', config.apiBaseUrl + '/accounts/validate?*', 302, destination, 'confirmation');
};

const mockReenvioConfirmacion = (fixtureFile, responseType, statusCode) => {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    fixtureFile,
    responseType,
    statusCode,
    'resendConfirmation'
  );
};

export const confirmacionConExito = () => {
  mockConfirmacion(config.appBaseUrl + '/iniciar-sesion/?message=confirmed');
};

export const confirmacionConUsuarioInvalido = () => {
  mockConfirmacion(config.appBaseUrl + '/error/?message=usuario_no_existe');
};

export const confirmacionConUsuarioConfirmado = () => {
  mockConfirmacion(config.appBaseUrl + '/iniciar-sesion/?message=confirmed');
};

export const reenvioConfirmacionConExito = () => {
  mockReenvioConfirmacion('authentication/reenvio-confirmacion-responses', 'success', 200);
};

export const reenvioConfirmacionYaConfirmado = () => {
  mockReenvioConfirmacion('authentication/reenvio-confirmacion-responses', 'yaConfirmado', 400);
};

export const reenvioConfirmacionLimiteSuperado = () => {
  mockReenvioConfirmacion('authentication/reenvio-confirmacion-responses', 'limiteSuperado', 400);
};