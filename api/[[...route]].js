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

module.exports = (req, res) => {
  try {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const cleanPath = urlPath.replace(/^\//, '');
    const base = path.join(process.cwd(), 'dist', 'client');

    // If requesting root or a path without extension, serve index.html
    const hasExt = path.extname(cleanPath) !== '';
    const candidate = hasExt ? path.join(base, cleanPath) : path.join(base, cleanPath || 'index.html');

    let filePath = candidate;
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      // fallback to index.html
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

    // Cache static assets aggressively
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
    stream.pipe(res);
  } catch (err) {
    console.error('Handler error', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
