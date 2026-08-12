/* One-off: the first concept lived at the repository root. It moves into v1/
   so the root can hold the chooser. Only the paths change, never the design. */
import { readFile, writeFile } from 'node:fs/promises'
import { switcherMarkup } from './partials.mjs'

const R = new URL('../', import.meta.url).pathname

let h = await readFile(R + 'v1/index.html', 'utf8')
const refs = (h.match(/"assets\//g) || []).length
h = h.replace(/"assets\//g, '"../assets/')

if (!h.includes('shared/switcher.css')) {
  h = h.replace(
    '<link rel="stylesheet" href="styles.css">',
    '<link rel="stylesheet" href="../shared/switcher.css">\n<link rel="stylesheet" href="styles.css">'
  )
}
if (!h.includes('class="sw"')) {
  h = h.replace(
    '<script src="app.js" defer></script>',
    switcherMarkup('v1') + '\n\n<script src="app.js" defer></script>'
  )
}
await writeFile(R + 'v1/index.html', h)

let c = await readFile(R + 'v1/styles.css', 'utf8')
const cssRefs = (c.match(/url\(['"]?assets\//g) || []).length
c = c.replace(/url\((['"]?)assets\//g, 'url($1../assets/')
await writeFile(R + 'v1/styles.css', c)

console.log(`html asset refs: ${refs}, css url refs: ${cssRefs}`)
console.log(`switcher: ${(await readFile(R + 'v1/index.html', 'utf8')).includes('class="sw"') ? 'added' : 'MISSING'}`)
