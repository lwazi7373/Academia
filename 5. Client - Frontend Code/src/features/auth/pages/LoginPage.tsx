import { useState } from 'react';
import { User, Lock, GraduationCap, Briefcase, AlertCircle, X } from 'lucide-react';
import { useLogin } from '../auth.mutations';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export default function LoginPage() {
    // State 
  const [userType, setUserType] = useState('student'); // Starts off on student
  const [identifierNumber, setIdentifierNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // A user can have both LECTURER and COORDINATOR roles. Roles is an array in the system (e.g., ['LECTURER', 'COORDINATOR'])
  // The LoginResponse only returns a LoginUser which has roles: string[], but doesn't include the full profile data.
  // After login, useGetMe fetches the full User type with profiles.
  // So to handle this, I am going to add state for role selection modal
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  
  // React Query mutation hook
  const loginMutation = useLogin();
  const navigate = useNavigate();

    // Handle roles issue
    const navigateBasedOnRole = (roles: string[], selectedRole?: string) => {
    // If a specific role is selected, use that
    if (selectedRole) {
      if (selectedRole === 'COORDINATOR') {
        navigate('/coordinator/homePage');
      } else if (selectedRole === 'LECTURER') {
        navigate('/lecturer/homePage');
      }
      return;
    }

    // Check if user has both LECTURER and COORDINATOR roles
    const hasLecturer = roles.includes('LECTURER');
    const hasCoordinator = roles.includes('COORDINATOR');
    
    if (hasLecturer && hasCoordinator) {
      // Show modal to let user choose
      setAvailableRoles(roles);
      setShowRoleModal(true);
      return;
    }

    // Single role navigation
    if (roles.includes('STUDENT')) {
      navigate('/student/homePage');
    } else if (hasCoordinator) {
      navigate('/coordinator/homePage');
    } else if (hasLecturer) {
      navigate('/lecturer/homePage');
    } else if (roles.includes('HOD')) {
      navigate('/hod/homePage'); // Not really there yet
    } else if (roles.includes('ADMIN')) {
      navigate('/register');
    } else {
      navigate('/dashboard'); // Fallback
    }
  };

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

      navigateBasedOnRole(result.user.roles);
    } catch (error) {
      // Error is automatically handled by mutation
      console.error('Login failed:', error);
    }
  };

  // Allow for a way to distinguish roles using UI interaction
  const handleRoleSelection = (role: string) => {
      setShowRoleModal(false);
      navigateBasedOnRole(availableRoles, role);
  };

  // Extracting loading and error states from mutation
  const isLoading = loginMutation.isPending;
  const error = loginMutation.error;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-info-50 to-accent-50 flex items-center justify-center p-4">
        <div className="card w-full max-w-md animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-primary p-8 text-center">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Academic Portal</h1>
            <p className="text-primary-100">Sign in to access your account</p>
          </div>
          
          {/* User type toggle */}
          <div className="flex border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                userType === 'student'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <GraduationCap size={20} />
                Student
              </div>
            </button>
            <button
              type="button"
              onClick={() => setUserType('staff')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                userType === 'staff'
                  ? 'bg-secondary-50 text-secondary-700 border-b-2 border-secondary-600'
                  : 'text-neutral-600 hover:text-neutral-800'
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
                <div className="alert-danger">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Login Failed</h3>
                    <p className="text-sm mt-1">
                      {error instanceof AxiosError && error.response?.data?.msg
                        ? error.response.data.msg
                        : 'An error occurred. Please try again.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Identifier input */}
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-neutral-700 mb-2">
                  {userType === 'student' ? 'Student Number' : 'Staff Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    value={identifierNumber}
                    onChange={(e) => setIdentifierNumber(e.target.value)}
                    className="input pl-10"
                    placeholder={userType === 'student' ? 'e.g., STU2024001' : 'e.g., STF2022001'}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="input pl-10"
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
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a 
                    href="#" 
                    className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Navigate to forgot password'); // Institutional system 
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
                className="btn-primary w-full text-base py-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-neutral-50 px-8 py-6 text-center border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              Need help? Contact{' '}
              <a href="mailto:support@university.edu" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                IT Support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="card w-full max-w-md animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-primary p-6 flex justify-between items-center">
              <h2 className="text-xl font-display font-bold text-white">Select Your Role</h2>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-white hover:text-primary-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-neutral-600 mb-6">
                You have multiple roles. Please select which role you'd like to access:
              </p>

              <div className="space-y-3">
                {availableRoles.includes('COORDINATOR') && (
                  <button
                    onClick={() => handleRoleSelection('COORDINATOR')}
                    className="w-full bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg p-4 text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white p-3 rounded-lg group-hover:scale-110 transition-transform">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-800">Coordinator</h3>
                        <p className="text-sm text-neutral-600">Access coordinator Home Page</p>
                      </div>
                    </div>
                  </button>
                )}

                {availableRoles.includes('LECTURER') && (
                  <button
                    onClick={() => handleRoleSelection('LECTURER')}
                    className="w-full bg-secondary-50 hover:bg-secondary-100 border-2 border-secondary-200 rounded-lg p-4 text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary-600 text-white p-3 rounded-lg group-hover:scale-110 transition-transform">
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-800">Lecturer</h3>
                        <p className="text-sm text-neutral-600">Access lecturer Home Page</p>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}