import { BookOpen, LogOut, Mail, Building, GraduationCap, Loader2 } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../auth/auth.mutations';
import { isLecturer } from '../../auth/auth.types';
import { useGetMyModules } from '../lecturer.queries';
import { useEffect } from 'react';

export default function LecturerHomePage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  
  // Fetch lecturer's modules
  const { data: modules, isLoading: modulesLoading } = useGetMyModules();

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

      useEffect(() => {
        if (!user || !isLecturer(user)) {
          navigate('/login');
        }
      }, [user, navigate]);
    
      // Early return to prevent rendering
      if (!user || !isLecturer(user)) {
        return null;
      }

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
    <div className="min-h-screen bg-role-lecturer">
      {/* Header */}
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-neutral-800">Academic Portal</h1>
              <p className="text-sm text-neutral-600">Lecturer Dashboard</p>
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
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
              Welcome back, {user.title} {user.firstName} {user.lastName}
            </h2>
            
            {/* Lecturer Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg elevated">
                <div className="bg-secondary-600 p-2 rounded-lg">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-wide">Staff Number</p>
                  <p className="font-semibold text-neutral-800 font-mono">{lecturer.staffNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-info-50 rounded-lg elevated">
                <div className="bg-info-600 p-2 rounded-lg">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-wide">Email</p>
                  <p className="font-semibold text-neutral-800 text-sm truncate">{user.emailAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent-50 rounded-lg elevated">
                <div className="bg-accent-600 p-2 rounded-lg">
                  <Building className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-wide">Department</p>
                  <p className="font-semibold text-neutral-800">{lecturer.departmentName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-success-50 rounded-lg elevated">
                <div className="bg-success-600 p-2 rounded-lg">
                  <Building className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-wide">Faculty</p>
                  <p className="font-semibold text-neutral-800">{lecturer.facultyName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="card animate-slide-up">
          <div className="card-body">
            <div className="section-title">
              <BookOpen className="text-secondary-600" size={24} />
              <h3>Your Modules</h3>
            </div>

            {/* Loading State */}
            {modulesLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin text-secondary-600" size={48} />
              </div>
            )}

            {/* No Modules State */}
            {!modulesLoading && (!modules || modules.length === 0) && (
              <div className="text-center py-12 text-neutral-500">
                <BookOpen size={48} className="mx-auto mb-4 text-neutral-300" />
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
                    className="card-hover cursor-pointer group"
                    onClick={() => navigate(`/module/${module.moduleId}`)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-display font-semibold text-neutral-800 text-lg group-hover:text-secondary-600 transition-colors">{module.moduleCode}</h4>
                          <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{module.moduleName}</p>
                        </div>
                        <span className="badge-secondary ml-2 flex-shrink-0">
                          {module.credits} Credits
                        </span>
                      </div>
                      
                      <div className="pt-3 border-t border-neutral-100">
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Building size={16} />
                          <span className="truncate">{module.departmentName}</span>
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