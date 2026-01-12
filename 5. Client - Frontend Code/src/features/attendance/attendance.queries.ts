import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from './attendance.api';

// Query keys
export const attendanceKeys = {
  all: ['attendance'] as const,
  activeSession: (moduleId: number) => [...attendanceKeys.all, 'active-session', moduleId] as const,
};

/**
 * Get active attendance session for a module
 * Used by lecturers to display the current attendance code
 */
export const useGetActiveSession = (moduleId: number, enabled = true) => {
  return useQuery({
    queryKey: attendanceKeys.activeSession(moduleId),
    queryFn: () => attendanceApi.getActiveSession(moduleId),
    enabled: enabled && moduleId > 0,
    staleTime: 30 * 1000, // 30 seconds - attendance codes expire quickly
    gcTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 15 * 1000, // Auto-refetch every 15 seconds to check if session expired
    retry: false, // Don't retry if no active session (404)
  });
};