import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  const getCurrentUser = async() =>{
    try{
     const resposne = await authApi.get("/me")
     console.log(resposne.data.user);
     
    } catch(error){
      setUser(null)
    } finally{
      setLoading(false)
    }
  }


  useEffect(()=> {
    getCurrentUser()
  }, [])


  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (data) => {
   localStorage.setItem("token", data.token)
  
   localStorage.setItem("user", JSON.stringify(data.user))

   setToken(data.token)
   setUser(data.user)
  };

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setToken(null)
    setUser(null)
  };

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
