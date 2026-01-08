import { useQuery } from "@tanstack/react-query";
import { authApi } from "./auth.api";

// Query keys - hierarchical structure for easy cache management
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
  departments: () => [...authKeys.all, 'departments'] as const,
  qualifications: () => [...authKeys.all, 'qualifications'] as const,
  departmentModules: (departmentId: number) => [...authKeys.all, 'department-modules', departmentId] as const,
  
};

// Get current user
export const useGetMe = (enabled = true) => { 
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe, 
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: false, // Don't retry on 401
    enabled: enabled && !!localStorage.getItem('authToken'), // Only fetch if token exists
  });
};

// Get department modules (for staff registration step 2)
export const useGetDepartmentModules = (departmentId: number, enabled = true) => {
  return useQuery({
    queryKey: authKeys.departmentModules(departmentId),
    queryFn: () => authApi.getDepartmentModules(departmentId),
    enabled: enabled && departmentId > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get all departments (for staff registration)
export const useGetDepartments = () => {
  return useQuery({
    queryKey: authKeys.departments(),
    queryFn: authApi.getDepartments,
    staleTime: 30 * 60 * 1000, // 30 minutes - departments rarely change
  });
};

// Get all qualifications (for student registration)
export const useGetQualifications = () => {
  return useQuery({
    queryKey: authKeys.qualifications(),
    queryFn: authApi.getQualifications,
    staleTime: 30 * 60 * 1000, // 30 minutes - qualifications rarely change
  });
};