import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const pastaPublica = new URL('../public/', import.meta.url)
const identidade = new URL('nova-identidade/svg/', pastaPublica)
const caminho = (arquivo, pasta = pastaPublica) => fileURLToPath(new URL(arquivo, pasta))
const monograma = caminho('logo-icone-nx-fundo-escuro.svg', identidade)
const logoHorizontal = caminho('logo-horizontal-fundo-escuro.svg', identidade)
const fundo = '#0B0A12'

const svgOriginal = await readFile(monograma, 'utf8')
const svgMonograma = svgOriginal
  .replace(/<\?xml[^>]*\?>\s*/, '')
  .replace(/<metadata\b[^>]*>[\s\S]*?<\/metadata>/g, '')
  .replace(/\s+xmlns:c2pa="[^"]*"/g, '')
  .replace(/\bwidth="[^"]*" height="[^"]*"/, 'x="24" y="139" width="480" height="250"')

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528 528">
  <rect width="528" height="528" rx="64" fill="${fundo}" />
  ${svgMonograma.trim()}
</svg>
`

await writeFile(caminho('favicon.svg'), favicon)

for (const [arquivo, tamanho] of [['favicon.png', 32], ['favicon-48.png', 48], ['apple-touch-icon.png', 180]]) {
  const icone = sharp(monograma)
    .resize(tamanho, tamanho, { fit: 'contain', background: fundo })
    .flatten({ background: fundo })

  await icone.png().toFile(caminho(arquivo))
}

const logo = await sharp(logoHorizontal, { density: 144 })
  .resize({ width: 900 })
  .png()
  .toBuffer()

await sharp({ create: { width: 1200, height: 630, channels: 3, background: fundo } })
  .composite([{ input: logo, gravity: 'centre' }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(caminho('og-nexus-labs.png'))
