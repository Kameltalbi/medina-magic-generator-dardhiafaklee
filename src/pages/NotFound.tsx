import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="mb-4 text-6xl font-bold text-indigo-medina">404</h1>
        <h2 className="mb-4 text-2xl font-playfair text-terre-cuite">{t("notFound.title")}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{t("notFound.description")}</p>
        <Link to="/">
          <Button className="bg-terre-cuite hover:bg-terre-cuite-hover text-white px-6 py-3">
            <Home className="w-4 h-4 mr-2" />
            {t("notFound.backHome")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
