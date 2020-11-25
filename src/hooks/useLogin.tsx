import { useHistory } from 'react-router';

import { useAuthenticationContext } from '../contexts/AuthenticationContext';
import AuthenticationService from '../services/AuthenticationService';

const useLogin = (redirect: string) => {
  const { userHasAuthenticated, setUser } = useAuthenticationContext();
  const history = useHistory();
  const execute = () => {
    AuthenticationService.getUserAttributes().then((attributes: any) => {
      setUser(attributes);
      userHasAuthenticated(true);
      history.push(redirect || '/dashboard');
    });
  };
  return execute;
};

export default useLogin;
