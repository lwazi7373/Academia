import { useState } from 'react';
import { User, Lock, GraduationCap, Briefcase, AlertCircle } from 'lucide-react';
import { useLogin } from '../auth.mutations';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export default function LoginPage() {
    // State 
  const [userType, setUserType] = useState('student'); // Starts off on student
  const [identifierNumber, setIdentifierNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  // React Query mutation hook
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Call the mutation with proper field names matching backend
      const result = await loginMutation.mutateAsync({
        identifierNumber, 
        userPassword,  
      });
      
      // Login successful... Mutation already:
      // Stored token in localStorage
      // Invalidated cache to trigger useGetMe
      // Showed success toast
      
      // We will navigate to the relevant users next page (studentHomePage, lecturerModulesPage or CoordinatorHomePage)
      // I am expecting result to have the role (since useGetMe was triggered)
      navigate("/dashboard"); // place holder 
    } catch (error) {
      // Error is automatically handled by mutation
      console.error('Login failed:', error);
    }
  };

  // Extracting loading and error states from mutation
  const isLoading = loginMutation.isPending;
  const error = loginMutation.error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Academic Portal</h1>
          <p className="text-blue-100">Sign in to access your account</p>
        </div>
        
        {/* User type toggle */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setUserType('student')} // Change the type of user to student on click
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
              userType === 'student'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <GraduationCap size={20} />
              Student
            </div>
          </button>
          <button
            type="button"
            onClick={() => setUserType('staff')}  // Change the type of user to staff on click
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
              userType === 'staff'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Briefcase size={20} />
              Staff
            </div>
          </button>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Error message display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Login Failed</h3>
                  <p className="text-sm text-red-700 mt-1">
                    {/* Use clear messages frome the backend that are sent as msg */}
                    {error instanceof AxiosError && error.response?.data?.msg
                      ? error.response.data.msg
                      : 'An error occurred. Please try again.'}
                  </p>
                </div>
              </div>
            )}

            {/* Identifier input */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                {userType === 'student' ? 'Student Number' : 'Staff Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="identifier"
                  type="text"
                  value={identifierNumber}
                  onChange={(e) => setIdentifierNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder={userType === 'student' ? 'e.g., STU2024001' : 'e.g., STF2022001'}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a 
                  href="#" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Navigate to forgot password page
                    console.log('Navigate to forgot password');
                  }}
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        {/* Also placeholder information */}
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