import { useQuery } from '@tanstack/react-query';
import { studentApi } from './student.api';

// Query keys
export const studentKeys = {
  all: ['student'] as const,
  modules: () => [...studentKeys.all, 'modules'] as const,
  upcomingAssessments: () => [...studentKeys.all, 'upcoming-assessments'] as const,
  modulePerformance: () => [...studentKeys.all, 'module-performance'] as const,
};

/**
 * Get all modules for the authenticated student
 * Used in the student dashboard to display enrolled modules
 */
export const useGetStudentModules = () => {
  return useQuery({
    queryKey: studentKeys.modules(),
    queryFn: () => studentApi.getStudentModules(),
    staleTime: 5 * 60 * 1000, // 5 minutes - module enrollment doesn't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Get the top 3 upcoming assessments for the authenticated student
 * Used in the student dashboard to show urgent deadlines
 */
export const useGetUpcomingAssessments = () => {
  return useQuery({
    queryKey: studentKeys.upcomingAssessments(),
    queryFn: () => studentApi.getUpcomingAssessments(),
    staleTime: 2 * 60 * 1000, // 2 minutes - assessments can be time-sensitive
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refetch every 5 minutes to update daysUntilDue
  });
};

/**
 * Get performance metrics for all the student's modules
 * Used in the student dashboard to display risk levels and progress
 */
export const useGetModulePerformance = () => {
  return useQuery({
    queryKey: studentKeys.modulePerformance(),
    queryFn: () => studentApi.getModulePerformance(),
    staleTime: 5 * 60 * 1000, // 5 minutes - performance data updates periodically
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};