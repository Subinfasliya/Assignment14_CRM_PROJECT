// import { createContext, useContext, useEffect, useState } from "react";
// import authApi from "../api/authApi";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading,setLoading] = useState(true)

//   const getCurrentUser = async() =>{
//     try{
//      const resposne = await authApi.get("/me")
//      console.log(resposne.data.user);

//     } catch(error){
//       setUser(null)
//     } finally{
//       setLoading(false)
//     }
//   }

//   useEffect(()=> {
//     getCurrentUser()
//   }, [])

//   const [token, setToken] = useState(() => {
//     return localStorage.getItem("token");
//   });

//   const login = (data) => {
//    localStorage.setItem("token", data.token)

//    localStorage.setItem("user", JSON.stringify(data.user))

//    setToken(data.token)
//    setUser(data.user)
//   };

//   const logout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")

//     setToken(null)
//     setUser(null)
//   };

//   const isAuthenticated = !!token

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, user, setUser, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, refreshUser } from "../services/authService";
import { clearAccessToken, setAccessToken } from "../auth/tokenStore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      setLoading(true);

      const response = await loginUser(credentials);

      const { accessToken, user } = response;

      setAccessToken(accessToken);
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

  const logout = async () => {
    try {
      const response = await logoutUser();
      console.log(response.message);
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  const refreshSession = async () => {
    try {
      const response = await refreshUser();

      const { accessToken, user } = response;

      setAccessToken(accessToken);
      setUser(user);

      return accessToken;
    } catch (error) {
      clearAccessToken();
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshSession();
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
