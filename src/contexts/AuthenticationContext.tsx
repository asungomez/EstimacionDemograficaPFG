import { createContext, useContext } from 'react';

export type AuthenticationContextType = {
  isAuthenticated: boolean;
  userHasAuthenticated: (auth: boolean) => void;
  user: any;
  setUser: (user: any) => void;
};
export const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  userHasAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}
