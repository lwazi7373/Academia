import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Save,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  Trash2
} from 'lucide-react';
import { useGetStudentsMarksForAssessment, useGetAssessmentById } from '../../assessments/assessment.queries';
import { useUploadMarks } from '../../assessments/assessment.mutations';
import { useModule } from '../../module/context/ModuleContext';
import type { MarkEntry } from '../../assessments/assessment.types';

interface StudentMarkFormData {
  studentId: number;
  studentNumber: string;
  studentName: string;
  mark: string; // String for input handling
  submission: boolean;
  hasChanges: boolean; // Track if this row has been modified
}

export default function UploadAssessmentMarksPage() {
  const { moduleId, assessmentId } = useParams<{ moduleId: string; assessmentId: string }>();
  const navigate = useNavigate();
  const { module } = useModule();

  const moduleIdNum = moduleId ? parseInt(moduleId) : 0;
  const assessmentIdNum = assessmentId ? parseInt(assessmentId) : 0;

  // Fetch assessment details and students marks
  const { data: assessment, isLoading: isLoadingAssessment } = useGetAssessmentById(assessmentIdNum);
  const { data: studentsMarks, isLoading: isLoadingStudents, error: fetchError } = useGetStudentsMarksForAssessment(assessmentIdNum);
  const uploadMarksMutation = useUploadMarks(moduleIdNum);

  // Form state - array of student marks
  const [formData, setFormData] = useState<StudentMarkFormData[]>([]);
  const [errors, setErrors] = useState<Record<number, string>>({});

  // Populate form when students data is loaded
  useEffect(() => {
    if (studentsMarks) {
      setFormData(
        studentsMarks.map(student => ({
          studentId: student.studentId,
          studentNumber: student.studentNumber,
          studentName: student.studentName,
          mark: student.currentMark !== null ? student.currentMark.toString() : '',
          submission: student.isSubmitted,
          hasChanges: false
        }))
      );
    }
  }, [studentsMarks]);

  // Redirect if no params
  useEffect(() => {
    if (!moduleId || !assessmentId) {
      navigate('/lecturer/homePage');
    }
  }, [moduleId, assessmentId, navigate]);

  // Handle mark input change
  const handleMarkChange = (studentId: number, value: string) => {
    setFormData(prev =>
      prev.map(student =>
        student.studentId === studentId
          ? { ...student, mark: value, hasChanges: true }
          : student
      )
    );
    // Clear error for this student
    if (errors[studentId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[studentId];
        return newErrors;
      });
    }
  };

  // Handle submission checkbox change
  const handleSubmissionChange = (studentId: number, checked: boolean) => {
    setFormData(prev =>
      prev.map(student =>
        student.studentId === studentId
          ? { ...student, submission: checked, hasChanges: true }
          : student
      )
    );
  };

  // Clear all marks
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all marks? This will not save until you click Save.')) {
      setFormData(prev =>
        prev.map(student => ({
          ...student,
          mark: '',
          submission: false,
          hasChanges: true
        }))
      );
    }
  };

  // Mark all as submitted
  const handleMarkAllSubmitted = () => {
    setFormData(prev =>
      prev.map(student => ({
        ...student,
        submission: true,
        hasChanges: true
      }))
    );
  };

  // Mark all as not submitted
  const handleMarkAllNotSubmitted = () => {
    setFormData(prev =>
      prev.map(student => ({
        ...student,
        submission: false,
        hasChanges: true
      }))
    );
  };

  // Validate marks
  const validateMarks = (): boolean => {
    const newErrors: Record<number, string> = {};
    const totalMark = assessment?.totalMark || 100;

    formData.forEach(student => {
      if (student.mark !== '') {
        const mark = parseFloat(student.mark);
        if (isNaN(mark)) {
          newErrors[student.studentId] = 'Invalid mark';
        } else if (mark < 0) {
          newErrors[student.studentId] = 'Mark cannot be negative';
        } else if (mark > totalMark) {
          newErrors[student.studentId] = `Mark cannot exceed ${totalMark}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateMarks()) {
      return;
    }

    // Prepare marks data - only include students with changes
    const marksData: MarkEntry[] = formData
      .filter(student => student.hasChanges)
      .map(student => ({
        studentId: student.studentId,
        mark: student.mark !== '' ? parseFloat(student.mark) : null,
        submission: student.submission
      }));

    if (marksData.length === 0) {
      alert('No changes to save');
      return;
    }

    try {
      const result = await uploadMarksMutation.mutateAsync({
        assessmentId: assessmentIdNum,
        data: { marksData }
      });

      // Show success message
      alert(`Successfully saved marks!\nInserted: ${result.result.inserted}\nUpdated: ${result.result.updated}\nTotal: ${result.result.total}`);

      // Navigate back to assessments list
      navigate(`/module/${moduleId}/assessments/manage`);
    } catch (error) {
      console.error('Failed to upload marks:', error);
    }
  };

  // Calculate statistics
  const stats = {
    totalStudents: formData.length,
    markedStudents: formData.filter(s => s.mark !== '').length,
    submittedStudents: formData.filter(s => s.submission).length,
    changedRows: formData.filter(s => s.hasChanges).length
  };

  // Loading state
  if (isLoadingAssessment || isLoadingStudents) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading students...</p>
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
              <h1 className="text-2xl font-bold text-gray-800">Upload Marks</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="mx-auto mb-3 text-red-600" size={48} />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Students</h3>
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
              <h1 className="text-2xl font-bold text-gray-800">Upload Marks</h1>
              {module && assessment && (
                <div className="text-sm text-gray-600">
                  <p>{module.moduleCode} - {module.moduleName}</p>
                  <p className="text-blue-600 font-medium mt-1">
                    {assessment.assessmentName} (Total: {assessment.totalMark} marks)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Students</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Marks Entered</p>
                <p className="text-xl font-bold text-gray-800">{stats.markedStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <CheckCircle className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Submitted</p>
                <p className="text-xl font-bold text-gray-800">{stats.submittedStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <AlertCircle className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Unsaved Changes</p>
                <p className="text-xl font-bold text-gray-800">{stats.changedRows}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-gray-700">Bulk Actions:</p>
            <button
              onClick={handleClearAll}
              disabled={uploadMarksMutation.isPending}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm disabled:opacity-50"
            >
              <Trash2 size={16} />
              Clear All Marks
            </button>
            <button
              onClick={handleMarkAllSubmitted}
              disabled={uploadMarksMutation.isPending}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm disabled:opacity-50"
            >
              <CheckCircle size={16} />
              Mark All as Submitted
            </button>
            <button
              onClick={handleMarkAllNotSubmitted}
              disabled={uploadMarksMutation.isPending}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm disabled:opacity-50"
            >
              <XCircle size={16} />
              Mark All as Not Submitted
            </button>
          </div>
        </div>

        {/* Error Message */}
        {uploadMarksMutation.isError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Failed to Save Marks</h3>
              <p className="text-sm text-red-700 mt-1">
                {uploadMarksMutation.error instanceof Error 
                  ? uploadMarksMutation.error.message 
                  : 'An error occurred. Please try again.'}
              </p>
            </div>
          </div>
        )}

        {/* Students Table */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mark ({assessment?.totalMark})
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        <Users size={48} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium">No Students Enrolled</p>
                      </td>
                    </tr>
                  ) : (
                    formData.map((student) => (
                      <tr 
                        key={student.studentId}
                        className={`${student.hasChanges ? 'bg-yellow-50' : 'hover:bg-gray-50'} transition-colors`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.studentNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {student.studentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            step="0.01"
                            value={student.mark}
                            onChange={(e) => handleMarkChange(student.studentId, e.target.value)}
                            className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                              errors[student.studentId]
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                            placeholder="0.00"
                            disabled={uploadMarksMutation.isPending}
                          />
                          {errors[student.studentId] && (
                            <p className="text-xs text-red-600 mt-1">{errors[student.studentId]}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input
                            type="checkbox"
                            checked={student.submission}
                            onChange={(e) => handleSubmissionChange(student.studentId, e.target.checked)}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                            disabled={uploadMarksMutation.isPending}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(`/module/${moduleId}/assessments/manage`)}
              disabled={uploadMarksMutation.isPending}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadMarksMutation.isPending || stats.changedRows === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploadMarksMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Marks ({stats.changedRows} changes)
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}