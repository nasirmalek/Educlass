import React from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const showSidebar = location.pathname.includes('/classes');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
