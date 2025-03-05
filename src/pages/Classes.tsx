import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Plus, KeyRound, BookOpen } from 'lucide-react';
import { RootState } from '../store/store';
import { Class, ClassInput } from '../types/class';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface ClassesProps {
  onViewChange: (newView: 'classes' | 'lectures' | 'assignments') => void;
}

const Classes: React.FC<ClassesProps> = ({ onViewChange }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classCode, setClassCode] = useState('');
  const [newClass, setNewClass] = useState<ClassInput>({
    name: '',
    description: '',
  });
  const navigate = useNavigate();

  const fetchClasses = async () => {
    setLoading(true);
    try {
      let q;
      if (user?.role === 'teacher') {
        q = query(collection(db, 'classes'), where('teacherId', '==', user.id));
      } else {
        q = query(collection(db, 'classes'), where('students', 'array-contains', user?.id));
      }
      const querySnapshot = await getDocs(q);
      const classesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Class));
      setClasses(classesData);
    } catch (error) {
      setError('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'classes'), {
        name: newClass.name,
        description: newClass.description,
        teacherId: user?.id,
        students: [],
        code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date(),
      });
      setShowCreateModal(false);
      setNewClass({ name: '', description: '' });
      fetchClasses();
    } catch (error) {
      setError('Failed to create class');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'classes'), where('code', '==', classCode));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error('Class not found');
      }
      const classDoc = querySnapshot.docs[0];
      const classData = classDoc.data() as Class;
      await updateDoc(doc(db, 'classes', classDoc.id), {
        students: [...classData.students, user?.id],
      });
      setShowJoinModal(false);
      setClassCode('');
      fetchClasses();
    } catch (error) {
      setError('Failed to join class');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user]);

  const renderActionButton = () => {
    if (!user) return null;

    if (user.role === 'teacher') {
      return (
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white text-sm sm:text-base rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Class
        </button>
      );
    }

    return (
      <button
        onClick={() => setShowJoinModal(true)}
        className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white text-sm sm:text-base rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
      >
        <KeyRound className="h-4 w-4 mr-2" />
        Join Class
      </button>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Classes</h1>
        <div className="flex gap-4">{renderActionButton()}</div>
      </div>

      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 border-l-4 border-red-400 text-sm sm:text-base text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-all duration-200"
              onClick={() => navigate(`/classes/${classItem.id}`)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {classItem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">{classItem.description}</p>
                  {user?.role === 'teacher' && (
                    <p className="text-xs sm:text-sm text-gray-500">
                      Class Code: <span className="font-mono font-medium text-gray-900">{classItem.code}</span>
                    </p>
                  )}
                </div>
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Join a Class</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-xs sm:text-sm text-red-700">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Enter class code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setError(null);
                  setClassCode('');
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinClass}
                disabled={loading}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining...' : 'Join'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Create a New Class</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-xs sm:text-sm text-red-700">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Class name"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <textarea
              placeholder="Class description"
              value={newClass.description}
              onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setError(null);
                  setNewClass({ name: '', description: '' });
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateClass}
                disabled={loading}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;