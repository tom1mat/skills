/**
 * Helpers for a captioned verification recording. See ../recording.md.
 *
 * Import Playwright by ABSOLUTE path — ESM resolves relative to your script, and the package is
 * CommonJS, so default-import then destructure:
 *
 *   import playwright from '<absolute path from `node -e "console.log(require.resolve(\'playwright\'))"`>'
 *   const { chromium } = playwright
 */

const HL_COLOR = '#f59e0b'
const HL_FILL = 'rgba(245,158,11,.12)'

/**
 * Burn a caption into the frame. Fixed to the bottom at max z-index, so it survives modals,
 * overlays and any banner the app fixes to the viewport.
 */
export async function caption (page, title, subtitle = '') {
  await page.evaluate(({ title, subtitle }) => {
    let bar = document.getElementById('__demo_caption')
    if (!bar) {
      bar = document.createElement('div')
      bar.id = '__demo_caption'
      bar.style.cssText = [
        'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:2147483647',
        'background:rgba(17,24,39,.94)', 'color:#fff', 'padding:14px 22px',
        'font:600 19px/1.35 -apple-system,Segoe UI,Roboto,sans-serif',
        'box-shadow:0 -4px 18px rgba(0,0,0,.25)', 'pointer-events:none'
      ].join(';')
      document.body.appendChild(bar)
    }
    bar.innerHTML = `<div>${title}</div>` +
      (subtitle ? `<div style="font-weight:400;font-size:15px;opacity:.85;margin-top:4px">${subtitle}</div>` : '')
  }, { title, subtitle })
}

/**
 * Outline the element the caption is talking about. Clears the previous highlight first, so the
 * frame can never show two claims at once.
 */
export async function highlight (page, locator) {
  await clearHighlight(page)
  const handle = await locator.elementHandle()
  if (!handle) return
  await page.evaluate(el => {
    el.setAttribute('data-demo-hl', '1')
    el.style.outline = '3px solid #f59e0b'
    el.style.background = 'rgba(245,158,11,.12)'
  }, handle)
}

/**
 * Highlight one column of a table: its header plus the first `rows` body cells at that index.
 * `tableSelector` defaults to the first table on the page.
 */
export async function highlightColumn (page, tdIndex, rows = 5, tableSelector = 'table') {
  await page.evaluate(({ tdIndex, rows, tableSelector, color, fill }) => {
    document.querySelectorAll('[data-demo-hl]').forEach(el => {
      el.style.outline = ''; el.style.background = ''; el.removeAttribute('data-demo-hl')
    })
    if (tdIndex < 0) return
    const table = document.querySelector(tableSelector)
    if (!table) return
    const mark = el => {
      if (!el) return
      el.setAttribute('data-demo-hl', '1')
      el.style.outline = `3px solid ${color}`
      el.style.background = fill
    }
    mark(table.querySelectorAll('thead th')[tdIndex])
    ;[...table.querySelectorAll('tbody tr')].slice(0, rows)
      .forEach(tr => mark(tr.querySelectorAll('td')[tdIndex]))
  }, { tdIndex, rows, tableSelector, color: HL_COLOR, fill: HL_FILL })
}

export async function clearHighlight (page) {
  await page.evaluate(() => {
    document.querySelectorAll('[data-demo-hl]').forEach(el => {
      el.style.outline = ''; el.style.background = ''; el.removeAttribute('data-demo-hl')
    })
  })
}

/**
 * Resolve a column index from its header text, at runtime. A hardcoded index that drifts between
 * two views turns every caption into a lie.
 */
export async function columnIndex (page, headerText, tableSelector = 'table') {
  return page.evaluate(({ headerText, tableSelector }) => {
    const table = document.querySelector(tableSelector)
    if (!table) return -1
    return [...table.querySelectorAll('thead th')]
      .findIndex(th => th.innerText.trim().toLowerCase().includes(headerText.toLowerCase()))
  }, { headerText, tableSelector })
}

/**
 * The receipt log. One entry per scene, printed as it happens so a run that dies part-way still
 * tells you which scenes were proven. `summary()` gives the block to paste into the report.
 */
export function receipts () {
  const rows = []
  return {
    rec (id, claim, pass, detail = '') {
      rows.push({ id, claim, pass, detail })
      console.log(`[${pass ? 'PASS' : 'FAIL'}] ${id} — ${claim}${detail ? ' :: ' + detail : ''}`)
      return pass
    },
    all: rows,
    allPass: () => rows.every(r => r.pass),
    summary () {
      const lines = ['=== RECEIPTS ===']
      rows.forEach(r => lines.push(`${r.pass ? 'PASS' : 'FAIL'}  ${r.id}  ${r.claim}  ::  ${r.detail}`))
      lines.push(`ALL_PASS=${rows.every(r => r.pass)}`)
      return lines.join('\n')
    }
  }
}

/**
 * Fail the run if the recording ever mutates anything. By default every non-GET request counts as a
 * mutation, which is the right bar for a read-only walkthrough; narrow it with `patterns` when the
 * flow legitimately writes, and exempt known-safe endpoints with `allow`.
 *
 * Assert `guard.violations.length === 0` in the summary — that is what lets the report state
 * "nothing was submitted" as a fact rather than an intention.
 */
export function mutationGuard (page, {
  methods = ['POST', 'PUT', 'PATCH', 'DELETE'],
  patterns = null,
  allow = []
} = {}) {
  const violations = []
  page.on('request', r => {
    const url = r.url()
    if (allow.some(p => p.test(url))) return
    const hit = patterns ? patterns.some(p => p.test(url)) : methods.includes(r.method())
    if (hit) violations.push(`${r.method()} ${url}`)
  })
  return { violations }
}

/**
 * Count the line boxes an element's text occupies. 1 means it fits on one line — the only reliable
 * way to prove "the value is not wrapping" without eyeballing a screenshot.
 */
export async function textLineCount (page, locator) {
  const handle = await locator.elementHandle()
  if (!handle) return 0
  return page.evaluate(el => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    let max = 0
    while (walker.nextNode()) {
      const n = walker.currentNode
      if (!n.textContent.trim()) continue
      const range = document.createRange()
      range.selectNodeContents(n)
      max = Math.max(max, range.getClientRects().length)
    }
    return max
  }, handle)
}
