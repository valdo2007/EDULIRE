
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  register: (userData: Partial<User>) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edulivre_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role: UserRole) => {
    // Dans une vraie app, on vérifierait l'email/password ici
    const mockUser: User = {
      id: 'user_123',
      name: role === 'SELLER' ? 'Librairie du Savoir' : 'Jean Dupont',
      email: 'test@edulivre.cm',
      role: role,
      verificationStatus: role === 'SELLER' ? 'PENDING' : undefined,
      shopName: role === 'SELLER' ? 'Librairie du Savoir' : undefined
    };
    setUser(mockUser);
    localStorage.setItem('edulivre_user', JSON.stringify(mockUser));
  };

  const register = (userData: Partial<User>) => {
    const newUser: User = {
      id: 'user_' + Date.now(),
      name: userData.name || 'Nouvel Utilisateur',
      email: userData.email || '',
      role: userData.role || 'CLIENT',
      verificationStatus: userData.role === 'SELLER' ? 'PENDING' : undefined,
      shopName: userData.shopName,
      address: userData.address,
    };
    setUser(newUser);
    localStorage.setItem('edulivre_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edulivre_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
