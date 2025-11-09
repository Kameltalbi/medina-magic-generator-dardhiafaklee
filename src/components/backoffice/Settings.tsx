// Settings page - Regrouper toutes les fonctions secondaires dans un seul espace
// Utilisateurs & Rôles, Site & Communication, Configuration générale
// French only - no translations

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Globe, 
  CreditCard, 
  Mail, 
  Shield, 
  Database,
  Webhook,
  Cookie,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Users,
  UserPlus,
  Eye,
  EyeOff,
  Search,
  Image,
  FileText,
  Languages,
  MapPin,
  Phone,
  Building,
  DollarSign,
  Percent,
  Lock,
  Key,
  Calendar,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'manager' | 'receptionist';
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

interface SitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  isPublished: boolean;
  lastModified: string;
}

interface SEOConfig {
  siteName: string;
  siteDescription: string;
  defaultLanguage: string;
  keywords: string[];
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [hasChanges, setHasChanges] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<SitePage | null>(null);
  const { currency, setCurrency } = useCurrency();
  
  // États pour la modification du mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // États pour les données
  const [users, setUsers] = useState<User[]>([]);
  const [sitePages, setSitePages] = useState<SitePage[]>([]);
  const [seoConfig, setSeoConfig] = useState<SEOConfig>({
    siteName: "Dar Dhiafa Klee",
    siteDescription: "Maison d'hôtes traditionnelle au cœur de Kairouan",
    defaultLanguage: "fr",
    keywords: ["Kairouan", "Tunisie", "Maison d'hôtes", "Tradition", "Culture"],
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: ""
    }
  });

  // Configuration générale
  const [generalConfig, setGeneralConfig] = useState({
    establishmentName: "Dar Dhiafa Klee",
    address: "Rue de la Médina, Kairouan, Tunisie",
    phone: "+216 20 987 654",
    email: "info@dardhiafaklee.com",
    website: "https://dardhiafa.com",
    cityTax: 2,
    availableLanguages: ["fr", "en", "ar"],
    timezone: "Africa/Tunis",
    dateFormat: "DD/MM/YYYY",
    maintenanceMode: false
  });

  // Données simulées
  const defaultUsers: User[] = [
    {
      id: "1",
      name: "Admin Principal",
      email: "admin@dardhiafa.com",
      role: "superadmin",
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      permissions: ["all"]
    },
    {
      id: "2",
      name: "Marie Dubois",
      email: "marie@dardhiafa.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15T09:15:00Z",
      permissions: ["reservations.manage", "pricing.manage", "experiences.manage"]
    },
    {
      id: "3",
      name: "Ahmed Ben Ali",
      email: "ahmed@dardhiafa.com",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-14T16:45:00Z",
      permissions: ["reservations.read", "sales.read"]
    },
    {
      id: "4",
      name: "Fatma Khelil",
      email: "fatma@dardhiafa.com",
      role: "receptionist",
      status: "active",
      lastLogin: "2024-01-15T08:20:00Z",
      permissions: ["reservations.read", "reservations.create"]
    }
  ];

  // Fonction pour changer le mot de passe
  const handleChangePassword = () => {
    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("Le nouveau mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    // Charger les utilisateurs
    const savedUsers = localStorage.getItem("users");
    if (!savedUsers) {
      toast.error("Erreur : Aucun utilisateur trouvé");
      return;
    }

    const users = JSON.parse(savedUsers);
    const currentUserData = users.find((u: any) => u.email === user?.email);

    if (!currentUserData) {
      toast.error("Erreur : Utilisateur non trouvé");
      return;
    }

    // Vérifier le mot de passe actuel
    if (currentUserData.password && currentUserData.password !== passwordForm.currentPassword) {
      toast.error("Le mot de passe actuel est incorrect");
      return;
    }

    // Mettre à jour le mot de passe
    const updatedUsers = users.map((u: any) => {
      if (u.email === user?.email) {
        return {
          ...u,
          password: passwordForm.newPassword
        };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Réinitialiser le formulaire
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

    toast.success("Mot de passe modifié avec succès");
  };

  const defaultPages: SitePage[] = [
    {
      id: "1",
      title: "À propos",
      slug: "about",
      content: "Dar Dhiafa Klee est une maison d'hôtes traditionnelle située au cœur de la médina de Kairouan...",
      metaTitle: "À propos - Dar Dhiafa Klee",
      metaDescription: "Découvrez l'histoire et l'authenticité de Dar Dhiafa Klee, maison d'hôtes traditionnelle à Kairouan.",
      keywords: ["Kairouan", "Maison d'hôtes", "Tradition", "Histoire"],
      isPublished: true,
      lastModified: "2024-01-10T14:30:00Z"
    },
    {
      id: "2",
      title: "Expériences",
      slug: "experiences",
      content: "Découvrez nos expériences authentiques à Kairouan...",
      metaTitle: "Expériences à Kairouan - Dar Dhiafa Klee",
      metaDescription: "Participez à nos expériences culturelles et artisanales uniques à Kairouan.",
      keywords: ["Expériences", "Culture", "Artisanat", "Kairouan"],
      isPublished: true,
      lastModified: "2024-01-12T11:15:00Z"
    },
    {
      id: "3",
      title: "Contact",
      slug: "contact",
      content: "Contactez-nous pour toute information...",
      metaTitle: "Contact - Dar Dhiafa Klee",
      metaDescription: "Contactez Dar Dhiafa Klee pour vos réservations et informations.",
      keywords: ["Contact", "Réservation", "Kairouan"],
      isPublished: true,
      lastModified: "2024-01-08T16:45:00Z"
    }
  ];

  useEffect(() => {
    // Charger les données depuis localStorage
    const savedUsers = localStorage.getItem('settingsUsers');
    const savedPages = localStorage.getItem('settingsPages');
    const savedSeo = localStorage.getItem('settingsSeo');
    const savedGeneral = localStorage.getItem('settingsGeneral');

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(defaultUsers);
      localStorage.setItem('settingsUsers', JSON.stringify(defaultUsers));
    }

    if (savedPages) {
      setSitePages(JSON.parse(savedPages));
    } else {
      setSitePages(defaultPages);
      localStorage.setItem('settingsPages', JSON.stringify(defaultPages));
    }

    if (savedSeo) {
      setSeoConfig(JSON.parse(savedSeo));
    } else {
      localStorage.setItem('settingsSeo', JSON.stringify(seoConfig));
    }

    if (savedGeneral) {
      setGeneralConfig(JSON.parse(savedGeneral));
    } else {
      localStorage.setItem('settingsGeneral', JSON.stringify(generalConfig));
    }
  }, []);

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('settingsUsers', JSON.stringify(updatedUsers));
    toast.success("Utilisateurs mis à jour");
  };

  const savePages = (updatedPages: SitePage[]) => {
    setSitePages(updatedPages);
    localStorage.setItem('settingsPages', JSON.stringify(updatedPages));
    toast.success("Pages mises à jour");
  };

  const saveSeoConfig = (updatedSeo: SEOConfig) => {
    setSeoConfig(updatedSeo);
    localStorage.setItem('settingsSeo', JSON.stringify(updatedSeo));
    toast.success("Configuration SEO mise à jour");
  };

  const saveGeneralConfig = (updatedGeneral: typeof generalConfig) => {
    setGeneralConfig(updatedGeneral);
    localStorage.setItem('settingsGeneral', JSON.stringify(updatedGeneral));
    toast.success("Configuration générale mise à jour");
  };

  const getRoleLabel = (role: User['role']) => {
    const labels = {
      superadmin: "Super Admin",
      admin: "Administrateur",
      manager: "Manager",
      receptionist: "Réceptionniste"
    };
    return labels[role];
  };

  const getRoleColor = (role: User['role']) => {
    const colors = {
      superadmin: "bg-red-100 text-red-800",
      admin: "bg-blue-100 text-blue-800",
      manager: "bg-green-100 text-green-800",
      receptionist: "bg-yellow-100 text-yellow-800"
    };
    return colors[role];
  };

  const getStatusColor = (status: User['status']) => {
    return status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsUserDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsUserDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    saveUsers(updatedUsers);
  };

  const handleAddPage = () => {
    setCurrentPage(null);
    setIsPageDialogOpen(true);
  };

  const handleEditPage = (page: SitePage) => {
    setCurrentPage(page);
    setIsPageDialogOpen(true);
  };

  const handleDeletePage = (pageId: string) => {
    const updatedPages = sitePages.filter(page => page.id !== pageId);
    savePages(updatedPages);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-bold text-indigo-medina mb-2">
            Paramètres
          </h1>
          <p className="text-muted-foreground font-medium">
            Regrouper toutes les fonctions secondaires dans un seul espace
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button className="bg-terre-cuite hover:bg-terre-cuite-hover text-white">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder tout
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Utilisateurs & Rôles
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Site & Communication
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configuration générale
          </TabsTrigger>
        </TabsList>

        {/* Utilisateurs & Rôles */}
        <TabsContent value="users" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-bold text-indigo-medina">
              Gestion des utilisateurs et rôles
            </h2>
            <Button 
              onClick={handleAddUser}
              className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un utilisateur
            </Button>
          </div>

          <Card className="shadow-sm border-0 bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {user.permissions.length} permission(s)
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
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

          {/* Rôles et permissions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Super Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Accès complet</div>
                  <ul className="text-sm space-y-1">
                    <li>• Toutes les permissions</li>
                    <li>• Gestion des utilisateurs</li>
                    <li>• Configuration système</li>
                    <li>• Accès aux logs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Administrateur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Gestion complète</div>
                  <ul className="text-sm space-y-1">
                    <li>• Réservations</li>
                    <li>• Tarifs</li>
                    <li>• Expériences</li>
                    <li>• Ventes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Lecture seule</div>
                  <ul className="text-sm space-y-1">
                    <li>• Consultation réservations</li>
                    <li>• Rapports de ventes</li>
                    <li>• Statistiques</li>
                    <li>• Pas de modification</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Réceptionniste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Opérations</div>
                  <ul className="text-sm space-y-1">
                    <li>• Créer réservations</li>
                    <li>• Modifier statuts</li>
                    <li>• Accueil clients</li>
                    <li>• Pas d'administration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Site & Communication */}
        <TabsContent value="site" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gestion des pages */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Pages du site
                  </CardTitle>
                  <Button 
                    onClick={handleAddPage}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle page
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sitePages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium font-semibold">{page.title}</div>
                        <div className="text-sm text-muted-foreground">/{page.slug}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={page.isPublished ? "default" : "secondary"}>
                            {page.isPublished ? "Publiée" : "Brouillon"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Modifiée le {new Date(page.lastModified).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPage(page)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePage(page.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Configuration SEO */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Optimisation SEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Nom du site</Label>
                    <Input
                      id="siteName"
                      value={seoConfig.siteName}
                      onChange={(e) => setSeoConfig(prev => ({ ...prev, siteName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">Description du site</Label>
                    <Textarea
                      id="siteDescription"
                      value={seoConfig.siteDescription}
                      onChange={(e) => setSeoConfig(prev => ({ ...prev, siteDescription: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="keywords">Mots-clés principaux</Label>
                    <Input
                      id="keywords"
                      value={seoConfig.keywords.join(', ')}
                      onChange={(e) => setSeoConfig(prev => ({ 
                        ...prev, 
                        keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                      }))}
                      placeholder="Kairouan, Tunisie, Maison d'hôtes..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="defaultLanguage">Langue par défaut</Label>
                    <Select
                      value={seoConfig.defaultLanguage}
                      onValueChange={(value) => setSeoConfig(prev => ({ ...prev, defaultLanguage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={() => saveSeoConfig(seoConfig)}
                    className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder SEO
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Réseaux sociaux */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Réseaux sociaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={seoConfig.socialMedia.facebook}
                      onChange={(e) => setSeoConfig(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                      }))}
                      placeholder="https://facebook.com/dardhiafa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={seoConfig.socialMedia.instagram}
                      onChange={(e) => setSeoConfig(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))}
                      placeholder="https://instagram.com/dardhiafa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={seoConfig.socialMedia.twitter}
                      onChange={(e) => setSeoConfig(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                      }))}
                      placeholder="https://twitter.com/dardhiafa"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mise à jour photos et textes */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Contenu média
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Gérer les images et textes du site
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Image className="w-6 h-6 mb-2" />
                      <span className="text-sm">Photos</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <FileText className="w-6 h-6 mb-2" />
                      <span className="text-sm">Textes</span>
                    </Button>
                  </div>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Les modifications de contenu nécessitent une validation avant publication.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sécurité - Modification du mot de passe */}
        <TabsContent value="security" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-bold text-indigo-medina mb-2">
                Modification du mot de passe
              </h2>
              <p className="text-muted-foreground">
                Changez votre mot de passe pour sécuriser votre compte
              </p>
            </div>

            <Card className="shadow-sm border-0 bg-card max-w-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Changer le mot de passe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleChangePassword();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel *</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        placeholder="Entrez votre mot de passe actuel"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                        }
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                        }
                      >
                        {showPasswords.current ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        placeholder="Entrez votre nouveau mot de passe"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                        }
                        required
                        minLength={8}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                        }
                      >
                        {showPasswords.new ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Le mot de passe doit contenir au moins 8 caractères
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        placeholder="Confirmez votre nouveau mot de passe"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                        }
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                        }
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setPasswordForm({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: ""
                        });
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Changer le mot de passe
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Informations de sécurité */}
            <Card className="shadow-sm border-0 bg-card max-w-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Informations de sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Email du compte</p>
                      <p className="text-sm text-muted-foreground">{user?.email || "N/A"}</p>
                    </div>
                    <Badge variant="outline">Actif</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Rôle</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.role === "superadmin" ? "Super Administrateur" : "Administrateur"}
                      </p>
                    </div>
                    <Badge variant="outline">{user?.role || "N/A"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuration générale */}
        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coordonnées de l'établissement */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Coordonnées de l'établissement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="establishmentName">Nom de l'établissement</Label>
                    <Input
                      id="establishmentName"
                      value={generalConfig.establishmentName}
                      onChange={(e) => setGeneralConfig(prev => ({ ...prev, establishmentName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea
                      id="address"
                      value={generalConfig.address}
                      onChange={(e) => setGeneralConfig(prev => ({ ...prev, address: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={generalConfig.phone}
                        onChange={(e) => setGeneralConfig(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={generalConfig.email}
                        onChange={(e) => setGeneralConfig(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      value={generalConfig.website}
                      onChange={(e) => setGeneralConfig(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuration financière */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Configuration financière
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currency">Devise</Label>
                    <Select
                      value={currency}
                      onValueChange={(value) => setCurrency(value as 'EUR' | 'USD' | 'TND')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TND">TND (Dinar tunisien)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                        <SelectItem value="USD">USD (Dollar américain)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cityTax">Taxe de séjour (TND/nuit)</Label>
                    <Input
                      id="cityTax"
                      type="number"
                      value={generalConfig.cityTax}
                      onChange={(e) => setGeneralConfig(prev => ({ ...prev, cityTax: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      La taxe de séjour est automatiquement calculée et affichée aux clients.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Langues disponibles */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  Langues disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Sélectionnez les langues disponibles sur le site
                  </div>
                  <div className="space-y-3">
                    {[
                      { code: 'fr', name: 'Français', flag: '🇫🇷' },
                      { code: 'en', name: 'English', flag: '🇬🇧' },
                      { code: 'ar', name: 'العربية', flag: '🇹🇳' },
                      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
                      { code: 'it', name: 'Italiano', flag: '🇮🇹' }
                    ].map((lang) => (
                      <div key={lang.code} className="flex items-center space-x-2">
                        <Checkbox
                          id={lang.code}
                          checked={generalConfig.availableLanguages.includes(lang.code)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setGeneralConfig(prev => ({
                                ...prev,
                                availableLanguages: [...prev.availableLanguages, lang.code]
                              }));
                            } else {
                              setGeneralConfig(prev => ({
                                ...prev,
                                availableLanguages: prev.availableLanguages.filter(l => l !== lang.code)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={lang.code} className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuration système */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuration système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select
                      value={generalConfig.timezone}
                      onValueChange={(value) => setGeneralConfig(prev => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Tunis">Afrique/Tunis (GMT+1)</SelectItem>
                        <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                        <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Format de date</Label>
                    <Select
                      value={generalConfig.dateFormat}
                      onValueChange={(value) => setGeneralConfig(prev => ({ ...prev, dateFormat: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                      <div className="text-sm text-muted-foreground">
                        Désactiver temporairement le site
                      </div>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={generalConfig.maintenanceMode}
                      onCheckedChange={(checked) => setGeneralConfig(prev => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>
                  <Button 
                    onClick={() => saveGeneralConfig(generalConfig)}
                    className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder la configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog d'ajout/modification d'utilisateur */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-medina">
              {currentUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userName">Nom complet</Label>
                <Input id="userName" placeholder="Ex: Marie Dubois" />
              </div>
              <div>
                <Label htmlFor="userEmail">Email</Label>
                <Input id="userEmail" type="email" placeholder="marie@dardhiafa.com" />
              </div>
              <div>
                <Label htmlFor="userRole">Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receptionist">Réceptionniste</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="userStatus">Statut</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                onClick={() => {
                  toast.success(currentUser ? "Utilisateur modifié" : "Nouvel utilisateur créé");
                  setIsUserDialogOpen(false);
                }}
              >
                {currentUser ? "Modifier" : "Créer"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog d'ajout/modification de page */}
      <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-medina">
              {currentPage ? "Modifier la page" : "Nouvelle page"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pageTitle">Titre de la page</Label>
                <Input id="pageTitle" placeholder="Ex: À propos" />
              </div>
              <div>
                <Label htmlFor="pageSlug">Slug (URL)</Label>
                <Input id="pageSlug" placeholder="about" />
              </div>
              <div>
                <Label htmlFor="metaTitle">Titre SEO</Label>
                <Input id="metaTitle" placeholder="À propos - Dar Dhiafa Klee" />
              </div>
              <div>
                <Label htmlFor="metaDescription">Description SEO</Label>
                <Input id="metaDescription" placeholder="Découvrez notre histoire..." />
              </div>
            </div>
            <div>
              <Label htmlFor="pageContent">Contenu de la page</Label>
              <Textarea id="pageContent" rows={8} placeholder="Contenu de la page..." />
            </div>
            <div>
              <Label htmlFor="pageKeywords">Mots-clés</Label>
              <Input id="pageKeywords" placeholder="Kairouan, Maison d'hôtes, Tradition" />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setIsPageDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                onClick={() => {
                  toast.success(currentPage ? "Page modifiée" : "Nouvelle page créée");
                  setIsPageDialogOpen(false);
                }}
              >
                {currentPage ? "Modifier" : "Créer"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;