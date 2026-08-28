# Extracting diffably

A screenshot proves a screen existed. An extraction proves what was on it, survives a re-run, and diffs against a baseline. Reach for a screenshot as the *record*, and for an extraction as the *evidence*.

Every recipe here is one `mcp__chrome-devtools__evaluate_script` call returning JSON. Pass `waitForStableDom: false` when the script only reads, and `filePath` when the output is large enough to be worth a file rather than the transcript.

## Lists and cards

Where there is no table, the repeating unit is whatever wrapper the items share. Derive it from the a11y snapshot rather than by guessing a class name, since class names in a compiled build are frequently hashed.

```js
async () => {
  const clean = el => el.innerText.replace(/\n+/g, ' | ').trim()
  return [...document.querySelectorAll('[data-testid="item"], li, article')]
    .map(el => ({
      text: clean(el),
      href: el.querySelector('a')?.getAttribute('href') ?? null,
      actions: [...el.querySelectorAll('button')].map(b => b.textContent.trim())
    }))
}
```

`actions` is the payload that matters most often: a button quietly missing for one role, or present but disabled, is the whole finding in a permissions change.

## Form state

The rendered value and the form value drift apart, and it is the form value that gets submitted.

```js
async () => [...document.querySelectorAll('input, select, textarea')].map(el => ({
  name: el.name || el.id,
  type: el.type,
  value: el.type === 'checkbox' || el.type === 'radio' ? el.checked : el.value,
  disabled: el.disabled,
  required: el.required,
  invalid: el.getAttribute('aria-invalid') === 'true',
  described: el.getAttribute('aria-describedby')
}))
```

`invalid` plus `described` catch a validation message that renders but is never wired to its field, which no screenshot shows.

## Computed style, wrapping and overflow

For anything phrased as "it should not wrap", "it should be truncated", "the badge should be red", assert the computed value rather than reading a picture.

```js
async () => {
  const el = document.querySelector('<selector>')
  const cs = getComputedStyle(el)
  const range = document.createRange()
  range.selectNodeContents(el)
  return {
    lines: range.getClientRects().length,          // 1 means it fits on one line
    overflowing: el.scrollWidth > el.clientWidth,
    color: cs.color,
    background: cs.backgroundColor,
    truncated: cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth
  }
}
```

`lines` is the only reliable proof that a value is not wrapping. Counting `<br>` tags or newlines misses wrapping done by the layout engine, which is the kind that actually happens.

## The payload behind the value

When a rendered value looks wrong, decide whether the bug is in the data or in the rendering *before* reporting it. They live in different files and belong to different people.

```js
async () => {
  const res = await fetch('<the endpoint the page called>', { headers: { accept: 'application/json' } })
  return { status: res.status, body: await res.json() }
}
```

`mcp__chrome-devtools__list_network_requests` shows what the page actually called, and `get_network_request` gives one response in full. Prefer them over a re-fetch when the call carried state you cannot reproduce.

## Console errors

Cheap, and frequently the real story behind a surface that renders blank.

`mcp__chrome-devtools__list_console_messages` after the surface settles. A React or Vue key warning, a failed dynamic import, a CSP violation — each explains a blank screen that otherwise looks like a backend problem. Include the count in the report even when it is zero: "no console errors" is a finding.

## Structure, cheaply

`mcp__chrome-devtools__take_snapshot` returns the a11y tree as text. Saved to a file per surface with `filePath`, two snapshots diff directly, and the diff is a readable summary of what a change did to the structure of a page. This is the fastest before/after available, and it needs no bespoke script.

## Diffing two extractions

Write each to a file and diff them. Holding both in the transcript and comparing by eye is how a changed row gets missed.

```bash
diff -u before.json after.json
```

Keep the key order stable between runs — build the object with literal keys in a fixed order rather than from `Object.keys` of something whose order the app controls, or the diff fills with noise that hides the real change.

## What to extract when the AC is vague

"It should look right" becomes three questions with extractable answers: what is present that was not, what is absent that was, and what changed value. Extract the same shape for the control surface and expect all three to be empty there.
