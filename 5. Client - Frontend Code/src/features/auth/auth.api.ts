// auth.api.ts
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
  GetMeResponse,
  Department,
  Qualification,
  Module,
} from './auth.types';

export const authApi = {
  // Login (now also has msg for consistency)
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', data);
    return response.data;
  },

  // Get current user (has msg, but we extract just the user)
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<GetMeResponse>('/me');
    return response.data.user;  // Extract user from { msg, user }
  },

  // Registration Step 1 (has msg)
  registerStep1: async (data: RegisterStep1Request): Promise<RegisterStep1Response> => {
    const response = await apiClient.post<RegisterStep1Response>('/register/step1', data);
    return response.data;
  },

  // Student Registration Step 2 (has msg)
  registerStudentStep2: async (data: RegisterStudentStep2Request): Promise<RegisterStudentStep2Response> => {
    const response = await apiClient.post<RegisterStudentStep2Response>('/register/student/step2', data);
    return response.data;
  },

  // Staff Registration Step 2 (has msg)
  registerStaffStep2: async (data: RegisterStaffStep2Request): Promise<RegisterStaffStep2Response> => {
    const response = await apiClient.post<RegisterStaffStep2Response>('/register/staff/step2', data);
    return response.data;
  },

  // Get all departments (has msg)
  // Note I am returning just the departments here, not the response like the others
  getDepartments: async (): Promise<Department[]> => {
    const response = await apiClient.get<DepartmentsResponse>('/departments');
    return response.data.departments;  // Extract just the array;
  },

  // Get all qualifications (has msg)
  // Note I am returning just the qualifications here, not the response like the others
  getQualifications: async (): Promise<Qualification[]> => {
    const response = await apiClient.get<QualificationsResponse>('/qualifications');
    return response.data.qualifications; // Extract just the array;
  },

  // Get department modules (has msg)
  // Note I am returning just the modules here, not the response like the others
  getDepartmentModules: async (departmentId: number): Promise<Module[]> => {
    const response = await apiClient.get<DepartmentModulesResponse>(`/modules/department/${departmentId}`);
    return response.data.modules; // Extract just the array;
  },

  // Staff Registration Step 3 (has msg)
  registerStaffStep3: async (data: RegisterStaffStep3Request): Promise<RegisterStaffStep3Response> => {
    const response = await apiClient.post<RegisterStaffStep3Response>('/register/staff/step3', data);
    return response.data;
  },

  // Update password (has msg)
  updatePassword: async (data: UpdatePasswordRequest): Promise<void> => {
    await apiClient.put('/update-password', data);
  },
};