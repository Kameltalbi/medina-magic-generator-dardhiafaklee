import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const inputDir = './public';
const webpQuality = 80; // Qualité WebP (0-100) - bon compromis qualité/taille
const maxWidth = 1920; // Largeur maximale pour web
const maxHeight = 1080; // Hauteur maximale pour web

// Fonction pour convertir une image en WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // Obtenir les métadonnées de l'image
    const metadata = await sharp(inputPath).metadata();
    
    // Convertir en WebP avec optimisation
    await sharp(inputPath)
      .resize(maxWidth, maxHeight, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ 
        quality: webpQuality,
        effort: 6 // Effort de compression (0-6, 6 = meilleure compression)
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB WebP (${reduction}% réduction)`);
    
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
      // Traiter récursivement
      const subResult = await processDirectory(itemPath, relativeItemPath);
      totalOriginalSize += subResult.originalSize;
      totalNewSize += subResult.newSize;
      processedCount += subResult.count;
    } else if (stats.isFile() && /\.(jpg|jpeg|png)$/i.test(item)) {
      // Ne pas convertir si le WebP existe déjà
      const webpPath = itemPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      if (fs.existsSync(webpPath)) {
        console.log(`⏭️  ${path.basename(itemPath)}: WebP existe déjà, ignoré`);
        continue;
      }
      
      // Convertir en WebP
      const result = await convertToWebP(itemPath, webpPath);
      
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
  console.log('🚀 Début de la conversion en WebP...\n');
  console.log('📦 Les images WebP seront créées à côté des images originales');
  console.log('⚡ Qualité WebP:', webpQuality);
  console.log('📐 Taille max:', `${maxWidth}x${maxHeight}`);
  console.log('');
  
  const startTime = Date.now();
  const result = await processDirectory(inputDir);
  const endTime = Date.now();
  
  if (result.count === 0) {
    console.log('ℹ️  Aucune nouvelle image à convertir (toutes les WebP existent déjà)');
    return;
  }
  
  const totalReduction = ((result.originalSize - result.newSize) / result.originalSize * 100).toFixed(1);
  const timeTaken = ((endTime - startTime) / 1000).toFixed(1);
  
  console.log('\n📊 Résumé de la conversion:');
  console.log(`📁 Images converties: ${result.count}`);
  console.log(`📦 Taille originale (JPG/PNG): ${(result.originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Taille WebP: ${(result.newSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Économie: ${totalReduction}%`);
  console.log(`⏱️  Temps: ${timeTaken}s`);
  console.log(`\n✅ Images WebP créées dans: ${inputDir}`);
  console.log('\n💡 Pour utiliser les WebP dans votre code, remplacez:');
  console.log('   image.jpg → image.webp');
  console.log('   (ou utilisez <picture> avec fallback)');
}

// Exécuter le script
main().catch(console.error);

