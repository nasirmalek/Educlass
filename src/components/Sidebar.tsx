import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { BookOpen, FileText, Menu, X } from 'lucide-react';

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(true);
  const { classId } = useParams<{ classId: string }>();

  if (!user) return null;

  const navItems = [
    { to: `/classes/${classId}/lectures`, icon: BookOpen, label: 'Lectures' },
    { to: `/classes/${classId}/assignments`, icon: FileText, label: 'Assignments' },
    { to: `/classes/${classId}/announcement`, icon: FileText, label: 'Announcements' }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden rounded-md bg-white p-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-auto" aria-hidden="true" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 transform transition-transform duration-200 ease-in-out bg-white border-r border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          
            <button
              type="button"
              onClick={toggleSidebar}
              className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <X className="h-5 w-5" />
            </button>
          

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 ${
                    isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600"
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;