/* Generates <lane>/_visible.html — gitignored test copies of each page.
   Run: node build/make-visible-test.mjs

   Why this exists. An automation tab is never actually visible, so it has no
   animation frames and its IntersectionObserver never reports. That hides the
   single worst failure mode of a scroll-reveal system: the page believes it is
   visible, hides everything, and then nothing ever un-hides it — which is
   exactly what shipped once, as four pages of empty sections.

   These copies force `document.hidden` to false before the scripts run, which
   reproduces that state: visible code path, no frames, dead observer. Load one,
   dismiss the gate, scroll to the bottom, and count what is still transparent:

     [...document.querySelectorAll('[data-reveal]')]
       .filter(e => getComputedStyle(e).opacity < 0.05).length

   It must reach 0. Anything else means the reveal system can strand content.
*/

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const LANES = ['chlad', 'sad', 'noc', 'stroj']

const inject = `<script>
/* TEST ONLY — see build/make-visible-test.mjs. Forces the visible code path so
   the observer-never-reports case can be exercised in a tab that is not. */
Object.defineProperty(document, "hidden", { get: () => false });
Object.defineProperty(document, "visibilityState", { get: () => "visible" });
</script>`

for (const lane of LANES) {
  const src = resolve(root, lane, 'index.html')
  let html = await readFile(src, 'utf8')
  const anchor = '<script src="../lib/motion.min.js" defer></script>'
  if (!html.includes(anchor)) {
    console.error(`${lane}: script anchor not found, skipped`)
    continue
  }
  html = html.replace(anchor, `${inject}\n${anchor}`)
  await writeFile(resolve(root, lane, '_visible.html'), html)
  console.log(`✓ ${lane}/_visible.html`)
}
