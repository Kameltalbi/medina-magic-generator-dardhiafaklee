#!/bin/bash

# Script d'installation MySQL pour Dar Dhiafa Klee
# Usage: ./database/install.sh

echo "=========================================="
echo "Installation MySQL - Dar Dhiafa Klee"
echo "=========================================="
echo ""

# Vérifier si MySQL est installé
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL n'est pas installé."
    echo "Installation avec Homebrew..."
    brew install mysql
    brew services start mysql
    echo "✅ MySQL installé et démarré"
    echo ""
fi

# Demander le mot de passe root
echo "Entrez le mot de passe MySQL root (laissez vide si pas de mot de passe):"
read -s MYSQL_PASSWORD

if [ -z "$MYSQL_PASSWORD" ]; then
    MYSQL_CMD="mysql -u root"
else
    MYSQL_CMD="mysql -u root -p$MYSQL_PASSWORD"
fi

echo ""
echo "Création de la base de données..."

# Créer la base de données
$MYSQL_CMD <<EOF
CREATE DATABASE IF NOT EXISTS dardhiafa_klee 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Base de données créée"
else
    echo "❌ Erreur lors de la création de la base de données"
    exit 1
fi

echo "Import du schéma SQL..."

# Importer le script SQL
if [ -z "$MYSQL_PASSWORD" ]; then
    mysql -u root dardhiafa_klee < database/create_database.sql
else
    mysql -u root -p$MYSQL_PASSWORD dardhiafa_klee < database/create_database.sql
fi

if [ $? -eq 0 ]; then
    echo "✅ Tables créées avec succès"
    echo ""
    echo "Vérification..."
    
    # Vérifier les tables
    if [ -z "$MYSQL_PASSWORD" ]; then
        TABLES=$(mysql -u root dardhiafa_klee -e "SHOW TABLES;" | wc -l)
    else
        TABLES=$(mysql -u root -p$MYSQL_PASSWORD dardhiafa_klee -e "SHOW TABLES;" | wc -l)
    fi
    
    echo "✅ Nombre de tables créées: $((TABLES - 1))"
    echo ""
    echo "=========================================="
    echo "✅ Installation terminée avec succès!"
    echo "=========================================="
    echo ""
    echo "Base de données: dardhiafa_klee"
    echo "Tables créées: 14"
    echo ""
    echo "⚠️  IMPORTANT: N'oubliez pas de mettre à jour le mot de passe"
    echo "   de l'utilisateur dans la table 'users' avec un hash bcrypt réel"
    echo ""
else
    echo "❌ Erreur lors de l'import du schéma"
    exit 1
fi

