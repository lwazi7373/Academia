// intervention.queries.ts

import { useQuery } from '@tanstack/react-query';
import { interventionApi } from './intervention.api';

export const interventionKeys = {
  all: ['intervention'] as const,
  active: (moduleId: number, studentId: number) => 
    [...interventionKeys.all, 'active', moduleId, studentId] as const,
};

export const useActiveIntervention = (moduleId: number, studentId: number) => {
  return useQuery({
    queryKey: interventionKeys.active(moduleId, studentId),
    queryFn: () => interventionApi.getActiveIntervention(moduleId, studentId),
    enabled: !!moduleId && !!studentId,
    retry: false, // Don't retry on 404 (no active intervention)
  });
};