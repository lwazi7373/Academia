import { apiClient } from '../../api/client';
import type {
  CreateAssessmentRequest,
  CreateAssessmentResponse,
  UpdateAssessmentRequest,
  UpdateAssessmentResponse,
  DeleteAssessmentResponse,
  GetLecturerModuleAssessmentsResponse,
  GetStudentModuleAssessmentsResponse,
  UploadMarksRequest,
  UploadMarksResponse,
  LecturerAssessment,
  StudentAssessment,
  Assessment,
} from './assessment.types';

export const assessmentsApi = {
  // Create a new assessment for a module (Lecturer only)
  createAssessment: async (
    moduleId: number,
    data: CreateAssessmentRequest
  ): Promise<Assessment> => {
    const response = await apiClient.post<CreateAssessmentResponse>(
      `/assessments/${moduleId}/create`,
      data
    );
    return response.data.assessment;
  },

  // Update an existing assessment (Lecturer only)
  updateAssessment: async (
    assessmentId: number,
    data: UpdateAssessmentRequest
  ): Promise<UpdateAssessmentResponse> => {
    const response = await apiClient.patch<UpdateAssessmentResponse>(
      `/assessments/${assessmentId}/update`,
      data
    );
    return response.data;
  },

  // Delete an assessment (Lecturer only)
  deleteAssessment: async (assessmentId: number): Promise<DeleteAssessmentResponse> => {
    const response = await apiClient.delete<DeleteAssessmentResponse>(
      `/assessments/${assessmentId}/delete`
    );
    return response.data;
  },

  // Get all assessments for a module (Lecturer view)
  getLecturerModuleAssessments: async (moduleId: number): Promise<LecturerAssessment[]> => {
    const response = await apiClient.get<GetLecturerModuleAssessmentsResponse>(
      `/assessments/${moduleId}/semester-assessments`
    );
    return response.data.assessments;
  },

  // Get all assessments with marks for a module (Student view)
  getStudentModuleAssessments: async (moduleId: number): Promise<StudentAssessment[]> => {
    const response = await apiClient.get<GetStudentModuleAssessmentsResponse>(
      `/assessments/${moduleId}/assessments-marks`
    );
    return response.data.assessments;
  },

  // Upload or update marks for multiple students (Lecturer only)
  uploadMarks: async (
    assessmentId: number,
    data: UploadMarksRequest
  ): Promise<UploadMarksResponse> => {
    const response = await apiClient.post<UploadMarksResponse>(
      `/assessments/${assessmentId}/upload-marks`,
      data
    );
    return response.data;
  },
};