# Installation MySQL - Dar Dhiafa Klee

## 🚀 Installation Rapide

### Étape 1 : Installer MySQL

```bash
# Mettre à jour les paquets
sudo apt update

# Installer MySQL Server
sudo apt install mysql-server -y

# Vérifier l'installation
sudo systemctl status mysql
```

### Étape 2 : Sécuriser MySQL

```bash
# Lancer le script de sécurisation
sudo mysql_secure_installation

# Réponses recommandées :
# - Valider le mot de passe ? Oui
# - Définir un mot de passe root fort
# - Supprimer utilisateurs anonymes ? Oui
# - Désactiver connexion root à distance ? Oui
# - Supprimer base de test ? Oui
# - Recharger privilèges ? Oui
```

### Étape 3 : Créer la Base de Données

```bash
# Se connecter à MySQL
sudo mysql -u root -p

# Dans MySQL, exécuter :
```

```sql
-- Créer la base de données
CREATE DATABASE dardhiafa_klee 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Créer un utilisateur dédié
CREATE USER 'dardhiafa_user'@'localhost' 
IDENTIFIED BY 'VotreMotDePasseSecurise123!';

-- Donner tous les privilèges
GRANT ALL PRIVILEGES ON dardhiafa_klee.* 
TO 'dardhiafa_user'@'localhost';

-- Appliquer les changements
FLUSH PRIVILEGES;

-- Vérifier
SHOW DATABASES;
EXIT;
```

### Étape 4 : Importer le Schéma

```bash
# Depuis le répertoire du projet
cd /var/www/DarDhiafaKlee

# Importer le script SQL
mysql -u dardhiafa_user -p dardhiafa_klee < database/create_database.sql

# Ou depuis MySQL
mysql -u root -p
USE dardhiafa_klee;
source /var/www/DarDhiafaKlee/database/create_database.sql;
```

### Étape 5 : Vérifier l'Installation

```bash
# Se connecter avec l'utilisateur créé
mysql -u dardhiafa_user -p dardhiafa_klee

# Vérifier les tables
SHOW TABLES;

# Vérifier les rôles
SELECT * FROM roles;

# Vérifier l'utilisateur par défaut
SELECT id, name, email, role_id, status FROM users;
```

---

## 🔐 Configuration du Mot de Passe Utilisateur

⚠️ **Important** : Le mot de passe dans le script SQL est un placeholder.  
Vous devez le remplacer par un hash bcrypt réel.

### Générer un Hash Bcrypt

**Option 1 : Node.js**
```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('2025DarDK!@', 10).then(h => console.log(h));"
```

**Option 2 : PHP**
```php
<?php
echo password_hash('2025DarDK!@', PASSWORD_BCRYPT);
?>
```

**Option 3 : En ligne**
- https://bcrypt-generator.com/
- Entrer : `2025DarDK!@`
- Rounds : `10`
- Copier le hash généré

### Mettre à Jour le Mot de Passe

```sql
-- Remplacer PLACEHOLDER_HASH_ICI par le hash réel
UPDATE users 
SET password_hash = '$2b$10$VOTRE_HASH_BCRYPT_ICI' 
WHERE email = 'contact@dardhiafaklee.com';
```

---

## 🛠️ Installation de phpMyAdmin (Optionnel mais Recommandé)

```bash
# Installer phpMyAdmin
sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl -y

# Pendant l'installation :
# - Serveur web : apache2 (ou nginx)
# - Configurer avec dbconfig-common ? Oui
# - Mot de passe pour phpMyAdmin

# Activer l'extension mbstring
sudo phpenmod mbstring

# Redémarrer Apache
sudo systemctl restart apache2

# Accéder à phpMyAdmin
# http://votre-serveur/phpmyadmin
```

---

## 📊 Vérification Finale

```sql
-- Vérifier toutes les tables
SHOW TABLES;

-- Vérifier les rôles
SELECT * FROM roles;

-- Vérifier les permissions
SELECT r.name, rp.permission 
FROM roles r 
LEFT JOIN role_permissions rp ON r.id = rp.role_id 
ORDER BY r.name, rp.permission;

-- Vérifier l'utilisateur
SELECT id, name, email, role_id, status, created_at 
FROM users;

-- Vérifier les paramètres
SELECT key_name, value, category 
FROM settings;
```

---

## 🔧 Commandes Utiles

```bash
# Démarrer MySQL
sudo systemctl start mysql

# Arrêter MySQL
sudo systemctl stop mysql

# Redémarrer MySQL
sudo systemctl restart mysql

# Vérifier le statut
sudo systemctl status mysql

# Se connecter
mysql -u dardhiafa_user -p dardhiafa_klee

# Sauvegarder la base
mysqldump -u dardhiafa_user -p dardhiafa_klee > backup_$(date +%Y%m%d).sql

# Restaurer la base
mysql -u dardhiafa_user -p dardhiafa_klee < backup_20240115.sql
```

---

## ✅ Checklist d'Installation

- [ ] MySQL installé et démarré
- [ ] MySQL sécurisé (mysql_secure_installation)
- [ ] Base de données `dardhiafa_klee` créée
- [ ] Utilisateur `dardhiafa_user` créé avec privilèges
- [ ] Script SQL importé (14 tables créées)
- [ ] Rôles système créés (superadmin, admin)
- [ ] Permissions configurées
- [ ] Utilisateur par défaut créé
- [ ] Mot de passe utilisateur hashé (bcrypt)
- [ ] Paramètres par défaut insérés
- [ ] phpMyAdmin installé (optionnel)
- [ ] Vérification des tables réussie

---

## 🆘 Dépannage

### Erreur : "Access denied"
```bash
# Réinitialiser le mot de passe root
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nouveau_mot_de_passe';
FLUSH PRIVILEGES;
EXIT;
```

### Erreur : "Table already exists"
```sql
-- Supprimer toutes les tables (ATTENTION : supprime les données)
DROP DATABASE dardhiafa_klee;
CREATE DATABASE dardhiafa_klee CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dardhiafa_klee;
source /var/www/DarDhiafaKlee/database/create_database.sql;
```

### Vérifier la version MySQL
```bash
mysql --version
# Doit être MySQL 8.0+ ou MariaDB 10.6+ pour support JSON
```

---

## 📚 Ressources

- Documentation MySQL : https://dev.mysql.com/doc/
- phpMyAdmin : https://www.phpmyadmin.net/
- MySQL Workbench : https://dev.mysql.com/downloads/workbench/

