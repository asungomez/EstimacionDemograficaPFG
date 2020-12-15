import { mockResponse } from '../utils';
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

export const editarPerfilConExito = () => mockEditarPerfil('authentication/editar-perfil-responses', 'exito', 200);

export const editarPerfilConError = () => mockEditarPerfil('general-responses', 'internalError', 500);

export const editarContrasenaConExito = () => mockEditarContrasena('authentication/editar-perfil-responses', 'exito', 200);