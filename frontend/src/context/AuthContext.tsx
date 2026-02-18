'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { User, RegisterData } from '@/types';
import { mockUser } from '@/lib/mockData';

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login(email: string, password: string): Promise<boolean>;
  register(data: RegisterData): Promise<boolean>;
  logout(): void;
  updateProfile(data: Partial<User>): void;
}

const STORAGE_KEY = 'mealmajor_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const hasCookie = document.cookie.includes('mealmajor_authenticated=true')
      
      if (stored && hasCookie) {
        setCurrentUser(JSON.parse(stored))
        setIsAuthenticated(true)
      } else if (stored && !hasCookie) {
        // Cookie expired but localStorage still has data - set cookie again
        document.cookie = 'mealmajor_authenticated=true; path=/; max-age=86400'
        setCurrentUser(JSON.parse(stored))
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Auth restore error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', email)
    if (!email || !password) return false

    await new Promise(resolve => setTimeout(resolve, 1000))

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
    
    // Set cookie for middleware
    document.cookie = 'mealmajor_authenticated=true; path=/; max-age=86400'
    
    setCurrentUser(mockUser)
    setIsAuthenticated(true)
    console.log('Login successful!')
    return true
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const newUser: User = {
        ...mockUser,
        id: Date.now().toString(),
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        dietaryPreferences: [],
        allergies: [],
        createdAt: new Date(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    
    // Remove cookie
    document.cookie = 'mealmajor_authenticated=; path=/; max-age=0'
    
    setCurrentUser(null)
    setIsAuthenticated(false)
  }, [])

  const updateProfile = useCallback((data: Partial<User>) => {
    if (!currentUser) {
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      ...data,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  }, [currentUser]);

  const value: AuthContextType = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
