import React, { createContext, useEffect, useState } from "react";
import { ICredentials, IUser } from "../types";
import { login as APILogin } from "../api/auth.api";
import jwt_decode from "jwt-decode";
import useSessionStorage from "../hooks/useSessionStorage";
import { AUTH_STORAGE_KEY } from "../constants/auth.constants";
import axios from "axios";
type AuthState = {
  user: IUser | null;
};

type AuthContextType = {
  state: AuthState;
  login: (crendentials: ICredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  errorLogin: boolean;
  setUser: (token: string) => void;
};

const initialState: AuthState = {
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  login: () => {
    return new Promise((resolve) => {
      resolve();
    });
  },
  logout: () => {},
  setUser: () => {},
  isLoading: true,
  errorLogin: false,
});

interface AuthProviderInterface {}

const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const { getStoredData, setStoredData, deleteStoredData } = useSessionStorage(
    AUTH_STORAGE_KEY
  );

  const setTokenInAxiosHeaders = (token: string) => {
    axios.defaults.headers.common[process.env.HTTP_TOKEN_HEADER!] = token;
  };

  const login = async (credentials: ICredentials) => {
    try {
      const token = await APILogin(credentials);
      const user: IUser = jwt_decode(token);
      setStoredData(token);
      setTokenInAxiosHeaders(token);
      setState({ ...state, user });
      setIsLoading(false);
    } catch (error) {
      setErrorLogin(true);
    }
  };
  const logout = () => {
    deleteStoredData();
    setState({ ...state, user: null });
  };

  const setUser = (token: string) => {
    const decode: IUser = jwt_decode(token);
    setState({ ...state, user: decode });
  };

  // Auto auth if token stored
  useEffect(() => {
    const storedToken = getStoredData();
    if (storedToken) {
      setTokenInAxiosHeaders(storedToken);
      const user: IUser = jwt_decode(storedToken);
      setState((s) => ({ ...s, user }));
    }
    setIsLoading(false);
  }, [getStoredData]);

  return (
    <AuthContext.Provider
      value={{ state, login, logout, setUser, isLoading, errorLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
