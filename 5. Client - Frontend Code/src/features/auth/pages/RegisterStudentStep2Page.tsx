import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterStudentStep2 } from '../auth.mutations';
import { useGetQualifications } from '../auth.queries';
import { RegisterStudentStep2Request } from '../auth.types';

export default function StudentRegistrationStep2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, studentNumber } = location.state || {};

  // Redirect to previous page if no data from step 1
  useEffect(() => {
    if (!userId || !studentNumber) {
      navigate('/register');
    }
  }, [userId, studentNumber, navigate]);

  // Fetch qualifications for dropdown
  const { data: qualifications, isLoading: loadingQualifications } = useGetQualifications();

  // Form state
  const [formData, setFormData] = useState<RegisterStudentStep2Request>({
    userId: userId || 0,
    studentNumber: studentNumber || '',
    qualificationName: '',
    yearOfStudy: 1,
    semesterNo: 1,
    levelOfEducation: '',
  });

  // Mutation
  const registerMutation = useRegisterStudentStep2();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'yearOfStudy' || name === 'semesterNo' 
        ? parseInt(value, 10)
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await registerMutation.mutateAsync(formData);
      
      console.log('Student registration complete:', result);
      
      navigate('/registration-complete', { 
        state: { 
          message: `Successfully registered! ${result.modulesAssigned} modules assigned.`,
          student: result.student,
          modules: result.modules
        } 
      });
      
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const isLoading = registerMutation.isPending;
  const error = registerMutation.error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-info-50 to-accent-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-primary p-8 text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Academic Portal</h1>
          <p className="text-primary-100">Student Registration - Step 2 of 2</p>
        </div>

        {/* Progress indicator */}
        <div className="px-8 py-4 bg-neutral-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Step 2 of 2</span>
            <span className="text-sm text-neutral-500">Academic details</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        {/* Student info from Step 1 */}
        <div className="px-8 py-4 bg-primary-50 border-b border-primary-200">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-2 rounded-full">
              <GraduationCap size={20} className="text-primary-600" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Student Number</div>
              <div className="text-neutral-600 font-mono">{studentNumber}</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="alert-danger">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">Registration Failed</h3>
                  <p className="text-sm mt-1">An error occurred. Please try again.</p>
                </div>
              </div>
            )}

            {/* Qualification Dropdown */}
            <div>
              <label htmlFor="qualificationName" className="block text-sm font-medium text-neutral-700 mb-2">
                Qualification *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="qualificationName"
                  name="qualificationName"
                  value={formData.qualificationName}
                  onChange={handleInputChange}
                  className="input pl-10"
                  required
                  disabled={isLoading || loadingQualifications}
                >
                  <option value="">--Select Qualification--</option>
                  {qualifications?.map((qual) => (
                    <option key={qual.qualificationId} value={qual.qualificationName}>
                      {qual.qualificationName} ({qual.qualificationCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Level of Education */}
            <div>
              <label htmlFor="levelOfEducation" className="block text-sm font-medium text-neutral-700 mb-2">
                Level of Education *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="levelOfEducation"
                  name="levelOfEducation"
                  value={formData.levelOfEducation}
                  onChange={handleInputChange}
                  className="input pl-10"
                  required
                  disabled={isLoading}
                >
                  <option value="">--Select Level--</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Doctoral">Doctoral</option>
                </select>
              </div>
            </div>

            {/* Year of Study */}
            <div>
              <label htmlFor="yearOfStudy" className="block text-sm font-medium text-neutral-700 mb-2">
                Year of Study *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="input pl-10"
                  required
                  disabled={isLoading}
                >
                  <option value="">--Select Year--</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                  <option value="5">Year 5</option>
                </select>
              </div>
            </div>

            {/* Current Semester */}
            <div>
              <label htmlFor="semesterNo" className="block text-sm font-medium text-neutral-700 mb-2">
                Current Semester *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="semesterNo"
                  name="semesterNo"
                  value={formData.semesterNo}
                  onChange={handleInputChange}
                  className="input pl-10"
                  required
                  disabled={isLoading}
                >
                  <option value="">--Select Semester--</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </select>
              </div>
            </div>

            {/* Information box */}
            <div className="alert-info">
              <BookOpen size={20} className="flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Automatic Enrollment</h3>
                <p className="text-sm">
                  Modules will be assigned automatically based on your qualification and semester selection. 
                  No manual module selection is required.
                </p>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 btn-primary w-full text-base py-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Completing Registration...
              </>
            ) : (
              <>
                Complete Registration
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="card-footer text-center">
          <p className="text-sm text-neutral-600">
            Need help? Contact{' '}
            <a href="mailto:support@university.edu" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
              IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
