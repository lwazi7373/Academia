import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  Target,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Upload,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { useGetLecturerModuleAssessments } from '../../assessments/assessment.queries';
import { useDeleteAssessment } from '../../assessments/assessment.mutations';
import { useModule } from '../../module/context/ModuleContext';

export default function LecturerAssessmentsListPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { module } = useModule();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;
  const { data: assessments, isLoading, error } = useGetLecturerModuleAssessments(moduleIdNum);
  const deleteAssessmentMutation = useDeleteAssessment(moduleIdNum);

  // State for delete confirmation modal
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    assessmentId: number | null;
    assessmentName: string;
  }>({
    isOpen: false,
    assessmentId: null,
    assessmentName: ''
  });

  // Redirect if no moduleId
  useEffect(() => {
    if (!moduleId) {
      navigate('/lecturer/homePage');
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

  // Helper function to get status styling based on due date
  const getStatusStyle = (daysUntilDue: number) => {
    if (daysUntilDue < 0) {
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-300',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-700'
      };
    }
    
    if (daysUntilDue <= 2) {
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-700'
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

  // Handle delete confirmation
  const openDeleteModal = (assessmentId: number, assessmentName: string) => {
    setDeleteModal({
      isOpen: true,
      assessmentId,
      assessmentName
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      assessmentId: null,
      assessmentName: ''
    });
  };

  const handleDelete = async () => {
    if (deleteModal.assessmentId) {
      try {
        await deleteAssessmentMutation.mutateAsync(deleteModal.assessmentId);
        closeDeleteModal();
      } catch (error) {
        console.error('Failed to delete assessment:', error);
      }
    }
  };

  // Calculate total weighting
  const totalWeighting = assessments?.reduce((sum, a) => sum + a.weighting, 0) || 0;

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
              <h1 className="text-2xl font-bold text-gray-800">Manage Assessments</h1>
              {module && (
                <p className="text-sm text-gray-600">
                  {module.moduleCode} - {module.moduleName}
                </p>
              )}
            </div>
            <button
              onClick={() => navigate(`/module/${moduleId}/assessments/create`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus size={20} />
              Create Assessment
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        {assessments && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold text-gray-800">{assessments.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Weighting</p>
                  <p className={`text-2xl font-bold ${
                    totalWeighting === 100 
                      ? 'text-green-600' 
                      : totalWeighting > 100 
                      ? 'text-red-600' 
                      : 'text-orange-600'
                  }`}>
                    {totalWeighting}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Calendar className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {assessments.filter(a => getDaysUntilDue(a.dueDate) >= 0).length}
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
              <p className="text-xl font-medium">No Assessments Created</p>
              <p className="text-sm mt-2 mb-6">Create your first assessment to get started</p>
              <button
                onClick={() => navigate(`/module/${moduleId}/assessments/create`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus size={20} />
                Create Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment) => {
                const daysUntilDue = getDaysUntilDue(assessment.dueDate);
                const statusStyle = getStatusStyle(daysUntilDue);

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
                      <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusStyle.badge}`}>
                        {daysUntilDue < 0
                          ? 'Past Due'
                          : daysUntilDue === 0
                          ? 'Due Today'
                          : daysUntilDue === 1
                          ? 'Due Tomorrow'
                          : `${daysUntilDue} days left`}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/module/${moduleId}/assessments/${assessment.assessmentId}/upload-marks`)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                        >
                          <Upload size={18} />
                          Upload Marks
                        </button>

                        <button
                          onClick={() => navigate(`/module/${moduleId}/assessments/${assessment.assessmentId}/edit`)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                          <Edit size={18} />
                          Edit Details
                        </button>

                        <button
                          onClick={() => openDeleteModal(assessment.assessmentId, assessment.assessmentName)}
                          disabled={deleteAssessmentMutation.isPending}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-red-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <AlertCircle size={28} />
                <h2 className="text-xl font-bold">Confirm Deletion</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete this assessment?
              </p>
              <p className="font-semibold text-gray-900 mb-4">
                "{deleteModal.assessmentName}"
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> This action cannot be undone. All associated marks and submissions will be permanently deleted.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeDeleteModal}
                  disabled={deleteAssessmentMutation.isPending}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteAssessmentMutation.isPending}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteAssessmentMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      Deleting...
                    </div>
                  ) : (
                    'Delete Assessment'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}