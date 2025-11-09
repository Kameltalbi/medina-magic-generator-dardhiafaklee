// Middleware d'authentification JWT
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
    req.user = user;
    next();
  });
};

// Middleware pour vérifier les permissions
export const checkPermission = (permission) => {
  return (req, res, next) => {
    // Si superadmin, accès complet
    if (req.user.permissions.includes('*')) {
      return next();
    }
    
    // Vérifier la permission spécifique
    if (req.user.permissions.includes(permission)) {
      return next();
    }
    
    return res.status(403).json({ error: 'Permission insuffisante' });
  };
};

