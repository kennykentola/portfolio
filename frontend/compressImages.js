const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, 'src', 'assets');
const MAX_SIZE_MB = 1;

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (fullPath.match(/\.(png|jpe?g)$/i)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  
  return arrayOfFiles;
}

async function compressImages() {
  console.log('Finding images in', ASSETS_DIR);
  const files = getAllFiles(ASSETS_DIR);
  console.log(`Found ${files.length} images.`);
  
  let totalSaved = 0;
  
  for (const file of files) {
    const stats = fs.statSync(file);
    const sizeMB = stats.size / (1024 * 1024);
    
    if (sizeMB > MAX_SIZE_MB) {
      console.log(`Compressing ${path.basename(file)} (Size: ${sizeMB.toFixed(2)} MB)`);
      
      const ext = path.extname(file).toLowerCase();
      const tmpFile = file + '.tmp' + ext;
      
      try {
        if (ext === '.png') {
          await sharp(file)
            .resize({ width: 1920, withoutEnlargement: true })
            .png({ quality: 70, compressionLevel: 8 })
            .toFile(tmpFile);
        } else {
          await sharp(file)
            .resize({ width: 1920, withoutEnlargement: true })
            .jpeg({ quality: 75 })
            .toFile(tmpFile);
        }
        
        const newStats = fs.statSync(tmpFile);
        const newSizeMB = newStats.size / (1024 * 1024);
        
        fs.renameSync(tmpFile, file);
        const saved = sizeMB - newSizeMB;
        totalSaved += saved;
        
        console.log(`✅ Saved ${saved.toFixed(2)} MB for ${path.basename(file)}`);
      } catch (err) {
        console.error(`❌ Failed to compress ${path.basename(file)}:`, err);
        if (fs.existsSync(tmpFile)) {
          fs.unlinkSync(tmpFile);
        }
      }
    }
  }
  
  console.log(`\n🎉 Total space saved: ${totalSaved.toFixed(2)} MB`);
}

compressImages().catch(console.error);
