import { apiClient } from '../../api/client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterStep1Request,
  RegisterStep1Response,
  RegisterStudentStep2Request,
  RegisterStudentStep2Response,
  RegisterStaffStep2Request,
  RegisterStaffStep2Response,
  RegisterStaffStep3Request,
  RegisterStaffStep3Response,
  DepartmentModulesResponse,
  UpdatePasswordRequest,
  User,
  DepartmentsResponse,
  QualificationsResponse,
} from './auth.types';

export const authApi = {
  // Login
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', data);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/me');
    return response.data;
  },

  // Registration Step 1
  registerStep1: async (data: RegisterStep1Request): Promise<RegisterStep1Response> => {
    const response = await apiClient.post<RegisterStep1Response>('/register/step1', data);
    return response.data;
  },

  // Student Registration Step 2
  registerStudentStep2: async (data: RegisterStudentStep2Request): Promise<RegisterStudentStep2Response> => {
    const response = await apiClient.post<RegisterStudentStep2Response>('/register/student/step2', data);
    return response.data;
  },

  // Staff Registration Step 2
  registerStaffStep2: async (data: RegisterStaffStep2Request): Promise<RegisterStaffStep2Response> => {
    const response = await apiClient.post<RegisterStaffStep2Response>('/register/staff/step2', data);
    return response.data;
  },

  // Get all departments (for registration form)
  getDepartments: async (): Promise<DepartmentsResponse> => {
    const response = await apiClient.get<DepartmentsResponse>('/departments');
    return response.data;
  },

  // Get all qualifications (for student registration)
  getQualifications: async (): Promise<QualificationsResponse> => {
    const response = await apiClient.get<QualificationsResponse>('/qualifications');
    return response.data;
  },

  // Get department modules (for staff registration)
  getDepartmentModules: async (departmentId: number): Promise<DepartmentModulesResponse> => {
    const response = await apiClient.get<DepartmentModulesResponse>(`/modules/department/${departmentId}`);
    return response.data;
  },

  // Staff Registration Step 3
  registerStaffStep3: async (data: RegisterStaffStep3Request): Promise<RegisterStaffStep3Response> => {
    const response = await apiClient.post<RegisterStaffStep3Response>('/register/staff/step3', data);
    return response.data;
  },

  // Update password (dev only)
  updatePassword: async (data: UpdatePasswordRequest): Promise<void> => {
    await apiClient.put('/update-password', data);
  },
};