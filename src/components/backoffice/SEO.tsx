// SEO management page with meta tags, sitemap, redirects and JSON-LD
// Uses existing design tokens and comprehensive SEO tools

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  FileText, 
  Link, 
  Code, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Upload,
  Save,
  Eye,
  Edit
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const SEO = () => {
    const [activeTab, setActiveTab] = useState("meta");
  const [selectedPage, setSelectedPage] = useState("home");

  // Mock SEO data
  const pages = [
    { id: "home", url: "/", title: "Homepage" },
    { id: "rooms", url: "/rooms", title: "Rooms & Suites" },
    { id: "gallery", url: "/gallery", title: "Gallery" },
    { id: "experiences", url: "/experiences", title: "Experiences" },
    { id: "booking", url: "/booking", title: "Booking" },
  ];

  const metaData = {
    title: "Dar Dhiafa Klee - Luxury Hotel in Kairouan, Tunisia",
    description: "Experience authentic Tunisian hospitality at Dar Dhiafa Klee, a luxury hotel in the heart of Kairouan. Book your stay in our elegant rooms and suites.",
    keywords: "hotel, Kairouan, Tunisia, luxury, accommodation, traditional, hospitality",
    canonical: "https://dardhiafa.com/",
    robots: "index, follow",
    ogTitle: "Dar Dhiafa Klee - Luxury Hotel in Kairouan",
    ogDescription: "Discover authentic Tunisian hospitality at Dar Dhiafa Klee",
    ogImage: "https://dardhiafa.com/og-image.jpg",
    twitterCard: "summary_large_image",
  };

  const sitemapData = [
    { url: "/", priority: "1.0", changefreq: "daily", lastmod: "2024-01-15" },
    { url: "/rooms", priority: "0.9", changefreq: "weekly", lastmod: "2024-01-15" },
    { url: "/gallery", priority: "0.8", changefreq: "weekly", lastmod: "2024-01-15" },
    { url: "/experiences", priority: "0.8", changefreq: "weekly", lastmod: "2024-01-15" },
    { url: "/booking", priority: "0.9", changefreq: "daily", lastmod: "2024-01-15" },
  ];

  const redirectsData = [
    { from: "/old-booking", to: "/booking", code: "301", note: "Old booking URL" },
    { from: "/accommodation", to: "/rooms", code: "301", note: "Renamed page" },
    { from: "/contact-us", to: "/#contact", code: "302", note: "Temporary redirect" },
  ];

  const auditResults = [
    { check: "H1 Tag", status: "pass", message: "Single H1 found" },
    { check: "Meta Description", status: "pass", message: "Description present and optimal length" },
    { check: "Title Tag", status: "pass", message: "Title present and under 60 characters" },
    { check: "Image Alt Tags", status: "warning", message: "3 images missing alt text" },
    { check: "Internal Links", status: "pass", message: "All internal links working" },
    { check: "Canonical URL", status: "pass", message: "Canonical URL set" },
    { check: "Page Speed", status: "warning", message: "Page speed could be improved" },
    { check: "Mobile Friendly", status: "pass", message: "Page is mobile responsive" },
  ];

  const lighthouseScores = {
    performance: 92,
    accessibility: 98,
    bestPractices: 95,
    seo: 96,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "fail":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: "bg-green-100 text-green-800",
      warning: "bg-orange-100 text-orange-800",
      fail: "bg-red-100 text-red-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-bold text-indigo-medina">
            {"Gestion SEO"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Optimisez votre site pour les moteurs de recherche"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {"Exporter Sitemap"}
          </Button>
          <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
            <Save className="w-4 h-4 mr-2" />
            {"Sauvegarder"}
          </Button>
        </div>
      </div>

      {/* Lighthouse Scores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {"Performance"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.performance)}`}>
              {lighthouseScores.performance}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {"sur 100"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {"Accessibilité"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.accessibility)}`}>
              {lighthouseScores.accessibility}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {"sur 100"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {"Bonnes pratiques"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.bestPractices)}`}>
              {lighthouseScores.bestPractices}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {"sur 100"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {"SEO"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.seo)}`}>
              {lighthouseScores.seo}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {"sur 100"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* SEO Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="meta">Méta</TabsTrigger>
          <TabsTrigger value="sitemap">Plan du site</TabsTrigger>
          <TabsTrigger value="redirects">Redirections</TabsTrigger>
          <TabsTrigger value="jsonld">JSON-LD</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        {/* Meta Tags Tab */}
        <TabsContent value="meta" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Balises méta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="page-select">Sélectionner une page</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pages.map((page) => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="canonical">URL canonique</Label>
                  <Input id="canonical" defaultValue={metaData.canonical} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la page</Label>
                  <Input id="title" defaultValue={metaData.title} />
                  <p className="text-xs text-muted-foreground">
                    {metaData.title.length}/60 caractères
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description méta</Label>
                  <Textarea 
                    id="description" 
                    defaultValue={metaData.description}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {metaData.description.length}/160 caractères
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Mots-clés</Label>
                  <Input id="keywords" defaultValue={metaData.keywords} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="robots">Directives robots</Label>
                    <Select defaultValue={metaData.robots}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index, follow">Index, Follow</SelectItem>
                        <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                        <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                        <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter-card">Carte Twitter</Label>
                    <Select defaultValue={metaData.twitterCard}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Open Graph</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="og-title">Titre Open Graph</Label>
                    <Input id="og-title" defaultValue={metaData.ogTitle} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og-image">Image Open Graph</Label>
                    <Input id="og-image" defaultValue={metaData.ogImage} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="og-description">Description Open Graph</Label>
                    <Textarea 
                      id="og-description" 
                      defaultValue={metaData.ogDescription}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sitemap Tab */}
        <TabsContent value="sitemap" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Plan du site</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                  <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">Plan du site actuel</p>
                    <p className="text-sm text-muted-foreground">
                      Dernière mise à jour: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">{sitemapData.length} pages</Badge>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Fréquence de changement</TableHead>
                      <TableHead>Dernière modification</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sitemapData.map((page) => (
                      <TableRow key={page.url}>
                        <TableCell className="font-medium">{page.url}</TableCell>
                        <TableCell>{page.priority}</TableCell>
                        <TableCell>{page.changefreq}</TableCell>
                        <TableCell>{page.lastmod}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Redirects Tab */}
        <TabsContent value="redirects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Redirections</CardTitle>
                <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                  Ajouter une redirection
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>De</TableHead>
                    <TableHead>Vers</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redirectsData.map((redirect, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{redirect.from}</TableCell>
                      <TableCell>{redirect.to}</TableCell>
                      <TableCell>
                        <Badge variant={redirect.code === "301" ? "default" : "secondary"}>
                          {redirect.code}
                        </Badge>
                      </TableCell>
                      <TableCell>{redirect.note}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* JSON-LD Tab */}
        <TabsContent value="jsonld" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Données structurées JSON-LD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jsonld-type">Type de schéma</Label>
                  <Select defaultValue="Organization">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Organization">Organization</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="BreadcrumbList">BreadcrumbList</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jsonld-code">Code JSON</Label>
                  <Textarea 
                    id="jsonld-code" 
                    rows={10}
                    defaultValue={`{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Dar Dhiafa Klee",
  "description": "Luxury hotel in Kairouan, Tunisia",
  "url": "https://dardhiafa.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue de la Médina",
    "addressLocality": "Kairouan",
    "addressCountry": "Tunisia"
  },
  "telephone": "+216-77-123-456",
  "email": "contact@dardhiafa.com"
}`}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Aperçu
                  </Button>
                  <Button variant="outline" size="sm">
                    <Code className="w-4 h-4 mr-2" />
                    Valider
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Audit SEO</CardTitle>
                <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                  Lancer l'audit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <p className="font-medium">{result.check}</p>
                        <p className="text-sm text-muted-foreground">{result.message}</p>
                      </div>
                    </div>
                    <Badge className={getStatusBadge(result.status)}>
                      {result.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEO;
