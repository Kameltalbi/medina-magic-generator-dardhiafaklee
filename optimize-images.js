import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const inputDir = './public';
const outputDir = './public-optimized';
const quality = 80; // Qualité JPEG (0-100)
const maxWidth = 1920; // Largeur maximale
const maxHeight = 1080; // Hauteur maximale

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Fonction pour optimiser une image
async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    await sharp(inputPath)
      .resize(maxWidth, maxHeight, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality })
      .png({ quality })
      .webp({ quality })
      .toFile(outputPath);
    
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
    
    if (stats.isDirectory()) {
      // Créer le dossier dans la sortie
      const outputSubDir = path.join(outputDir, relativeItemPath);
      if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true });
      }
      
      // Traiter récursivement
      const subResult = await processDirectory(itemPath, relativeItemPath);
      totalOriginalSize += subResult.originalSize;
      totalNewSize += subResult.newSize;
      processedCount += subResult.count;
    } else if (stats.isFile() && /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(item)) {
      // Optimiser l'image
      const outputPath = path.join(outputDir, relativeItemPath);
      const result = await optimizeImage(itemPath, outputPath);
      
      if (result) {
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
        processedCount++;
      }
    } else {
      // Copier les autres fichiers
      const outputPath = path.join(outputDir, relativeItemPath);
      fs.copyFileSync(itemPath, outputPath);
    }
  }
  
  return { originalSize: totalOriginalSize, newSize: totalNewSize, count: processedCount };
}

// Fonction principale
async function main() {
  console.log('🚀 Début de l\'optimisation des images...\n');
  
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
  console.log(`\n✅ Images optimisées sauvegardées dans: ${outputDir}`);
  console.log('\n💡 Pour remplacer les images originales:');
  console.log(`   rm -rf ${inputDir}`);
  console.log(`   mv ${outputDir} ${inputDir}`);
}

// Exécuter le script
main().catch(console.error);
