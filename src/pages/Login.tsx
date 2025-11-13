// Login page for back-office authentication
// French only - no translations

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 handleSubmit appelé avec:", { email, password: password ? "***" : "vide" });
    setError("");
    setIsLoading(true);

    try {
      console.log("📞 Appel de login...");
      const success = await login(email, password);
      console.log("📥 Résultat de login:", success);
      if (success) {
        console.log("✅ Connexion réussie, redirection...");
        toast.success("Connexion réussie");
        navigate("/backoffice");
      } else {
        console.log("❌ Login a retourné false");
        setError("Email ou mot de passe incorrect");
        toast.error("Email ou mot de passe incorrect");
      }
    } catch (error: any) {
      console.error("💥 Erreur dans handleSubmit:", error);
      setError("Une erreur est survenue lors de la connexion");
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-medina/10 via-terre-cuite/5 to-vert-porte/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-medina to-terre-cuite rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-indigo-medina">
                Administration
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Connectez-vous pour accéder au back-office
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@dardhiafa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Bouton cliqué, showPassword avant:", showPassword);
                      setShowPassword(!showPassword);
                      console.log("showPassword après:", !showPassword);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10 p-1 focus:outline-none focus:ring-2 focus:ring-terre-cuite rounded"
                    disabled={isLoading}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    tabIndex={0}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>

              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>
                  Le mot de passe vous a été communiqué en face-à-face lors de la création de votre compte.
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 font-medium mb-1">
                      🔧 Compte administrateur :
                    </p>
                    <p className="text-xs text-blue-700">
                      Email: <strong>contact@dardhiafaklee.com</strong>
                    </p>
                    <p className="text-xs text-blue-600 mt-2 italic">
                      Le mot de passe vous a été communiqué séparément
                    </p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Dar Dhiafa Klee - Système d'administration</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

