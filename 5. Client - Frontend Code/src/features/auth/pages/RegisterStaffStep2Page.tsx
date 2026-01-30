import React, { useState, useEffect } from 'react';
import { User, Building, ArrowRight, AlertCircle, Briefcase } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterStaffStep2 } from '../auth.mutations';
import { useGetDepartments } from '../auth.queries';
import { RegisterStaffStep2Request } from '../auth.types';

export default function StaffRegistrationStep2() {
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
      
      console.log('Staff step 2 complete:', result);
      
      // HOD doesn't need step 3
      if (role === 'HOD') {
        navigate('/registration-complete', {
          state: { 
            message: 'HOD registration completed successfully!',
            staff: result.staff
          } 
        });
      } else {
        // Lecturer/Coordinator need step 3
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-info-50 to-accent-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-primary p-8 text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Academic Portal</h1>
          <p className="text-primary-100">Staff Registration - Step 2 of {role === 'HOD' ? '2' : '3'}</p>
        </div>

        {/* Progress indicator */}
        <div className="px-8 py-4 bg-neutral-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Step 2 of {role === 'HOD' ? '2' : '3'}</span>
            <span className="text-sm text-neutral-500">Department assignment</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-secondary-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: role === 'HOD' ? '100%' : '66%' }}
            ></div>
          </div>
        </div>

        {/* Staff info from Step 1 */}
        <div className="px-8 py-4 bg-secondary-50 border-b border-secondary-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-secondary-100 p-2 rounded-full">
              <User size={20} className="text-secondary-600" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Staff Number</div>
              <div className="text-neutral-600 font-mono">{staffNumber}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-secondary-100 p-2 rounded-full">
              <Briefcase size={20} className="text-secondary-600" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Role</div>
              <div className="text-neutral-600">{role}</div>
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

            {/* Department Dropdown */}
            <div>
              <label htmlFor="departmentId" className="block text-sm font-medium text-neutral-700 mb-2">
                Department *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="departmentId"
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleInputChange}
                  className="input pl-10"
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
              <div className="alert-info">
                <Building size={20} className="flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Next Step</h3>
                  <p className="text-sm">
                    After selecting your department, you'll be able to choose which modules you'll be teaching.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || formData.departmentId === 0}
            className="mt-8 btn-secondary w-full text-base py-3"
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
