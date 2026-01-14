import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assessmentsApi } from './assessment.api';
import { assessmentsKeys } from './assessment.queries';
import type {
  CreateAssessmentRequest,
  UpdateAssessmentRequest,
  UploadMarksRequest,
  Assessment,
  UpdateAssessmentResponse,
  DeleteAssessmentResponse,
  UploadMarksResponse,
} from './assessment.types';

/**
 * Hook to create a new assessment for a module
 * Invalidates lecturer module assessments cache on success
 */
export const useCreateAssessment = (moduleId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Assessment, Error, CreateAssessmentRequest>({
    mutationFn: (data) => assessmentsApi.createAssessment(moduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentsKeys.lecturerModule(moduleId),
      });
    },
  });
};

/**
 * Hook to update an existing assessment
 * Invalidates lecturer module assessments cache on success
 */
export const useUpdateAssessment = (moduleId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateAssessmentResponse,
    Error,
    { assessmentId: number; data: UpdateAssessmentRequest }
  >({
    mutationFn: ({ assessmentId, data }) =>
      assessmentsApi.updateAssessment(assessmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentsKeys.lecturerModule(moduleId),
      });
    },
  });
};

/**
 * Hook to delete an assessment
 * Invalidates lecturer module assessments cache on success
 */
export const useDeleteAssessment = (moduleId: number) => {
  const queryClient = useQueryClient();

  return useMutation<DeleteAssessmentResponse, Error, number>({
    mutationFn: (assessmentId) => assessmentsApi.deleteAssessment(assessmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentsKeys.lecturerModule(moduleId),
      });
    },
  });
};

/**
 * Hook to upload or update marks for multiple students
 * Invalidates student module assessments cache on success
 */
export const useUploadMarks = (moduleId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    UploadMarksResponse,
    Error,
    { assessmentId: number; data: UploadMarksRequest }
  >({
    mutationFn: ({ assessmentId, data }) =>
      assessmentsApi.uploadMarks(assessmentId, data),
    onSuccess: () => {
      // Invalidate student assessments cache so students see updated marks
      queryClient.invalidateQueries({
        queryKey: assessmentsKeys.studentModule(moduleId),
      });
    },
  });
};