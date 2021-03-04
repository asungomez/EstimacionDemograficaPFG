import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import AuthenticationService from "../services/AuthenticationService/AuthenticationService";

const useLogout = () : () => void => {
  const { userHasAuthenticated } = useAuthenticationContext();
  const logOut = () => {
    AuthenticationService.logOut()
      .then(() => {
        userHasAuthenticated(false);
      })
      .catch(() => { });
  };
  return logOut;
};

export default useLogout;