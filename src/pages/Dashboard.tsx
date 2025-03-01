import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Classes from './Classes';
import Lectures from './Lectures';
import Assignments from './Assignments';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [view, setView] = useState<'classes' | 'lectures' | 'assignments'>('classes');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const handleViewChange = (newView: 'classes' | 'lectures' | 'assignments', classId?: string) => {
    setView(newView);
    if (classId) {
      setSelectedClassId(classId);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">{user?.email}</p>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          {view === 'classes' && <Classes onViewChange={handleViewChange} />}
          {view === 'lectures' && selectedClassId && (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg transition-all duration-300">
              <button
                onClick={() => handleViewChange('classes')}
                className="mb-4 px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform hover:scale-105 transition-all duration-200"
              >
                Back to Classes
              </button>
              <div className="overflow-auto max-h-[100vh]">
                <Lectures classId={selectedClassId} />
              </div>
            </div>
          )}
          {view === 'assignments' && selectedClassId && (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg transition-all duration-300">
              <button
                onClick={() => handleViewChange('classes')}
                className="mb-4 px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform hover:scale-105 transition-all duration-200"
              >
                Back to Classes
              </button>
              <div className="overflow-auto max-h-[75vh]">
                <Assignments classId={selectedClassId} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
