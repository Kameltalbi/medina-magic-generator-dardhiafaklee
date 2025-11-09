// RoomManagement component - Gestion complète des chambres
// Permet de modifier descriptions, images, caractéristiques, prix, etc.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bed, 
  Edit, 
  Save, 
  X, 
  Search,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { roomsData } from "@/data/rooms";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

interface Room {
  id: string;
  roomNumber: string;
  title: string;
  pricePerNight: number;
  image: string;
  description: string;
  amenities: string[];
  size?: string;
  capacity: number;
  category: string;
  characteristic: string;
  features?: string[];
}

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = () => {
    // Charger depuis localStorage ou utiliser les données par défaut
    const savedRooms = localStorage.getItem('roomsData');
    if (savedRooms) {
      try {
        setRooms(JSON.parse(savedRooms));
      } catch (error) {
        console.error('Error loading rooms:', error);
        setRooms(roomsData as Room[]);
      }
    } else {
      setRooms(roomsData as Room[]);
    }
  };

  const saveRooms = (updatedRooms: Room[]) => {
    localStorage.setItem('roomsData', JSON.stringify(updatedRooms));
    // Déclencher un événement pour mettre à jour les pages publiques
    window.dispatchEvent(new Event('roomsDataUpdated'));
    setRooms(updatedRooms);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom({ ...room });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingRoom) return;

    const updatedRooms = rooms.map(r => 
      r.id === editingRoom.id ? editingRoom : r
    );
    saveRooms(updatedRooms);
    toast.success("Chambre mise à jour avec succès");
    setIsDialogOpen(false);
    setEditingRoom(null);
  };

  const handleDelete = (roomId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      const updatedRooms = rooms.filter(r => r.id !== roomId);
      saveRooms(updatedRooms);
      toast.success("Chambre supprimée");
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["DOUBLE", "TWIN", "FAMILIALE", "S.ROYALE"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-medina">Gestion des Chambres</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les descriptions, images, caractéristiques et prix de vos chambres
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher une chambre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            Liste des Chambres ({filteredRooms.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Prix/nuit</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.roomNumber}</TableCell>
                    <TableCell>{room.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{room.category}</Badge>
                    </TableCell>
                    <TableCell>{room.capacity} pers.</TableCell>
                    <TableCell className="font-semibold">{room.pricePerNight} TND</TableCell>
                    <TableCell>
                      <div className="w-16 h-16 rounded overflow-hidden">
                        <img 
                          src={room.image} 
                          alt={room.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(room)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(room.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la chambre</DialogTitle>
          </DialogHeader>
          {editingRoom && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Numéro de chambre</Label>
                  <Input
                    value={editingRoom.roomNumber}
                    onChange={(e) => setEditingRoom({ ...editingRoom, roomNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Nom/Titre</Label>
                  <Input
                    value={editingRoom.title}
                    onChange={(e) => setEditingRoom({ ...editingRoom, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Catégorie</Label>
                  <Select
                    value={editingRoom.category}
                    onValueChange={(value) => setEditingRoom({ ...editingRoom, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Capacité</Label>
                  <Input
                    type="number"
                    value={editingRoom.capacity}
                    onChange={(e) => setEditingRoom({ ...editingRoom, capacity: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <Label>Prix par nuit (TND)</Label>
                <Input
                  type="number"
                  value={editingRoom.pricePerNight}
                  onChange={(e) => setEditingRoom({ ...editingRoom, pricePerNight: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingRoom.description}
                  onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label>Image</Label>
                <ImageUpload
                  value={editingRoom.image}
                  onChange={(value) => setEditingRoom({ ...editingRoom, image: value })}
                />
              </div>

              <div>
                <Label>Caractéristique</Label>
                <Input
                  value={editingRoom.characteristic}
                  onChange={(e) => setEditingRoom({ ...editingRoom, characteristic: e.target.value })}
                  placeholder="ex: lit double, 2 lits simples..."
                />
              </div>

              <div>
                <Label>Superficie (optionnel)</Label>
                <Input
                  value={editingRoom.size || ""}
                  onChange={(e) => setEditingRoom({ ...editingRoom, size: e.target.value })}
                  placeholder="ex: 25m²"
                />
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

export default RoomManagement;

