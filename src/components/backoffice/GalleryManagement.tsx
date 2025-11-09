// GalleryManagement component - Gestion de la galerie de photos
// Permet d'ajouter, modifier, supprimer et organiser les images de la galerie

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Edit,
  Eye,
  X,
  Save,
  Plus,
  Search,
  Grid3x3,
  List
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
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
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
}

const GalleryManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { value: "all", label: "Toutes" },
    { value: "rooms", label: "Chambres" },
    { value: "common", label: "Espaces communs" },
    { value: "restaurant", label: "Restaurant" },
    { value: "exterior", label: "Extérieurs" },
    { value: "art", label: "Art & Décoration" },
  ];

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    // Charger depuis localStorage ou utiliser les images par défaut
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        console.error('Error loading gallery images:', error);
        // Images par défaut depuis Gallery.tsx
        setImages(getDefaultImages());
      }
    } else {
      setImages(getDefaultImages());
    }
  };

  const getDefaultImages = (): GalleryImage[] => {
    return [
      { id: "1", src: "/photosgaleriepage/pagegalerie1.jpg", alt: "Cour intérieure", category: "common" },
      { id: "2", src: "/photosgaleriepage/pagegalerie2.jpg", alt: "Suite Klee", category: "rooms" },
      { id: "3", src: "/photosgaleriepage/pagegalerie3.jpg", alt: "Restaurant", category: "restaurant" },
      { id: "4", src: "/photosgaleriepage/pagegalerie4.jpg", alt: "Terrasse", category: "exterior" },
      { id: "5", src: "/photosgaleriepage/pagegalerie5.jpg", alt: "Détail architectural", category: "art" },
      { id: "6", src: "/photosgaleriepage/pagegalerie6.jpg", alt: "Salon", category: "common" },
      { id: "7", src: "/photosgaleriepage/pagegalerie7.jpg", alt: "Chambre", category: "rooms" },
      { id: "8", src: "/photosgaleriepage/pagegalerie8.jpg", alt: "Œuvre", category: "art" },
      { id: "9", src: "/photosgaleriepage/pagegalerie9.jpg", alt: "Entrée", category: "exterior" },
      { id: "10", src: "/photosgaleriepage/pagegalerie10.jpg", alt: "Petit-déjeuner", category: "restaurant" },
      { id: "11", src: "/photosgaleriepage/pagegalerie11.jpg", alt: "Chambre Deluxe", category: "rooms" },
      { id: "12", src: "/photosgaleriepage/pagegalerie12.jpg", alt: "Jardin", category: "exterior" },
    ];
  };

  const saveImages = (updatedImages: GalleryImage[]) => {
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    window.dispatchEvent(new Event('galleryImagesUpdated'));
    setImages(updatedImages);
  };

  const handleAdd = () => {
    setEditingImage({
      id: Date.now().toString(),
      src: "",
      alt: "",
      category: "common",
      title: "",
      description: ""
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage({ ...image });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingImage || !editingImage.src) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    if (editingImage.id && images.find(img => img.id === editingImage.id)) {
      // Modifier
      const updatedImages = images.map(img => 
        img.id === editingImage.id ? editingImage : img
      );
      saveImages(updatedImages);
      toast.success("Image mise à jour");
    } else {
      // Ajouter
      saveImages([...images, editingImage]);
      toast.success("Image ajoutée");
    }
    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const handleDelete = (imageId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      const updatedImages = images.filter(img => img.id !== imageId);
      saveImages(updatedImages);
      toast.success("Image supprimée");
    }
  };

  const filteredImages = images.filter(img => {
    const matchesSearch = img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (img.title && img.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-medina">Gestion de la Galerie</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les images de votre galerie photo
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une image
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher une image..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Images ({filteredImages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  className="group relative aspect-square rounded-lg overflow-hidden border"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(image)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
                    <p className="text-white text-sm truncate">{image.alt}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {categories.find(c => c.value === image.category)?.label}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map((image) => (
                <div key={image.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{image.alt}</p>
                    {image.title && <p className="text-sm text-muted-foreground">{image.title}</p>}
                    <Badge variant="outline" className="mt-1">
                      {categories.find(c => c.value === image.category)?.label}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(image)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(image.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingImage?.id && images.find(img => img.id === editingImage.id) ? "Modifier" : "Ajouter"} une image</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4">
              <div>
                <Label>Image</Label>
                <ImageUpload
                  value={editingImage.src}
                  onChange={(value) => setEditingImage({ ...editingImage, src: value })}
                />
              </div>
              <div>
                <Label>Description (alt)</Label>
                <Input
                  value={editingImage.alt}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  placeholder="Description de l'image"
                />
              </div>
              <div>
                <Label>Titre (optionnel)</Label>
                <Input
                  value={editingImage.title || ""}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  placeholder="Titre de l'image"
                />
              </div>
              <div>
                <Label>Catégorie</Label>
                <Select
                  value={editingImage.category}
                  onValueChange={(value) => setEditingImage({ ...editingImage, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.value !== "all").map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagement;

