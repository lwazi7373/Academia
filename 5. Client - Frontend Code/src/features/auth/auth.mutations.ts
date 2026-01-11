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

// Login mutation is a bit complicated at this point so here is whats going on for a mental note:
/**
1. User clicks "Login"
2. useLogin mutation runs
3. Token is stored in localStorage
4. Cache for ['auth', 'me'] is invalidated (marked stale)
5. AuthProvider's useGetMe detects token exists
6. useGetMe automatically refetches (because cache is stale)
7. Full user data with profile is fetched and cached
8. User sees authenticated UI with complete data
*/
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('authToken', data.authToken);
      
      // Did not use data.user because data.user is incomplete (remember we need the profile depending on the type of user it was)
      // queryClient.setQueryData(authKeys.me(), data.user);
      
      // Invalidate to trigger a fresh fetch of full user data
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      
      toast.success('Login successful!');
    },
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

// Update password (DEV ONLY) -> I have no idea why I am still proceeding with the logic for this, but hey :)
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) => authApi.updatePassword(data),
    onSuccess: () => {
      toast.success('Password updated successfully!');
    },
  });
};