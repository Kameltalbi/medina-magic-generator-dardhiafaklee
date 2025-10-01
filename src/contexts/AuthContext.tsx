// Authentication Context - Manages password protection state
// Provides login/logout functionality and session persistence

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Configuration du mot de passe
const SITE_PASSWORD = "DarDhiafa2024"; // Changez ce mot de passe selon vos besoins
const SESSION_KEY = "dar-dhiafa-auth";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier la session au chargement
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (sessionData) {
          const { timestamp, password } = JSON.parse(sessionData);
          const now = Date.now();
          const sessionDuration = 24 * 60 * 60 * 1000; // 24 heures
          
          // Vérifier si la session est encore valide
          if (now - timestamp < sessionDuration && password === SITE_PASSWORD) {
            setIsAuthenticated(true);
          } else {
            // Session expirée ou mot de passe changé
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session:", error);
        localStorage.removeItem(SESSION_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (password: string): boolean => {
    if (password === SITE_PASSWORD) {
      setIsAuthenticated(true);
      
      // Sauvegarder la session
      const sessionData = {
        timestamp: Date.now(),
        password: SITE_PASSWORD,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Hook pour obtenir le mot de passe (utile pour le développement)
export const getSitePassword = (): string => {
  return SITE_PASSWORD;
};
