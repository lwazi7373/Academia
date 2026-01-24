import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Loader2,
  AlertCircle,
  User,
  Mail,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Shield,
  ClipboardCheck,
  FileText,
  Award,
  Calendar,
  Plus,
  Eye,
  X
} from 'lucide-react';
import { useStudentRiskDetails } from '../../coordinator/coordinator.queries';
import { useActiveIntervention } from '../../interventions/intervention.queries';
import type { RiskLevel } from '../../coordinator/coordinator.types';

export default function StudentRiskDetailsPage() {
  const { moduleId, studentId } = useParams<{ moduleId: string; studentId: string }>();
  const navigate = useNavigate();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;
  const studentIdNum = studentId ? parseInt(studentId) : 0;

  // State for modals
  const [showNoInterventionModal, setShowNoInterventionModal] = useState(false);
  const [showHasInterventionModal, setShowHasInterventionModal] = useState(false);

  // Fetch student risk details and active intervention
  const { data: studentRiskData, isLoading, error } = useStudentRiskDetails(moduleIdNum, studentIdNum);
  const { data: activeInterventionData } = useActiveIntervention(moduleIdNum, studentIdNum);

  // Redirect if no params
  useEffect(() => {
    if (!moduleId || !studentId) {
      navigate('/coordinator/homePage');
    }
  }, [moduleId, studentId, navigate]);

  const studentRisk = studentRiskData?.studentRiskDetails;
  const hasActiveIntervention = !!activeInterventionData?.intervention;

  // Helper function to get risk badge styling
  const getRiskBadgeStyle = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return { 
          bg: 'bg-red-100', 
          text: 'text-red-700', 
          border: 'border-red-300',
          icon: ShieldAlert,
          gradient: 'from-red-50 to-red-100'
        };
      case 'MODERATE':
        return { 
          bg: 'bg-yellow-100', 
          text: 'text-yellow-700', 
          border: 'border-yellow-300',
          icon: Shield,
          gradient: 'from-yellow-50 to-yellow-100'
        };
      case 'LOW':
        return { 
          bg: 'bg-green-100', 
          text: 'text-green-700', 
          border: 'border-green-300',
          icon: ShieldCheck,
          gradient: 'from-green-50 to-green-100'
        };
      default:
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-700', 
          border: 'border-gray-300',
          icon: Shield,
          gradient: 'from-gray-50 to-gray-100'
        };
    }
  };

  // Helper function to get performance status color
  const getPerformanceColor = (value: number) => {
    if (value >= 75) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle Create Intervention click
  const handleCreateIntervention = () => {
    if (hasActiveIntervention) {
      setShowHasInterventionModal(true);
    } else {
      navigate(`/coordinator/modules/${moduleId}/students/${studentId}/intervention/create`);
    }
  };

  // Handle View Intervention click
  const handleViewIntervention = () => {
    if (!hasActiveIntervention) {
      setShowNoInterventionModal(true);
    } else {
      navigate(`/coordinator/modules/${moduleId}/students/${studentId}/intervention/view`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !studentRisk) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/coordinator/modules/${moduleId}/risk`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Student Risk Details</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="mx-auto mb-3 text-red-600" size={48} />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Student Details</h3>
            <p className="text-red-700">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const riskStyle = getRiskBadgeStyle(studentRisk.riskLevel);
  const RiskIcon = riskStyle.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/coordinator/modules/${moduleId}/risk`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Student Risk Profile</h1>
              <p className="text-sm text-gray-600">
                {studentRisk.module.moduleCode} - {studentRisk.module.moduleName}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Information Card */}
        <div className={`bg-gradient-to-r ${riskStyle.gradient} rounded-xl shadow-lg p-8 mb-6 border-l-8 ${riskStyle.border}`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-4 rounded-full shadow-md">
                <User className="text-indigo-600" size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {studentRisk.firstName} {studentRisk.lastName}
                </h2>
                <p className="text-lg text-gray-600">Student Number: {studentRisk.studentNumber}</p>
              </div>
            </div>
            
            {/* Risk Badge */}
            <div className={`flex items-center gap-2 px-6 py-3 rounded-full ${riskStyle.bg} ${riskStyle.text} border-2 ${riskStyle.border} shadow-md`}>
              <RiskIcon size={24} />
              <span className="text-lg font-bold">{studentRisk.riskLevel} RISK</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-300">
            <div className="flex items-center gap-3 bg-white bg-opacity-60 rounded-lg p-4">
              <Mail className="text-indigo-600" size={20} />
              <div>
                <p className="text-xs text-gray-600">Email Address</p>
                <p className="font-medium text-gray-800">{studentRisk.emailAddress}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white bg-opacity-60 rounded-lg p-4">
              <Phone className="text-indigo-600" size={20} />
              <div>
                <p className="text-xs text-gray-600">Contact Number</p>
                <p className="font-medium text-gray-800">{studentRisk.contactNo || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Attendance Rate */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ClipboardCheck className="text-blue-600" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className={`text-3xl font-bold ${getPerformanceColor(studentRisk.performance.attendanceRate)}`}>
                  {studentRisk.performance.attendanceRate.toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${
                  studentRisk.performance.attendanceRate >= 75 
                    ? 'bg-green-500' 
                    : studentRisk.performance.attendanceRate >= 50 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${studentRisk.performance.attendanceRate}%` }}
              />
            </div>
          </div>

          {/* Submission Rate */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="text-green-600" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Submission Rate</p>
                <p className={`text-3xl font-bold ${getPerformanceColor(studentRisk.performance.submissionRate)}`}>
                  {studentRisk.performance.submissionRate.toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${
                  studentRisk.performance.submissionRate >= 75 
                    ? 'bg-green-500' 
                    : studentRisk.performance.submissionRate >= 50 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${studentRisk.performance.submissionRate}%` }}
              />
            </div>
          </div>

          {/* Average Mark */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="text-purple-600" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Mark</p>
                <p className={`text-3xl font-bold ${getPerformanceColor(studentRisk.performance.averageMark)}`}>
                  {studentRisk.performance.averageMark.toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${
                  studentRisk.performance.averageMark >= 75 
                    ? 'bg-green-500' 
                    : studentRisk.performance.averageMark >= 50 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${studentRisk.performance.averageMark}%` }}
              />
            </div>
          </div>
        </div>

        {/* Risk Calculation Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Risk Assessment Details</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Last Calculated: <span className="font-semibold text-gray-800">{formatDate(studentRisk.lastCalculated)}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Risk Level: <span className={`font-bold ${riskStyle.text}`}>{studentRisk.riskLevel}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Intervention Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleCreateIntervention}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              <Plus size={24} />
              Create Intervention
            </button>
            <button
              onClick={handleViewIntervention}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              <Eye size={24} />
              View Intervention
            </button>
          </div>
        </div>
      </main>

      {/* No Intervention Modal */}
      {showNoInterventionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-orange-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <AlertCircle size={28} />
                <h2 className="text-xl font-bold">No Intervention Found</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                This student does not have any intervention records yet. Would you like to create one?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNoInterventionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowNoInterventionModal(false);
                    navigate(`/coordinator/modules/${moduleId}/students/${studentId}/intervention/create`);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Create Intervention
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Has Active Intervention Modal */}
      {showHasInterventionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-yellow-600 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3 text-white">
                <AlertCircle size={28} />
                <h2 className="text-xl font-bold">Active Intervention Exists</h2>
              </div>
              <button
                onClick={() => setShowHasInterventionModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                This student already has an active intervention. You can view the existing intervention instead.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowHasInterventionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowHasInterventionModal(false);
                    navigate(`/coordinator/modules/${moduleId}/students/${studentId}/intervention/view`);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                >
                  View Intervention
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}