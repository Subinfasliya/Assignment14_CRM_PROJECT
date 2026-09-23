import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import ConfirmAlert from "./ConfirmAlert";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
      toast.success("You have been logged out successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Logout failed. You have been signed out locally.",
      );
    } finally {
      setShowLogoutAlert(false);
      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4 border border-gray-300 px-4 py-6">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-blue-500"
        >
          USER MANAGEMENT
        </Link>

        <nav>
          <ul className="flex gap-10 text-md font-semibold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 underline"
                    : "hover:text-blue-500 hover:underline"
                }
              >
                Home
              </NavLink>
            </li>

            {user ? (
              <li>
                <button
                  type="button"
                  onClick={() => setShowLogoutAlert(true)}
                  className="hover:text-red-600 hover:underline"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 underline"
                        : "hover:text-blue-500 hover:underline"
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 underline"
                        : "hover:text-blue-500 hover:underline"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <ConfirmAlert
        open={showLogoutAlert}
        title="Log out?"
        message="Are you sure you want to log out of your account?"
        confirmLabel="Yes, log out"
        cancelLabel="Stay signed in"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutAlert(false)}
        loading={loggingOut}
      />
    </>
  );
};

export default Navbar;
