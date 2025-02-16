import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats cards will go here */}
        <div className="bg-white p-6 rounded-lg shadowtransform hover:scale-[1.01] transition-all duration-200">
          <h2 className="text-lg font-semibold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;