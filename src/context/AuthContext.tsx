import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (name: string, lastName: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my_jwt';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (name: string, lastName: string, email: string, password: string) => {
    try {
      const result = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/register/`, {
        name,
        lastName,
        email,
        password,
      });
      if (result.data.token) {
        setAuthState({
          token: result.data.token,
          authenticated: true,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      } else {
        console.error('Token not found in response:', result.data);
      }
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login/`, {
        email,
        password,
      });
      console.log('Login result:', result.data);
      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return result;
    } catch (e) {
      console.error('Login error:', e);
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setAuthState({
        token: null,
        authenticated: false,
      });
      delete axios.defaults.headers.common['Authorization'];
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
