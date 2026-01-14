import { apiClient } from '../../api/client';
import type { GetLecturerModulesResponse, Module } from './lecturer.types';

export const lecturerApi = {
  /**
   * Get all modules assigned to the logged-in lecturer
   * Just returns the array
   * GET /me/lecturer/modules
   */
  getMyModules: async (): Promise<Module[]> => {
    const response = await apiClient.get<GetLecturerModulesResponse>('/me/lecturer/modules');
    return response.data.modules;
  },
};
