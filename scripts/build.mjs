import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
for (const file of ['manifest.json','index.html','style.css']) await copyFile(`public/${file}`, `dist/${file}`);
