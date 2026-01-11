import { useQuery } from "@tanstack/react-query";
import { authApi } from "./auth.api";

// Query keys - hierarchical structure for easy cache management
export const authKeys = {
  // Keys are always arrays, even for single objects
  //Static Keys
  all: ['auth'] as const, // purely just a convenience pattern for cache invalidation. (Invalidate all that starts with auth)
  me: () => [...authKeys.all, 'me'] as const, // ['auth', 'me']
  departments: () => [...authKeys.all, 'departments'] as const, // ['auth', 'departments']
  qualifications: () => [...authKeys.all, 'qualifications'] as const, // ['auth', 'qualifications']
  //Dynamic keys
  departmentModules: (departmentId: number) => [...authKeys.all, 'department-modules', departmentId] as const,
  
};

// Get current user
export const useGetMe = (enabled = true) => { // I might want to conditionally control whether the query runs.
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe, 
    staleTime: 5 * 60 * 1000, // 5 minutes 
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: false, // Don't retry on 401 (you are simply not authenticated)
    enabled: enabled && !!localStorage.getItem('authToken'), // Only fetch if token exists
  });
};

// Get department modules (for staff registration step 2)
export const useGetDepartmentModules = (departmentId: number, enabled = true) => { // I might want to conditionally control whether the query runs.
  return useQuery({
    queryKey: authKeys.departmentModules(departmentId),
    // Capture departmentId from the hook's scope with arrow function
    queryFn: () => authApi.getDepartmentModules(departmentId), // React Query calls this function with no arguments, so we need to "bake in" the parameter
    enabled: enabled && departmentId > 0, // if the dapartment key exists (maybe not exists exactly, but you get the idea)
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