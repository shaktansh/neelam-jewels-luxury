import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';

const distClientDir = join(process.cwd(), 'dist', 'client');
const assetsDir = join(distClientDir, 'assets');
const serverEntry = join(process.cwd(), 'dist', 'server', 'index.js');
const outHtml = join(distClientDir, 'index.html');

function pickLargest(files) {
  if (files.length === 0) {
    return null;
  }

  let winner = files[0];
  let winnerSize = statSync(join(assetsDir, winner)).size;

  for (const file of files.slice(1)) {
    const size = statSync(join(assetsDir, file)).size;
    if (size > winnerSize) {
      winner = file;
      winnerSize = size;
    }
  }

  return winner;
}

try {
  if (!existsSync(distClientDir)) {
    mkdirSync(distClientDir, { recursive: true });
  }

  // Preferred path: render once from built SSR entry and persist as static HTML.
  if (existsSync(serverEntry)) {
    const serverMod = await import(pathToFileURL(serverEntry).href);
    const serverFetch = serverMod?.default?.fetch;

    if (typeof serverFetch === 'function') {
      const response = await serverFetch(new Request('http://localhost/'));
      const html = await response.text();

      if (response.ok && html.includes('<!DOCTYPE html>')) {
        writeFileSync(outHtml, html, 'utf-8');
        console.log('Generated index.html from SSR entry at', outHtml);
        process.exit(0);
      }
    }
  }

  if (!existsSync(assetsDir)) {
    throw new Error('dist/client/assets not found. Run build before postbuild.');
  }

  const files = readdirSync(assetsDir);
  const jsCandidates = files.filter((f) => /^index-.*\.js$/.test(f));
  const cssCandidates = files.filter((f) => /^styles-.*\.css$/.test(f));

  const entryJs = pickLargest(jsCandidates);
  const entryCss = pickLargest(cssCandidates);

  if (!entryJs) {
    throw new Error('Could not find built entry JS asset (index-*.js).');
  }

  const html = [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '    <title>Neelam Jewels Luxury</title>',
    entryCss ? `    <link rel="stylesheet" href="/assets/${entryCss}" />` : '',
    `    <script type="module" src="/assets/${entryJs}"></script>`,
    '  </head>',
    '  <body>',
    '    <div id="root"></div>',
    '  </body>',
    '</html>',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  writeFileSync(outHtml, html, 'utf-8');
  console.log('Generated production index.html at', outHtml);
} catch (err) {
  console.error('Failed to generate production index.html:', err);
  process.exit(1);
}
