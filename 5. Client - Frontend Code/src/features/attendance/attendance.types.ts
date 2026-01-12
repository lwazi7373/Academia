// ============= REQUEST TYPES =============

export interface CreateClassSessionRequest {
  classType: string;  // e.g., "Lecture", "Tutorial", "Lab"
}

export interface MarkAttendanceRequest {
  attendanceCode: string;  // 6-character code
}

// ============= RESPONSE TYPES =============

export interface ClassSession {
  sessionId: number;
  moduleId: number;
  lecturerId: number;
  attendanceCode: string;
  classType: string;
  sessionDate: string;  // ISO date string
  expiresAt: string;    // ISO date string
  isActive: number;     // 0 or 1 (boolean)
}

export interface CreateClassSessionResponse {
  msg: string;
  createdSession: ClassSession;
}

export interface GetActiveSessionResponse {
  msg: string;
  activeSession: ClassSession;
}

export interface MarkAttendanceResponse {
  msg: string;
}