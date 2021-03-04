import { mockRedirect, mockResponse } from '../utils';
import config from '../../utils/config';

const mockConfirmacion = (destination) => {
  mockRedirect('GET', config.apiBaseUrl + '/accounts/validate?*', 302, destination, 'confirmation');
};

const mockReenvioConfirmacion = (responseType, statusCode) => {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    'authentication/reenvio-confirmacion-responses',
    responseType,
    statusCode,
    'resendConfirmation'
  );
};

export const confirmacionConExito = () => mockConfirmacion(
    config.appBaseUrl + '/iniciar-sesion/?message=confirmed'
  );

export const confirmacionConUsuarioInvalido = ()  => mockConfirmacion(
    config.appBaseUrl + '/error/?message=usuario_no_existe'
  );

export const confirmacionConUsuarioConfirmado = ()  => mockConfirmacion(
    config.appBaseUrl + '/iniciar-sesion/?message=confirmed'
  );

export const confirmacionConEnlaceCaducado = (
    email = 'some@email.com'
  ) => mockConfirmacion(
      config.appBaseUrl + '/error/?message=confirmacion_fallida&email='+email
    );

export const reenvioConfirmacionConExito = () => mockReenvioConfirmacion(
    'success', 
    200
  );

export const reenvioConfirmacionYaConfirmado = () => mockReenvioConfirmacion(
    'yaConfirmado', 
    400
  );

export const reenvioConfirmacionLimiteSuperado = () => mockReenvioConfirmacion(
    'limiteSuperado', 
    400
  );