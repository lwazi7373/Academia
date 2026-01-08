import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { authApi } from './auth.api';
import { authKeys } from './auth.queries';
import type {
  LoginRequest,
  RegisterStep1Request,
  RegisterStudentStep2Request,
  RegisterStaffStep2Request,
  RegisterStaffStep3Request,
  UpdatePasswordRequest,
} from './auth.types';

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  // Login IS a mutation because :
  /**
   * It creates a session/token on the server
   * It modifies state (stores token in localStorage)
   * It's a POST request & It's user-initiated (clicking "Login" button)
   * */  
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('authToken', data.token);
      
      // Set user data in cache
      queryClient.setQueryData(authKeys.me(), data.user);
      
      toast.success('Login successful!');
    },
    // Error handling is done at component level for form validation
  });
};

// Logout mutation (client-side only)
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('authToken');
    },
    onSuccess: () => {
      // Clear all queries from cache
      queryClient.clear();
      toast.success('Logged out successfully');
    },
  });
};

// Register Step 1
export const useRegisterStep1 = () => {
  return useMutation({
    mutationFn: (data: RegisterStep1Request) => authApi.registerStep1(data),
    onSuccess: () => {
      toast.success('Registration step 1 completed!');
    },
  });
};

// Register Student Step 2
export const useRegisterStudentStep2 = () => {
  return useMutation({
    mutationFn: (data: RegisterStudentStep2Request) => authApi.registerStudentStep2(data),
    onSuccess: () => {
      toast.success('Student registration completed successfully!');
    },
  });
};

// Register Staff Step 2
export const useRegisterStaffStep2 = () => {
  return useMutation({
    mutationFn: (data: RegisterStaffStep2Request) => authApi.registerStaffStep2(data),
    onSuccess: () => {
      toast.success('Staff details saved. Please select modules.');
    },
  });
};

// Register Staff Step 3
export const useRegisterStaffStep3 = () => {
  return useMutation({
    mutationFn: (data: RegisterStaffStep3Request) => authApi.registerStaffStep3(data),
    onSuccess: () => {
      toast.success('Staff registration completed successfully!');
    },
  });
};

// Update password (DEV ONLY)
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) => authApi.updatePassword(data),
    onSuccess: () => {
      toast.success('Password updated successfully!');
    },
  });
};