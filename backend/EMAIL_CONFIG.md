# Configuration Email - Envoi des formulaires de contact

## 📧 Configuration

Les messages de contact sont automatiquement envoyés à **allanimehdi91@gmail.com** lorsqu'un utilisateur remplit le formulaire de contact.

## ⚙️ Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env` du backend :

```env
# Configuration SMTP pour l'envoi d'emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
SMTP_FROM=noreply@dardhiafaklee.com
```

## 🔐 Configuration Gmail

### Option 1 : Mot de passe d'application (Recommandé)

1. Activez la validation en 2 étapes sur votre compte Gmail
2. Allez dans [Paramètres Google Account](https://myaccount.google.com/)
3. Sécurité → Validation en 2 étapes → Mots de passe des applications
4. Créez un mot de passe d'application pour "Mail"
5. Utilisez ce mot de passe dans `SMTP_PASSWORD`

### Option 2 : Autres services SMTP

Vous pouvez utiliser d'autres services :
- **SendGrid** : `smtp.sendgrid.net` (port 587)
- **Mailgun** : `smtp.mailgun.org` (port 587)
- **Outlook/Hotmail** : `smtp-mail.outlook.com` (port 587)
- **Yahoo** : `smtp.mail.yahoo.com` (port 587)

## 📦 Installation

```bash
cd backend
npm install
```

## ✅ Test

Une fois configuré, testez en envoyant un formulaire de contact depuis le site web. Vous devriez recevoir un email à **allanimehdi91@gmail.com** avec les détails du message.

## 📝 Format de l'email

L'email reçu contient :
- Nom complet du contact
- Email du contact
- Téléphone (si fourni)
- Message complet
- Date et heure d'envoi

## ⚠️ Notes importantes

- Si l'envoi d'email échoue, le message est quand même enregistré dans la base de données
- Les erreurs d'envoi d'email sont loggées dans la console mais n'empêchent pas la réponse de succès à l'utilisateur
- Assurez-vous que les variables d'environnement sont correctement configurées avant de déployer en production

