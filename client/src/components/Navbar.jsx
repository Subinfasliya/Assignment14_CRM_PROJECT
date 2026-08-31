import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center gap-4 justify-between px-4 py-6 border border-gray-300">
      {/* Logo */}
      <Link
        to={"/"}
        className="text-2xl font-bold cursor-pointer hover:text-blue-500"
      >
        USER MANAGEMENT
      </Link>

      {/* Navigation links */}
      <nav>
        <ul className="flex gap-10 text-md font-semibold">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline"
                  : "hover:text-balck-500 hover:underline"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline"
                  : "hover:text-balck-500 hover:underline"
              }
              to={"/login"}
            
            >
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/register"}
              className={({ isActive }) => isActive ? "text-blue-500 underline" : "hover:text-balck-500 hover:underline"}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
