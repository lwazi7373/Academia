import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  Target, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useGetStudentModuleAssessments } from '../../assessments/assessment.queries';
import { useModule } from '../../module/context/ModuleContext';

export default function StudentAssessmentsListPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { module } = useModule();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;
  const { data: assessments, isLoading, error } = useGetStudentModuleAssessments(moduleIdNum);

  // Redirect if no moduleId
  useEffect(() => {
    if (!moduleId) {
      navigate('/student/homePage');
    }
  }, [moduleId, navigate]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Helper function to get days until due
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper function to get status styling
  const getStatusStyle = (daysUntilDue: number, submission: boolean) => {
    if (submission) {
      return {
        bg: 'bg-green-50',
        border: 'border-green-300',
        text: 'text-green-700',
        badge: 'bg-green-100 text-green-700'
      };
    }
    
    if (daysUntilDue < 0) {
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-700'
      };
    }
    
    if (daysUntilDue <= 2) {
      return {
        bg: 'bg-orange-50',
        border: 'border-orange-300',
        text: 'text-orange-700',
        badge: 'bg-orange-100 text-orange-700'
      };
    }
    
    if (daysUntilDue <= 7) {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        text: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-700'
      };
    }
    
    return {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700'
    };
  };

  // Calculate overall statistics
  const stats = assessments ? {
    total: assessments.length,
    submitted: assessments.filter(a => a.submission).length,
    pending: assessments.filter(a => !a.submission).length,
    averageMark: assessments
      .filter(a => a.studentMark !== null)
      .reduce((acc, a, _, arr) => {
        const percentage = ((a.studentMark || 0) / a.totalMark) * 100;
        return acc + percentage / arr.length;
      }, 0)
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/module/${moduleId}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Assessments</h1>
              {module && (
                <p className="text-sm text-gray-600">
                  {module.moduleCode} - {module.moduleName}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.submitted}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Mark</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.averageMark > 0 ? `${stats.averageMark.toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessments List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">All Assessments</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertCircle className="mx-auto mb-3 text-red-600" size={48} />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Assessments</h3>
              <p className="text-red-700">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
              </p>
            </div>
          ) : !assessments || assessments.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FileText size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-medium">No Assessments Available</p>
              <p className="text-sm mt-2">Your lecturer hasn't created any assessments yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment) => {
                const daysUntilDue = getDaysUntilDue(assessment.dueDate);
                const statusStyle = getStatusStyle(daysUntilDue, assessment.submission);
                const markPercentage = assessment.studentMark !== null
                  ? ((assessment.studentMark / assessment.totalMark) * 100).toFixed(1)
                  : null;

                return (
                  <div
                    key={assessment.assessmentId}
                    className={`border rounded-lg p-5 transition-all duration-200 hover:shadow-md ${statusStyle.border} ${statusStyle.bg}`}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {assessment.assessmentName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            <span>Due: {formatDate(assessment.dueDate)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Target size={16} />
                            <span>Weight: {assessment.weighting}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${statusStyle.badge}`}>
                        {assessment.submission ? (
                          <>
                            <CheckCircle size={16} />
                            <span className="text-sm font-medium">Submitted</span>
                          </>
                        ) : daysUntilDue < 0 ? (
                          <>
                            <XCircle size={16} />
                            <span className="text-sm font-medium">Overdue</span>
                          </>
                        ) : (
                          <>
                            <Clock size={16} />
                            <span className="text-sm font-medium">
                              {daysUntilDue === 0
                                ? 'Due Today'
                                : daysUntilDue === 1
                                ? 'Due Tomorrow'
                                : `${daysUntilDue} days left`}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Mark Display */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Your Mark:</span>
                        {assessment.studentMark !== null ? (
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-gray-800">
                              {assessment.studentMark} / {assessment.totalMark}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              parseFloat(markPercentage || '0') >= 75
                                ? 'bg-green-100 text-green-700'
                                : parseFloat(markPercentage || '0') >= 50
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {markPercentage}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">Not yet marked</span>
                        )}
                      </div>
                      
                      {assessment.dateSubmitted && (
                        <div className="mt-2 text-sm text-gray-600">
                          Submitted on: {formatDate(assessment.dateSubmitted)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}