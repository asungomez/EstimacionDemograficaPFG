import { mockRedirect, mockResponse } from '../utils';
import config from '../../utils/config';

const mockEditarPerfil = (fixtureFile, responseType, statusCode) => {
  mockResponse(
    'PUT',
    config.apiBaseUrl + '/account/update-profile',
    fixtureFile,
    responseType,
    statusCode,
    'updateProfile'
  );
};

const mockEditarContrasena = (fixtureFile, responseType, statusCode) => {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    fixtureFile,
    responseType,
    statusCode,
    'updatePassword'
  );
};

const mockConfirmacion = (destination) => {
  mockRedirect(
      'GET', 
      config.apiBaseUrl + '/accounts/validate-new-email?*', 
      302, 
      destination, 
      'newEmailConfirmation'
    );
};

export const editarPerfilConExito = () => mockEditarPerfil('authentication/editar-perfil-responses', 'exito', 200);

export const editarPerfilConError = () => mockEditarPerfil('general-responses', 'internalError', 500);

export const editarPerfilEmailYaExiste = () => mockEditarPerfil('authentication/editar-perfil-responses', 'emailYaExiste', 400);

export const editarContrasenaConExito = () => mockEditarContrasena('authentication/editar-perfil-responses', 'exito', 200);

export const enlaceConfirmacionConExito = () => mockConfirmacion(config.appBaseUrl + '/panel/cuenta');

export const enlaceConfirmacionCodigoInvalido = () => mockConfirmacion(config.appBaseUrl + '/error/?message=cambiar_email_codigo_invalido');

export const enlaceConfirmacionCodigoExpirado = () => mockConfirmacion(config.appBaseUrl + '/error/?message=cambiar_email_codigo_expirado');

export const enlaceConfirmacionUsuarioNoExiste = () => mockConfirmacion(config.appBaseUrl + '/error/?message=usuario_no_existe');