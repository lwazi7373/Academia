// coordinator.queries.ts

import { useQuery } from '@tanstack/react-query';
import { coordinatorApi } from './coordinator.api';
import { CoordinatorModule, GetModuleStudentsParams } from './coordinator.types';

export const coordinatorKeys = {
  all: ['coordinator'] as const,
  modules: () => [...coordinatorKeys.all, 'modules'] as const,
  module: (moduleId: number) => [...coordinatorKeys.all, 'module', moduleId] as const,
  riskSummary: (moduleId: number) => [...coordinatorKeys.module(moduleId), 'risk-summary'] as const,
  students: (moduleId: number, filters?: GetModuleStudentsParams) => 
    [...coordinatorKeys.module(moduleId), 'students', filters] as const,
  studentRisk: (moduleId: number, studentId: number) => 
    [...coordinatorKeys.module(moduleId), 'student', studentId, 'risk'] as const,
};

export const useCoordinatorModules = () => {
  return useQuery<CoordinatorModule[], Error>({ // Changed from GetCoordinatorModulesResponse
    queryKey: coordinatorKeys.modules(),
    queryFn: () => coordinatorApi.getCoordinatorModules(),
  });
};

export const useModuleRiskSummary = (moduleId: number) => {
  return useQuery({
    queryKey: coordinatorKeys.riskSummary(moduleId),
    queryFn: () => coordinatorApi.getModuleRiskSummary(moduleId),
    enabled: !!moduleId,
  });
};

export const useModuleStudents = (
  moduleId: number,
  filters?: GetModuleStudentsParams
) => {
  return useQuery({
    queryKey: coordinatorKeys.students(moduleId, filters),
    queryFn: () => coordinatorApi.getModuleStudents(moduleId, filters),
    enabled: !!moduleId,
  });
};

export const useStudentRiskDetails = (moduleId: number, studentId: number) => {
  return useQuery({
    queryKey: coordinatorKeys.studentRisk(moduleId, studentId),
    queryFn: () => coordinatorApi.getStudentRiskDetails(moduleId, studentId),
    enabled: !!moduleId && !!studentId,
  });
};