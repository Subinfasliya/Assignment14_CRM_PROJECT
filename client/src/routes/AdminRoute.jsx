import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import AuthLoading from "../components/AuthLoading";

const AdminRoute = () => {
  const {
    user,
    loading,
  } = useAuth();

  
  // Wait for authentication

  if (loading) {
    return <AuthLoading message={"Loading..."}/>
  }

  // Not logged in
  
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  
  // Logged in but not admin

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/app"
        replace
      />
    );
  }

  return <Outlet />;
};

export default AdminRoute;