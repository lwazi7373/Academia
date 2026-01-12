// StaffRegistrationStep2.tsx
import React, { useState, useEffect } from 'react';
import { User, Building, ArrowRight, AlertCircle, Briefcase } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterStaffStep2 } from '../auth.mutations';
import { useGetDepartments } from '../auth.queries';
import { RegisterStaffStep2Request } from '../auth.types';

export default function StaffRegistrationStep2() {
  // Get data from Step 1
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, staffNumber, role } = location.state || {};

  // Redirect if no data from step 1
  useEffect(() => {
    if (!userId || !staffNumber || !role) {
      navigate('/register');
    }
  }, [userId, staffNumber, role, navigate]);

  // Fetch departments for dropdown
  const { data: departments, isLoading: loadingDepartments } = useGetDepartments();

  // Form state
  const [formData, setFormData] = useState<RegisterStaffStep2Request>({
    userId: userId || 0,
    staffNumber: staffNumber || '',
    departmentId: 0,  
    userRole: role || 'LECTURER',
  });

  // Mutation
  const registerMutation = useRegisterStaffStep2();

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'departmentId' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await registerMutation.mutateAsync(formData);
      
      // Result contains { staff: { userId, staffNumber, departmentId, userRole } }
      console.log('Staff step 2 complete:', result);
      
      // HOD doesn't need step 3 (module assignment)
      if (role === 'HOD') {
        navigate('/registration-complete', {  // Just a place holder 
          state: { 
            message: 'HOD registration completed successfully!',
            staff: result.staff
          } 
        });
      } else {
        // Lecturer/Coordinator need step 3 for module assignment
        navigate('/register3/staff', { 
          state: { 
            userId: result.staff.userId,
            departmentId: result.staff.departmentId,
            role: result.staff.userRole
          } 
        });
      }
      
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
          <p className="text-blue-100">Staff Registration - Step 2 of {role === 'HOD' ? '2' : '3'}</p>
        </div>

        {/* Progress indicator */}
        <div className="px-8 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step 2 of {role === 'HOD' ? '2' : '3'}</span>
            <span className="text-sm text-gray-500">Department assignment</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: role === 'HOD' ? '100%' : '66%' }}
            ></div>
          </div>
        </div>

        {/* Staff info from Step 1 */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-800">Staff Number</div>
              <div className="text-gray-600">{staffNumber}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Briefcase size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-800">Role</div>
              <div className="text-gray-600">{role}</div>
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

            {/* Department Dropdown */}
            <div>
              <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="departmentId"
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                  disabled={isLoading || loadingDepartments}
                >
                  <option value="0">--Select Department--</option>
                  {departments?.map((dept) => (
                    <option key={dept.departmentId} value={dept.departmentId}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Info box for next step */}
            {role !== 'HOD' && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Building size={20} className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Next Step</h3>
                    <p className="text-sm text-blue-700">
                      After selecting your department, you'll be able to choose which modules you'll be teaching.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || formData.departmentId === 0}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                {role === 'HOD' ? 'Complete Registration' : 'Continue to Module Selection'}
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