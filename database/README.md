# Base de Données - Dar Dhiafa Klee

## 🎯 Recommandation : MySQL ou MariaDB

**MySQL** ou **MariaDB** sont les bases de données les plus faciles à utiliser pour ce projet.

### Pourquoi MySQL/MariaDB ?

✅ **Facile à installer** - Une seule commande sur Linux  
✅ **Facile à utiliser** - Syntaxe SQL standard  
✅ **Outils graphiques** - phpMyAdmin, MySQL Workbench  
✅ **Production-ready** - Stable et performant  
✅ **Gratuit** - Open source  
✅ **Support JSON** - Pour les champs complexes  
✅ **Bien documenté** - Grande communauté  

---

## 📦 Installation

### Sur votre serveur Linux

```bash
# Installer MySQL
sudo apt update
sudo apt install mysql-server

# Ou installer MariaDB (alternative)
sudo apt install mariadb-server

# Sécuriser l'installation
sudo mysql_secure_installation
```

### Créer la base de données

```bash
# Se connecter à MySQL
sudo mysql -u root -p

# Exécuter le script de création
source /var/www/DarDhiafaKlee/database/create_database.sql

# Ou créer manuellement
CREATE DATABASE dardhiafa_klee CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dardhiafa_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe_securise';
GRANT ALL PRIVILEGES ON dardhiafa_klee.* TO 'dardhiafa_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 🛠️ Outils de Gestion

### phpMyAdmin (Recommandé)
```bash
sudo apt install phpmyadmin
# Accessible via : http://votre-serveur/phpmyadmin
```

### MySQL Workbench (Desktop)
- Téléchargement : https://dev.mysql.com/downloads/workbench/
- Interface graphique complète

### DBeaver (Multi-base)
- Téléchargement : https://dbeaver.io/
- Supporte MySQL, PostgreSQL, SQLite, etc.

---

## 📊 Structure

Le fichier `create_database.sql` contient :
- ✅ 14 tables complètes
- ✅ Toutes les relations (Foreign Keys)
- ✅ Tous les index pour performance
- ✅ Données initiales (rôles, utilisateur par défaut)
- ✅ Charset utf8mb4 (support arabe, français, anglais)

---

## 🔐 Sécurité

⚠️ **Important** : Le mot de passe dans le script est un placeholder.  
Vous devez le remplacer par un hash bcrypt réel lors de l'installation.

Pour générer un hash bcrypt :
```javascript
// Node.js
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('2025DarDK!@', 10);
```

```php
// PHP
$hash = password_hash('2025DarDK!@', PASSWORD_BCRYPT);
```

---

## 📝 Fichiers

- `create_database.sql` - Script complet de création
- `SCHEMA_DATABASE.md` - Documentation détaillée du schéma
- `RECOMMANDATION_DATABASE.md` - Comparaison des options

