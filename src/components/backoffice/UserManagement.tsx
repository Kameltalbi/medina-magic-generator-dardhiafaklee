// User and role management page (superadmin only)
// Uses existing design tokens and comprehensive user management

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  ShieldCheck,
  Eye,
  EyeOff,
  Key,
  UserCheck,
  UserX,
  Clock,
  Search,
  Filter,
  CheckCircle,
  UserCog
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  isSystem: boolean; // true pour superadmin et admin (non modifiables)
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // Peut être "superadmin", "admin" ou un ID de rôle personnalisé
  status: "active" | "inactive";
  lastLogin: string | null;
  permissions: string[];
  createdAt: string;
  password?: string; // Mot de passe temporaire (sera communiqué face-à-face)
}

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  ip?: string;
}

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [rolesData, setRolesData] = useState<Role[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  
  // Formulaire d'ajout d'utilisateur
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "admin",
    permissions: [] as string[],
    status: "active" as "active" | "inactive"
  });
  
  // Formulaire d'ajout/édition de rôle
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });
  
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadUsers();
    loadRoles();
    loadActivityLog();
  }, []);

  const loadUsers = () => {
    const saved = localStorage.getItem('users');
    if (saved) {
      try {
        const users = JSON.parse(saved);
        setUsersData(users);
      } catch (error) {
        console.error('Error loading users:', error);
        setUsersData([]);
      }
    } else {
      // Créer un utilisateur superadmin par défaut si aucun utilisateur n'existe
      const defaultSuperAdmin: User = {
        id: "1",
        name: "Administrateur",
        email: "contact@dardhiafaklee.com",
        role: "superadmin",
        status: "active",
        lastLogin: null,
        permissions: ["*"],
        createdAt: new Date().toISOString()
      };
      setUsersData([defaultSuperAdmin]);
      localStorage.setItem('users', JSON.stringify([defaultSuperAdmin]));
    }
  };

  const loadRoles = () => {
    const saved = localStorage.getItem('roles');
    if (saved) {
      try {
        const roles = JSON.parse(saved);
        setRolesData(roles);
      } catch (error) {
        console.error('Error loading roles:', error);
        // Créer les rôles système par défaut
        const defaultRoles: Role[] = [
          {
            id: "superadmin",
            name: "Super Administrateur",
            description: "Accès complet à toutes les fonctionnalités",
            permissions: ["*"],
            createdAt: new Date().toISOString(),
            isSystem: true
          },
          {
            id: "admin",
            name: "Administrateur",
            description: "Gestion complète des opérations quotidiennes",
            permissions: [
              "dashboard.read",
              "rooms.manage",
              "pricing.manage",
              "gallery.manage",
              "content.manage",
              "reservations.manage",
              "sales.read",
              "sales.export",
              "sales.edit",
              "analytics.read",
              "analytics.export",
              "seo.read",
              "seo.update"
            ],
            createdAt: new Date().toISOString(),
            isSystem: true
          }
        ];
        setRolesData(defaultRoles);
        localStorage.setItem('roles', JSON.stringify(defaultRoles));
      }
    } else {
      // Créer les rôles système par défaut
      const defaultRoles: Role[] = [
        {
          id: "superadmin",
          name: "Super Administrateur",
          description: "Accès complet à toutes les fonctionnalités",
          permissions: ["*"],
          createdAt: new Date().toISOString(),
          isSystem: true
        },
        {
          id: "admin",
          name: "Administrateur",
          description: "Gestion complète des opérations quotidiennes",
          permissions: [
            "dashboard.read",
            "rooms.manage",
            "pricing.manage",
            "gallery.manage",
            "content.manage",
            "reservations.manage",
            "sales.read",
            "sales.export",
            "sales.edit",
            "analytics.read",
            "analytics.export",
            "seo.read",
            "seo.update"
          ],
          createdAt: new Date().toISOString(),
          isSystem: true
        }
      ];
      setRolesData(defaultRoles);
      localStorage.setItem('roles', JSON.stringify(defaultRoles));
    }
  };

  const loadActivityLog = () => {
    const saved = localStorage.getItem('userActivityLog');
    if (saved) {
      try {
        setActivityLog(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading activity log:', error);
        setActivityLog([]);
      }
    }
  };

  const saveUsers = (users: User[]) => {
    setUsersData(users);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const saveRoles = (roles: Role[]) => {
    setRolesData(roles);
    localStorage.setItem('roles', JSON.stringify(roles));
  };

  const addActivityLog = (action: string, target: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      user: "Super Admin", // À récupérer depuis le contexte utilisateur
      action,
      target,
      timestamp: new Date().toLocaleString('fr-FR'),
      ip: "N/A"
    };
    const updatedLog = [newLog, ...activityLog].slice(0, 50); // Garder les 50 dernières
    setActivityLog(updatedLog);
    localStorage.setItem('userActivityLog', JSON.stringify(updatedLog));
  };

  const generatePassword = (): string => {
    // Générer un mot de passe sécurisé de 12 caractères
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Vérifier si l'email existe déjà
    if (usersData.some(u => u.email === newUser.email)) {
      toast.error("Cet email est déjà utilisé");
      return;
    }

    // Générer un mot de passe
    const password = generatePassword();
    setGeneratedPassword(password);

    // Récupérer les permissions du rôle sélectionné
    const selectedRole = rolesData.find(r => r.id === newUser.role);
    const userPermissions = selectedRole ? selectedRole.permissions : [];

    // Créer le nouvel utilisateur (sans stocker le mot de passe)
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      lastLogin: null,
      permissions: userPermissions,
      createdAt: new Date().toISOString()
      // Le mot de passe n'est PAS stocké - il sera communiqué face-à-face
    };

    const updatedUsers = [...usersData, user];
    saveUsers(updatedUsers);
    addActivityLog("Créé un nouvel utilisateur", newUser.name);
    
    // Afficher le mot de passe généré (sera supprimé après fermeture du dialogue)

    // Réinitialiser le formulaire
    setNewUser({
      name: "",
      email: "",
      role: "admin",
      permissions: [],
      status: "active"
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const user = usersData.find(u => u.id === userId);
      if (user) {
        const updatedUsers = usersData.filter(u => u.id !== userId);
        saveUsers(updatedUsers);
        addActivityLog("Supprimé un utilisateur", user.name);
      }
    }
  };

  const handleToggleStatus = (userId: string) => {
    const updatedUsers = usersData.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === "active" ? "inactive" : "active";
        addActivityLog(`Modifié le statut de l'utilisateur`, u.name);
        return { ...u, status: newStatus };
      }
      return u;
    });
    saveUsers(updatedUsers);
  };

  // Fonctions de gestion des rôles
  const handleAddRole = () => {
    if (!newRole.name) {
      toast.error("Veuillez saisir un nom de rôle");
      return;
    }

    // Vérifier si le nom existe déjà
    if (rolesData.some(r => r.name.toLowerCase() === newRole.name.toLowerCase())) {
      toast.error("Un rôle avec ce nom existe déjà");
      return;
    }

    const role: Role = {
      id: `role-${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      createdAt: new Date().toISOString(),
      isSystem: false
    };

    const updatedRoles = [...rolesData, role];
    saveRoles(updatedRoles);
    addActivityLog("Créé un nouveau rôle", newRole.name);
    toast.success("Rôle créé avec succès");

    // Réinitialiser le formulaire
    setNewRole({
      name: "",
      description: "",
      permissions: []
    });
    setIsAddRoleOpen(false);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setIsEditRoleOpen(true);
  };

  const handleUpdateRole = () => {
    if (!selectedRole || !newRole.name) {
      toast.error("Veuillez saisir un nom de rôle");
      return;
    }

    // Vérifier si le nom existe déjà (sauf pour le rôle en cours d'édition)
    if (rolesData.some(r => r.name.toLowerCase() === newRole.name.toLowerCase() && r.id !== selectedRole.id)) {
      toast.error("Un rôle avec ce nom existe déjà");
      return;
    }

    const updatedRoles = rolesData.map(r => {
      if (r.id === selectedRole.id) {
        return {
          ...r,
          name: newRole.name,
          description: newRole.description,
          permissions: newRole.permissions
        };
      }
      return r;
    });

    saveRoles(updatedRoles);
    addActivityLog("Modifié un rôle", newRole.name);
    toast.success("Rôle modifié avec succès");

    setSelectedRole(null);
    setNewRole({
      name: "",
      description: "",
      permissions: []
    });
    setIsEditRoleOpen(false);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = rolesData.find(r => r.id === roleId);
    if (!role) return;

    if (role.isSystem) {
      toast.error("Les rôles système ne peuvent pas être supprimés");
      return;
    }

    // Vérifier si des utilisateurs utilisent ce rôle
    const usersWithRole = usersData.filter(u => u.role === roleId);
    if (usersWithRole.length > 0) {
      toast.error(`Impossible de supprimer ce rôle : ${usersWithRole.length} utilisateur(s) l'utilisent`);
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer le rôle "${role.name}" ?`)) {
      const updatedRoles = rolesData.filter(r => r.id !== roleId);
      saveRoles(updatedRoles);
      addActivityLog("Supprimé un rôle", role.name);
      toast.success("Rôle supprimé avec succès");
    }
  };

  const getRoleName = (roleId: string): string => {
    const role = rolesData.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getUserPermissions = (user: User): string[] => {
    if (user.role === "superadmin") return ["*"];
    const role = rolesData.find(r => r.id === user.role);
    return role ? role.permissions : user.permissions;
  };

  // Liste complète de toutes les permissions de l'application
  const allPermissions = [
    { 
      category: "Dashboard", 
      permissions: [
        "dashboard.read"
      ] 
    },
    { 
      category: "Chambres", 
      permissions: [
        "rooms.manage",
        "rooms.create",
        "rooms.edit",
        "rooms.delete",
        "rooms.view"
      ] 
    },
    { 
      category: "Tarifs", 
      permissions: [
        "pricing.manage",
        "pricing.create",
        "pricing.edit",
        "pricing.delete",
        "pricing.view"
      ] 
    },
    { 
      category: "Galerie", 
      permissions: [
        "gallery.manage",
        "gallery.upload",
        "gallery.edit",
        "gallery.delete",
        "gallery.view"
      ] 
    },
    { 
      category: "Contenu", 
      permissions: [
        "content.manage",
        "content.create",
        "content.edit",
        "content.delete",
        "content.publish",
        "content.view"
      ] 
    },
    { 
      category: "Réservations", 
      permissions: [
        "reservations.manage",
        "reservations.create",
        "reservations.edit",
        "reservations.delete",
        "reservations.view",
        "reservations.confirm",
        "reservations.cancel"
      ] 
    },
    { 
      category: "Ventes", 
      permissions: [
        "sales.read",
        "sales.export",
        "sales.edit",
        "sales.delete",
        "sales.create",
        "sales.view"
      ] 
    },
    { 
      category: "Analytics", 
      permissions: [
        "analytics.read",
        "analytics.export",
        "analytics.view"
      ] 
    },
    { 
      category: "SEO", 
      permissions: [
        "seo.read",
        "seo.update",
        "seo.publish",
        "seo.manage"
      ] 
    },
    { 
      category: "Utilisateurs", 
      permissions: [
        "users.manage",
        "users.create",
        "users.edit",
        "users.delete",
        "users.view"
      ] 
    },
    { 
      category: "Paramètres", 
      permissions: [
        "settings.manage",
        "settings.advanced",
        "settings.view"
      ] 
    }
  ];

  const getRoleIcon = (role: string) => {
    return role === "superadmin" ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      superadmin: "bg-red-100 text-red-800",
      admin: "bg-blue-100 text-blue-800",
    };
    return variants[role as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-bold text-indigo-medina">
            {"Gestion des Utilisateurs & Rôles"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Gérez les utilisateurs, rôles et permissions"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="roles">
            <UserCog className="w-4 h-4 mr-2" />
            Rôles & Permissions
          </TabsTrigger>
        </TabsList>

        {/* Onglet Utilisateurs */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                {"Exporter"}
              </Button>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                <Plus className="w-4 h-4 mr-2" />
                {"Ajouter Utilisateur"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{"Ajouter Utilisateur"}</DialogTitle>
                <DialogDescription>
                  Créer un nouvel utilisateur avec des permissions spécifiques
                </DialogDescription>
              </DialogHeader>
              {generatedPassword ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-800">Utilisateur créé avec succès</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-4">
                      Le mot de passe doit être communiqué en face-à-face à l'utilisateur.
                    </p>
                    <div className="space-y-2">
                      <Label>Mot de passe généré :</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={generatedPassword}
                          readOnly
                          className="font-mono"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedPassword);
                            toast.success("Mot de passe copié dans le presse-papiers");
                          }}
                        >
                          Copier
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm text-yellow-800 font-medium">
                        ⚠️ Important : Notez ce mot de passe et communiquez-le en face-à-face à l'utilisateur.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="bg-terre-cuite hover:bg-terre-cuite-hover"
                      onClick={() => {
                        setIsAddUserOpen(false);
                        setGeneratedPassword(null);
                        setShowPassword(false);
                      }}
                    >
                      Fermer
                    </Button>
                  </DialogFooter>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Adresse email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rôle *</Label>
                      <Select 
                        value={newUser.role} 
                        onValueChange={(value: string) => {
                          const selectedRole = rolesData.find(r => r.id === value);
                          setNewUser({ 
                            ...newUser, 
                            role: value, 
                            permissions: selectedRole ? selectedRole.permissions : [] 
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          {rolesData.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      <Select 
                        value={newUser.status} 
                        onValueChange={(value: "active" | "inactive") => setNewUser({ ...newUser, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="inactive">Inactif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Annuler
                    </Button>
                    <Button 
                      className="bg-terre-cuite hover:bg-terre-cuite-hover"
                      onClick={handleAddUser}
                    >
                      Créer l'utilisateur
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs totaux
            </CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData.length}</div>
            <p className="text-xs text-muted-foreground">
              Utilisateurs enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs actifs
            </CardTitle>
            <UserCheck className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(u => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Actuellement actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Super administrateurs
            </CardTitle>
            <ShieldCheck className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(u => u.role === "superadmin").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Accès complet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrateurs
            </CardTitle>
            <Shield className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(u => u.role === "admin").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Accès limité
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{"Filtres"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={"Rechercher utilisateurs..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{"Tous les rôles"}</SelectItem>
                {rolesData.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{"Utilisateurs"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{"Utilisateur"}</TableHead>
                <TableHead>{"Rôle"}</TableHead>
                <TableHead>{"Statut"}</TableHead>
                <TableHead>{"Dernière connexion"}</TableHead>
                <TableHead>{"Permissions"}</TableHead>
                <TableHead className="text-right">{"Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-terre-cuite to-vert-porte rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <Badge className={getRoleBadge(user.role)}>
                        {getRoleName(user.role)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {user.lastLogin ? (
                        <>
                          <div>{user.lastLogin.split(' ')[0]}</div>
                          <div className="text-muted-foreground">{user.lastLogin.split(' ')[1]}</div>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Jamais connecté</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {getUserPermissions(user).includes("*") ? (
                        <Badge variant="outline">Toutes les permissions</Badge>
                      ) : (
                        <span>{getUserPermissions(user).length} permission(s)</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleToggleStatus(user.id)}
                        title={user.status === "active" ? "Désactiver" : "Activer"}
                      >
                        {user.status === "active" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role === "superadmin" && usersData.filter(u => u.role === "superadmin").length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle>{"Journal d'activité"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>Aucune activité enregistrée</p>
                  </div>
                ) : (
                  activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">
                            <span className="text-terre-cuite">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.target} • {activity.timestamp} {activity.ip && `• ${activity.ip}`}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {activity.timestamp.split(' ')[0]}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Rôles */}
        <TabsContent value="roles" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-indigo-medina">Gestion des Rôles</h2>
              <p className="text-muted-foreground mt-1">
                Créez et gérez les rôles avec des permissions personnalisées
              </p>
            </div>
            <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un Rôle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer un Nouveau Rôle</DialogTitle>
                  <DialogDescription>
                    Définissez un nom, une description et sélectionnez les permissions pour ce rôle
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="roleName">Nom du rôle *</Label>
                    <Input
                      id="roleName"
                      placeholder="Ex: Réceptionniste, Manager, etc."
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roleDescription">Description</Label>
                    <Input
                      id="roleDescription"
                      placeholder="Description du rôle et de ses responsabilités"
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4">
                      {allPermissions.map((category) => (
                        <div key={category.category} className="space-y-3">
                          <h4 className="text-sm font-semibold text-indigo-medina border-b pb-2">
                            {category.category}
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {category.permissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`role-${permission}`}
                                  checked={newRole.permissions.includes(permission)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] });
                                    } else {
                                      setNewRole({ ...newRole, permissions: newRole.permissions.filter(p => p !== permission) });
                                    }
                                  }}
                                />
                                <Label htmlFor={`role-${permission}`} className="text-sm cursor-pointer">
                                  {permission}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setIsAddRoleOpen(false);
                    setNewRole({ name: "", description: "", permissions: [] });
                  }}>
                    Annuler
                  </Button>
                  <Button className="bg-terre-cuite hover:bg-terre-cuite-hover" onClick={handleAddRole}>
                    Créer le Rôle
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Liste des Rôles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rolesData.map((role) => (
              <Card key={role.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {role.isSystem ? <ShieldCheck className="w-5 h-5 text-red-600" /> : <Shield className="w-5 h-5 text-blue-600" />}
                      {role.name}
                    </CardTitle>
                    {role.isSystem && (
                      <Badge variant="outline" className="text-xs">Système</Badge>
                    )}
                  </div>
                  {role.description && (
                    <p className="text-sm text-muted-foreground mt-2">{role.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {role.permissions.includes("*") ? "Toutes les permissions" : `${role.permissions.length} permission(s)`}
                      </p>
                      {!role.permissions.includes("*") && role.permissions.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 3).map((perm) => (
                            <Badge key={perm} variant="secondary" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{role.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">
                        {usersData.filter(u => u.role === role.id).length} utilisateur(s)
                      </span>
                      <div className="flex gap-2">
                        {!role.isSystem && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRole(role)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleDeleteRole(role.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dialog d'édition de rôle */}
          <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Modifier le Rôle</DialogTitle>
                <DialogDescription>
                  Modifiez le nom, la description et les permissions de ce rôle
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editRoleName">Nom du rôle *</Label>
                  <Input
                    id="editRoleName"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editRoleDescription">Description</Label>
                  <Input
                    id="editRoleDescription"
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4">
                    {allPermissions.map((category) => (
                      <div key={category.category} className="space-y-3">
                        <h4 className="text-sm font-semibold text-indigo-medina border-b pb-2">
                          {category.category}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.permissions.map((permission) => (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-role-${permission}`}
                                checked={newRole.permissions.includes(permission)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] });
                                  } else {
                                    setNewRole({ ...newRole, permissions: newRole.permissions.filter(p => p !== permission) });
                                  }
                                }}
                              />
                              <Label htmlFor={`edit-role-${permission}`} className="text-sm cursor-pointer">
                                {permission}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsEditRoleOpen(false);
                  setSelectedRole(null);
                  setNewRole({ name: "", description: "", permissions: [] });
                }}>
                  Annuler
                </Button>
                <Button className="bg-terre-cuite hover:bg-terre-cuite-hover" onClick={handleUpdateRole}>
                  Enregistrer les Modifications
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
