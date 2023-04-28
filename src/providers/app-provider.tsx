import { User } from '@/types/User';
import React from 'react';

export interface AppContextProps {
  isLoading?: boolean;
  user?: User;
  loadJwtFromStorage: () => any;
  saveJwtToStorage: (token: string) => void;
  clearJwtFromStorage: () => void;
  token?: string;
}

export const AppContext = React.createContext<AppContextProps>({
  loadJwtFromStorage: () => {},
  saveJwtToStorage: (_: string) => {},
  clearJwtFromStorage: () => {},
});

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [token, setToken] = React.useState<string | undefined>();
  const [user, setUser] = React.useState<User | undefined>();

  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  const loadJwtFromStorage = () => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt-auth-token');
    setToken(jwt || undefined);

    if (jwt) {
      const payload = parseJwt(jwt);

      if (payload.user) {
        setUser(payload.user);
      }
    }

    setIsLoading(false);

    return jwt;
  };

  const saveJwtToStorage = (jwt: string) => {
    localStorage.setItem('jwt-auth-token', jwt);
    setToken(jwt);

    if (jwt) {
      const payload = parseJwt(jwt);

      if (payload.user) {
        setUser(payload.user);
      }
    }
  };

  const clearJwtFromStorage = () => {
    localStorage.removeItem('jwt-auth-token');
    setToken(undefined);
    setUser(undefined);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          clearJwtFromStorage,
          saveJwtToStorage,
          loadJwtFromStorage,
          isLoading,
          user,
          token,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AppProvider;
