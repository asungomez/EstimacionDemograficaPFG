import { ISignUpResult } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

class AuthenticationService {
  public static async signUp(email: string, password: string) : Promise<ISignUpResult> {
    try {
      const response = await Auth.signUp(email, password);
      return Promise.resolve(response);
    }
    catch(e) {
      if(e.code === 'InvalidParameterException') {
        if(e.message.includes('password')) {
          e.message = 'La contraseña no es válida';
        }
        else if(e.message.includes('email')) {
          e.message = 'La dirección de email no es válida';
        }
      }
      else if(e.code === 'UsernameExistsException') {
        e.message = 'La dirección de email ya se encuentra registrada';
      }
      else if(e.code === 'NetworkError') {
        e.message = 'No hay conexión a Internet';
      }
      return Promise.reject(e);
    }
  }
};

export default AuthenticationService;