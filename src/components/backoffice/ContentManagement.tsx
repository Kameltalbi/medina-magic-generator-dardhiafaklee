// ContentManagement component - Gestion du contenu des pages
// Permet de modifier les textes du Hero, About, etc.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Save, 
  Edit,
  Image as ImageIcon,
  Type,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

interface HeroContent {
  slides: Array<{
    id: number;
    image: string;
    title: string;
    subtitle: string;
  }>;
}

interface AboutContent {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

const ContentManagement = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    slides: [
      {
        id: 1,
        image: "/hero-dar-dhiafa-new.jpg",
        title: "Bienvenue à Dar Dhiafa Paul Klee",
        subtitle: "Une expérience unique inspirée de Paul Klee"
      },
      {
        id: 2,
        image: "/grid1.png",
        title: "Sérénité garantie",
        subtitle: "Un havre de paix artistique"
      },
      {
        id: 3,
        image: "/photosgaleriepage/pagegalerie2.jpg",
        title: "Galerie d'art",
        subtitle: "Découvrez nos œuvres"
      },
      {
        id: 4,
        image: "/photosgaleriepage/pagegalerie11.jpg",
        title: "Collection artistique",
        subtitle: "Inspiration et créativité"
      },
      {
        id: 5,
        image: "/peinture-paul-klee.png",
        title: "Œuvre de Paul Klee",
        subtitle: "L'artiste et son inspiration"
      }
    ]
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: "À propos de Dar Dhiafa Klee",
    description: "Une maison d'hôtes unique inspirée de l'art de Paul Klee",
    sections: []
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    const savedHero = localStorage.getItem('heroContent');
    const savedAbout = localStorage.getItem('aboutContent');
    
    if (savedHero) {
      try {
        setHeroContent(JSON.parse(savedHero));
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    }
    
    if (savedAbout) {
      try {
        setAboutContent(JSON.parse(savedAbout));
      } catch (error) {
        console.error('Error loading about content:', error);
      }
    }
  };

  const saveHeroContent = () => {
    localStorage.setItem('heroContent', JSON.stringify(heroContent));
    window.dispatchEvent(new Event('heroContentUpdated'));
    toast.success("Contenu Hero sauvegardé");
  };

  const saveAboutContent = () => {
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
    window.dispatchEvent(new Event('aboutContentUpdated'));
    toast.success("Contenu About sauvegardé");
  };

  const updateSlide = (slideId: number, field: string, value: string) => {
    setHeroContent({
      ...heroContent,
      slides: heroContent.slides.map(slide =>
        slide.id === slideId ? { ...slide, [field]: value } : slide
      )
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-medina">Gestion du Contenu</h1>
        <p className="text-muted-foreground mt-1">
          Modifiez les textes et images des pages principales
        </p>
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hero">
            <ImageIcon className="w-4 h-4 mr-2" />
            Hero / Slider
          </TabsTrigger>
          <TabsTrigger value="about">
            <FileText className="w-4 h-4 mr-2" />
            Page À propos
          </TabsTrigger>
        </TabsList>

        {/* Hero Content */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Slider d'accueil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {heroContent.slides.map((slide, index) => (
                <Card key={slide.id} className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Slide {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Image</Label>
                      <ImageUpload
                        value={slide.image}
                        onChange={(value) => updateSlide(slide.id, 'image', value)}
                      />
                    </div>
                    <div>
                      <Label>Titre</Label>
                      <Input
                        value={slide.title}
                        onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Sous-titre</Label>
                      <Input
                        value={slide.subtitle}
                        onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={saveHeroContent} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Content */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page À propos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Titre principal</Label>
                <Input
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={aboutContent.description}
                  onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                  rows={4}
                />
              </div>
              <Button onClick={saveAboutContent} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications About
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
