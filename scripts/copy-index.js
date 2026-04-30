import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';

const src = join(process.cwd(), 'index.html');
const destDir = join(process.cwd(), 'dist', 'client');
const dest = join(destDir, 'index.html');

try {
  if (!existsSync(src)) {
    console.warn('No index.html at project root; skipping copy.');
    process.exit(0);
  }
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }
  copyFileSync(src, dest);
  console.log('Copied index.html to', dest);
} catch (err) {
  console.error('Failed to copy index.html:', err);
  process.exit(1);
}
