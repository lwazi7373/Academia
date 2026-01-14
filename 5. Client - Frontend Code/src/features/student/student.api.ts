import { apiClient } from '../../api/client';
import type {
  GetStudentsModulesResponse,
  GetUpcomingAssessmentsResponse,
  GetStudentModulePerformanceResponse,
  StudentModule,
  UpcomingAssessment,
  ModulePerformance,
} from './student.types';

export const studentApi = {
  // Get student's modules
  // Returns just the modules array
  getStudentModules: async (): Promise<StudentModule[]> => {
    const response = await apiClient.get<GetStudentsModulesResponse>('/me/student/modules');
    return response.data.modules;
  },

  // Get upcoming assessments
  // Returns just the assessments array
  getUpcomingAssessments: async (): Promise<UpcomingAssessment[]> => {
    const response = await apiClient.get<GetUpcomingAssessmentsResponse>('/assessments/upcoming');
    return response.data.assessments;
  },

  // Get module performance
  // Returns just the modulePerformances array
  getModulePerformance: async (): Promise<ModulePerformance[]> => {
    const response = await apiClient.get<GetStudentModulePerformanceResponse>('/student/module-performance');
    return response.data.modulePerformances;
  },
};