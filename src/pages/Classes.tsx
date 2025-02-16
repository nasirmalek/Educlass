import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Users2, Plus, KeyRound, BookOpen } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Class, ClassInput } from '../types/class';

const Classes: React.FC = () => {
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

  const generateClassCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const fetchClasses = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const classesRef = collection(db, 'classes');
      let classQuery;
      
      if (user.role === 'teacher') {
        classQuery = query(classesRef, where('teacherId', '==', user.id));
      } else {
        classQuery = query(classesRef, where('students', 'array-contains', user.id));
      }
      
      const snapshot = await getDocs(classQuery);
      const fetchedClasses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Class[];
      
      setClasses(fetchedClasses);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Failed to load classes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user]);

  const handleCreateClass = async () => {
    if (!user || user.role !== 'teacher') return;
    
    try {
      setLoading(true);
      setError(null);
      
      if (!newClass.name.trim()) {
        setError('Class name is required');
        return;
      }

      const classCode = generateClassCode();
      const classData = {
        ...newClass,
        teacherId: user.id,
        code: classCode,
        createdAt: serverTimestamp(),
        students: [],
      };

      await addDoc(collection(db, 'classes'), classData);
      await fetchClasses();
      setShowCreateModal(false);
      setNewClass({ name: '', description: '' });
    } catch (err) {
      console.error('Error creating class:', err);
      setError('Failed to create class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = async () => {
    if (!user || user.role !== 'student') return;
    
    try {
      setLoading(true);
      setError(null);

      if (!classCode.trim()) {
        setError('Class code is required');
        return;
      }

      const classesRef = collection(db, 'classes');
      const classQuery = query(classesRef, where('code', '==', classCode.toUpperCase()));
      const snapshot = await getDocs(classQuery);

      if (snapshot.empty) {
        setError('Invalid class code');
        return;
      }

      const classDoc = snapshot.docs[0];
      const classData = classDoc.data() as Class;

      if (classData.students.includes(user.id)) {
        setError('You are already in this class');
        return;
      }

      // Keep all existing data unchanged except students array
      await updateDoc(doc(db, 'classes', classDoc.id), {
        students: [...classData.students, user.id],
        teacherId: classData.teacherId,
        name: classData.name,
        description: classData.description,
        code: classData.code,
        createdAt: classData.createdAt
      });

      await fetchClasses();
      setShowJoinModal(false);
      setClassCode('');
    } catch (err) {
      console.error('Error joining class:', err);
      setError('Failed to join class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderActionButton = () => {
    if (!user) return null;

    if (user.role === 'teacher') {
      return (
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Class
        </button>
      );
    }

    if (user.role === 'student') {
      return (
        <button
          onClick={() => setShowJoinModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
        >
          <KeyRound className="h-4 w-4 mr-2" />
          Join Class
        </button>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
        <div className="flex gap-4">
          {renderActionButton()}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      ) : classes.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300 transform hover:scale-[1.01] transition-all duration-200">
            <Users2 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h3>
            <p className="text-gray-500 text-center mb-4">
              {user?.role === 'teacher'
                ? "Start by creating your first class"
                : "Join a class using a class code"}
            </p>
            {renderActionButton()}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{classItem.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
                </div>
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              {user?.role === 'teacher' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Class Code: <span className="font-mono font-medium text-gray-900">{classItem.code}</span></p>
                  <p className="text-sm text-gray-500">Students: {classItem.students.length}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-full max-w-md transform hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">Join a Class</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Enter class code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setError(null);
                  setClassCode('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinClass}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining...' : 'Join'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-full max-w-md transform hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">Create a New Class</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Class name"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <textarea
              placeholder="Class description"
              value={newClass.description}
              onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setError(null);
                  setNewClass({ name: '', description: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateClass}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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