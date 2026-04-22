import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const TARGETS = [
  join(ROOT, 'src', 'assets'),
  join(ROOT, 'public', 'og'),
];

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg']);

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

async function convert(file: string) {
  const ext = extname(file).toLowerCase();
  if (!RASTER_EXT.has(ext)) return;
  const webpPath = join(dirname(file), `${basename(file, ext)}.webp`);
  if (existsSync(webpPath)) {
    console.log(`skip   ${webpPath} (exists)`);
    return;
  }
  await sharp(file).webp({ quality: 82, effort: 6 }).toFile(webpPath);
  console.log(`wrote  ${webpPath}`);
}

for (const target of TARGETS) {
  if (!existsSync(target)) continue;
  const files = await walk(target);
  await Promise.all(files.map(convert));
}
