import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { GraduationCap } from 'lucide-react';
import Notifications from './Notifications';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduClass</span>
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Notifications />
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;