import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRegisterStaffStep3 } from '../auth.mutations';
import { useGetDepartmentModules } from '../auth.queries';
import { RegisterStaffStep3Request } from '../auth.types';

export default function StaffRegistrationStep3() {
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
    !!departmentId
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
      alert('Please select at least one module');
      return;
    }

    try {
      const requestData: RegisterStaffStep3Request = {
        userId: userId,
        userRole: role,
        moduleIds: selectedModuleIds,
      };

      const result = await registerMutation.mutateAsync(requestData);
      
      console.log('Staff registration complete:', result);
      
      navigate('/registration-complete', {
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

  const selectedModules = modules?.filter(m => selectedModuleIds.includes(m.moduleId)) || [];
  const availableModules = modules?.filter(m => !selectedModuleIds.includes(m.moduleId)) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-info-50 to-accent-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-4xl animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-primary p-8 text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Academic Portal</h1>
          <p className="text-primary-100">Staff Registration - Step 3 of 3</p>
        </div>

        {/* Progress indicator */}
        <div className="px-8 py-4 bg-neutral-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Step 3 of 3</span>
            <span className="text-sm text-neutral-500">Module assignment</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-secondary-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        {/* Staff info */}
        <div className="px-8 py-4 bg-secondary-50 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="bg-secondary-100 p-2 rounded-full">
              <Briefcase size={20} className="text-secondary-600" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Role: {role}</div>
              <div className="text-sm text-neutral-600">Select modules to teach</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 alert-danger">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Assignment Failed</h3>
                <p className="text-sm mt-1">An error occurred. Please try again.</p>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loadingModules ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-neutral-600">Loading available modules...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Modules */}
              <div>
                <h3 className="section-title text-lg">
                  Available Modules ({availableModules.length})
                </h3>
                
                {availableModules.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin pr-2">
                    {availableModules.map((module) => (
                      <div 
                        key={module.moduleId}
                        className="card-hover p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-neutral-800">{module.moduleCode}</div>
                            <div className="text-sm text-neutral-600 mt-1">{module.moduleName}</div>
                            <span className="badge-primary mt-2">{module.credits} credits</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddModule(module.moduleId)}
                            disabled={isLoading}
                            className="btn-success flex-shrink-0 text-sm px-3 py-1.5"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-neutral-50 rounded-lg p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-3" />
                    <p className="text-neutral-600">All modules selected!</p>
                  </div>
                )}
              </div>

              {/* Selected Modules */}
              <div>
                <h3 className="section-title text-lg">
                  Selected Modules ({selectedModules.length})
                </h3>
                
                {selectedModules.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin pr-2">
                    {selectedModules.map((module) => (
                      <div 
                        key={module.moduleId}
                        className="bg-success-50 border border-success-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-neutral-800">{module.moduleCode}</div>
                            <div className="text-sm text-neutral-600 mt-1">{module.moduleName}</div>
                            <span className="badge-success mt-2">{module.credits} credits</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(module.moduleId)}
                            disabled={isLoading}
                            className="btn-danger flex-shrink-0 text-sm px-3 py-1.5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-neutral-50 rounded-lg p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
                    <p className="text-neutral-600">No modules selected yet.</p>
                    <p className="text-sm text-neutral-500 mt-1">Add from available list</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Summary */}
          {selectedModules.length > 0 && (
            <div className="mt-6 alert-success">
              <CheckCircle size={20} />
              <span className="font-medium">
                {selectedModules.length} module{selectedModules.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || selectedModuleIds.length === 0 || loadingModules}
            className="mt-6 btn-secondary w-full text-base py-3"
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
            <p className="mt-2 text-sm text-neutral-500 text-center">
              Please select at least one module to continue
            </p>
          )}
        </div>

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
