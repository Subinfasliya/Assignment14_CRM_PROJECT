import { Navigate, Outlet, useLocation } from "react-router";
import AuthLoading from "../components/AuthLoading";
import HomeSkeleton from "../components/home/HomeSkeleton";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    if (location.pathname === "/") {
      return <HomeSkeleton />;
    }

    return <AuthLoading message={"Checking authentication..."} />;
  }

  // Already logged in
  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
