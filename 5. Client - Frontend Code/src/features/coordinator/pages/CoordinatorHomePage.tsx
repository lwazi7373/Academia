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
import { isCoordinator } from '../../auth/auth.types';
import { useCoordinatorModules } from '../../coordinator/coordinator.queries';
import { useEffect } from 'react';

export default function CoordinatorHomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  // Fetch coordinator modules
  const { data: modules, isLoading: modulesLoading, error } = useCoordinatorModules();

  useEffect(() => {
    if (!user || !isCoordinator(user)) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Early return to prevent rendering
  if (!user || !isCoordinator(user)) {
    return null;
  }

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
    <div className="min-h-screen bg-role-coordinator">
      {/* Header */}
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-neutral-800">Academic Portal</h1>
              <p className="text-sm text-neutral-600">Coordinator Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="btn-danger"
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
        <div className="card mb-6 animate-slide-up">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-full">
                <User className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-800">
                  Welcome back, {user.firstName} {user.lastName}
                </h2>
                <p className="text-neutral-600 font-mono">Staff Number: {coordinator.staffNumber}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg elevated">
                <BookOpen className="text-primary-600" size={24} />
                <div>
                  <p className="text-sm text-neutral-600 uppercase tracking-wide">Modules Coordinating</p>
                  <p className="text-2xl font-bold text-neutral-800">{modules?.length || 0}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-accent-50 rounded-lg elevated">
                <ShieldAlert className="text-accent-600" size={24} />
                <div>
                  <p className="text-sm text-neutral-600 uppercase tracking-wide">Student Risk Management</p>
                  <p className="text-lg font-semibold text-neutral-800">Monitor & Intervene</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="card animate-slide-up">
          <div className="card-body">
            <div className="section-title">
              <BookOpen className="text-purple-600" size={24} />
              <h3>Your Modules</h3>
            </div>

            {modulesLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin text-purple-600" size={48} />
              </div>
            ) : error ? (
              <div className="alert-danger">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">Error Loading Modules</h3>
                  <p className="text-sm mt-1">
                    {error instanceof Error ? error.message : 'An unexpected error occurred'}
                  </p>
                </div>
              </div>
            ) : !modules || modules.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                <BookOpen size={64} className="mx-auto mb-4 text-neutral-300" />
                <p className="text-xl font-medium">No Modules Assigned</p>
                <p className="text-sm mt-2">You are not currently coordinating any modules</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module) => (
                  <div
                    key={module.moduleId}
                    onClick={() => navigate(`/coordinator/modules/${module.moduleId}/risk`)}
                    className="card-hover cursor-pointer group bg-gradient-to-br from-white to-purple-50"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-display font-semibold text-neutral-800 text-lg group-hover:text-purple-600 transition-colors">
                              {module.moduleCode}
                            </h4>
                            <span className="badge-primary">
                              {module.credits} Credits
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600">{module.moduleName}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">View Risk Report</span>
                          <ShieldAlert className="text-purple-600 group-hover:translate-x-1 transition-transform" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}