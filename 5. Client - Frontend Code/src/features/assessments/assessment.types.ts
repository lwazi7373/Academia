// ============= REQUEST TYPES =============

export interface CreateAssessmentRequest {
  assessmentName: string;
  totalMark: number;
  weighting: number; // actually a decimal e.g) 15.00
  dueDate: string; // YYYY-MM-DD format
}

export interface UpdateAssessmentRequest {
  assessmentName: string;
  totalMark: number;
  weighting: number; // actually a decimal e.g) 15.00
  dueDate: string; // YYYY-MM-DD format
}

export interface MarkEntry {
  studentId: number;
  mark: number | null;
  submission: boolean; // Mysql uses TINY INT, any consequences ?
}

export interface UploadMarksRequest {
  marksData: MarkEntry[];
}

// ============= RESPONSE TYPES =============

export interface Assessment {
  assessmentId: number;
  assessmentName: string;
  totalMark: number;
  weighting: number;
  dueDate: string;
  lecturerId: number;
  moduleId: number;
}

export interface CreateAssessmentResponse {
  msg: string;
  assessment: Assessment;
}

export interface UpdateAssessmentResponse {
  code: string;
  msg: string;
}

export interface DeleteAssessmentResponse {
  code: string;
  msg: string;
}

export interface LecturerAssessment {
  assessmentId: number;
  assessmentName: string;
  weighting: number;
  dueDate: string;
}

export interface GetLecturerModuleAssessmentsResponse {
  msg: string;
  assessments: LecturerAssessment[];
}

export interface StudentAssessment {
  assessmentId: number;
  assessmentName: string;
  totalMark: number;
  weighting: number;
  dueDate: string;
  studentMark: number | null;
  submission: boolean;
  dateSubmitted: string | null;
}

export interface GetStudentModuleAssessmentsResponse {
  msg: string;
  assessments: StudentAssessment[];
}

export interface UploadMarksResult {
  inserted: number;
  updated: number;
  total: number;
}

export interface UploadMarksResponse {
  msg: string;
  result: UploadMarksResult;
}

// ============= ERROR RESPONSE TYPE =============

export interface AssessmentErrorResponse {
  error: string;
}