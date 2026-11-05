/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/firebase';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'user_alex',
  name: 'Alex Vance',
  email: 'alex.vance@quizzone.dev',
  avatar: '⚡',
  title: 'Full Stack Enthusiast',
  joinedAt: 'November 2026',
  quizzesTaken: 14,
  totalScore: 4280,
  accuracy: 92.4,
  streak: 5
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = authService.getCurrentUser();
    return saved || DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (user) {
      localStorage.setItem('quizzone_user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      setUser(res.user);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = async (name, email, password, avatar = '🚀') => {
    const res = await authService.register(name, email, password, avatar);
    if (res.success) {
      setUser(res.user);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: 'Registration failed' };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
    setIsAuthModalOpen(false);
  };

  const updateProfile = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('quizzone_user', JSON.stringify(updated));
      return updated;
    });
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        loginAsDemo,
        updateProfile,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
