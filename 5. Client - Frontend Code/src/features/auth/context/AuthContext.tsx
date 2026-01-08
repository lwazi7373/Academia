import { createContext, useContext, ReactNode } from 'react';
import { useGetMe } from '../auth.queries';
import { useLogout } from '../auth.mutations';
import type { AuthContextType } from '../auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const hasToken = !!localStorage.getItem('authToken');
  const { data: user, isLoading } = useGetMe(hasToken);
  const logoutMutation = useLogout();

  const login = (token: string) => {
    // Just store the token - the user data is automatically cached by the login mutation
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const value: AuthContextType = {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
    login,
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