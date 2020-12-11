import { mockResponse } from '../utils';

const mockRegistro = (fixtureFile, responseType, statusCode) => {
  mockResponse(
    'POST',
    'https://cognito-idp.us-east-2.amazonaws.com/',
    fixtureFile,
    responseType,
    statusCode,
    'signUp'
  );
};

export const registroConExito = () => {
  mockRegistro('authentication/registro-responses', 'success', 200);
}