import { createContext, useContext } from 'react';

import { User } from '../models/User';

export type AuthenticationContextType = {
  isAuthenticated: boolean;
  userHasAuthenticated: (auth: boolean) => void;
  user: User;
  setUser: (user: User) => void;
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
