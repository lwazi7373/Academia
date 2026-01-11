// RegisterPage.tsx
import React, { useState } from 'react';
import { User, Mail, Lock, Phone, IdCard, GraduationCap, Briefcase, ArrowRight, AlertCircle } from 'lucide-react';
import { useRegisterStep1 } from '../auth.mutations';
import { RegisterStep1Request } from '../auth.types';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  // Type the state with RegisterStep1Request
  const [formData, setFormData] = useState<RegisterStep1Request>({
    title: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    emailAddress: '',
    userPassword: '',
    contactNo: '',
    gender: '',
    userRole: 'STUDENT',  
    isActive: true,
  });
  
  const registerMutation = useRegisterStep1();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await registerMutation.mutateAsync(formData);
      
      console.log('Registration step 1 complete:', result);
      
      if (result.role === 'STUDENT') {
        navigate('/register2/student', { 
          state: { 
            userId: result.userId, 
            studentNumber: result.studentNumber 
          } 
        });
      } else {
        navigate('/register2/staff', { 
          state: { 
            userId: result.userId, 
            staffNumber: result.staffNumber,
            role: result.role
          } 
        });
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const isLoading = registerMutation.isPending;
  const error = registerMutation.error;

  // Determine if student or staff based on selected role
  const isStudent = formData.userRole === 'STUDENT';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Academic Portal</h1>
          <p className="text-blue-100">Create An Account - Step 1 of {isStudent ? '2' : '3'}</p>
        </div>
        
        {/* Visual indicator (not interactive) */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-4 border-b border-blue-100">
          <div className="flex items-center justify-center gap-3">
            {isStudent ? (
              <>
                <div className="bg-blue-600 p-2 rounded-full">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Student Registration</div>
                  <div className="text-sm text-gray-600">Enrolling in academic programs</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-indigo-600 p-2 rounded-full">
                  <Briefcase size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Staff Registration</div>
                  <div className="text-sm text-gray-600">Joining the academic team</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Registration form */}
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

            <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>

            {/* Role Selection - FIRST FIELD */}
            <div>
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-2">
                I am registering a *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isStudent ? (
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <select
                  id="userRole"
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                  required
                  disabled={isLoading}
                >
                  <option value="STUDENT">Student</option>
                  <option value="LECTURER">Lecturer</option>
                  <option value="COORDINATOR">Coordinator</option>
                  <option value="HOD">Head of Department</option>
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {isStudent 
                  ? 'Students will be enrolled in courses and modules' 
                  : 'Staff members will be assigned to departments and modules'}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6"></div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Mr., Ms., Dr., Prof., etc."
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* First Name & Last Name - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="First name"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Last name"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* ID Number */}
            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                ID Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="idNumber"
                  name="idNumber"
                  type="text"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="National ID number"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="email@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="userPassword"
                  name="userPassword"
                  type="password"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Minimum 6 characters</p>
            </div>

            {/* Contact & Gender - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="contactNo"
                    name="contactNo"
                    type="tel"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="0XX XXX XXXX"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  Continue to Step 2
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}