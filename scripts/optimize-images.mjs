import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "..", "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const OUT_DIR = path.join(IMAGES_DIR, "optimized");
const MANIFEST_PATH = path.resolve(import.meta.dirname, "..", "lib", "image-manifest.json");

const SCAN_DIRS = ["products", "categories", "hero", "backgrounds", "featured", "partners", "brand", "lasix", "fossil"];
const WIDTHS = [400, 800, 1200, 1600];
const RASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (RASTER_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function toSitePath(absPath) {
  return "/" + path.relative(PUBLIC_DIR, absPath).split(path.sep).join("/");
}

async function processImage(absPath, manifest) {
  const relFromImages = path.relative(IMAGES_DIR, absPath);
  const ext = path.extname(absPath).toLowerCase();
  const base = path.basename(absPath, ext);
  const outSubdir = path.join(OUT_DIR, path.dirname(relFromImages));
  await mkdir(outSubdir, { recursive: true });

  const source = sharp(absPath);
  const meta = await source.metadata();
  const nativeWidth = meta.width ?? WIDTHS[WIDTHS.length - 1];
  const nativeHeight = meta.height ?? nativeWidth;
  const targetWidths = WIDTHS.filter((w) => w <= nativeWidth);
  if (targetWidths.length === 0 || targetWidths[targetWidths.length - 1] !== nativeWidth) {
    targetWidths.push(nativeWidth);
  }

  const entry = { width: nativeWidth, height: nativeHeight, avif: [], webp: [], fallback: [] };

  for (const width of targetWidths) {
    const resized = sharp(absPath).resize({ width, withoutEnlargement: true });

    const avifPath = path.join(outSubdir, `${base}-${width}.avif`);
    await resized.clone().avif({ quality: 55, effort: 4 }).toFile(avifPath);
    entry.avif.push({ width, path: toSitePath(avifPath) });

    const webpPath = path.join(outSubdir, `${base}-${width}.webp`);
    await resized.clone().webp({ quality: 75 }).toFile(webpPath);
    entry.webp.push({ width, path: toSitePath(webpPath) });

    const fallbackExt = ext === ".png" ? ".png" : ".jpg";
    const fallbackPath = path.join(outSubdir, `${base}-${width}${fallbackExt}`);
    if (fallbackExt === ".png") {
      await resized.clone().png({ compressionLevel: 9 }).toFile(fallbackPath);
    } else {
      await resized.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(fallbackPath);
    }
    entry.fallback.push({ width, path: toSitePath(fallbackPath) });
  }

  manifest[toSitePath(absPath)] = entry;
}

async function main() {
  const manifest = {};
  let count = 0;

  for (const dir of SCAN_DIRS) {
    const dirPath = path.join(IMAGES_DIR, dir);
    try {
      await stat(dirPath);
    } catch {
      continue;
    }
    const files = await walk(dirPath);
    for (const file of files) {
      process.stdout.write(`optimizing ${toSitePath(file)}\n`);
      await processImage(file, manifest);
      count += 1;
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  process.stdout.write(`done: ${count} source images, manifest written to ${MANIFEST_PATH}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
