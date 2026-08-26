import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  LogOut, 
  User, 
  AlertCircle,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { useLogout } from '../../auth/auth.mutations';
import { useEffect } from 'react';
import { isCoordinator } from '../../auth/auth.types';
import { useCoordinatorModules } from '../../coordinator/coordinator.queries';

export default function CoordinatorHomePage() {
  const { user, isLoading, isFetching } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  // Fetch coordinator modules
  const { data: modules, isLoading: modulesLoading, error } = useCoordinatorModules();

  useEffect(() => {
    if (!isLoading && !isFetching && (!user || !isCoordinator(user))) {
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

  if (!user || !isCoordinator(user)) return null;
  const coordinator = user.coordinatorProfile;

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
              <p className="text-sm text-gray-600">Coordinator Dashboard</p>
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
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome back, {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">Staff Number: {coordinator.staffNumber}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <BookOpen className="text-indigo-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Modules Coordinating</p>
                <p className="text-2xl font-bold text-gray-800">{modules?.length || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
              <ShieldAlert className="text-orange-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Student Risk Management</p>
                <p className="text-lg font-semibold text-gray-800">Monitor & Intervene</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Your Modules</h3>
          </div>

          {modulesLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertCircle className="mx-auto mb-3 text-red-600" size={48} />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Modules</h3>
              <p className="text-red-700">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
              </p>
            </div>
          ) : !modules || modules.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BookOpen size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-medium">No Modules Assigned</p>
              <p className="text-sm mt-2">You are not currently coordinating any modules</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => (
                <div
                  key={module.moduleId}
                  onClick={() => navigate(`/coordinator/modules/${module.moduleId}/risk`)}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-indigo-300 group bg-gradient-to-br from-white to-indigo-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">
                          {module.moduleCode}
                        </h4>
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded">
                          {module.credits} Credits
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{module.moduleName}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">View Risk Report</span>
                      <ShieldAlert className="text-indigo-600 group-hover:translate-x-1 transition-transform" size={18} />
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