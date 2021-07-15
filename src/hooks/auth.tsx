import React, { createContext, ReactNode, useContext, useState } from 'react';
import AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
import Storage from '../utils/Storage';

interface AuthProviderProps {
  children: ReactNode,
}

interface User {
  id: string,
  name: string,
  email: string,
  photo?: string,
}

interface AuthContextData {
  user?: User,
  signInWithGoogle(): Promise<void>,
  signInWithApple(): Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string
  },
  type: string,
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: String(userInfo.id),
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }

        setUser(userLogged);
        Storage.set('@gofinances:user', userLogged);
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined
        };

        setUser(userLogged);
        Storage.set('@gofinances:user', userLogged);
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }} >
      {children}
    </AuthContext.Provider>
  )
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };