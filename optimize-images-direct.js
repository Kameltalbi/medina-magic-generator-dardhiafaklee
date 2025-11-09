import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const inputDir = './public';
const backupDir = './public-backup';
const quality = 85; // Qualité JPEG (0-100) - bon compromis qualité/taille
const maxWidth = 1920; // Largeur maximale pour web
const maxHeight = 1080; // Hauteur maximale pour web

// Créer le dossier de backup s'il n'existe pas
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Fonction pour optimiser une image
async function optimizeImage(inputPath, outputPath, backupPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // Créer le backup d'abord
    const backupDirPath = path.dirname(backupPath);
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }
    fs.copyFileSync(inputPath, backupPath);
    
    // Créer un fichier temporaire
    const tempPath = outputPath + '.tmp';
    
    // Obtenir les métadonnées de l'image
    const metadata = await sharp(inputPath).metadata();
    const format = metadata.format;
    
    let sharpInstance = sharp(inputPath)
      .resize(maxWidth, maxHeight, { 
        fit: 'inside',
        withoutEnlargement: true 
      });
    
    // Optimiser selon le format
    if (format === 'jpeg' || format === 'jpg') {
      sharpInstance = sharpInstance.jpeg({ 
        quality,
        progressive: true,
        mozjpeg: true
      });
    } else if (format === 'png') {
      sharpInstance = sharpInstance.png({ 
        quality,
        compressionLevel: 9
      });
    } else {
      // Convertir en JPEG pour les autres formats
      sharpInstance = sharpInstance.jpeg({ 
        quality,
        progressive: true,
        mozjpeg: true
      });
    }
    
    // Écrire dans le fichier temporaire
    await sharpInstance.toFile(tempPath);
    
    // Remplacer l'original par l'optimisé
    fs.renameSync(tempPath, outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (${reduction}% réduction)`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`❌ Erreur avec ${inputPath}:`, error.message);
    return null;
  }
}

// Fonction pour parcourir récursivement les dossiers
async function processDirectory(dir, relativePath = '') {
  const items = fs.readdirSync(dir);
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let processedCount = 0;
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const relativeItemPath = path.join(relativePath, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory() && !itemPath.includes('backup')) {
      // Créer le dossier dans le backup
      const backupSubDir = path.join(backupDir, relativeItemPath);
      if (!fs.existsSync(backupSubDir)) {
        fs.mkdirSync(backupSubDir, { recursive: true });
      }
      
      // Traiter récursivement
      const subResult = await processDirectory(itemPath, relativeItemPath);
      totalOriginalSize += subResult.originalSize;
      totalNewSize += subResult.newSize;
      processedCount += subResult.count;
    } else if (stats.isFile() && /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(item)) {
      // Optimiser l'image
      const backupPath = path.join(backupDir, relativeItemPath);
      const result = await optimizeImage(itemPath, itemPath, backupPath);
      
      if (result) {
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
        processedCount++;
      }
    }
  }
  
  return { originalSize: totalOriginalSize, newSize: totalNewSize, count: processedCount };
}

// Fonction principale
async function main() {
  console.log('🚀 Début de l\'optimisation des images...\n');
  console.log('📦 Les images originales seront sauvegardées dans:', backupDir);
  console.log('⚡ Les images seront optimisées directement dans:', inputDir);
  console.log('');
  
  const startTime = Date.now();
  const result = await processDirectory(inputDir);
  const endTime = Date.now();
  
  const totalReduction = ((result.originalSize - result.newSize) / result.originalSize * 100).toFixed(1);
  const timeTaken = ((endTime - startTime) / 1000).toFixed(1);
  
  console.log('\n📊 Résumé de l\'optimisation:');
  console.log(`📁 Images traitées: ${result.count}`);
  console.log(`📦 Taille originale: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Taille optimisée: ${(result.newSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Économie: ${totalReduction}%`);
  console.log(`⏱️  Temps: ${timeTaken}s`);
  console.log(`\n✅ Images optimisées dans: ${inputDir}`);
  console.log(`💾 Backups sauvegardés dans: ${backupDir}`);
}

// Exécuter le script
main().catch(console.error);

