// features/lecturer/lecturer.queries.ts

import { useQuery } from '@tanstack/react-query';
import { lecturerApi } from './lecturer.api';

// Query keys
export const lecturerKeys = {
  all: ['lecturer'] as const,
  modules: () => [...lecturerKeys.all, 'modules'] as const,
};

/**
 * Get all modules assigned to the logged-in lecturer
 * Used on the lecturer's dashboard to display their modules
 */
export const useGetMyModules = () => {
  return useQuery({
    queryKey: lecturerKeys.modules(),
    queryFn: lecturerApi.getMyModules,
    staleTime: 10 * 60 * 1000, // 10 minutes - modules don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};