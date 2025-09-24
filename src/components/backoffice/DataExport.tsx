import { useState } from "react";
import { Download, Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface DataExportProps {
  experiences: any[];
  onImport: (experiences: any[]) => void;
}

const DataExport = ({ experiences, onImport }: DataExportProps) => {
  const [isImporting, setIsImporting] = useState(false);

  const exportToCSV = () => {
    if (experiences.length === 0) {
      toast.error("Aucune expérience à exporter");
      return;
    }

    const headers = [
      'ID', 'Catégorie', 'Nom (FR)', 'Nom (EN)', 'Nom (AR)',
      'Description (FR)', 'Description (EN)', 'Description (AR)',
      'Durée', 'Prix', 'Max Participants', 'Note', 'Avis',
      'Image', 'Points Forts', 'Inclus', 'Actif'
    ];

    const csvData = experiences.map(exp => [
      exp.id,
      exp.category,
      exp.name.fr,
      exp.name.en,
      exp.name.ar,
      exp.description.fr,
      exp.description.en,
      exp.description.ar,
      exp.duration,
      exp.price,
      exp.maxGuests,
      exp.rating,
      exp.reviews,
      exp.image,
      exp.highlights.map((h: any) => h.fr).join('; '),
      exp.included.map((i: any) => i.fr).join('; '),
      exp.isActive ? 'Oui' : 'Non'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `experiences-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Export CSV réussi");
  };

  const exportToJSON = () => {
    if (experiences.length === 0) {
      toast.error("Aucune expérience à exporter");
      return;
    }

    const jsonData = JSON.stringify(experiences, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `experiences-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Export JSON réussi");
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedData;

        if (file.type === 'application/json') {
          importedData = JSON.parse(content);
        } else if (file.type === 'text/csv') {
          // Simple CSV parsing (for demo purposes)
          const lines = content.split('\n');
          const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
          importedData = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, ''));
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = values[index];
            });
            return obj;
          });
        } else {
          throw new Error('Format de fichier non supporté');
        }

        if (Array.isArray(importedData)) {
          onImport(importedData);
          toast.success(`${importedData.length} expériences importées avec succès`);
        } else {
          throw new Error('Format de données invalide');
        }
      } catch (error) {
        console.error('Import error:', error);
        toast.error("Erreur lors de l'importation du fichier");
      } finally {
        setIsImporting(false);
        // Reset file input
        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  const resetToDefault = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes les expériences aux valeurs par défaut ? Cette action supprimera toutes les modifications.")) {
      const defaultExperiences = [
        {
          id: 1,
          category: "culture",
          name: {
            fr: "Grande Mosquée de Kairouan (Okba Ibn Nafi)",
            en: "Great Mosque of Kairouan (Okba Ibn Nafi)",
            ar: "الجامع الكبير بالقيروان (عقبة بن نافع)"
          },
          description: {
            fr: "Plongez dans l'histoire de l'une des plus anciennes mosquées du monde musulman.",
            en: "Immerse yourself in the history of one of the oldest mosques in the Muslim world.",
            ar: "انغمس في تاريخ أحد أقدم المساجد في العالم الإسلامي."
          },
          duration: "2h",
          price: 35,
          maxGuests: 15,
          rating: 4.9,
          reviews: 287,
          image: "/Experiences/grande mosquee de kairouan.webp",
          highlights: [
            { fr: "Architecture islamique millénaire", en: "Millennial Islamic architecture", ar: "العمارة الإسلامية الألفية" },
            { fr: "Colonnes antiques de Carthage", en: "Ancient Carthage columns", ar: "أعمدة قرطاج القديمة" }
          ],
          included: [
            { fr: "Guide expert certifié", en: "Certified expert guide", ar: "مرشد خبير معتمد" },
            { fr: "Entrée incluse", en: "Entrance included", ar: "الدخول مشمول" }
          ],
          isActive: true
        }
      ];
      onImport(defaultExperiences);
      toast.success("Expériences réinitialisées aux valeurs par défaut");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Import/Export des données
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Sauvegardez vos données régulièrement. Les exports incluent toutes les informations des expériences.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export Section */}
          <div className="space-y-3">
            <h4 className="font-semibold text-indigo-medina">Exporter les données</h4>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={exportToCSV}
                disabled={experiences.length === 0}
                className="justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter en CSV
              </Button>
              <Button
                variant="outline"
                onClick={exportToJSON}
                disabled={experiences.length === 0}
                className="justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter en JSON
              </Button>
            </div>
          </div>

          {/* Import Section */}
          <div className="space-y-3">
            <h4 className="font-semibold text-indigo-medina">Importer des données</h4>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isImporting}
                />
                <Button
                  variant="outline"
                  disabled={isImporting}
                  className="w-full justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isImporting ? 'Import en cours...' : 'Importer un fichier'}
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={resetToDefault}
                className="justify-start text-orange-600 hover:text-orange-700"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Réinitialiser aux valeurs par défaut
              </Button>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p><strong>Formats supportés :</strong> CSV, JSON</p>
          <p><strong>Note :</strong> L'import remplacera toutes les expériences existantes.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataExport;
