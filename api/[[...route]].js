const fs = require('fs');
const path = require('path');
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

module.exports = async (req, res) => {
  // First try to run the server bundle (SSR) if available
  try {
    const serverPath = path.join(process.cwd(), 'dist', 'server', 'index.js');
    if (fs.existsSync(serverPath)) {
      const serverModule = require(serverPath);
      const serverHandler = serverModule && (serverModule.default || serverModule);

      if (typeof serverHandler === 'function') {
        try {
          const protocol = req.headers['x-forwarded-proto'] || 'https';
          const host = req.headers.host || 'localhost';
          const url = `${protocol}://${host}${req.url}`;

          // Node 18+ provides global Request/Response
          const request = new Request(url, {
            method: req.method,
            headers: req.headers,
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
          });

          const response = await serverHandler(request);

          // Map Response to Vercel res
          res.statusCode = response.status || 200;
          response.headers.forEach((v, k) => res.setHeader(k, v));

          const body = await response.arrayBuffer();
          return res.end(Buffer.from(body));
        } catch (err) {
          console.error('SSR handler error, falling back to static:', err);
          // fall through to static serving
        }
      }
    }
  } catch (err) {
    console.error('Error loading server bundle:', err);
  }

  // Fallback: serve static files from dist/client (SPA)
  try {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const cleanPath = urlPath.replace(/^\//, '');
    const base = path.join(process.cwd(), 'dist', 'client');

    const hasExt = path.extname(cleanPath) !== '';
    const candidate = hasExt ? path.join(base, cleanPath) : path.join(base, cleanPath || 'index.html');

    let filePath = candidate;
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(base, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      return res.end('Not Found');
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
};
