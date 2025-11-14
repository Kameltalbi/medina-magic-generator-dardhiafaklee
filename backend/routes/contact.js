// Routes pour les formulaires de contact
import express from 'express';
import pool from '../config/database.js';
import { sendContactEmail } from '../config/email.js';

const router = express.Router();

// POST /api/contact - Recevoir un formulaire de contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation des champs requis
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Champs requis manquants',
        required: ['name', 'email', 'message']
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Insérer dans la base de données
    const [result] = await pool.execute(
      `INSERT INTO contact_messages (name, email, phone, message, created_at, status) 
       VALUES (?, ?, ?, ?, NOW(), 'new')`,
      [name, email, phone || null, message]
    );

    // Envoyer un email de notification à allanimehdi91@gmail.com
    try {
      await sendContactEmail({ name, email, phone, message });
    } catch (emailError) {
      // Log l'erreur mais ne bloque pas la réponse (le message est déjà enregistré en DB)
      console.error('⚠️ Erreur lors de l\'envoi de l\'email (message enregistré en DB):', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès',
      id: result.insertId
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de l\'envoi du message',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/contact - Récupérer les messages (nécessite authentification)
router.get('/', async (req, res) => {
  try {
    // TODO: Ajouter middleware d'authentification
    const [rows] = await pool.execute(
      `SELECT id, name, email, phone, message, created_at, status 
       FROM contact_messages 
       ORDER BY created_at DESC 
       LIMIT 100`
    );

    res.json({
      success: true,
      messages: rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;

