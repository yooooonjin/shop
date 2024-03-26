import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuthState, signin, signout } from '../api/auth';
import { User } from '../components/Header';

type Auth = {
  user: User | null;
  signin: (callback?: () => void) => void;
  signout: (callback?: () => void) => void;
};

const AuthContext = createContext<Auth>({
  user: null,
  signin: () => {},
  signout: () => {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const handleSingin = async (callback?: () => void) => {
    signin().then((user) => {
      setUser(user);
      callback && callback();
    });
  };

  const handleSingout = (callback?: () => void) => {
    signout().then(() => {
      setUser(null);
      callback && callback();
    });
  };

  const handleAuthState = () => {
    getAuthState(setUser);
  };

  useEffect(() => {
    handleAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signin: handleSingin,
        signout: handleSingout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
