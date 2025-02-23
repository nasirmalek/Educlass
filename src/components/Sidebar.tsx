import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LayoutDashboard, BookOpen, FileText, TestTube2, Users2, Menu } from 'lucide-react';

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/classes', icon: Users2, label: 'Classes' },
    { to: '/lectures', icon: BookOpen, label: 'Lectures' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/tests', icon: TestTube2, label: 'Tests' },
  ];

  if (!user) return null;

  return (
    <aside className={`w-64 bg-white border-r border-gray-200 min-h-screen ${isOpen ? 'block' : 'hidden'} md:block`}>
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-8 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transform hover:scale-[1.01] transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;