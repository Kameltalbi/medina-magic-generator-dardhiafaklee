# Routes API - Dar Dhiafa Klee

## 🔐 Authentification

### POST /api/auth/login
Connexion utilisateur

**Body:**
```json
{
  "email": "contact@dardhiafaklee.com",
  "password": "2025DarDK!@"
}
```

**Réponse:**
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

### GET /api/auth/verify
Vérifier le token (nécessite Authorization header)

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Réponse:**
```json
{
  "user": {
    "id": "1",
    "name": "Administrateur",
    "email": "contact@dardhiafaklee.com",
    "role": "superadmin",
    "permissions": ["*"]
  }
}
```

## 📊 Health Check

### GET /api/health
Vérifier l'état du serveur

**Réponse:**
```json
{
  "status": "OK",
  "message": "API Dar Dhiafa Klee",
  "timestamp": "2025-11-09T19:54:45.537Z"
}
```

## 🚧 Routes à créer

- `/api/users` - Gestion des utilisateurs
- `/api/roles` - Gestion des rôles et permissions
- `/api/reservations` - Gestion des réservations
- `/api/reservation-requests` - Demandes de disponibilité
- `/api/transactions` - Transactions de vente
- `/api/rooms` - Gestion des chambres
- `/api/gallery` - Galerie d'images
- `/api/content` - Contenu du site

