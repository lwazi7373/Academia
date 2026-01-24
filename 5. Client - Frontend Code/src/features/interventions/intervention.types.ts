// ----------------------------------------------------------------------------
// Common Types
// ----------------------------------------------------------------------------
export type RiskLevel = "HIGH" | "MODERATE" | "LOW" | "N/A";
export type InterventionStatus = "ACTIVE" | "FOLLOW_UP_DUE" | "CLOSED";
export type FollowUpOutcome = "IMPROVED" | "NO_CHANGE" | "WORSENED";

export interface Performance {
  attendanceRate: number;
  submissionRate: number;
  averageMark: number;
}

// ----------------------------------------------------------------------------
// POST /api/coordinator/modules/:moduleId/students/:studentId/create-intervention
// ----------------------------------------------------------------------------

export interface CreateInterventionRequest {
  content: string;
}

export interface InterventionResult {
  interventionId: number;
  studentModuleId: number;
  coordinatorId: number;
  content: string;
  status: InterventionStatus;
  createdAt: string; // ISO date string
  baselinePerformance: Performance;
}

export interface CreateInterventionResponse {
  msg: string;
  result: InterventionResult;
}

// ----------------------------------------------------------------------------
// GET /api/coordinator/modules/:moduleId/students/:studentId/interventions/active
// ----------------------------------------------------------------------------

export interface ActiveIntervention {
  interventionId: number;
  studentModuleId: number;
  content: string;
  createdAt: string; // ISO date string
  status: InterventionStatus;
  followUpCount: number;
  baselinePerformance: Performance;
  currentPerformance: Performance;
}

export interface GetActiveInterventionResponse {
  msg: string;
  intervention: ActiveIntervention;
}

// ----------------------------------------------------------------------------
// POST /api/coordinator/interventions/:interventionId/follow-ups
// ----------------------------------------------------------------------------

export interface CreateFollowUpRequest {
  content: string;
  outcome: FollowUpOutcome;
}

export interface FollowUpResult {
  followUpId: number;
  interventionId: number;
  content: string;
  outcome: FollowUpOutcome;
  createdAt: string; // ISO date string
}

export interface CreateFollowUpResponse {
  msg: string;
  result: FollowUpResult;
}

// ----------------------------------------------------------------------------
// Error Response (for handling API errors)
// ----------------------------------------------------------------------------

export interface ErrorResponse {
  error: string;
  msg?: string;
}