// Shrinks large uploads in public/images: max 1600px wide, re-encoded only when smaller.
// Run with: npm run images   (then commit the result)
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'images');
const MAX = 1600;
let saved = 0;

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );
}

for (const file of walk(dir)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext) || file.includes(`${path.sep}brand${path.sep}`)) continue;
  const before = fs.statSync(file).size;
  if (before === 0) continue;
  const img = sharp(file, { failOn: 'none' });
  const { width } = await img.metadata();
  let pipeline = width > MAX ? img.resize({ width: MAX }) : img;
  if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  else if (ext === '.webp') pipeline = pipeline.webp({ quality: 80 });
  else pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
  const buf = await pipeline.toBuffer();
  if (buf.length < before * 0.9) {
    fs.writeFileSync(file, buf);
    saved += before - buf.length;
    console.log(`${path.relative(process.cwd(), file)}: ${Math.round(before / 1024)} KB -> ${Math.round(buf.length / 1024)} KB`);
  }
}
console.log(`saved ${Math.round(saved / 1024)} KB`);
