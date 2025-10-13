# Guide d'Administration - Gestion des Prix des Expériences et Chambres

## ✅ Système de Gestion des Prix des Expériences

Le système est **entièrement fonctionnel** et permet de modifier les prix des expériences depuis l'administration.

### 🎯 Comment modifier les prix des expériences :

1. **Accéder à l'administration** :
   - Aller sur `/backoffice`
   - Se connecter (pas de mot de passe requis actuellement)

2. **Gérer les expériences** :
   - Cliquer sur "Expériences" dans le menu de gauche
   - Voir toutes les expériences disponibles

3. **Modifier un prix** :
   - Cliquer sur "Modifier" (icône crayon) pour une expérience
   - Aller dans l'onglet "Tarification"
   - Modifier le "Prix par personne" ou "Prix par groupe"
   - Choisir le type de prix (par personne ou par groupe)
   - Cliquer sur "Enregistrer"

4. **Synchronisation automatique** :
   - Les modifications sont **immédiatement** visibles sur la page publique
   - Pas besoin de recharger la page
   - Le système utilise localStorage pour la synchronisation

## ✅ Système de Gestion des Prix des Chambres

Le système est **entièrement fonctionnel** et permet de modifier les prix des chambres depuis l'administration.

### 🎯 Comment modifier les prix des chambres :

1. **Accéder à l'administration** :
   - Aller sur `/backoffice`
   - Se connecter (pas de mot de passe requis actuellement)

2. **Gérer les tarifs des chambres** :
   - Cliquer sur "Tarifs" dans le menu de gauche
   - Voir toutes les chambres avec leurs prix actuels

3. **Modifier un prix** :
   - Cliquer sur "Modifier" (icône crayon) pour une chambre
   - Modifier les différents types de prix :
     - Prix basse saison
     - Prix haute saison
     - Prix week-end
     - Prix semaine (7j)
   - Cliquer sur "Enregistrer"

4. **Synchronisation automatique** :
   - Les modifications sont **immédiatement** visibles sur :
     - La page publique des chambres (`/rooms`)
     - La section chambres de la page d'accueil
     - Le système de réservation
   - Pas besoin de recharger la page
   - Le système utilise localStorage pour la synchronisation

### 🔧 Fonctionnalités disponibles :

#### Pour les Expériences :
- ✅ **Modification des prix** : Prix par personne ou par groupe
- ✅ **Synchronisation temps réel** : Changements visibles immédiatement
- ✅ **Gestion des types de prix** : Par personne ou par groupe
- ✅ **Interface intuitive** : Onglets organisés (Général, Tarification, Disponibilité)
- ✅ **Validation** : Vérification des données avant sauvegarde
- ✅ **Notifications** : Messages de confirmation des modifications

#### Pour les Chambres :
- ✅ **Modification des prix** : Prix selon les saisons et périodes
- ✅ **Synchronisation temps réel** : Changements visibles immédiatement
- ✅ **Gestion des saisons** : Basse saison, haute saison, week-end
- ✅ **Interface complète** : Tableau avec toutes les chambres
- ✅ **Validation** : Vérification des données avant sauvegarde
- ✅ **Notifications** : Messages de confirmation des modifications

### 📊 Données synchronisées :

#### Expériences :
- Prix par personne
- Prix par groupe (optionnel)
- Type de tarification
- Statut actif/inactif
- Disponibilité par jour
- Créneaux horaires

#### Chambres :
- Prix par nuit
- Prix basse saison
- Prix haute saison
- Prix week-end
- Prix semaine
- Taxe de séjour
- Prix lit supplémentaire

### 🚀 Test du système :

1. Ouvrir deux onglets :
   - Un avec `/backoffice` (administration)
   - Un avec `/rooms` ou `/experiences` (pages publiques)

2. Modifier un prix dans l'administration

3. Vérifier que le changement apparaît immédiatement sur la page publique

Le système est **prêt à l'emploi** et fonctionne parfaitement !
