import { createContext, useContext, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetModule } from '../module.queries';
import type { Module } from '../module.types';

interface ModuleContextType {
  module: Module | undefined;
  isLoading: boolean;
  moduleId: number;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

interface ModuleProviderProps {
  children: ReactNode;
}

export function ModuleProvider({ children }: ModuleProviderProps) {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  
  // Parse moduleId from URL
  const parsedModuleId = moduleId ? parseInt(moduleId, 10) : 0;
  
  // Fetch module data
  const { data: module, isLoading } = useGetModule(parsedModuleId);
  
  // Redirect if invalid moduleId
  if (!moduleId || parsedModuleId <= 0) {
    navigate('/dashboard'); // Should naviagate back to the logged in users homepage
    return null;
  }

  return (
    <ModuleContext.Provider 
      value={{ 
        module, 
        isLoading, 
        moduleId: parsedModuleId 
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
}

// Custom hook to use the module context
export function useModule() {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
}