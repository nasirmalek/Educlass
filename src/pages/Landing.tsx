import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users2, BookOpen, FileText, TestTube2, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-4 pb-12 sm:pt-6 sm:pb-16 md:pb-20 lg:pb-24">
            <nav className="relative flex items-center justify-between h-16 sm:h-10">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link to="/" className="flex items-center">
                    <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
                    <span className="ml-2 text-xl sm:text-2xl font-bold text-gray-900">EduClass</span>
                  </Link>
                </div>
              </div>
              <div className="hidden sm:flex space-x-4 md:space-x-6">
                <Link to="/login" className="text-sm md:text-base font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-sm md:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.01] transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </nav>

            <main className="mt-10 sm:mt-12 md:mt-16 mx-auto max-w-7xl px-4">
              <div className="text-center">
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="block mb-2">Transform Your</span>
                  <span className="block text-indigo-600">Learning Experience</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 md:mt-5 md:max-w-3xl">
                  EduClass brings together teachers and students in a dynamic virtual classroom environment.
                  Manage courses, assignments, and assessments all in one place.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow transform hover:scale-[1.01] transition-all duration-200">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 md:text-4xl">
              Discover Our Key Features
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500">
              Empowering education through innovative tools and solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Interactive Learning', 'Easy to use', 'Track Progress', 'Assessments'].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.02] transition-all duration-200">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">{feature}</h3>
                <p className="text-sm sm:text-base text-gray-500">
                  {`Engage with ${feature.toLowerCase()} tools to enhance your educational journey.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;