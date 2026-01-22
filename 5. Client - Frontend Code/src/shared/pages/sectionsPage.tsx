import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, UserCheck, ArrowRight, Home } from 'lucide-react';
import { useModule } from '../../features/module/context/ModuleContext';
import ModuleDetailComponent from '../../features/module/components/ModuleDetailComponent';
import { useAuth } from '../../features/auth/context/AuthContext';
import { isLecturer, isStudent } from '../../features/auth/auth.types';

export default function SectionsPage() {
  const navigate = useNavigate();
  const { moduleId } = useModule();
  const { user } = useAuth();

  // Determine attendance route based on user role
  const getAttendanceRoute = () => {
    if (user && isLecturer(user)) {
      return `/module/${moduleId}/attendance/generate`;
    } else if (user && isStudent(user)) {
      return `/module/${moduleId}/attendance/submit`;
    }
    return `/module/${moduleId}/attendance`; // Fallback 
  };

  // Determine assessments route based on user role
  const getAssessmentsRoute = () => {
    if (user && isLecturer(user)) {
      return `/module/${moduleId}/assessments/manage`;
    } else if (user && isStudent(user)) {
      return `/module/${moduleId}/assessments/view`;
    }
    return `/module/${moduleId}/assessments`; // Fallback
  };

  const sections = [
    {
      id: 'attendance',
      title: 'Attendance',
      description: user && isLecturer(user) 
        ? 'Generate attendance codes and manage class sessions'
        : 'Submit attendance codes for your classes',
      icon: UserCheck,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      route: getAttendanceRoute(),
    },
    {
      id: 'assessments',
      title: 'Assessments',
      description: user && isLecturer(user)
        ? 'Create and manage module assessments'
        : 'View your assessments and submissions',
      icon: ClipboardCheck,
      color: 'from-purple-500 to-indigo-600',
      hoverColor: 'hover:from-purple-600 hover:to-indigo-700',
      route: getAssessmentsRoute(),
    },
  ];

  const handleNavigateHome = () => {
    // Navigate back based on user role
    if (user && isStudent(user)) {
      navigate('/student/homePage');
    } else if (user && isLecturer(user)) {
      navigate('/lecturer/homePage');
    } else {
      navigate('/dashboard'); // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Academic Portal</h1>
              <p className="text-sm text-gray-600">Module Sections</p>
            </div>
            <button
              onClick={handleNavigateHome}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Details */}
        <ModuleDetailComponent />

        {/* Sections Grid */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Select a Section
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => navigate(section.route)}
                  className="relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  {/* Background Gradient */}
                  <div className={`bg-gradient-to-br ${section.color} ${section.hoverColor} p-8 transition-all duration-300`}>
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={32} className="text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-white/90 text-sm mb-4">
                        {section.description}
                      </p>
                      
                      {/* Arrow */}
                      <div className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all duration-300">
                        <span>Go to {section.title}</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}