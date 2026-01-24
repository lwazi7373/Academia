import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Loader2,
  AlertCircle,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { useActiveIntervention } from '../intervention.queries';
import { useCreateFollowUp } from '../intervention.mutations';
import type { FollowUpOutcome } from '../intervention.types';

export default function ViewInterventionPage() {
  const { moduleId, studentId } = useParams<{ moduleId: string; studentId: string }>();
  const navigate = useNavigate();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;
  const studentIdNum = studentId ? parseInt(studentId) : 0;

  // State for follow-up form
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [followUpContent, setFollowUpContent] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState<FollowUpOutcome>('NO_CHANGE');
  const [error, setError] = useState('');

  // Fetch active intervention
  const { data: interventionData, isLoading, error: fetchError } = useActiveIntervention(moduleIdNum, studentIdNum);
  const createFollowUpMutation = useCreateFollowUp();

  // Redirect if no params
  useEffect(() => {
    if (!moduleId || !studentId) {
      navigate('/coordinator/homePage');
    }
  }, [moduleId, studentId, navigate]);

  const intervention = interventionData?.intervention;

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

  // Helper function to get status badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
      case 'FOLLOW_UP_DUE':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
      case 'CLOSED':
        return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
      default:
        return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' };
    }
  };

  // Helper function to get outcome icon and styling
  const getOutcomeStyle = (outcome: FollowUpOutcome) => {
    switch (outcome) {
      case 'IMPROVED':
        return { 
          icon: TrendingUp, 
          bg: 'bg-green-100', 
          text: 'text-green-700',
          label: 'Improved'
        };
      case 'NO_CHANGE':
        return { 
          icon: Minus, 
          bg: 'bg-yellow-100', 
          text: 'text-yellow-700',
          label: 'No Change'
        };
      case 'WORSENED':
        return { 
          icon: TrendingDown, 
          bg: 'bg-red-100', 
          text: 'text-red-700',
          label: 'Worsened'
        };
    }
  };

  // Handle follow-up submission
  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!followUpContent.trim()) {
      setError('Follow-up notes are required');
      return;
    }

    if (followUpContent.trim().length < 10) {
      setError('Follow-up notes must be at least 10 characters');
      return;
    }

    if (!intervention) return;

    try {
      await createFollowUpMutation.mutateAsync({
        interventionId: intervention.interventionId,
        data: {
          content: followUpContent.trim(),
          outcome: selectedOutcome
        }
      });

      // Reset form and close
      setFollowUpContent('');
      setSelectedOutcome('NO_CHANGE');
      setShowFollowUpForm(false);
      setError('');
    } catch (error) {
      console.error('Failed to create follow-up:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading intervention...</p>
        </div>
      </div>
    );
  }

  // Error or no intervention state
  if (fetchError || !intervention) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/coordinator/modules/${moduleId}/students/${studentId}`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">View Intervention</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <AlertCircle className="mx-auto mb-3 text-orange-600" size={48} />
            <h3 className="text-lg font-semibold text-orange-800 mb-2">No Active Intervention</h3>
            <p className="text-orange-700 mb-4">
              This student does not have an active intervention.
            </p>
            <button
              onClick={() => navigate(`/coordinator/modules/${moduleId}/students/${studentId}/intervention/create`)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Create Intervention
            </button>
          </div>
        </main>
      </div>
    );
  }

  const statusStyle = getStatusStyle(intervention.status);

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
              <h1 className="text-2xl font-bold text-gray-800">Active Intervention</h1>
              <p className="text-sm text-gray-600">Intervention ID: #{intervention.interventionId}</p>
            </div>
            <div className={`px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} font-medium`}>
              {intervention.status.replace('_', ' ')}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intervention Details Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="text-indigo-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Intervention Plan</h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {intervention.content}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Created: {formatDate(intervention.createdAt)}</span>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Performance Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Attendance */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Attendance Rate</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Baseline</span>
                    <span className="font-semibold text-gray-700">
                      {intervention.baselinePerformance.attendanceRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${intervention.baselinePerformance.attendanceRate}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Current</span>
                    <span className="font-semibold text-indigo-700">
                      {intervention.currentPerformance.attendanceRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${intervention.currentPerformance.attendanceRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submissions */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Submission Rate</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Baseline</span>
                    <span className="font-semibold text-gray-700">
                      {intervention.baselinePerformance.submissionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${intervention.baselinePerformance.submissionRate}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Current</span>
                    <span className="font-semibold text-indigo-700">
                      {intervention.currentPerformance.submissionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${intervention.currentPerformance.submissionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Average Mark */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Average Mark</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Baseline</span>
                    <span className="font-semibold text-gray-700">
                      {intervention.baselinePerformance.averageMark.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${intervention.baselinePerformance.averageMark}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Current</span>
                    <span className="font-semibold text-indigo-700">
                      {intervention.currentPerformance.averageMark.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${intervention.currentPerformance.averageMark}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Follow-ups Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                Follow-ups ({intervention.followUpCount})
              </h2>
            </div>
            {!showFollowUpForm && (
              <button
                onClick={() => setShowFollowUpForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                <Plus size={20} />
                Add Follow-up
              </button>
            )}
          </div>

          {/* Follow-up Form */}
          {showFollowUpForm && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">New Follow-up</h3>
              
              {/* Error Message */}
              {(error || createFollowUpMutation.isError) && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-700">
                      {error || 
                        (createFollowUpMutation.error instanceof Error 
                          ? createFollowUpMutation.error.message 
                          : 'Failed to create follow-up. Please try again.')}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFollowUpSubmit} className="space-y-4">
                {/* Outcome Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcome *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['IMPROVED', 'NO_CHANGE', 'WORSENED'] as FollowUpOutcome[]).map((outcome) => {
                      const style = getOutcomeStyle(outcome);
                      const Icon = style.icon;
                      const isSelected = selectedOutcome === outcome;
                      
                      return (
                        <button
                          key={outcome}
                          type="button"
                          onClick={() => setSelectedOutcome(outcome)}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? `${style.bg} ${style.text} border-current font-semibold`
                              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <Icon size={18} />
                          {style.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Follow-up Notes */}
                <div>
                  <label htmlFor="followUpContent" className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up Notes *
                  </label>
                  <textarea
                    id="followUpContent"
                    value={followUpContent}
                    onChange={(e) => {
                      setFollowUpContent(e.target.value);
                      if (error) setError('');
                    }}
                    rows={6}
                    className={`block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${
                      error 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-indigo-500'
                    }`}
                    placeholder="Document your observations, actions taken, and student response..."
                    disabled={createFollowUpMutation.isPending}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFollowUpForm(false);
                      setFollowUpContent('');
                      setError('');
                    }}
                    disabled={createFollowUpMutation.isPending}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createFollowUpMutation.isPending || !followUpContent.trim()}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {createFollowUpMutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        Save Follow-up
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Follow-ups List Placeholder */}
          {intervention.followUpCount === 0 && !showFollowUpForm && (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No Follow-ups Yet</p>
              <p className="text-sm mt-1">Add a follow-up to track progress</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}