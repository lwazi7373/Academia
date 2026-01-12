import { apiClient } from '../../api/client';
import type {
  CreateClassSessionRequest,
  CreateClassSessionResponse,
  GetActiveSessionResponse,
  MarkAttendanceRequest,
  MarkAttendanceResponse,
} from './attendance.types';

export const attendanceApi = {
  /**
   * Create a new class session with attendance code (LECTURER only)
   * POST /modules/:moduleId/attendance-sessions
   */
  createClassSession: async (
    moduleId: number,
    data: CreateClassSessionRequest
  ): Promise<CreateClassSessionResponse> => {
    const response = await apiClient.post<CreateClassSessionResponse>(
      `/modules/${moduleId}/attendance-sessions`,
      data
    );
    return response.data;
  },

  /**
   * Get the active attendance session for a module (LECTURER only)
   * GET /modules/:moduleId/attendance-sessions/active
   */
  getActiveSession: async (moduleId: number): Promise<GetActiveSessionResponse> => {
    const response = await apiClient.get<GetActiveSessionResponse>(
      `/modules/${moduleId}/attendance-sessions/active`
    );
    return response.data;
  },

  /**
   * Mark student attendance using attendance code (STUDENT only)
   * POST /attendance/submit
   */
  markAttendance: async (
    data: MarkAttendanceRequest
  ): Promise<MarkAttendanceResponse> => {
    const response = await apiClient.post<MarkAttendanceResponse>(
      '/attendance/submit',
      data
    );
    return response.data;
  },
};