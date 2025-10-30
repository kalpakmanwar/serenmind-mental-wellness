import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/services/api';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types';
import { storage } from '@/utils/helpers';
import toast from 'react-hot-toast';

// =========================================
// Auth Context Types
// =========================================

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// =========================================
// Auth Context
// =========================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =========================================
// Auth Provider Component
// =========================================

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('accessToken');
      const storedUser = storage.get<User>('user');

      if (token && storedUser) {
        setUser(storedUser);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authApi.login(credentials);

      // Store tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      storage.set('user', response.user);

      // Update state
      setUser(response.user);

      toast.success(`Welcome back, ${response.user.fullName}! 🌟`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authApi.register(data);

      // Store tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      storage.set('user', response.user);

      // Update state
      setUser(response.user);

      toast.success(`Welcome to SerenMind, ${response.user.fullName}! 🎉`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      storage.remove('user');

      // Clear state
      setUser(null);

      toast.success('Logged out successfully. See you soon! 👋');
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    // This would typically fetch fresh user data from the server
    // For now, we'll just keep the existing user data
    const storedUser = storage.get<User>('user');
    if (storedUser) {
      setUser(storedUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =========================================
// useAuth Hook
// =========================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

