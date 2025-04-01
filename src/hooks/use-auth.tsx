
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mindfulai_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('mindfulai_user');
      }
    }
    setLoading(false);
  }, []);

  // In a real app, this would use Firebase Authentication
  // For this demo, we're simulating Google Auth
  const signIn = async () => {
    setLoading(true);
    try {
      // Simulate Google sign-in delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user
      const mockUser: User = {
        uid: 'mock-uid-' + Math.random().toString(36).substr(2, 9),
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
      };
      
      setUser(mockUser);
      localStorage.setItem('mindfulai_user', JSON.stringify(mockUser));
      toast.success('Signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Simulate sign-out delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('mindfulai_user');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
