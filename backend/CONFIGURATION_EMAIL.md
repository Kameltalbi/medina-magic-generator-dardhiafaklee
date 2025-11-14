# 📧 Guide de Configuration Email - Étape par Étape

## 🎯 Objectif
Configurer l'envoi automatique d'emails à **allanimehdi91@gmail.com** quand quelqu'un remplit le formulaire de contact.

---

## 📝 Étape 1 : Ouvrir le fichier `.env`

Le fichier `.env` se trouve dans le dossier `backend/`.

```bash
cd backend
nano .env
# ou
code .env
# ou
open .env
```

---

## ⚙️ Étape 2 : Ajouter les variables SMTP

Ajoutez ces lignes à la fin de votre fichier `.env` :

```env
# Configuration SMTP pour l'envoi d'emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
SMTP_FROM=noreply@dardhiafaklee.com
```

**Remplacez :**
- `votre-email@gmail.com` → Votre adresse Gmail
- `votre-mot-de-passe-application` → Le mot de passe d'application Gmail (voir étape 3)

---

## 🔐 Étape 3 : Créer un mot de passe d'application Gmail

### Pourquoi ?
Gmail nécessite un "mot de passe d'application" pour les applications tierces (pas votre mot de passe normal).

### Comment faire :

1. **Activez la validation en 2 étapes** (si ce n'est pas déjà fait)
   - Allez sur https://myaccount.google.com/
   - Sécurité → Validation en 2 étapes → Activez-la

2. **Créez un mot de passe d'application**
   - Allez sur https://myaccount.google.com/apppasswords
   - Ou : Sécurité → Validation en 2 étapes → Mots de passe des applications
   - Sélectionnez "Mail" comme application
   - Sélectionnez "Autre (nom personnalisé)" comme appareil
   - Entrez "Dar Dhiafa Backend" comme nom
   - Cliquez sur "Générer"
   - **Copiez le mot de passe généré** (16 caractères, espaces inclus)

3. **Utilisez ce mot de passe dans `.env`**
   - Collez-le dans `SMTP_PASSWORD` (vous pouvez enlever les espaces)

---

## ✅ Étape 4 : Vérifier la configuration

Votre fichier `.env` devrait ressembler à ça :

```env
# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_db
DB_NAME=dardhiafa_klee
DB_PORT=3306

# JWT
JWT_SECRET=votre_secret
JWT_EXPIRES_IN=24h

# SMTP Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mon-email@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
SMTP_FROM=noreply@dardhiafaklee.com

# Serveur
PORT=3001
NODE_ENV=development
```

---

## 🚀 Étape 5 : Redémarrer le serveur backend

Après avoir modifié `.env`, redémarrez le serveur :

```bash
cd backend
npm run dev
```

---

## 🧪 Étape 6 : Tester

1. Allez sur votre site web
2. Remplissez le formulaire de contact
3. Envoyez le message
4. Vérifiez la boîte mail **allanimehdi91@gmail.com**
5. Vous devriez recevoir un email avec les détails du message

---

## ❌ Si ça ne fonctionne pas

### Erreur : "Invalid login"
- Vérifiez que vous utilisez un **mot de passe d'application** (pas votre mot de passe Gmail normal)
- Vérifiez que la validation en 2 étapes est activée

### Erreur : "Connection timeout"
- Vérifiez votre connexion internet
- Vérifiez que le port 587 n'est pas bloqué par un firewall

### Erreur : "Authentication failed"
- Vérifiez que `SMTP_USER` est correct
- Vérifiez que `SMTP_PASSWORD` est correct (sans espaces)
- Recréez un nouveau mot de passe d'application

### Pas d'email reçu
- Vérifiez les spams dans **allanimehdi91@gmail.com**
- Vérifiez les logs du serveur backend (console)
- Vérifiez que le message est bien enregistré en base de données

---

## 📞 Alternative : Utiliser un autre service email

Si Gmail ne fonctionne pas, vous pouvez utiliser :

### SendGrid (Gratuit jusqu'à 100 emails/jour)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=votre-api-key-sendgrid
```

### Mailgun (Gratuit jusqu'à 5000 emails/mois)
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=votre-username-mailgun
SMTP_PASSWORD=votre-password-mailgun
```

---

## ✅ C'est tout !

Une fois configuré, tous les formulaires de contact enverront automatiquement un email à **allanimehdi91@gmail.com** ! 🎉

