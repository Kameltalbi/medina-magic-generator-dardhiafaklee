// AuthContext - Gestion de l'authentification avec API MySQL
// French only - no translations

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/config/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté via le token
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Vérifier le token avec l'API
      api.get('/auth/verify')
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("auth_token");
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("🔐 Tentative de connexion avec:", email);
      // Appeler l'API de login
      const response = await api.post('/auth/login', { email, password });
      console.log("✅ Réponse API reçue:", response);
      
      // Stocker le token
      localStorage.setItem("auth_token", response.token);
      
      // Mettre à jour l'utilisateur
      setUser(response.user);
      
      return true;
    } catch (error: any) {
      console.error("❌ Erreur de connexion:", error);
      console.error("📝 Message d'erreur:", error.message);
      console.error("📦 Détails complets:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    window.location.href = "/backoffice/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

