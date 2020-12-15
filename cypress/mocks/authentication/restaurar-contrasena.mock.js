import { mockResponse } from '../utils';

const mockSolicitarRestaurar = (responseType, statusCode) =>  {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    'authentication/restaurar-contrasena-responses',
    responseType,
    statusCode,
    'requestResetPassword'
  );
};

const mockReenvio = (responseType, statusCode) =>  {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    'authentication/restaurar-contrasena-responses',
    responseType,
    statusCode,
    'resendPasswordMail'
  );
};

const mockRestaurarContrasena = (responseType, statusCode) =>  {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    'authentication/restaurar-contrasena-responses',
    responseType,
    statusCode,
    'resetPassword'
  );
};

export const solicitarConExito = () => mockSolicitarRestaurar('solicitudConExito', 200);

export const solicitarUsuarioNoExiste = () => mockSolicitarRestaurar('solicitudUsuarioNoExiste', 400);

export const solicitarUsuarioNoConfirmado = () => mockSolicitarRestaurar('solicitudUsuarioNoConfirmado', 400);

export const reenviarCorreoConExito = () => mockReenvio('reenvioConExito', 200);

export const restaurarContrasenaCodigoCaducado = () => mockRestaurarContrasena('restaurarContrasenaCodigoCaducado', 400);

export const restaurarContrasenaUsuarioNoExiste = () => mockRestaurarContrasena('restaurarContrasenaUsuarioNoExiste', 400);

export const restaurarContrasenaConExito = () => mockRestaurarContrasena('restaurarContrasenaConExito', 200);