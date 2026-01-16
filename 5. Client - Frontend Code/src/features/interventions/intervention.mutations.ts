// intervention.mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { interventionApi } from './intervention.api';
import { coordinatorKeys } from '../coordinator/coordinator.queries';
import { interventionKeys } from './intervention.queries';
import { CreateInterventionRequest, CreateFollowUpRequest } from './intervention.types';

export const useCreateIntervention = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      moduleId,
      studentId,
      data,
    }: {
      moduleId: number;
      studentId: number;
      data: CreateInterventionRequest;
    }) => interventionApi.createIntervention(moduleId, studentId, data),
    onSuccess: (_, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: coordinatorKeys.students(variables.moduleId),
      });
      queryClient.invalidateQueries({
        queryKey: coordinatorKeys.studentRisk(variables.moduleId, variables.studentId),
      });
      queryClient.invalidateQueries({
        queryKey: interventionKeys.active(variables.moduleId, variables.studentId),
      });
    },
  });
};

export const useCreateFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      interventionId,
      data,
    }: {
      interventionId: number;
      data: CreateFollowUpRequest;
    }) => interventionApi.createFollowUp(interventionId, data),
    onSuccess: () => {
      // Invalidate all intervention and coordinator queries since we don't have moduleId/studentId context
      queryClient.invalidateQueries({
        queryKey: interventionKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: coordinatorKeys.all,
      });
    },
  });
};