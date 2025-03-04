import React from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';

const ClassDetails: React.FC = () => {
  return (
    
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    
  );
};

export default ClassDetails;