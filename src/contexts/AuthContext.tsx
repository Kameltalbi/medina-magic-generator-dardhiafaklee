// AuthContext - Gestion de l'authentification
// French only - no translations

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
    // Vérifier si l'utilisateur est déjà connecté
    const savedSession = localStorage.getItem("auth_session");
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        // Vérifier que la session n'est pas expirée (24h)
        const now = new Date().getTime();
        if (session.expiresAt && now < session.expiresAt) {
          setUser(session.user);
        } else {
          // Session expirée
          localStorage.removeItem("auth_session");
        }
      } catch (error) {
        console.error("Error loading session:", error);
        localStorage.removeItem("auth_session");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Charger les utilisateurs depuis localStorage
      let savedUsers = localStorage.getItem("users");
      
      // Si aucun utilisateur n'existe, créer un superadmin par défaut
      if (!savedUsers) {
        const defaultSuperAdmin = {
          id: "1",
          name: "Administrateur",
          email: "contact@dardhiafaklee.com",
          role: "superadmin",
          status: "active",
          lastLogin: null,
          permissions: ["*"],
          createdAt: new Date().toISOString(),
          password: "2025DarDK!@" // Mot de passe configuré
        };
        localStorage.setItem("users", JSON.stringify([defaultSuperAdmin]));
        savedUsers = JSON.stringify([defaultSuperAdmin]);
      }

      const users = JSON.parse(savedUsers);
      
      // Vérifier si l'utilisateur contact@dardhiafaklee.com existe, sinon le créer
      const contactUser = users.find((u: any) => u.email.toLowerCase() === "contact@dardhiafaklee.com");
      
      if (!contactUser) {
        // Créer l'utilisateur contact
        const newContactUser = {
          id: Date.now().toString(),
          name: "Administrateur",
          email: "contact@dardhiafaklee.com",
          role: "superadmin",
          status: "active",
          lastLogin: null,
          permissions: ["*"],
          createdAt: new Date().toISOString(),
          password: "2025DarDK!@"
        };
        users.push(newContactUser);
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        // Mettre à jour le mot de passe si l'utilisateur existe déjà
        const updatedUsers = users.map((u: any) => {
          if (u.email.toLowerCase() === "contact@dardhiafaklee.com") {
            return {
              ...u,
              password: "2025DarDK!@",
              status: "active"
            };
          }
          return u;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      
      // Trouver l'utilisateur
      const foundUser = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.status === "active"
      );

      if (!foundUser) {
        return false;
      }

      // Vérifier le mot de passe
      // Si l'utilisateur a un mot de passe stocké, le vérifier
      // Sinon, accepter n'importe quel mot de passe (pour les anciens utilisateurs)
      if (foundUser.password) {
        if (foundUser.password !== password) {
          return false;
        }
      }
      // Si pas de mot de passe stocké, accepter n'importe quel mot de passe (compatibilité)

      // Charger les rôles pour obtenir les permissions
      const savedRoles = localStorage.getItem("roles");
      let permissions: string[] = [];
      
      if (foundUser.role === "superadmin") {
        permissions = ["*"];
      } else if (savedRoles) {
        const roles = JSON.parse(savedRoles);
        const role = roles.find((r: any) => r.id === foundUser.role);
        if (role) {
          permissions = role.permissions;
        }
      }

      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        permissions: permissions.length > 0 ? permissions : foundUser.permissions || []
      };

      // Créer la session (expire dans 24h)
      const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000;
      const session = {
        user: userData,
        expiresAt
      };

      localStorage.setItem("auth_session", JSON.stringify(session));

      // Mettre à jour la dernière connexion
      const updatedUsers = users.map((u: any) => {
        if (u.id === foundUser.id) {
          return {
            ...u,
            lastLogin: new Date().toLocaleString("fr-FR")
          };
        }
        return u;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setUser(userData);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_session");
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

