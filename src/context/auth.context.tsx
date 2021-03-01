import React, { createContext, useEffect, useState } from "react";
import { ICredentials, IUser } from "../types";
import { login as APILogin } from "../api/auth.api";
import jwt_decode from "jwt-decode";
import useSessionStorage from "../hooks/useSessionStorage";
import { AUTH_STORAGE_KEY } from "../constants/auth.constants";

type AuthState = {
  user: IUser | null;
};

type AuthContextType = {
  state: AuthState;
  login: (crendentials: ICredentials) => void;
};

const initialState: AuthState = {
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  login: () => {},
});

interface AuthProviderInterface {}

const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { getStoredData, setStoredData } = useSessionStorage(AUTH_STORAGE_KEY);

  const login = async (credentials: ICredentials) => {
    try {
      const token = await APILogin(credentials);
      const user: IUser = jwt_decode(token);
      setStoredData(token);
      setState({ ...state, user });
    } catch (error) {
      console.log("Error on authenticate user", error);
    }
  };

  // Auto auth if token stored
  useEffect(() => {
    const storedToken = getStoredData();
    if (storedToken) {
      const user: IUser = jwt_decode(storedToken);
      setState({ ...state, user });
    }
  }, [getStoredData, state]);

  return (
    <AuthContext.Provider value={{ state, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
