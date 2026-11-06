import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/style.css': 'style.css',
  '/popup.js': 'popup.js',
  '/services/browser.js': 'services/browser.js',
  '/demo/chats.js': 'demo/chats.js',
  '/debug/console.js': 'debug/console.js',
};
const types = {html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8'};
const server = http.createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  const file = Object.hasOwn(files, path) ? files[path] : undefined;
  if (!file) { response.writeHead(404).end('Not found'); return; }
  try { const body = await readFile(new URL(`../dist/${file}`, import.meta.url)); response.writeHead(200, {'Content-Type':types[file.split('.').pop()]}).end(body); }
  catch { response.writeHead(500).end('Esegui prima npm run build.'); }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(4173, '127.0.0.1', () => console.log('ChatManagement: http://127.0.0.1:4173'));
