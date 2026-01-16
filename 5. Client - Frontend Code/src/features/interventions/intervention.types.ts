export interface Intervention {
  interventionId: number;
  studentModuleId: number;
  coordinatorId: number;
  content: string;
  status: 'ACTIVE' | 'CLOSED' | 'FOLLOW_UP_DUE';
  createdAt: Date;
  followUpCount?: number;
}

export interface ActiveIntervention {
  interventionId: number;
  studentModuleId: number;
  content: string;
  createdAt: Date;
  status: 'ACTIVE' | 'CLOSED' | 'FOLLOW_UP_DUE';
  followUpCount: number;
}

export interface FollowUp {
  followUpId: number;
  interventionId: number;
  content: string;
  outcome: 'IMPROVED' | 'NO_CHANGE' | 'WORSENED';
  createdAt: Date;
}

// Request types
export interface CreateInterventionRequest {
  content: string;
}

export interface CreateFollowUpRequest {
  content: string;
  outcome: 'IMPROVED' | 'NO_CHANGE' | 'WORSENED';
}

// API Response types
export interface CreateInterventionResponse {
  msg: string;
  result: Intervention;
}

export interface GetActiveInterventionResponse {
  msg: string;
  intervention: ActiveIntervention;
}

export interface CreateFollowUpResponse {
  msg: string;
  result: FollowUp;
}