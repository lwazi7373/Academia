import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Loader2,
  AlertCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Shield,
  FileText,
  ClipboardCheck,
  Award
} from 'lucide-react';
import { useModuleRiskSummary, useModuleStudents } from '../../coordinator/coordinator.queries';
import type { RiskLevel } from '../../coordinator/coordinator.types';

type FilterOption = 'ALL' | RiskLevel | 'INTERVENTION';

export default function CoordinatorModuleRiskPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<FilterOption>('ALL');

  // Fetch risk summary and students
  const { data: riskSummaryData, isLoading: summaryLoading, error: summaryError } = useModuleRiskSummary(moduleIdNum);
  const { data: studentsData, isLoading: studentsLoading, error: studentsError } = useModuleStudents(
    moduleIdNum,
    activeFilter === 'ALL' 
      ? undefined 
      : activeFilter === 'INTERVENTION'
      ? { interventionStatus: 'ACTIVE' }
      : { riskLevel: activeFilter }
  );

  // Redirect if no moduleId
  useEffect(() => {
    if (!moduleId) {
      navigate('/coordinator/homePage');
    }
  }, [moduleId, navigate]);

  // Extract data
  const riskSummary = riskSummaryData?.riskSummary;
  const students = studentsData?.students || [];
  const moduleInfo = students[0]?.studentModuleId ? {
    moduleCode: 'Loading...',
    moduleName: 'Loading...'
  } : null;

  // Helper function to get risk badge styling
  const getRiskBadgeStyle = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return { 
          bg: 'bg-red-100', 
          text: 'text-red-700', 
          border: 'border-red-300',
          icon: ShieldAlert 
        };
      case 'MODERATE':
        return { 
          bg: 'bg-yellow-100', 
          text: 'text-yellow-700', 
          border: 'border-yellow-300',
          icon: Shield 
        };
      case 'LOW':
        return { 
          bg: 'bg-green-100', 
          text: 'text-green-700', 
          border: 'border-green-300',
          icon: ShieldCheck 
        };
      default:
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-700', 
          border: 'border-gray-300',
          icon: Shield 
        };
    }
  };

  // Filter pills configuration
  const filterOptions: { value: FilterOption; label: string; count?: number }[] = [
    { value: 'ALL', label: 'All Students', count: riskSummary?.totalStudents },
    { value: 'HIGH', label: 'High Risk', count: riskSummary?.highRiskCount },
    { value: 'MODERATE', label: 'Moderate Risk', count: riskSummary?.moderateRiskCount },
    { value: 'LOW', label: 'Low Risk', count: riskSummary?.lowRiskCount },
    { value: 'INTERVENTION', label: 'Intervention in Progress' }
  ];

  // Loading state
  if (summaryLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading module data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (summaryError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/coordinator/homePage')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Module Risk Report</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="mx-auto mb-3 text-red-600" size={48} />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Module Data</h3>
            <p className="text-red-700">
              {summaryError instanceof Error ? summaryError.message : 'An unexpected error occurred'}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-role-coordinator">
      {/* Header */}
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/coordinator/homePage')}
              className="btn-ghost p-2"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-bold text-neutral-800">Module Risk Report</h1>
              {moduleInfo && (
                <p className="text-sm text-neutral-600">
                  {moduleInfo.moduleCode} - {moduleInfo.moduleName}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Risk Summary Cards */}
        {riskSummary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
            {/* Total Students */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <div className="bg-info-100 p-3 rounded-lg">
                    <Users className="text-info-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 uppercase tracking-wide">Total Students</p>
                    <p className="text-2xl font-bold text-neutral-800">{riskSummary.totalStudents}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* High Risk */}
            <div className="card border-l-4 border-danger-500">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-danger-100 p-3 rounded-lg">
                    <TrendingDown className="text-danger-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 uppercase tracking-wide">High Risk</p>
                    <p className="text-2xl font-bold text-neutral-800">{riskSummary.highRiskCount}</p>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 mt-2">
                  {riskSummary.highRiskPercentage.toFixed(1)}% of students
                </div>
              </div>
            </div>

            {/* Moderate Risk */}
            <div className="card border-l-4 border-warning-500">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-warning-100 p-3 rounded-lg">
                    <Activity className="text-warning-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 uppercase tracking-wide">Moderate Risk</p>
                    <p className="text-2xl font-bold text-neutral-800">{riskSummary.moderateRiskCount}</p>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 mt-2">
                  {riskSummary.moderateRiskPercentage.toFixed(1)}% of students
                </div>
              </div>
            </div>

            {/* Low Risk */}
            <div className="card border-l-4 border-success-500">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-success-100 p-3 rounded-lg">
                    <TrendingUp className="text-success-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 uppercase tracking-wide">Low Risk</p>
                    <p className="text-2xl font-bold text-neutral-800">{riskSummary.lowRiskCount}</p>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 mt-2">
                  {riskSummary.lowRiskPercentage.toFixed(1)}% of students
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="card p-4 mb-6 animate-slide-up">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === option.value
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {option.label}
                {option.count !== undefined && (
                  <span className={`ml-2 ${
                    activeFilter === option.value ? 'text-purple-200' : 'text-neutral-500'
                  }`}>
                    ({option.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">
              {activeFilter === 'ALL' 
                ? 'All Students' 
                : activeFilter === 'INTERVENTION'
                ? 'Students with Active Interventions'
                : `${activeFilter} Risk Students`}
            </h3>
          </div>

          {studentsLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
          ) : studentsError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertCircle className="mx-auto mb-3 text-red-600" size={48} />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Students</h3>
              <p className="text-red-700">
                {studentsError instanceof Error ? studentsError.message : 'An unexpected error occurred'}
              </p>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-medium">No Students Found</p>
              <p className="text-sm mt-2">
                {activeFilter === 'ALL' 
                  ? 'No students enrolled in this module' 
                  : `No students in ${activeFilter.toLowerCase()} category`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student) => {
                const riskStyle = getRiskBadgeStyle(student.riskLevel);
                const RiskIcon = riskStyle.icon;

                return (
                  <div
                    key={student.studentId}
                    onClick={() => navigate(`/coordinator/modules/${moduleId}/students/${student.studentId}`)}
                    className={`border rounded-lg p-5 transition-all duration-200 hover:shadow-lg cursor-pointer hover:border-indigo-300 ${riskStyle.border} bg-gradient-to-r from-white to-gray-50`}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {student.firstName} {student.lastName}
                          </h4>
                          {student.hasActiveIntervention && (
                            <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                              <FileText size={12} />
                              Intervention Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Student Number: {student.studentNumber}
                        </p>
                      </div>

                      {/* Risk Badge */}
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${riskStyle.bg} ${riskStyle.text} border ${riskStyle.border}`}>
                        <RiskIcon size={16} />
                        <span className="text-sm font-medium">{student.riskLevel}</span>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Attendance</p>
                          <p className="font-semibold text-gray-800">
                            {student.performance.attendanceRate.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Submissions</p>
                          <p className="font-semibold text-gray-800">
                            {student.performance.submissionRate.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={18} className="text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">Average Mark</p>
                          <p className="font-semibold text-gray-800">
                            {student.performance.averageMark.toFixed(1)}%
                          </p>
                        </div>
                      </div>
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