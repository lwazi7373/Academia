import { createContext, useContext, ReactNode } from 'react';
import { useGetMe } from '../auth.queries';
import { useLogout } from '../auth.mutations';
import type { User } from '../auth.types';

// Updated context type (removed login)
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetching: boolean; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  // Fetch user data if token exists
  const { data: user, isLoading, isFetching } = useGetMe();
  
  // Logout mutation
  const logoutMutation = useLogout();

  const logout = () => {
    logoutMutation.mutate();
  };

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
    isFetching,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};