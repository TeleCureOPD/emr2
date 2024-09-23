import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        {user?.role === 'admin' && (
          <li>
            <Link to="/signup" className="text-white">Sign Up</Link>
          </li>
        )}
        <li>
          <Link to="/login" className="text-white">Login</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/data-entry" className="text-white">Data Entry</Link>
            </li>
            <li>
              <Link to="/workers" className="text-white">Worker Management</Link>
            </li>
            <li>
              <Link to="/patients" className="text-white">Patient Management</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;