import React from 'react';

const Announcement: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Announcements</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <p className="text-sm sm:text-base text-gray-600">
          No announcements at this time. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default Announcement;