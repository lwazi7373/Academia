import { apiClient } from '../../api/client';
import type { Module, GetModuleResponse } from './module.types';

export const moduleApi = {
  /**
   * Get a module (To use the details across different pages, to help user remeber what module there are currently under)
   */
  getModule: async (moduleId: number): Promise<Module> => {
    const response = await apiClient.get<GetModuleResponse>(`/module/${moduleId}`);
    return response.data.module; // Get the module itself 
  },
};
 