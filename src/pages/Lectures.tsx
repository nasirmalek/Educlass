import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface Lecture {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

interface LecturesProps {
  classId: string;
  // Add other props here if any
}

const Lectures: React.FC<LecturesProps> = ({ classId }) => {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    // Fetch lectures from the database or API
    const fetchLectures = async () => {
      // Replace with your data fetching logic
      const fetchedLectures: Lecture[] = [
        {
          id: '1',
          title: 'Introduction to React',
          description: 'Learn the basics of React.',
          videoUrl: 'https://www.example.com/video1.mp4',
        },
        {
          id: '2',
          title: 'Advanced React Patterns',
          description: 'Explore advanced patterns in React.',
          videoUrl: 'https://www.example.com/video2.mp4',
        },
      ];
      setLectures(fetchedLectures);
    };

    fetchLectures();
  }, [classId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lectures</h1>
      </div>

      {lectures.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty state */}
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lectures available</h3>
            <p className="text-gray-500 text-center">
              Select a class to view its lectures
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{lecture.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{lecture.description}</p>
              <video controls className="w-full rounded-md">
                <source src={lecture.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lectures;