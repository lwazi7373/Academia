import { useQuery } from '@tanstack/react-query';
import { assessmentsApi } from './assessment.api';
import type { LecturerAssessmentDetail, LecturerAssessment, StudentAssessment } from './assessment.types';

// Query keys factory for better organization and type safety
export const assessmentsKeys = {
  all: ['assessments'] as const,
  lecturerModule: (moduleId: number) => 
    [...assessmentsKeys.all, 'lecturer', moduleId] as const,
  studentModule: (moduleId: number) => 
    [...assessmentsKeys.all, 'student', moduleId] as const,
  detail: (assessmentId: number) => 
    [...assessmentsKeys.all, 'detail', assessmentId] as const,
};

/**
 * Hook to fetch an assessment for the lecturer to update
 * returns the Assessment's details
 */
export const useGetAssessmentById = (assessmentId: number) => {
  return useQuery<LecturerAssessmentDetail, Error>({
    queryKey: assessmentsKeys.detail(assessmentId),
    queryFn: () => assessmentsApi.getAssessmentById(assessmentId),
    enabled: !!assessmentId,
  });
};

/**
 * Hook to fetch all assessments for a module (Lecturer view)
 * Returns basic assessment info without student marks
 */
export const useGetLecturerModuleAssessments = (moduleId: number) => {
  return useQuery<LecturerAssessment[], Error>({
    queryKey: assessmentsKeys.lecturerModule(moduleId),
    queryFn: () => assessmentsApi.getLecturerModuleAssessments(moduleId),
    enabled: !!moduleId,
  });
};

/**
 * Hook to fetch all assessments with marks for a module (Student view)
 * Returns assessments with the student's marks and submission status
 */
export const useGetStudentModuleAssessments = (moduleId: number) => {
  return useQuery<StudentAssessment[], Error>({
    queryKey: assessmentsKeys.studentModule(moduleId),
    queryFn: () => assessmentsApi.getStudentModuleAssessments(moduleId),
    enabled: !!moduleId,
  });
};