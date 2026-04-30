import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon'
};

async function readRequestBody(req) {
  if (['GET', 'HEAD'].includes(req.method || 'GET')) {
    return undefined;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  if (chunks.length === 0) {
    return undefined;
  }
  return Buffer.concat(chunks);
}

function applyResponse(res, response) {
  res.statusCode = response.status || 200;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
}

export default async function handler(req, res) {
  // Try to run the SSR server bundle first.
  try {
    const serverPath = path.join(process.cwd(), 'dist', 'server', 'index.js');
    if (fs.existsSync(serverPath)) {
      const serverUrl = pathToFileURL(serverPath).href;
      const serverModule = await import(serverUrl);

      const serverHandler =
        serverModule?.default?.fetch ||
        serverModule?.default ||
        serverModule?.fetch;

      if (typeof serverHandler === 'function') {
        try {
          const protocol = req.headers['x-forwarded-proto'] || 'https';
          const host = req.headers.host || 'localhost';
          const url = `${protocol}://${host}${req.url}`;
          const body = await readRequestBody(req);

          const request = new Request(url, {
            method: req.method,
            headers: req.headers,
            body,
          });

          const response = await serverHandler(request);
          if (!(response instanceof Response)) {
            throw new Error('SSR handler did not return a Response object');
          }

          applyResponse(res, response);

          const responseBody = await response.arrayBuffer();
          return res.end(Buffer.from(responseBody));
        } catch (err) {
          console.error('SSR handler error:', err);
          // fall through to static serving
        }
      }
    }
  } catch (err) {
    console.error('Error loading server bundle:', err);
  }

  // Fallback: serve static files from dist/client.
  try {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const cleanPath = urlPath.replace(/^\//, '');
    const base = path.join(process.cwd(), 'dist', 'client');

    const hasExt = path.extname(cleanPath) !== '';
    const candidate = hasExt ? path.join(base, cleanPath) : path.join(base, cleanPath || '');

    let filePath = candidate;
    if (!fs.existsSync(filePath) || (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory())) {
      if (hasExt) {
        res.statusCode = 404;
        res.setHeader('content-type', 'text/plain; charset=utf-8');
        return res.end('Not Found');
      }

      res.statusCode = 500;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      return res.end('SSR failed and no static fallback route was found.');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mime[ext] || 'application/octet-stream';
    res.setHeader('content-type', contentType);

    if (ext && ['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.mp4', '.ico'].includes(ext)) {
      res.setHeader('cache-control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('cache-control', 'no-cache');
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      console.error('File stream error', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
    return stream.pipe(res);
  } catch (err) {
    console.error('Handler error', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
