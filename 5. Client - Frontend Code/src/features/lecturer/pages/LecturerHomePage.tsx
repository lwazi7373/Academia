import { BookOpen, LogOut, Mail, Building, GraduationCap, Loader2 } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLogout } from '../../auth/auth.mutations';
import { isLecturer } from '../../auth/auth.types';
import { useGetMyModules } from '../lecturer.queries';

export default function LecturerHomePage() {
  const { user, isLoading, isFetching } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  
  // Fetch lecturer's modules
  const { data: modules, isLoading: modulesLoading } = useGetMyModules();

  useEffect(() => {
    if (!isLoading && !isFetching && (!user || !isLecturer(user))) {
      navigate('/login');
    }
  }, [isLoading, isFetching, user, navigate]);

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isLecturer(user)) return null;
  const lecturer = user.lecturerProfile;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
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
              <p className="text-sm text-gray-600">Lecturer Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
            >
              <LogOut size={18} />
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome back, {user.title} {user.firstName} {user.lastName}
          </h2>
          
          {/* Lecturer Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Staff Number</p>
                <p className="font-semibold text-gray-800">{lecturer.staffNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Mail className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Email</p>
                <p className="font-semibold text-gray-800 text-sm truncate">{user.emailAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Building className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Department</p>
                <p className="font-semibold text-gray-800">{lecturer.departmentName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
              <div className="bg-pink-600 p-2 rounded-lg">
                <Building className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Faculty</p>
                <p className="font-semibold text-gray-800">{lecturer.facultyName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Your Modules</h3>
          </div>

          {/* Loading State */}
          {modulesLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
          )}

          {/* No Modules State */}
          {!modulesLoading && (!modules || modules.length === 0) && (
            <div className="text-center py-12 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No modules assigned yet</p>
              <p className="text-sm mt-2">Your assigned modules will appear here</p>
            </div>
          )}

          {/* Modules Grid */}
          {!modulesLoading && modules && modules.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => (
                <div
                  key={module.moduleId}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer hover:border-blue-300"
                  onClick={() => navigate(`/module/${module.moduleId}`)} // navigate to sections Page for the module
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">{module.moduleCode}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{module.moduleName}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded ml-2 flex-shrink-0">
                      {module.credits} Credits
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building size={16} />
                      <span className="truncate">{module.departmentName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}