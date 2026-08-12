/* Emits the static pages. Run: node build/build.mjs
   Output is committed HTML: the published site has no build step, this only
   keeps the shared content from being retyped once per lane. */

import { writeFile, mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const LANES = ['chlad', 'sad', 'noc', 'stroj']

let wrote = 0
for (const id of LANES) {
  let mod
  try {
    mod = await import(`./lanes/${id}.mjs`)
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND' && err.message.includes(`lanes/${id}`)) {
      console.log(`- ${id}: no template yet, skipped`)
      continue
    }
    throw err
  }
  const html = mod.default()
  await mkdir(resolve(root, id), { recursive: true })
  await writeFile(resolve(root, id, 'index.html'), html)
  const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
  console.log(`✓ ${id}/index.html  ${kb} KB`)
  wrote++
}

/* The chooser */
try {
  const { default: picker } = await import('./picker.mjs')
  await writeFile(resolve(root, 'index.html'), picker())
  console.log('✓ index.html (chooser)')
} catch (err) {
  if (err.code !== 'ERR_MODULE_NOT_FOUND') throw err
  console.log('- picker: no template yet, skipped')
}

/* Fail loudly if a lane references an asset that is not on disk. */
const missing = []
for (const id of LANES) {
  let html
  try {
    html = await (await import('node:fs/promises')).readFile(resolve(root, id, 'index.html'), 'utf8')
  } catch {
    continue
  }
  /* Local file references only: skip directory links like ../sad/ and any
     absolute URL. */
  for (const m of html.matchAll(/(?:src|href)="((?:\.\.\/|)[^":]*\.[a-z0-9]{2,5})"/gi)) {
    const rel = m[1]
    const abs = resolve(root, id, rel)
    try {
      await stat(abs)
    } catch {
      missing.push(`${id}: ${rel}`)
    }
  }
}
if (missing.length) {
  console.error('\nMissing assets:\n' + [...new Set(missing)].map((s) => '  ' + s).join('\n'))
  process.exitCode = 1
} else if (wrote) {
  console.log('\nAll referenced local assets present.')
}
