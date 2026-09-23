import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, refreshUser } from "../services/authService";
import { clearAccessToken, setAccessToken } from "../auth/tokenStore";

const AuthContext = createContext(null);
let authInitializationPromise = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //login
  const login = async (credentials) => {
    try {
      setLoading(true);

      const response = await loginUser(credentials);

      const { accessToken, user } = response;

      //Store access token in memory
      setAccessToken(accessToken);

      // Store logged-in user in React state
      setUser(user);

      return {
        success: true,
        message: response?.message,
        user,
      };
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const response = await refreshUser();

      const { accessToken, user } = response;

      setAccessToken(accessToken);
      setUser(user);

      // return accessToken;

      return {
        success: true,
        user,
      };
    } catch (error) {
      clearAccessToken();
      setUser(null);
      throw error;
    }
  };

  //logout
  const logout = async () => {
    try {
      const response = await logoutUser();
      console.log(response.message);
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  // Initial Authentication
  useEffect(() => {
    const initializeAuth = async () => {
      if (!authInitializationPromise) {
        authInitializationPromise = refreshSession().finally(() => {
          authInitializationPromise = null;
        });
      }
      try {
        await authInitializationPromise;
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
