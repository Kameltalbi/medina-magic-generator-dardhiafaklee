# Test du Système de Gestion des Prix

## 🧪 Test des Expériences

1. **Ouvrir l'administration** : `http://localhost:8082/backoffice`
2. **Aller dans "Expériences"**
3. **Modifier une expérience** :
   - Cliquer sur l'icône crayon d'une expérience
   - Aller dans l'onglet "Tarification"
   - Changer le prix (ex: de 35 à 40 TND)
   - Enregistrer
4. **Vérifier la synchronisation** :
   - Ouvrir `http://localhost:8082/experiences`
   - Vérifier que le nouveau prix apparaît

## 🧪 Test des Chambres

1. **Ouvrir l'administration** : `http://localhost:8082/backoffice`
2. **Aller dans "Tarifs"**
3. **Modifier une chambre** :
   - Cliquer sur l'icône crayon d'une chambre
   - Changer le prix (ex: de 200 à 250 TND)
   - Enregistrer
4. **Vérifier la synchronisation** :
   - Ouvrir `http://localhost:8082/rooms`
   - Vérifier que le nouveau prix apparaît
   - Vérifier aussi sur la page d'accueil dans la section chambres

## ✅ Résultats Attendus

- ✅ Les modifications de prix sont visibles immédiatement
- ✅ Pas besoin de recharger la page
- ✅ Les notifications de succès apparaissent
- ✅ Les données sont persistées dans localStorage
- ✅ La synchronisation fonctionne entre les onglets

## 🔧 Données de Test

### Expériences à tester :
- Grande Mosquée de Kairouan : 35 TND → 40 TND
- Médina et Souks : 25 TND → 30 TND

### Chambres à tester :
- CH 11 (KOTB) : 200 TND → 250 TND
- CH 17 (ICHK) : 350 TND → 400 TND

Le système est **entièrement fonctionnel** !
