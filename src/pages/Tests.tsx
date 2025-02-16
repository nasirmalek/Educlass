import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { TestTube2, Plus } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: string;
}

interface Test {
  id: string;
  title: string;
  description: string;
  date: string;
  questions: Question[];
}

const Tests: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [tests, setTests] = useState<Test[]>([]);
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [showTestDetails, setShowTestDetails] = useState<Test | null>(null);
  const [newTest, setNewTest] = useState<Test>({
    id: '',
    title: '',
    description: '',
    date: '',
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: '',
    text: '',
    options: ['', '', '', ''],
    correctOption: '',
  });
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [submittedTests, setSubmittedTests] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Fetch tests from the database or API
    const fetchTests = async () => {
      // Replace with your data fetching logic
      const fetchedTests: Test[] = [
        {
          id: '1',
          title: 'React Basics Test',
          description: 'Test your knowledge on React basics.',
          date: '2025-02-20',
          questions: [
            {
              id: 'q1',
              text: 'What is React?',
              options: ['Library', 'Framework', 'Language', 'Tool'],
              correctOption: 'Library',
            },
            {
              id: 'q2',
              text: 'What is JSX?',
              options: ['JavaScript XML', 'JavaScript Extension', 'JavaScript Syntax', 'JavaScript Compiler'],
              correctOption: 'JavaScript XML',
            },
            {
              id: 'q3',
              text: 'Which company developed React?',
              options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
              correctOption: 'Facebook',
            },
          ],
        },
        {
          id: '2',
          title: 'Advanced React Test',
          description: 'Test your knowledge on advanced React patterns.',
          date: '2025-02-25',
          questions: [
            {
              id: 'q1',
              text: 'What is a higher-order component?',
              options: ['A component that returns another component', 'A component that renders a list', 'A component that manages state', 'A component that handles events'],
              correctOption: 'A component that returns another component',
            },
            {
              id: 'q2',
              text: 'What is the Context API used for?',
              options: ['State management', 'Routing', 'Styling', 'Testing'],
              correctOption: 'State management',
            },
            {
              id: 'q3',
              text: 'What is the use of useEffect hook?',
              options: ['To manage state', 'To perform side effects', 'To handle events', 'To render components'],
              correctOption: 'To perform side effects',
            },
          ],
        },
      ];
      setTests(fetchedTests);
    };

    fetchTests();

    // Load submitted tests from local storage
    const storedSubmittedTests = localStorage.getItem('submittedTests');
    if (storedSubmittedTests) {
      setSubmittedTests(JSON.parse(storedSubmittedTests));
    }

    // Load answers from local storage
    const storedAnswers = localStorage.getItem('answers');
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }

    // Load scores from local storage
    const storedScores = localStorage.getItem('scores');
    if (storedScores) {
      setScore(JSON.parse(storedScores));
    }
  }, []);

  const handleAddTest = () => {
    setShowAddTestModal(true);
  };

  const handleSaveTest = () => {
    setTests([...tests, { ...newTest, id: (tests.length + 1).toString() }]);
    setShowAddTestModal(false);
    setNewTest({ id: '', title: '', description: '', date: '', questions: [] });
  };

  const handleAddQuestion = () => {
    setNewTest({
      ...newTest,
      questions: [...newTest.questions, { ...newQuestion, id: (newTest.questions.length + 1).toString() }],
    });
    setNewQuestion({ id: '', text: '', options: ['', '', '', ''], correctOption: '' });
  };

  const handleOpenTest = (test: Test) => {
    setShowTestDetails(test);
    setAnswers({});
    setScore(null);
  };

  const handleCloseTest = () => {
    setShowTestDetails(null);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmitTest = () => {
    if (showTestDetails) {
      let correctAnswers = 0;
      showTestDetails.questions.forEach((question) => {
        if (answers[question.id] === question.correctOption) {
          correctAnswers += 1;
        }
      });
      setScore(correctAnswers);
      const updatedSubmittedTests = { ...submittedTests, [showTestDetails.id]: true };
      setSubmittedTests(updatedSubmittedTests);
      localStorage.setItem('submittedTests', JSON.stringify(updatedSubmittedTests));
      localStorage.setItem('answers', JSON.stringify(answers));
      localStorage.setItem('scores', JSON.stringify(score));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tests</h1>
        {user?.role === 'teacher' && (
          <button
            onClick={handleAddTest}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Test
          </button>
        )}
      </div>

      {tests.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty state */}
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <TestTube2 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tests available</h3>
            <p className="text-gray-500 text-center">
              Select a class to view its tests
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{test.description}</p>
              <p className="text-gray-500 text-sm">Date: {test.date}</p>
              {user?.role === 'student' && (
                <button
                  onClick={() => handleOpenTest(test)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
                >
                  {submittedTests[test.id] ? 'View Results' : 'Give Test'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showAddTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-full max-w-md transform hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">Add a New Test</h2>
            <input
              type="text"
              placeholder="Test title"
              value={newTest.title}
              onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <textarea
              placeholder="Test description"
              value={newTest.description}
              onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={3}
            />
            <input
              type="date"
              value={newTest.date}
              onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Add Questions</h3>
            <input
              type="text"
              placeholder="Question text"
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            {newQuestion.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...newQuestion.options];
                  updatedOptions[index] = e.target.value;
                  setNewQuestion({ ...newQuestion, options: updatedOptions });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              />
            ))}
            <input
              type="text"
              placeholder="Correct option"
              value={newQuestion.correctOption}
              onChange={(e) => setNewQuestion({ ...newQuestion, correctOption: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
              >
                Add Question
              </button>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowAddTestModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTest}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
              >
                Save Test
              </button>
            </div>
          </div>
        </div>
      )}

      {showTestDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-md transform hover:scale-[1.01] transition-all duration-200">
            <h2 className="text-xl font-bold mb-4">{showTestDetails.title}</h2>
            <p className="text-gray-600 mb-4">{showTestDetails.description}</p>
            {showTestDetails.questions.map((question) => (
              <div key={question.id} className="mb-4">
                <p className="text-gray-900 font-medium">{question.text}</p>
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="radio"
                      id={`${question.id}-${index}`}
                      name={question.id}
                      value={option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      className="mr-2"
                      disabled={submittedTests[showTestDetails.id]}
                      checked={answers[question.id] === option}
                    />
                    <label htmlFor={`${question.id}-${index}`} className="text-gray-600">{option}</label>
                  </div>
                ))}
              </div>
            ))}
            {score !== null && (
              <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
                Your score: {score} / {showTestDetails.questions.length}
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseTest}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Close
              </button>
              {!submittedTests[showTestDetails.id] && (
                <button
                  onClick={handleSubmitTest}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tests;