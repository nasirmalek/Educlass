import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FileText, Plus, Trash, Edit } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed?: boolean;
}

interface AssignmentsProps {
  classId: string;
}

const Assignments: React.FC<AssignmentsProps> = ({ classId }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showAssignmentDetailsModal, setShowAssignmentDetailsModal] = useState<Assignment | null>(null);
  const [newAssignment, setNewAssignment] = useState<Assignment>({
    id: '',
    title: '',
    description: '',
    dueDate: '',
  });
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    // Fetch assignments from the database or API based on classId
    const fetchAssignments = async () => {
      // Replace with your data fetching logic
      const fetchedAssignments: Assignment[] = [
        {
          id: '1',
          title: 'React Basics',
          description: 'Complete the React basics tutorial.',
          dueDate: '2025-02-20',
        },
        {
          id: '2',
          title: 'Advanced React',
          description: 'Build a project using advanced React patterns.',
          dueDate: '2025-02-25',
        },
      ];
      setAssignments(fetchedAssignments);
    };

    fetchAssignments();
  }, [classId]);

  const handleAddAssignment = () => {
    setShowAddAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (editingAssignment) {
      setAssignments(assignments.map((assignment) =>
        assignment.id === editingAssignment.id ? newAssignment : assignment
      ));
      setEditingAssignment(null);
    } else {
      setAssignments([...assignments, { ...newAssignment, id: (assignments.length + 1).toString() }]);
    }
    setShowAddAssignmentModal(false);
    setNewAssignment({ id: '', title: '', description: '', dueDate: '' });
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setNewAssignment(assignment);
    setShowAddAssignmentModal(true);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter((assignment) => assignmentId !== assignment.id));
  };

  const handleCompleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.map((assignment) =>
      assignment.id === assignmentId ? { ...assignment, completed: true } : assignment
    ));
  };

  const handleOpenAssignmentDetails = (assignment: Assignment) => {
    setShowAssignmentDetailsModal(assignment);
  };

  const handleCloseAssignmentDetails = () => {
    setShowAssignmentDetailsModal(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        {user?.role === 'teacher' && (
          <button
            onClick={handleAddAssignment}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Assignment
          </button>
        )}
      </div>

      {assignments.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty state */}
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
            <p className="text-gray-500 text-center">
              Select a class to view its assignments
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
              <p className="text-gray-500 text-sm">Due Date: {assignment.dueDate}</p>
              <button
                onClick={() => handleOpenAssignmentDetails(assignment)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-200"
              >
                View Details
              </button>
              {user?.role === 'teacher' && (
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => handleEditAssignment(assignment)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform hover:scale-105 transition-all duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-all duration-200"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              )}
              {assignment.completed && (
                <p className="text-green-600 text-sm mt-4">Completed</p>
              )}
            </div>
          ))}
        </div>
      )}

      {showAddAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-full max-w-md transform hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">{editingAssignment ? 'Edit Assignment' : 'Add a New Assignment'}</h2>
            <input
              type="text"
              placeholder="Assignment title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <textarea
              placeholder="Assignment description"
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={3}
            />
            <input
              type="date"
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowAddAssignmentModal(false);
                  setEditingAssignment(null);
                  setNewAssignment({ id: '', title: '', description: '', dueDate: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssignment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssignmentDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-full max-w-md transform hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">{showAssignmentDetailsModal.title}</h2>
            <p className="text-gray-600 mb-4">{showAssignmentDetailsModal.description}</p>
            <p className="text-gray-500 mb-4">Due Date: {showAssignmentDetailsModal.dueDate}</p>
            {user?.role === 'student' && !showAssignmentDetailsModal.completed && (
              <button
                onClick={() => {
                  handleCompleteAssignment(showAssignmentDetailsModal.id);
                  handleCloseAssignmentDetails();
                }}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-200"
              >
                Complete Assignment
              </button>
            )}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleCloseAssignmentDetails}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;