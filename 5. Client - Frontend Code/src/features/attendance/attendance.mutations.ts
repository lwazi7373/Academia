import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { attendanceApi } from './attendance.api';
import { attendanceKeys } from './attendance.queries';
import type {
  CreateClassSessionRequest,
  MarkAttendanceRequest,
} from './attendance.types';

/**
 * Create a new class session with attendance code (LECTURER)
 */
export const useCreateClassSession = (moduleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClassSessionRequest) =>
      attendanceApi.createClassSession(moduleId, data),
    onSuccess: () => {
      // Invalidate active session query to refetch
      queryClient.invalidateQueries({
        queryKey: attendanceKeys.activeSession(moduleId),
      });

      toast.success('Attendance session created!');
    },
    onError: (error) => {
      console.error('Failed to create session:', error);
      // Error toast is optional here - component can handle it
    },
  });
};

/**
 * Mark student attendance (STUDENT)
 */
export const useMarkAttendance = () => {
  return useMutation({
    mutationFn: (data: MarkAttendanceRequest) =>
      attendanceApi.markAttendance(data),
    onSuccess: (data) => {
      toast.success(data.msg || 'Attendance marked successfully!');
    },
    onError: (error) => {
      console.error('Failed to mark attendance:', error);
      // Component will display error message
    },
  });
};