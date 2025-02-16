import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users2, BookOpen, FileText, TestTube2, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-6 pb-16 sm:pb-24">
            <nav className="relative flex items-center justify-between sm:h-10">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link to="/" className="flex items-center">
                    <GraduationCap className="h-10 w-10 text-indigo-600" />
                    <span className="ml-2 text-2xl font-bold text-gray-900">EduClass</span>
                  </Link>
                </div>
              </div>
              <div className="flex space-x-6">
                <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.01] transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </nav>

            <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your</span>
                  <span className="block text-indigo-600">Learning Experience</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  EduClass brings together teachers and students in a dynamic virtual classroom environment.
                  Manage courses, assignments, and assessments all in one place.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow transform hover:scale-[1.01] transition-all duration-200">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Comprehensive tools for both teachers and students
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-all duration-200">
              <div className="h-12 w-12 text-indigo-600 mb-4">
                <Users2 className="h-full w-full" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Virtual Classrooms</h3>
              <p className="text-gray-500">Create and join interactive virtual classrooms for seamless learning.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-all duration-200">
              <div className="h-12 w-12 text-indigo-600 mb-4">
                <BookOpen className="h-full w-full" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Digital Lectures</h3>
              <p className="text-gray-500">Access and manage course materials anytime, anywhere.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-all duration-200">
              <div className="h-12 w-12 text-indigo-600 mb-4">
                <FileText className="h-full w-full" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Assignments</h3>
              <p className="text-gray-500">Create, submit, and grade assignments with ease.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-all duration-200">
              <div className="h-12 w-12 text-indigo-600 mb-4">
                <TestTube2 className="h-full w-full" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Online Tests</h3>
              <p className="text-gray-500">Conduct and participate in online assessments securely.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">Join EduClass today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;