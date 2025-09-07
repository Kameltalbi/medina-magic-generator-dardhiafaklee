// Content management page for pricing, images, and promotions
// Uses existing design tokens and responsive layout

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Image, 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Eye,
  Star,
  Calendar
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
import { Switch } from "@/components/ui/switch";

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState("pricing");

  // Mock pricing data
  const pricingData = [
    {
      id: "traditional",
      name: "Traditional Room",
      basePrice: 120,
      currency: "EUR",
      minNights: 1,
      maxNights: 30,
      isActive: true,
      lastModified: "2024-01-15",
    },
    {
      id: "suite",
      name: "Suite",
      basePrice: 180,
      currency: "EUR",
      minNights: 2,
      maxNights: 30,
      isActive: true,
      lastModified: "2024-01-15",
    },
    {
      id: "deluxe",
      name: "Deluxe Suite",
      basePrice: 220,
      currency: "EUR",
      minNights: 2,
      maxNights: 30,
      isActive: true,
      lastModified: "2024-01-15",
    },
  ];

  // Mock images data
  const imagesData = [
    {
      id: "1",
      name: "hero-dar-dhiafa.jpg",
      url: "/assets/hero-dar-dhiafa.jpg",
      alt: "Dar Dhiafa Klee exterior",
      category: "Exterior",
      isFeatured: true,
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploaded: "2024-01-10",
    },
    {
      id: "2",
      name: "room-deluxe.jpg",
      url: "/assets/room-deluxe.jpg",
      alt: "Deluxe Suite interior",
      category: "Rooms",
      isFeatured: false,
      size: "1.8 MB",
      dimensions: "1920x1080",
      uploaded: "2024-01-12",
    },
    {
      id: "3",
      name: "room-suite.jpg",
      url: "/assets/room-suite.jpg",
      alt: "Suite interior",
      category: "Rooms",
      isFeatured: false,
      size: "1.6 MB",
      dimensions: "1920x1080",
      uploaded: "2024-01-12",
    },
  ];

  // Mock promotions data
  const promotionsData = [
    {
      id: "1",
      name: "Summer Special",
      type: "percentage",
      value: 20,
      description: "20% off all bookings in July and August",
      startDate: "2024-07-01",
      endDate: "2024-08-31",
      isActive: true,
      applicableRooms: ["traditional", "suite", "deluxe"],
      minNights: 2,
    },
    {
      id: "2",
      name: "Early Bird",
      type: "fixed",
      value: 50,
      description: "€50 off bookings made 30+ days in advance",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      isActive: true,
      applicableRooms: ["suite", "deluxe"],
      minNights: 3,
    },
  ];

  const getPromotionTypeIcon = (type: string) => {
    return type === "percentage" ? "%" : "€";
  };

  const getPromotionTypeColor = (type: string) => {
    return type === "percentage" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina">
            {"Gestion de Contenu"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Gérez votre contenu, tarifs et promotions"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            {"Exporter"}
          </Button>
          <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
            {"Actualiser"}
          </Button>
        </div>
      </div>

      {/* Content Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pricing">{t("backoffice.content.tabs.pricing")}</TabsTrigger>
          <TabsTrigger value="images">{t("backoffice.content.tabs.images")}</TabsTrigger>
          <TabsTrigger value="promotions">{t("backoffice.content.tabs.promotions")}</TabsTrigger>
        </TabsList>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t("backoffice.content.pricing.title")}</CardTitle>
                <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("backoffice.content.pricing.addPrice")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("backoffice.content.pricing.roomType")}</TableHead>
                    <TableHead>{t("backoffice.content.pricing.basePrice")}</TableHead>
                    <TableHead>{t("backoffice.content.pricing.minNights")}</TableHead>
                    <TableHead>{t("backoffice.content.pricing.maxNights")}</TableHead>
                    <TableHead>{t("backoffice.content.pricing.status")}</TableHead>
                    <TableHead>{t("backoffice.content.pricing.lastModified")}</TableHead>
                    <TableHead className="text-right">{t("backoffice.content.pricing.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingData.map((price) => (
                    <TableRow key={price.id}>
                      <TableCell className="font-medium">{price.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>{price.basePrice}</span>
                          <span className="text-muted-foreground">{price.currency}</span>
                        </div>
                      </TableCell>
                      <TableCell>{price.minNights}</TableCell>
                      <TableCell>{price.maxNights}</TableCell>
                      <TableCell>
                        <Badge variant={price.isActive ? "default" : "secondary"}>
                          {price.isActive ? t("backoffice.content.pricing.active") : t("backoffice.content.pricing.inactive")}
                        </Badge>
                      </TableCell>
                      <TableCell>{price.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
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
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t("backoffice.content.images.title")}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    {t("backoffice.content.images.upload")}
                  </Button>
                  <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                    <Plus className="w-4 h-4 mr-2" />
                    {t("backoffice.content.images.addImage")}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {imagesData.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      {image.isFeatured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-terre-cuite">
                            <Star className="w-3 h-3 mr-1" />
                            {t("backoffice.content.images.featured")}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-medium truncate">{image.name}</h3>
                        <p className="text-sm text-muted-foreground">{image.alt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{image.category}</span>
                          <span>{image.dimensions}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{image.size}</span>
                          <span>{image.uploaded}</span>
                        </div>
                        <div className="flex items-center justify-end space-x-2 pt-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t("backoffice.content.promotions.title")}</CardTitle>
                <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("backoffice.content.promotions.addPromotion")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotionsData.map((promotion) => (
                  <Card key={promotion.id} className="border-l-4 border-l-terre-cuite">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold">{promotion.name}</h3>
                            <Badge className={getPromotionTypeColor(promotion.type)}>
                              {getPromotionTypeIcon(promotion.type)}{promotion.value}
                            </Badge>
                            <Badge variant={promotion.isActive ? "default" : "secondary"}>
                              {promotion.isActive ? t("backoffice.content.promotions.active") : t("backoffice.content.promotions.inactive")}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{promotion.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{promotion.startDate} - {promotion.endDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Tag className="w-4 h-4" />
                              <span>{promotion.applicableRooms.length} {t("backoffice.content.promotions.rooms")}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{promotion.minNights} {t("backoffice.content.promotions.minNights")}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
