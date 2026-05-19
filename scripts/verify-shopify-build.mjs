import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const assetsDir = path.join(root, 'assets');
const requiredFiles = ['bundle.js', 'bundle.css'];

const failures = [];

for (const file of requiredFiles) {
  const filePath = path.join(assetsDir, file);
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing required Shopify asset: assets/${file}`);
  }
}

if (fs.existsSync(path.join(assetsDir, 'index.html'))) {
  failures.push('assets/index.html must not be present in a Shopify theme assets folder.');
}

const bundlePath = path.join(assetsDir, 'bundle.js');
if (fs.existsSync(bundlePath)) {
  const bundle = fs.readFileSync(bundlePath, 'utf8');
  const unpatchedImageRefs = [...bundle.matchAll(/(?:src|image|featured_image|image_url):["'`]\/images\//g)];
  if (unpatchedImageRefs.length > 0) {
    failures.push(`Found ${unpatchedImageRefs.length} unpatched /images/ reference(s) in assets/bundle.js.`);
  }
}

const themePath = path.join(root, 'layout', 'theme.liquid');
if (fs.existsSync(themePath)) {
  const theme = fs.readFileSync(themePath, 'utf8');
  for (const file of requiredFiles) {
    if (!theme.includes(`'${file}' | asset_url`)) {
      failures.push(`layout/theme.liquid does not load assets/${file}.`);
    }
  }
}

if (failures.length > 0) {
  console.error('Shopify build verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Verified Shopify build artifacts.');
