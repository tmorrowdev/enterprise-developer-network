import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔨 Building server files...');

// Create dist directory
const distDir = join(__dirname, 'dist');
try {
  mkdirSync(distDir, { recursive: true });
} catch (error) {
  // Directory already exists
}

// Copy entire src directory to dist
try {
  cpSync(join(__dirname, 'src'), join(distDir, 'src'), { recursive: true });
  console.log('✓ Copied src/ directory to dist/');
} catch (error) {
  console.error('✗ Failed to copy src directory:', error.message);
}

// Copy public directory to dist
try {
  cpSync(join(__dirname, 'public'), join(distDir, 'public'), { recursive: true });
  console.log('✓ Copied public/ directory to dist/');
} catch (error) {
  console.error('✗ Failed to copy public directory:', error.message);
}

// Copy configuration files
const configFiles = [
  'package.json',
  '.env',
  'mcp-config.json'
];

configFiles.forEach(file => {
  try {
    const srcPath = join(__dirname, file);
    const distPath = join(distDir, file);
    const content = readFileSync(srcPath, 'utf-8');
    writeFileSync(distPath, content);
    console.log(`✓ Copied ${file} to dist/`);
  } catch (error) {
    console.error(`✗ Failed to copy ${file}:`, error.message);
  }
});

console.log('🎉 Server build complete!');