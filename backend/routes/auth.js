// Routes d'authentification
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Récupérer l'utilisateur depuis MySQL
    const [users] = await pool.execute(
      'SELECT u.*, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = ? AND u.status = ?',
      [email.toLowerCase(), 'active']
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = users[0];

    // Vérifier le mot de passe avec bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Récupérer les permissions du rôle
    const [permissions] = await pool.execute(
      'SELECT permission FROM role_permissions WHERE role_id = ?',
      [user.role_id]
    );

    const userPermissions = permissions.map(p => p.permission);

    // Si superadmin, toutes les permissions
    if (user.role_id === 'superadmin') {
      userPermissions.push('*');
    }

    // Mettre à jour la dernière connexion
    await pool.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Créer le token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role_id,
        permissions: userPermissions
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Retourner les informations utilisateur (sans le mot de passe)
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_id,
        permissions: userPermissions
      }
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
});

// Vérifier le token (pour vérifier si l'utilisateur est toujours connecté)
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Récupérer les informations utilisateur à jour
    const [users] = await pool.execute(
      'SELECT u.*, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ? AND u.status = ?',
      [decoded.id, 'active']
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Utilisateur non trouvé ou inactif' });
    }

    const user = users[0];

    // Récupérer les permissions
    const [permissions] = await pool.execute(
      'SELECT permission FROM role_permissions WHERE role_id = ?',
      [user.role_id]
    );

    const userPermissions = permissions.map(p => p.permission);
    if (user.role_id === 'superadmin') {
      userPermissions.push('*');
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_id,
        permissions: userPermissions
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
});

export default router;

