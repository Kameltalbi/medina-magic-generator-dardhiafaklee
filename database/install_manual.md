# Installation Manuelle MySQL

## Option 1 : Avec Mot de Passe

```bash
# Créer la base de données
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS dardhiafa_klee CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Importer le schéma
mysql -u root -p dardhiafa_klee < database/create_database.sql
```

## Option 2 : Sans Mot de Passe (si configuré)

```bash
# Créer la base de données
mysql -u root -e "CREATE DATABASE IF NOT EXISTS dardhiafa_klee CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Importer le schéma
mysql -u root dardhiafa_klee < database/create_database.sql
```

## Option 3 : Script Automatique

```bash
# Exécuter le script d'installation
./database/install.sh
```

## Vérification

```bash
# Se connecter à MySQL
mysql -u root -p dardhiafa_klee

# Vérifier les tables
SHOW TABLES;

# Devrait afficher 14 tables :
# - activity_log
# - content
# - experiences
# - gallery
# - reservation_requests
# - reservations
# - role_permissions
# - roles
# - room_pricing
# - rooms
# - sessions
# - settings
# - transactions
# - users
```

## Mettre à Jour le Mot de Passe Utilisateur

⚠️ **Important** : Le mot de passe dans le script est un placeholder.

```sql
-- Générer un hash bcrypt pour "2025DarDK!@"
-- Utiliser : https://bcrypt-generator.com/ ou un script

-- Mettre à jour le mot de passe
UPDATE users 
SET password_hash = '$2b$10$VOTRE_HASH_BCRYPT_ICI' 
WHERE email = 'contact@dardhiafaklee.com';
```

