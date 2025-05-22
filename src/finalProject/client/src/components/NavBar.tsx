import React from 'react';
import { NavLink } from 'react-router';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-bold underline' : 'hover:underline'
            }
          >
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;