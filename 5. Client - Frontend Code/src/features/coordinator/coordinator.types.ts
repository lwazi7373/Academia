// ----------------------------------------------------------------------------
// Common Types
// ----------------------------------------------------------------------------

export type RiskLevel = "HIGH" | "MODERATE" | "LOW" | "N/A";
export type InterventionStatus = "ACTIVE" | "FOLLOW_UP_DUE" | "CLOSED";

export interface Performance {
  attendanceRate: number;
  submissionRate: number;
  averageMark: number;
}

export interface Module {
  moduleName: string;
  moduleCode: string;
}

// ----------------------------------------------------------------------------
// GET /api/coordinator/modules
// ----------------------------------------------------------------------------

export interface CoordinatorModule {
  moduleId: number;
  moduleName: string;
  moduleCode: string;
  credits: number;
  coordinatorModuleId: number;
}

export interface GetCoordinatorModulesResponse {
  msg: string;
  modules: CoordinatorModule[];
}

// ----------------------------------------------------------------------------
// GET /api/coordinator/modules/:moduleId/risk-summary
// ----------------------------------------------------------------------------

export interface RiskSummary {
  totalStudents: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  highRiskPercentage: number;
  moderateRiskPercentage: number;
  lowRiskPercentage: number;
}

export interface GetModuleRiskSummaryResponse {
  msg: string;
  riskSummary: RiskSummary;
}

// ----------------------------------------------------------------------------
// GET /api/coordinator/modules/:moduleId/students
// ----------------------------------------------------------------------------

export interface ModuleStudent {
  studentId: number;
  studentNumber: string;
  firstName: string;
  lastName: string;
  studentModuleId: number;
  riskLevel: RiskLevel;
  performance: Performance;
  hasActiveIntervention: boolean;
  interventionStatus: InterventionStatus | null;
}

export interface GetModuleStudentsResponse {
  msg: string;
  students: ModuleStudent[];
}

// Query params for filtering students
export interface GetModuleStudentsParams {
  riskLevel?: RiskLevel;
  interventionStatus?: "ACTIVE";
}

// ----------------------------------------------------------------------------
// GET /api/coordinator/modules/:moduleId/students/:studentId/risk
// ----------------------------------------------------------------------------

export interface StudentRiskDetails {
  studentId: number;
  studentNumber: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  contactNo: string;
  studentModuleId: number;
  module: Module;
  riskLevel: RiskLevel;
  performance: Performance;
  lastCalculated: string; 
}

export interface GetStudentRiskDetailsResponse {
  msg: string;
  studentRiskDetails: StudentRiskDetails;
}

// ----------------------------------------------------------------------------
// Error Response (for handling API errors)
// ----------------------------------------------------------------------------

export interface ErrorResponse {
  error: string;
  msg?: string;
}