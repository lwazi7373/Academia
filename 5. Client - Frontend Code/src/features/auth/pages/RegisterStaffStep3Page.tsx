// StaffRegistrationStep3.tsx
import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterStaffStep3 } from '../auth.mutations';
import { useGetDepartmentModules } from '../auth.queries';
import { RegisterStaffStep3Request } from '../auth.types';

export default function StaffRegistrationStep3() {
  // Get data from Step 2
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, departmentId, role } = location.state || {};

  // Redirect if no data from previous steps
  useEffect(() => {
    if (!userId || !departmentId || !role) {
      navigate('/register');
    }
  }, [userId, departmentId, role, navigate]);

  // Fetch modules for the selected department
  const { data: modules, isLoading: loadingModules } = useGetDepartmentModules(
    departmentId || 0,
    !!departmentId  // Only fetch if departmentId exists
  );

  // Selected module IDs
  const [selectedModuleIds, setSelectedModuleIds] = useState<number[]>([]);

  // Mutation
  const registerMutation = useRegisterStaffStep3();

  const handleAddModule = (moduleId: number) => {
    if (!selectedModuleIds.includes(moduleId)) {
      setSelectedModuleIds(prev => [...prev, moduleId]);
    }
  };

  const handleRemoveModule = (moduleId: number) => {
    setSelectedModuleIds(prev => prev.filter(id => id !== moduleId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedModuleIds.length === 0) {
      // Could show a warning toast here
      alert('Please select at least one module');
      return;
    }

    try {
      // Prepare the request matching RegisterStaffStep3Request
      const requestData: RegisterStaffStep3Request = {
        userId: userId,
        userRole: role,
        moduleIds: selectedModuleIds,
      };

      const result = await registerMutation.mutateAsync(requestData);
      
      // Success! Result contains { modulesAssigned, modules }
      console.log('Staff registration complete:', result);
      
      // Navigate to success page
      navigate('/registration-complete', {  //Just a place holder 
        state: { 
          message: `Registration completed! ${result.modulesAssigned} modules assigned.`,
          modules: result.modules
        } 
      });
      
    } catch (error) {
      console.error('Module assignment failed:', error);
    }
  };

  const isLoading = registerMutation.isPending;
  const error = registerMutation.error;

  // Get selected modules for display
  const selectedModules = modules?.filter(m => selectedModuleIds.includes(m.moduleId)) || [];
  const availableModules = modules?.filter(m => !selectedModuleIds.includes(m.moduleId)) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Academic Portal</h1>
          <p className="text-blue-100">Staff Registration - Step 3 of 3</p>
        </div>

        {/* Progress indicator */}
        <div className="px-8 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step 3 of 3</span>
            <span className="text-sm text-gray-500">Module assignment</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        {/* Staff info */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Briefcase size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-800">Role: {role}</div>
              <div className="text-sm text-gray-600">Select modules they will be teaching</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Assignment Failed</h3>
                <p className="text-sm text-red-700 mt-1">
                  {'An error occurred. Please try again.'}
                </p>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loadingModules ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading available modules...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Modules */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Available Modules ({availableModules.length})
                </h3>
                
                {availableModules.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {availableModules.map((module) => (
                      <div 
                        key={module.moduleId}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-800">{module.moduleCode}</div>
                            <div className="text-sm text-gray-600 mt-1">{module.moduleName}</div>
                            <div className="text-xs text-gray-500 mt-1">{module.credits} credits</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddModule(module.moduleId)}
                            disabled={isLoading}
                            className="flex-shrink-0 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-600">All modules have been selected!</p>
                  </div>
                )}
              </div>

              {/* Selected Modules */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Selected Modules ({selectedModules.length})
                </h3>
                
                {selectedModules.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {selectedModules.map((module) => (
                      <div 
                        key={module.moduleId}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-800">{module.moduleCode}</div>
                            <div className="text-sm text-gray-600 mt-1">{module.moduleName}</div>
                            <div className="text-xs text-gray-500 mt-1">{module.credits} credits</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(module.moduleId)}
                            disabled={isLoading}
                            className="flex-shrink-0 px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No modules selected yet.</p>
                    <p className="text-sm text-gray-500 mt-1">Add modules from the available list</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Summary */}
          {selectedModules.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle size={20} />
                <span className="font-medium">
                  {selectedModules.length} module{selectedModules.length !== 1 ? 's' : ''} selected
                </span>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || selectedModuleIds.length === 0 || loadingModules}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

          {selectedModuleIds.length === 0 && !loadingModules && (
            <p className="mt-2 text-sm text-gray-500 text-center">
              Please select at least one module to continue
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
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