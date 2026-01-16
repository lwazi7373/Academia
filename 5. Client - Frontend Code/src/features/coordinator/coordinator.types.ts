export interface Module {
  moduleId: number;
  moduleName: string;
  moduleCode: string;
  credits: number;
  coordinatorModuleId: number;
}

export interface RiskSummary {
  totalStudents: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  highRiskPercentage: string;
  moderateRiskPercentage: string;
  lowRiskPercentage: string;
}

export interface StudentPerformance {
  attendanceRate: number;
  submissionRate: number;
  averageMark: number;
}

export interface ModuleStudent {
  studentId: number;
  studentNumber: string;
  firstName: string;
  lastName: string;
  studentModuleId: number;
  riskLevel: string;
  performance: StudentPerformance;
  hasActiveIntervention: boolean;
  interventionStatus: string | null;
}

export interface StudentRiskDetails {
  studentId: number;
  studentNumber: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  contactNo: string;
  studentModuleId: number;
  module: {
    moduleName: string;
    moduleCode: string;
  };
  riskLevel: string;
  performance: StudentPerformance;
  lastCalculated: string;
}

export interface GetModuleStudentsFilters {
  riskLevel?: 'HIGH' | 'MODERATE' | 'LOW';
  interventionStatus?: 'ACTIVE';
}

// API Response types
export interface GetCoordinatorModulesResponse {
  msg: string;
  modules: Module[];
}

export interface GetModuleRiskSummaryResponse {
  msg: string;
  riskSummary: RiskSummary;
}

export interface GetModuleStudentsResponse {
  msg: string;
  students: ModuleStudent[];
}

export interface GetStudentRiskDetailsResponse {
  msg: string;
  studentRiskDetails: StudentRiskDetails;
}