import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ImageUpload = ({ value, onChange, placeholder = "URL de l'image", className = "" }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Veuillez sélectionner un fichier image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }

    setIsUploading(true);

    // Simulate file upload - in a real app, you would upload to a server
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // For demo purposes, we'll use a placeholder path
      // In production, this would be the actual uploaded file URL
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      const imagePath = `/Experiences/${fileName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      
      onChange(imagePath);
      setIsUploading(false);
      toast.success("Image ajoutée avec succès");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = () => {
    onChange("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>Image de l'expérience</Label>
      
      {value ? (
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => {
                toast.error("Erreur lors du chargement de l'image");
              }}
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={clearImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="text-sm"
            />
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver 
              ? 'border-terre-cuite bg-terre-cuite/5' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-terre-cuite border-t-transparent rounded-full animate-spin" />
              ) : (
                <ImageIcon className="w-6 h-6 text-gray-400" />
              )}
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isUploading ? 'Upload en cours...' : 'Glissez-déposez une image ici'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ou cliquez pour sélectionner un fichier
              </p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Sélectionner une image
            </Button>
          </div>
        </div>
      )}
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Formats acceptés : JPG, PNG, WEBP. Taille maximale : 5MB. 
          L'image sera automatiquement redimensionnée pour l'affichage.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ImageUpload;
