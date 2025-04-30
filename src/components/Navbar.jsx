import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeClassName = "bg-white text-indigo-600 shadow-lg";
  const inactiveClassName =
    "hover:bg-indigo-700 hover:bg-opacity-50 text-white text-lg font-semibold px-4 py-2 rounded-md transition-all duration-200";

  return (
    <div className="flex flex-row items-center justify-around bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? activeClassName : inactiveClassName
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive ? activeClassName : inactiveClassName
        }
      >
        Notes
      </NavLink>
    </div>
  );
};

export default Navbar;
