// Login Page - Password protection for development/preview access
// Simple authentication to control access to the website

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp, fadeIn } from "@/lib/animations";

interface LoginPageProps {
  onLogin: (password: string) => boolean;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const isValid = onLogin(password);
    
    if (!isValid) {
      setError("Mot de passe incorrect. Veuillez réessayer.");
      setPassword("");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-medina via-terre-cuite to-vert-porte flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand */}
        <motion.div
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-white mb-2">
            Dar Dhiafa Klee
          </h1>
          <p className="text-white/80 font-inter">
            Accès privé au site
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-playfair font-bold text-indigo-medina">
                Connexion
              </CardTitle>
              <p className="text-muted-foreground font-inter text-sm">
                Entrez le mot de passe pour accéder au site
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-inter font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez le mot de passe"
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-terre-cuite focus:ring-terre-cuite/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm font-inter bg-red-50 border border-red-200 rounded-lg p-3"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !password.trim()}
                  className="w-full h-12 bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Vérification...</span>
                    </div>
                  ) : (
                    "Accéder au site"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeIn}
          className="text-center mt-8"
        >
          <p className="text-white/60 text-sm font-inter">
            Site en cours de développement
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
