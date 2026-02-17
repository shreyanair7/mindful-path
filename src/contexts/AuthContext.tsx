import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  email: string;
  name?: string;
  onboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  signup: (email: string, name?: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mindanchor_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string) => {
    const u = { email, onboarded: true };
    setUser(u);
    localStorage.setItem("mindanchor_user", JSON.stringify(u));
  }, []);

  const signup = useCallback((email: string, name?: string) => {
    const u = { email, name, onboarded: false };
    setUser(u);
    localStorage.setItem("mindanchor_user", JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("mindanchor_user");
  }, []);

  const completeOnboarding = useCallback(() => {
    setUser((prev) => {
      if (!prev) return prev;
      const u = { ...prev, onboarded: true };
      localStorage.setItem("mindanchor_user", JSON.stringify(u));
      return u;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};
