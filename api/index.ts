import { readFileSync } from 'fs';
import { join } from 'path';

// Use plain types to avoid dependency on @vercel/node types
export default function handler(req: any, res: any) {
  try {
    const htmlPath = join(process.cwd(), 'dist', 'client', 'index.html');
    const html = readFileSync(htmlPath, 'utf-8');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    return res.end(html);
  } catch (error) {
    console.error('Error serving HTML:', error);
    res.statusCode = 500;
    try {
      return res.end(JSON.stringify({ error: 'Internal Server Error' }));
    } catch (_) {
      return res.end('Internal Server Error');
    }
  }
}
