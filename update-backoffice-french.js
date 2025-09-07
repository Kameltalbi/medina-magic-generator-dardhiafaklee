// Script to replace all translation calls with French text in back-office components
const fs = require('fs');
const path = require('path');

const backofficeDir = './src/components/backoffice';
const backofficeFiles = [
  'Dashboard.tsx',
  'Sales.tsx', 
  'Analytics.tsx',
  'SEO.tsx',
  'ContentManagement.tsx',
  'UserManagement.tsx',
  'Settings.tsx'
];

// French translations mapping
const translations = {
  // Dashboard
  't("backoffice.dashboard.title")': '"Tableau de bord"',
  't("backoffice.dashboard.subtitle")': '"Vue d\'ensemble de vos performances commerciales"',
  't("backoffice.dashboard.export")': '"Exporter"',
  't("backoffice.dashboard.refresh")': '"Actualiser"',
  't("backoffice.dashboard.vsLastMonth")': '"vs mois dernier"',
  't("backoffice.dashboard.revenueSales")': '"Revenus & Ventes"',
  't("backoffice.dashboard.trafficSources")': '"Sources de trafic"',
  't("backoffice.dashboard.topPages")': '"Pages populaires"',
  't("backoffice.dashboard.topCampaigns")': '"Top Campagnes"',
  't("backoffice.dashboard.bounceRate")': '"Taux de rebond"',
  't("backoffice.dashboard.visits")': '"visites"',
  't("backoffice.dashboard.sessions")': '"Sessions"',
  't("backoffice.dashboard.conversions")': '"Conversions"',
  't("backoffice.dashboard.conversionRate")': '"Taux de conv."',
  't("backoffice.dashboard.chartPlaceholder")': '"Le graphique sera affiché ici"',
  
  // Sales
  't("backoffice.sales.title")': '"Gestion des Ventes"',
  't("backoffice.sales.subtitle")': '"Suivez et gérez vos performances de vente"',
  't("backoffice.sales.export")': '"Exporter"',
  't("backoffice.sales.refresh")': '"Actualiser"',
  't("backoffice.sales.filters")': '"Filtres"',
  't("backoffice.sales.searchPlaceholder")': '"Rechercher commandes, clients..."',
  't("backoffice.sales.allStatuses")': '"Tous les statuts"',
  't("backoffice.sales.paid")': '"Payé"',
  't("backoffice.sales.failed")': '"Échoué"',
  't("backoffice.sales.refunded")': '"Remboursé"',
  't("backoffice.sales.ordersTable")': '"Commandes"',
  't("backoffice.sales.orderId")': '"ID Commande"',
  't("backoffice.sales.date")': '"Date"',
  't("backoffice.sales.status")': '"Statut"',
  't("backoffice.sales.amount")': '"Montant"',
  't("backoffice.sales.source")': '"Source"',
  't("backoffice.sales.campaign")': '"Campagne"',
  't("backoffice.sales.product")': '"Produit"',
  't("backoffice.sales.customer")': '"Client"',
  't("backoffice.sales.actions")': '"Actions"',
  't("backoffice.sales.viewDetails")': '"Voir détails"',
  't("backoffice.sales.edit")': '"Modifier"',
  't("backoffice.sales.refund")': '"Rembourser"',
  
  // Analytics
  't("backoffice.analytics.title")': '"Analytics Trafic"',
  't("backoffice.analytics.subtitle")': '"Analysez votre trafic web et comportement utilisateur"',
  't("backoffice.analytics.export")': '"Exporter"',
  't("backoffice.analytics.refresh")': '"Actualiser"',
  't("backoffice.analytics.filters")': '"Filtres"',
  't("backoffice.analytics.allDevices")': '"Tous les appareils"',
  't("backoffice.analytics.desktop")': '"Ordinateur"',
  't("backoffice.analytics.mobile")': '"Mobile"',
  't("backoffice.analytics.tablet")': '"Tablette"',
  't("backoffice.analytics.allCountries")': '"Tous les pays"',
  't("backoffice.analytics.france")': '"France"',
  't("backoffice.analytics.tunisia")': '"Tunisie"',
  't("backoffice.analytics.germany")': '"Allemagne"',
  't("backoffice.analytics.trafficSources")': '"Sources de trafic"',
  't("backoffice.analytics.deviceBreakdown")': '"Répartition par appareil"',
  't("backoffice.analytics.conversionFunnel")': '"Entonnoir de conversion"',
  't("backoffice.analytics.topPages")': '"Pages populaires"',
  't("backoffice.analytics.topCountries")': '"Top Pays"',
  't("backoffice.analytics.avgTime")': '"Temps moyen"',
  't("backoffice.analytics.bounceRate")': '"Taux de rebond"',
  
  // SEO
  't("backoffice.seo.title")': '"Gestion SEO"',
  't("backoffice.seo.subtitle")': '"Optimisez votre site pour les moteurs de recherche"',
  't("backoffice.seo.exportSitemap")': '"Exporter Sitemap"',
  't("backoffice.seo.saveChanges")': '"Sauvegarder"',
  't("backoffice.seo.scores.performance")': '"Performance"',
  't("backoffice.seo.scores.accessibility")': '"Accessibilité"',
  't("backoffice.seo.scores.bestPractices")': '"Bonnes pratiques"',
  't("backoffice.seo.scores.seo")': '"SEO"',
  't("backoffice.seo.scores.outOf100")': '"sur 100"',
  
  // Content
  't("backoffice.content.title")': '"Gestion de Contenu"',
  't("backoffice.content.subtitle")': '"Gérez votre contenu, tarifs et promotions"',
  't("backoffice.content.export")': '"Exporter"',
  't("backoffice.content.refresh")': '"Actualiser"',
  
  // Users
  't("backoffice.users.title")': '"Gestion des Utilisateurs"',
  't("backoffice.users.subtitle")': '"Gérez les utilisateurs, rôles et permissions"',
  't("backoffice.users.export")': '"Exporter"',
  't("backoffice.users.addUser")': '"Ajouter Utilisateur"',
  't("backoffice.users.filters")': '"Filtres"',
  't("backoffice.users.searchPlaceholder")': '"Rechercher utilisateurs..."',
  't("backoffice.users.allRoles")': '"Tous les rôles"',
  't("backoffice.users.superadmin")': '"Super Admin"',
  't("backoffice.users.admin")': '"Admin"',
  't("backoffice.users.usersTable")': '"Utilisateurs"',
  't("backoffice.users.user")': '"Utilisateur"',
  't("backoffice.users.role")': '"Rôle"',
  't("backoffice.users.status")': '"Statut"',
  't("backoffice.users.lastLogin")': '"Dernière connexion"',
  't("backoffice.users.permissions")': '"Permissions"',
  't("backoffice.users.actions")': '"Actions"',
  't("backoffice.users.activityLog")': '"Journal d\'activité"',
  
  // Settings
  't("backoffice.settings.title")': '"Paramètres"',
  't("backoffice.settings.subtitle")': '"Configurez les paramètres globaux de l\'application"',
  't("backoffice.settings.reset")': '"Réinitialiser"',
  't("backoffice.settings.save")': '"Sauvegarder"',
  't("backoffice.settings.unsavedChanges")': '"Vous avez des modifications non sauvegardées"',
};

// Function to replace translations in a file
function replaceTranslations(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove useTranslation import
  content = content.replace(/import { useTranslation } from "react-i18next";\n/g, '');
  content = content.replace(/const { t } = useTranslation\(\);\n/g, '');
  
  // Replace all translation calls
  Object.entries(translations).forEach(([key, value]) => {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, value);
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

// Process all back-office files
backofficeFiles.forEach(file => {
  const filePath = path.join(backofficeDir, file);
  if (fs.existsSync(filePath)) {
    replaceTranslations(filePath);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Back-office files updated with French text!');
