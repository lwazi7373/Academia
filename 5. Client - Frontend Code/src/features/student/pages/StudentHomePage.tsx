import { BookOpen, Calendar, AlertCircle, CheckCircle, Clock, LogOut, User, Award, Target, Loader2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../auth/auth.mutations';
import { isStudent } from '../../auth/auth.types';
import { useGetStudentModules, useGetModulePerformance, useGetUpcomingAssessments } from '../../student/student.queries';

export default function StudentHomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  // Fetch all student data
  const { data: modules, isLoading: modulesLoading } = useGetStudentModules();
  const { data: performance, isLoading: performanceLoading } = useGetModulePerformance();
  const { data: upcomingAssessments, isLoading: assessmentsLoading } = useGetUpcomingAssessments();

  // Redirect if not a student
  if (!user || !isStudent(user)) {
    navigate('/login');
    return null;
  }

  const student = user.studentProfile;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Helper function to get risk level styling
  const getRiskStyle = (riskLevel: string | null) => {
    switch (riskLevel) {
      case 'HIGH':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: AlertCircle };
      case 'MEDIUM':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: AlertTriangle };
      case 'LOW':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: CheckCircle };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: Target };
    }
  };

  // Helper function to get urgency styling for assessments
  const getUrgencyStyle = (daysUntilDue: number) => {
    if (daysUntilDue <= 2) {
      return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-100 text-red-700' };
    } else if (daysUntilDue <= 7) {
      return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' };
    } else {
      return { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' };
    }
  };

  // Merge modules with performance data
  const modulesWithPerformance = modules?.map(module => {
    const perf = performance?.find(p => p.moduleId === module.moduleId);
    return { ...module, performance: perf };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Academic Portal</h1>
              <p className="text-sm text-gray-600">Student Dashboard</p>
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
            <div className="bg-blue-600 p-3 rounded-full">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome back, {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">Student Number: {student.studentNumber}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Enrolled Modules</p>
                <p className="text-2xl font-bold text-gray-800">{modules?.length || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Upcoming Assessments</p>
                <p className="text-2xl font-bold text-gray-800">{upcomingAssessments?.length || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Award className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Average Performance</p>
                <p className="text-2xl font-bold text-gray-800">
                  {performance && performance.length > 0
                    ? Math.round(
                        performance
                          .filter(p => p.averageMark !== null)
                          .reduce((acc, p) => acc + (p.averageMark || 0), 0) /
                          performance.filter(p => p.averageMark !== null).length
                      ) + '%'
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Modules with Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Your Modules */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Your Modules</h3>
              </div>

              {modulesLoading || performanceLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin text-blue-600" size={48} />
                </div>
              ) : !modulesWithPerformance || modulesWithPerformance.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No modules enrolled</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {modulesWithPerformance.map((module) => {
                    const riskStyle = getRiskStyle(module.performance?.riskLevel || null);
                    const RiskIcon = riskStyle.icon;

                    return (
                      <div
                        key={module.moduleId}
                        onClick={() => navigate(`/module/${module.moduleId}`)}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                                {module.moduleCode}
                              </h4>
                              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                                {module.credits} Credits
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{module.moduleName}</p>
                          </div>

                          {module.performance?.riskLevel && (
                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${riskStyle.bg} ${riskStyle.text} border ${riskStyle.border}`}>
                              <RiskIcon size={14} />
                              <span className="text-xs font-medium">{module.performance.riskLevel}</span>
                            </div>
                          )}
                        </div>

                        {module.performance && (
                          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-500">Average</p>
                              <p className="font-semibold text-gray-800">
                                {module.performance.averageMark !== null
                                  ? `${module.performance.averageMark.toFixed(1)}%`
                                  : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Attendance</p>
                              <p className="font-semibold text-gray-800">
                                {module.performance.attendanceRate !== null
                                  ? `${module.performance.attendanceRate.toFixed(0)}%`
                                  : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Submissions</p>
                              <p className="font-semibold text-gray-800">
                                {module.performance.submissionRate !== null
                                  ? `${module.performance.submissionRate.toFixed(0)}%`
                                  : 'N/A'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Upcoming Assessments */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Upcoming</h3>
              </div>

              {assessmentsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin text-purple-600" size={40} />
                </div>
              ) : !upcomingAssessments || upcomingAssessments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No upcoming assessments</p>
                  <p className="text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAssessments.map((assessment) => {
                    const urgencyStyle = getUrgencyStyle(assessment.daysUntilDue);

                    return (
                      <div
                        key={assessment.assessmentId}
                        className={`border rounded-lg p-4 ${urgencyStyle.border} ${urgencyStyle.bg} transition-all duration-200 hover:shadow-md`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm flex-1 pr-2">
                            {assessment.assessmentName}
                          </h4>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${urgencyStyle.badge} flex-shrink-0`}>
                            {assessment.weighting}%
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 mb-3">{assessment.module.moduleCode}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className={urgencyStyle.text} />
                            <span className={`text-xs font-medium ${urgencyStyle.text}`}>
                              {assessment.daysUntilDue === 0
                                ? 'Due today'
                                : assessment.daysUntilDue === 1
                                ? 'Due tomorrow'
                                : `${assessment.daysUntilDue} days`}
                            </span>
                          </div>

                          {assessment.submission ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle size={14} />
                              <span className="text-xs font-medium">Submitted</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500">
                              <AlertCircle size={14} />
                              <span className="text-xs font-medium">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}