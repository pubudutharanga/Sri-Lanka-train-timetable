/**
 * Generate all favicon sizes required for Google Search results + browsers.
 * 
 * Google Search requires favicons to be multiples of 48px (48, 96, 144, 192).
 * This script generates all needed sizes from the high-res 512x512 source.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE = path.join(__dirname, '..', 'public', 'android-chrome-512x512.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'public');

const SIZES = [
  // Google Search required (multiples of 48)
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon-144x144.png', size: 144 },
  
  // Browser tab & legacy
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  
  // Apple
  { name: 'apple-touch-icon.png', size: 180 },
  
  // Android / PWA
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  
  // SVG-like high quality for modern browsers
  { name: 'logo.png', size: 512 },
];

async function generateFavicons() {
  console.log('🔧 Generating favicons from:', SOURCE);
  
  // Read source into buffer to avoid "same file for input and output" error
  const sourceBuffer = fs.readFileSync(SOURCE);
  
  for (const { name, size } of SIZES) {
    const outputPath = path.join(OUTPUT_DIR, name);
    await sharp(sourceBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log(`  ✅ ${name} (${size}x${size}) — ${stats.size} bytes`);
  }
  
  // Generate ICO file (contains 48px)
  const ico48 = await sharp(sourceBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  
  // Create a simple ICO from the 48x48 PNG
  const icoBuffer = createIco(ico48, 48);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'favicon.ico'), icoBuffer);
  console.log(`  ✅ favicon.ico (48x48 ICO) — ${icoBuffer.length} bytes`);
  
  console.log('\n🎉 All favicons generated successfully!');
}

/**
 * Create a minimal ICO file from a PNG buffer.
 * ICO format: Header (6 bytes) + Entry (16 bytes) + PNG data
 */
function createIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // Reserved
  header.writeUInt16LE(1, 2);     // Type: ICO
  header.writeUInt16LE(1, 4);     // Number of images
  
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size < 256 ? size : 0, 0);  // Width
  entry.writeUInt8(size < 256 ? size : 0, 1);  // Height
  entry.writeUInt8(0, 2);         // Color palette
  entry.writeUInt8(0, 3);         // Reserved
  entry.writeUInt16LE(1, 4);      // Color planes
  entry.writeUInt16LE(32, 6);     // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8);   // Size of image data
  entry.writeUInt32LE(22, 12);    // Offset to image data (6 + 16 = 22)
  
  return Buffer.concat([header, entry, pngBuffer]);
}

generateFavicons().catch(console.error);
