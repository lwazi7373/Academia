// coordinator.api.ts

import { apiClient } from "../../api/client";
import {
  GetCoordinatorModulesResponse,
  GetModuleRiskSummaryResponse,
  GetModuleStudentsResponse,
  GetStudentRiskDetailsResponse,
  GetModuleStudentsFilters
} from './coordinator.types';

export const coordinatorApi = {
  getCoordinatorModules: async (): Promise<GetCoordinatorModulesResponse> => {
    const response = await apiClient.get('/coordinator/modules');
    return response.data;
  },

  getModuleRiskSummary: async (moduleId: number): Promise<GetModuleRiskSummaryResponse> => {
    const response = await apiClient.get(`/coordinator/modules/${moduleId}/risk-summary`);
    return response.data;
  },

  getModuleStudents: async (
    moduleId: number,
    filters?: GetModuleStudentsFilters
  ): Promise<GetModuleStudentsResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.riskLevel) {
      params.append('riskLevel', filters.riskLevel);
    }
    
    if (filters?.interventionStatus) {
      params.append('interventionStatus', filters.interventionStatus);
    }

    const queryString = params.toString();
    const url = `/coordinator/modules/${moduleId}/students${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(url);
    return response.data;
  },

  getStudentRiskDetails: async (
    moduleId: number,
    studentId: number
  ): Promise<GetStudentRiskDetailsResponse> => {
    const response = await apiClient.get(
      `/coordinator/modules/${moduleId}/students/${studentId}/risk`
    );
    return response.data;
  }
};