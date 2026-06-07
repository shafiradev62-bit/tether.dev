import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.join(__dirname, '../dist/client');
const assetsDir = path.join(clientDir, 'assets');

// Find the main CSS and JS files (they start with "index-")
const files = fs.readdirSync(assetsDir);

const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('Could not find index CSS or JS in dist/client/assets');
  process.exit(1);
}

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TASTE.NFT — Collect the world's flavors, on-chain</title>
    <meta name="description" content="Marketplace for culinary NFTs from chefs around the world. Mint, collect, and trade signature dishes. Settled in USDT on the Tether network." />
    <link rel="stylesheet" href="/assets/${cssFile}">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(clientDir, 'index.html'), indexHtml);
console.log(`Generated dist/client/index.html with ${cssFile} and ${jsFile}`);
