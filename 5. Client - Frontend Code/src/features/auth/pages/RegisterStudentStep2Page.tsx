// StudentRegistrationStep2.tsx
import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterStudentStep2 } from '../auth.mutations';
import { useGetQualifications } from '../auth.queries';
import { RegisterStudentStep2Request } from '../auth.types';

export default function StudentRegistrationStep2() {
  // Get data from Step 1 via navigation state
  // useLocation allows me to get the data sent from the previous page that lead to this one 
  // note this is the student page, meaning if student we sent userId and studentNumber
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, studentNumber } = location.state || {}; // This is how we actually get the data

  // Redirect to previous page if no data from step 1
  useEffect(() => {
    if (!userId || !studentNumber) {
      navigate('/register');
    }
  }, [userId, studentNumber, navigate]);

  // Fetch qualifications for dropdown
  const { data: qualifications, isLoading: loadingQualifications } = useGetQualifications();

  // Form state typed with RegisterStudentStep2Request
  const [formData, setFormData] = useState<RegisterStudentStep2Request>({
    userId: userId || 0,
    studentNumber: studentNumber || '',
    qualificationName: '',  // Backend expects qualification NAME, not ID
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
        ? parseInt(value, 10)  // Convert to number for these fields
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await registerMutation.mutateAsync(formData);
      
      // Success! Result contains { student, modulesAssigned, modules }
      console.log('Student registration complete:', result);
      
      // Navigate to the registration complete page (Not yet created, but I will)
      navigate('/registration-complete', { 
        // Send this to data to the page, to assure admin of what has been registered for the student (no need, but useful)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Academic Portal</h1>
          <p className="text-blue-100">Student Registration - Step 2 of 2</p>
        </div>

        {/* Progress indicator */}
        <div className="px-8 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step 2 of 2</span>
            <span className="text-sm text-gray-500">Academic details</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        {/* Student info from Step 1 */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <GraduationCap size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-800">Student Number</div>
              <div className="text-gray-600">{studentNumber}</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Registration Failed</h3>
                  <p className="text-sm text-red-700 mt-1">
                    {'An error occurred. Please try again.'}
                  </p>
                </div>
              </div>
            )}

            {/* Qualification Dropdown */}
            <div>
              <label htmlFor="qualificationName" className="block text-sm font-medium text-gray-700 mb-2">
                Qualification *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="qualificationName"
                  name="qualificationName"
                  value={formData.qualificationName}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
              <label htmlFor="levelOfEducation" className="block text-sm font-medium text-gray-700 mb-2">
                Level of Education *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="levelOfEducation"
                  name="levelOfEducation"
                  value={formData.levelOfEducation}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
              <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
                Year of Study *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
              <label htmlFor="semesterNo" className="block text-sm font-medium text-gray-700 mb-2">
                Current Semester *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="semesterNo"
                  name="semesterNo"
                  value={formData.semesterNo}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Automatic Enrollment</h3>
                  <p className="text-sm text-blue-700">
                    Modules will be assigned automatically based on your qualification and semester selection. 
                    No manual module selection is required.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        <div className="bg-gray-50 px-8 py-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <a href="mailto:support@university.edu" className="text-blue-600 hover:text-blue-500 font-medium">
              IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}