import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import AuthLoading from "../components/AuthLoading";

const ProtectedRoute = () => {

    const { user, loading} = useAuth();

    if(loading) {
      return <AuthLoading message={"Checking authentication..."}/>;
    }

    if(!user){
        return <Navigate to={"/"} replace/>
    }

  

  return <Outlet />;
};

export default ProtectedRoute
