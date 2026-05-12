/**
 * Image optimization script — Nexus Labs
 * Run: node scripts/optimize-images.mjs
 *
 * Compresses PNGs using sharp (lossless recompression + metadata strip).
 * Logos with transparency are preserved.
 * Files are replaced in-place (same name, smaller size).
 */

import sharp from 'sharp'
import { readdir, stat, copyFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT  = join(__dir, '..')

const TARGETS = [
  // logos used in components
  'src/assets/logos/logo-nexus-labs-dark.png',
  'src/assets/logos/logo-nexus-labs-light.png',
  'src/assets/logos/logo-nexus-labs-vertical-dark.png',
  'src/assets/logos/logo-nexus-labs-tagline-dark.png',
  'src/assets/logos/logo-nexus-labs-tagline-light.png',
  'src/assets/logos/nexus-labs-icon.png',
  'src/assets/logos/logo-nexus-labs-mono-white.png',
  'src/assets/logos/nexus-labs-watermark-text.png',
  // public assets
  'public/favicon.png',
  'public/og-nexus-labs.png',
]

// Max dimensions per file (width × height). Larger images are resized first.
const MAX_DIM = {
  'logo-nexus-labs-dark.png':         { w: 900,  h: null },
  'logo-nexus-labs-light.png':        { w: 900,  h: null },
  'logo-nexus-labs-vertical-dark.png':{ w: 600,  h: null },
  'logo-nexus-labs-tagline-dark.png': { w: 1100, h: null },
  'logo-nexus-labs-tagline-light.png':{ w: 1100, h: null },
  'nexus-labs-icon.png':              { w: 512,  h: 512  },
  'logo-nexus-labs-mono-white.png':   { w: 900,  h: null },
  'nexus-labs-watermark-text.png':    { w: 800,  h: null },
  'favicon.png':                      { w: 512,  h: 512  },
  'og-nexus-labs.png':                { w: 1200, h: 630  },
}

async function kbOf(path) {
  const s = await stat(path)
  return Math.round(s.size / 1024)
}

async function optimise(rel) {
  const abs  = join(ROOT, rel)
  const name = rel.split('/').pop()
  const dim  = MAX_DIM[name] ?? { w: 1200, h: null }

  const before = await kbOf(abs)

  // Read metadata to decide if resize is needed
  const meta = await sharp(abs).metadata()
  const needsResize = dim.w && meta.width > dim.w

  let pipeline = sharp(abs)

  if (needsResize) {
    pipeline = pipeline.resize({
      width: dim.w,
      height: dim.h ?? undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // PNG optimisation: strip metadata, max compression, preserve alpha
  const buf = await pipeline
    .png({
      compressionLevel: 9,   // max zlib compression (lossless)
      adaptiveFiltering: true,
      strip: true,           // remove EXIF/XMP/IPTC
      palette: false,        // keep full colour (logos need gradients)
    })
    .toBuffer()

  const afterKB = Math.round(buf.length / 1024)
  const saving  = Math.round((1 - afterKB / before) * 100)

  // Only write if it's actually smaller
  if (buf.length < await stat(abs).then(s => s.size)) {
    const { writeFile } = await import('fs/promises')
    await writeFile(abs, buf)
    console.log(`✓  ${name.padEnd(42)} ${String(before).padStart(5)} KB → ${String(afterKB).padStart(5)} KB  (−${saving}%)${needsResize ? '  [resized]' : ''}`)
  } else {
    console.log(`–  ${name.padEnd(42)} ${String(before).padStart(5)} KB   (already optimal)`)
  }
}

console.log('\nNexus Labs — Image optimisation\n')

for (const rel of TARGETS) {
  try {
    await optimise(rel)
  } catch (e) {
    console.error(`✗  ${rel}: ${e.message}`)
  }
}

console.log('\nDone.\n')
