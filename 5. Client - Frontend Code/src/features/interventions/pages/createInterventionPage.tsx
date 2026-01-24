import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  FileText,
  User
} from 'lucide-react';
import { useStudentRiskDetails } from '../../coordinator/coordinator.queries';
import { useCreateIntervention } from '../intervention.mutations';

export default function CreateInterventionPage() {
  const { moduleId, studentId } = useParams<{ moduleId: string; studentId: string }>();
  const navigate = useNavigate();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;
  const studentIdNum = studentId ? parseInt(studentId) : 0;

  // Fetch student details for context
  const { data: studentRiskData, isLoading: isLoadingStudent } = useStudentRiskDetails(moduleIdNum, studentIdNum);
  const createInterventionMutation = useCreateIntervention();

  // Form state
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // Redirect if no params
  useEffect(() => {
    if (!moduleId || !studentId) {
      navigate('/coordinator/homePage');
    }
  }, [moduleId, studentId, navigate]);

  const studentRisk = studentRiskData?.studentRiskDetails;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Intervention content is required');
      return;
    }

    if (content.trim().length < 10) {
      setError('Intervention content must be at least 10 characters');
      return;
    }

    try {
      await createInterventionMutation.mutateAsync({
        moduleId: moduleIdNum,
        studentId: studentIdNum,
        data: { content: content.trim() }
      });

      // Navigate back to student risk details on success
      navigate(`/coordinator/modules/${moduleId}/students/${studentId}`);
    } catch (error) {
      console.error('Failed to create intervention:', error);
    }
  };

  // Loading state
  if (isLoadingStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/coordinator/modules/${moduleId}/students/${studentId}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Create Intervention</h1>
              {studentRisk && (
                <p className="text-sm text-gray-600">
                  For: {studentRisk.firstName} {studentRisk.lastName} ({studentRisk.studentNumber})
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Context Card */}
        {studentRisk && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <User className="text-indigo-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {studentRisk.firstName} {studentRisk.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {studentRisk.module.moduleCode} - {studentRisk.module.moduleName}
                </p>
              </div>
            </div>
            
            {/* Current Performance Summary */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Attendance</p>
                <p className="text-lg font-semibold text-gray-800">
                  {studentRisk.performance.attendanceRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Submissions</p>
                <p className="text-lg font-semibold text-gray-800">
                  {studentRisk.performance.submissionRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Average Mark</p>
                <p className="text-lg font-semibold text-gray-800">
                  {studentRisk.performance.averageMark.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Intervention Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="text-indigo-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Intervention Details</h2>
          </div>

          {/* Error Message */}
          {(error || createInterventionMutation.isError) && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">
                  {error || 
                    (createInterventionMutation.error instanceof Error 
                      ? createInterventionMutation.error.message 
                      : 'Failed to create intervention. Please try again.')}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Intervention Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Intervention Plan *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (error) setError('');
                }}
                rows={12}
                className={`block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${
                  error 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-indigo-500'
                }`}
                placeholder="Describe the intervention plan, including:
- Specific concerns identified
- Actions to be taken
- Support resources to be provided
- Expected outcomes
- Timeline for follow-up

Example:
Student has shown declining attendance (65%) and submission rates (70%). Plan includes:
1. One-on-one meeting to discuss challenges
2. Weekly check-ins for the next 4 weeks
3. Referral to academic support services
4. Connect with student mentor program
Expected improvement in attendance to 80%+ within 4 weeks."
                disabled={createInterventionMutation.isPending}
              />
              <p className="text-xs text-gray-500 mt-2">
                Minimum 10 characters. Be specific and actionable.
              </p>
            </div>

            {/* Information Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Note:</h4>
              <p className="text-sm text-blue-700">
                This intervention will capture the student's current performance as a baseline. 
                You'll be able to track progress through follow-ups and compare against this baseline.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/coordinator/modules/${moduleId}/students/${studentId}`)}
                disabled={createInterventionMutation.isPending}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createInterventionMutation.isPending || !content.trim()}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {createInterventionMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Create Intervention
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}