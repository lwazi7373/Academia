import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  Target,
  Hash,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useGetAssessmentById } from '../../assessments/assessment.queries';
import { useUpdateAssessment } from '../../assessments/assessment.mutations';
import { useModule } from '../../module/context/ModuleContext';

export default function EditAssessmentPage() {
  const { moduleId, assessmentId } = useParams<{ moduleId: string; assessmentId: string }>();
  const navigate = useNavigate();
  const { module } = useModule();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;
  const assessmentIdNum = assessmentId ? parseInt(assessmentId) : 0;

  // Fetch existing assessment data
  const { data: assessment, isLoading: isLoadingAssessment, error: fetchError } = useGetAssessmentById(assessmentIdNum);
  const updateAssessmentMutation = useUpdateAssessment(moduleIdNum);

  // Form state
  const [formData, setFormData] = useState({
    assessmentName: '',
    totalMark: '',
    weighting: '',
    dueDate: ''
  });

  const [errors, setErrors] = useState<{
    assessmentName?: string;
    totalMark?: string;
    weighting?: string;
    dueDate?: string;
  }>({});

  // Populate form when assessment data is loaded
  useEffect(() => {
    if (assessment) {
      setFormData({
        assessmentName: assessment.assessmentName,
        totalMark: assessment.totalMark.toString(),
        weighting: assessment.weighting.toString(),
        dueDate: assessment.dueDate
      });
    }
  }, [assessment]);

  // Redirect if no moduleId or assessmentId
  useEffect(() => {
    if (!moduleId || !assessmentId) {
      navigate('/lecturer/homePage');
    }
  }, [moduleId, assessmentId, navigate]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.assessmentName.trim()) {
      newErrors.assessmentName = 'Assessment name is required';
    }

    const totalMark = parseFloat(formData.totalMark);
    if (!formData.totalMark || isNaN(totalMark) || totalMark <= 0) {
      newErrors.totalMark = 'Total mark must be greater than 0';
    }

    const weighting = parseFloat(formData.weighting);
    if (!formData.weighting || isNaN(weighting) || weighting < 0 || weighting > 100) {
      newErrors.weighting = 'Weighting must be between 0 and 100';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await updateAssessmentMutation.mutateAsync({
        assessmentId: assessmentIdNum,
        data: {
          assessmentName: formData.assessmentName.trim(),
          totalMark: parseFloat(formData.totalMark),
          weighting: parseFloat(formData.weighting),
          dueDate: formData.dueDate
        }
      });

      // Navigate back to assessments list on success
      navigate(`/module/${moduleId}/assessments/manage`);
    } catch (error) {
      console.error('Failed to update assessment:', error);
    }
  };

  // Loading state while fetching assessment
  if (isLoadingAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading assessment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/module/${moduleId}/assessments/manage`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Edit Assessment</h1>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="mx-auto mb-3 text-red-600" size={48} />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Assessment</h3>
            <p className="text-red-700">
              {fetchError instanceof Error ? fetchError.message : 'An unexpected error occurred'}
            </p>
          </div>
        </main>
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
              onClick={() => navigate(`/module/${moduleId}/assessments/manage`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Edit Assessment</h1>
              {module && assessment && (
                <div className="text-sm text-gray-600">
                  <p>{module.moduleCode} - {module.moduleName}</p>
                  <p className="text-blue-600 font-medium mt-1">
                    Editing: {assessment.assessmentName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Assessment Details</h2>
          </div>

          {/* Error Message */}
          {updateAssessmentMutation.isError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Failed to Update Assessment</h3>
                <p className="text-sm text-red-700 mt-1">
                  {updateAssessmentMutation.error instanceof Error 
                    ? updateAssessmentMutation.error.message 
                    : 'An error occurred. Please try again.'}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Assessment Name */}
            <div>
              <label htmlFor="assessmentName" className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="assessmentName"
                  name="assessmentName"
                  type="text"
                  value={formData.assessmentName}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.assessmentName 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="e.g., Assignment 1, Test 2, Final Exam"
                  disabled={updateAssessmentMutation.isPending}
                />
              </div>
              {errors.assessmentName && (
                <p className="mt-1 text-sm text-red-600">{errors.assessmentName}</p>
              )}
            </div>

            {/* Total Mark and Weighting - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Mark */}
              <div>
                <label htmlFor="totalMark" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Mark *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="totalMark"
                    name="totalMark"
                    type="number"
                    step="0.01"
                    value={formData.totalMark}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.totalMark 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="e.g., 100"
                    disabled={updateAssessmentMutation.isPending}
                  />
                </div>
                {errors.totalMark && (
                  <p className="mt-1 text-sm text-red-600">{errors.totalMark}</p>
                )}
              </div>

              {/* Weighting */}
              <div>
                <label htmlFor="weighting" className="block text-sm font-medium text-gray-700 mb-2">
                  Weighting (%) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="weighting"
                    name="weighting"
                    type="number"
                    step="0.01"
                    value={formData.weighting}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.weighting 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="e.g., 15.00"
                    disabled={updateAssessmentMutation.isPending}
                  />
                </div>
                {errors.weighting && (
                  <p className="mt-1 text-sm text-red-600">{errors.weighting}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Enter value between 0 and 100</p>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.dueDate 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  disabled={updateAssessmentMutation.isPending}
                />
              </div>
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/module/${moduleId}/assessments/manage`)}
                disabled={updateAssessmentMutation.isPending}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateAssessmentMutation.isPending}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {updateAssessmentMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Update Assessment
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