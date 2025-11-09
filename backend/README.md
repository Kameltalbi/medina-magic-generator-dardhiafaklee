# Backend API - Dar Dhiafa Klee

## 🚀 Démarrage Rapide

### Installation

```bash
cd backend
npm install
```

### Configuration

Copier `.env.example` vers `.env` et configurer :

```bash
cp .env.example .env
```

Modifier `.env` avec vos paramètres MySQL.

### Démarrer le serveur

```bash
# Mode développement (avec watch)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:3001`

## 📡 Endpoints API

### Authentification

- `POST /api/auth/login` - Connexion
- `GET /api/auth/verify` - Vérifier le token

### Health Check

- `GET /api/health` - Vérifier l'état du serveur

## 🔐 Authentification

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "contact@dardhiafaklee.com",
  "password": "2025DarDK!@"
}
```

Réponse :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "name": "Administrateur",
    "email": "contact@dardhiafaklee.com",
    "role": "superadmin",
    "permissions": ["*"]
  }
}
```

### Utiliser le token

```bash
GET /api/auth/verify
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📦 Structure

```
backend/
├── config/
│   └── database.js      # Configuration MySQL
├── middleware/
│   └── auth.js          # Middleware authentification
├── routes/
│   └── auth.js          # Routes authentification
├── server.js            # Point d'entrée
├── package.json
└── .env                 # Configuration (non commité)
```

## 🔧 Technologies

- **Express** - Framework web
- **MySQL2** - Client MySQL
- **bcrypt** - Hashage des mots de passe
- **jsonwebtoken** - Tokens JWT
- **cors** - Gestion CORS
- **dotenv** - Variables d'environnement

