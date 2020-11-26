import { Auth } from 'aws-amplify';
import { User } from '../models/User';
import { mapCognitoAttributes } from './utils/AuthenticationServiceMappings';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';

class AuthenticationService {
  public static async checkAuthentication(): Promise<any> {
    try {
      const response = await Auth.currentSession();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getUserAttributes(): Promise<User> {
    try {
      const info = await Auth.currentUserInfo();
      return Promise.resolve(mapCognitoAttributes(info.attributes));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public static async logIn(email: string, password: string): Promise<CognitoUser> {
    try {
      const user = await Auth.signIn(email, password);
      return Promise.resolve(user);
    } catch (error) {
      if (error.code === 'UserNotFoundException') {
        error.message = 'El usuario especificado no existe';
      } else if (error.code === 'UserNotConfirmedException') {
        error.message = 'Necesitas confirmar tu dirección de email para iniciar sesión';
      }
      else if(error.code === 'NetworkError'){
        error.message = 'No hay conexión a Internet';
      }
      else {
        error.message = 'Error interno';
      }
      return Promise.reject(error);
    }
  }

  public static async logOut(): Promise<any> {
    try {
      const response = await Auth.signOut();
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public static async requestResetPassword(email: string) : Promise<void> {
    try {
      await Auth.forgotPassword(email);
      return Promise.resolve();
    }
    catch(e) {
      if (e.code === 'NetworkError') {
        e.message = 'No hay conexión a Internet';
      }
      else {
        e.message = 'Error interno';
      }
      return Promise.reject(e);
    }
  };

  public static async resendConfirmationMessage(email: string): Promise<string> {
    try {
      const response = await Auth.resendSignUp(email);
      return Promise.resolve(response);
    }
    catch (e) {
      if (e.code === 'NetworkError') {
        e.message = 'No hay conexión a Internet';
      }
      else if (e.message.includes('limit exceeded')) {
        e.message = 'Límite de intentos superado, inténtalo de nuevo más tarde';
      }
      else if (e.message.includes('already confirmed')) {
        e.message = 'Tu cuenta de usuario ya se encuentra confirmada';
        e.code = 'AlreadyConfirmed';
      }
      else {
        e.message = 'Error interno';
      }
      return Promise.reject(e);
    }
  }

  public static async signUp(email: string, password: string): Promise<ISignUpResult> {
    try {
      const response = await Auth.signUp(email, password);
      return Promise.resolve(response);
    }
    catch (e) {
      if (e.code === 'InvalidParameterException') {
        if (e.message.includes('password')) {
          e.message = 'La contraseña no es válida';
        }
        else if (e.message.includes('email')) {
          e.message = 'La dirección de email no es válida';
        }
      }
      else if (e.code === 'UsernameExistsException') {
        e.message = 'La dirección de email ya se encuentra registrada';
      }
      else if (e.code === 'NetworkError') {
        e.message = 'No hay conexión a Internet';
      }
      else {
        e.message = 'Error interno';
      }
      return Promise.reject(e);
    }
  }
};

export default AuthenticationService;