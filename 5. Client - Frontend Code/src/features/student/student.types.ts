export interface StudentModule {
  moduleId: number;
  moduleName: string;
  moduleCode: string;
  credits: number;
  studentModuleId: number;
}

export interface GetStudentsModulesResponse {
  msg: string;
  modules: StudentModule[];
}

export interface UpcomingAssessment {
  assessmentId: number;
  assessmentName: string;
  totalMark: number;
  weighting: number;
  dueDate: string; // ISO string from backend
  daysUntilDue: number;
  module: {
    moduleId: number;
    moduleName: string;
    moduleCode: string;
  };
  studentMark: number | null;
  submission: boolean;
  dateSubmitted: string | null;
}

export interface GetUpcomingAssessmentsResponse {
  msg: string;
  assessments: UpcomingAssessment[];
}

export interface ModulePerformance {
  moduleId: number;
  moduleCode: string;
  moduleName: string;
  averageMark: number | null;
  riskLevel: string | null; // Could be enum: 'LOW' | 'MEDIUM' | 'HIGH' | null
  attendanceRate: number | null;
  submissionRate: number | null;
  lastCalculated: string | null;
}

export interface GetStudentModulePerformanceResponse {
  msg: string;
  modulePerformances: ModulePerformance[];
}