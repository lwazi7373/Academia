import { apiClient } from "../../api/client";
import {
  CreateInterventionRequest,
  CreateInterventionResponse,
  GetActiveInterventionResponse,
  CreateFollowUpRequest,
  CreateFollowUpResponse
} from './intervention.types';

export const interventionApi = {
  createIntervention: async (
    moduleId: number,
    studentId: number,
    data: CreateInterventionRequest
  ): Promise<CreateInterventionResponse> => {
    const response = await apiClient.post(
      `/coordinator/modules/${moduleId}/students/${studentId}/create-intervention`,
      data
    );
    return response.data;
  },

  getActiveIntervention: async (
    moduleId: number,
    studentId: number
  ): Promise<GetActiveInterventionResponse> => {
    const response = await apiClient.get(
      `/coordinator/modules/${moduleId}/students/${studentId}/interventions/active`
    );
    return response.data;
  },

  createFollowUp: async (
    interventionId: number,
    data: CreateFollowUpRequest
  ): Promise<CreateFollowUpResponse> => {
    const response = await apiClient.post(
      `/coordinator/interventions/${interventionId}/follow-ups`,
      data
    );
    return response.data;
  }
};