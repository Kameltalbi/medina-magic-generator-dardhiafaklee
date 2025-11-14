// Configuration pour l'envoi d'emails
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '..', '.env') });

// Créer le transporteur email
// Configuration pour Gmail SMTP (peut être modifié pour d'autres services)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour autres ports
  auth: {
    user: process.env.SMTP_USER, // Email d'envoi
    pass: process.env.SMTP_PASSWORD, // Mot de passe d'application Gmail ou mot de passe
  },
});

// Fonction pour envoyer un email de notification de contact
export const sendContactEmail = async (contactData) => {
  const { name, email, phone, message } = contactData;
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@dardhiafaklee.com',
    to: 'allanimehdi91@gmail.com',
    subject: `Nouveau message de contact - Dar Dhiafa Klee`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B4513 0%, #4A4A4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #8B4513; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #8B4513; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 Nouveau message de contact</h2>
            <p>Dar Dhiafa Paul Klee - Kairouan</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Nom complet :</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email :</div>
              <div class="value">${email}</div>
            </div>
            ${phone ? `
            <div class="field">
              <div class="label">📞 Téléphone :</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">💬 Message :</div>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
            <div class="footer">
              <p>Ce message a été envoyé depuis le formulaire de contact du site web.</p>
              <p>Date : ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' })}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Nouveau message de contact - Dar Dhiafa Klee

Nom: ${name}
Email: ${email}
${phone ? `Téléphone: ${phone}` : ''}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact du site web.
Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' })}
    `.trim(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

export default transporter;

