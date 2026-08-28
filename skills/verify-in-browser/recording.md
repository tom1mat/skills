# Record the proof as a captioned video

For handing verification to someone who will not read a report. This is the one branch of this skill that leaves `mcp__chrome-devtools__*`: video needs Playwright's `recordVideo`, driven from a throwaway script.

A recording is proof only if every **scene** — one caption plus the state it describes — carries a **receipt**: an assertion, run at that moment, checking the same claim the caption makes. Narration written after the fact is a demo, not evidence. Helpers for all of it: [`scripts/demo-helpers.mjs`](scripts/demo-helpers.mjs) — `caption`, `highlight`, `highlightColumn`, `receipts`, `mutationGuard`, `textLineCount`.

## Finding Playwright

Prefer the copy the repo already has, so the browser build matches the one its own suite uses:

```bash
node -e "console.log(require.resolve('playwright'))"      # run from the repo, or its e2e package
```

Where the repo has none, `npx playwright@latest` works, and `npx playwright install chromium` fetches the browser once. Import by **absolute path** — ESM resolves relative to your script, not to the repo — and default-import before destructuring, because the package is CommonJS.

## Harness

```js
import playwright from '<absolute path from require.resolve>'
const { chromium } = playwright

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1500, height: 900 },
  recordVideo: { dir: OUT_DIR, size: { width: 1500, height: 900 } }   // match the viewport or it scales
})
```

Output is **webm/VP8 only** — the bundled ffmpeg has no mp4 muxer. Do not try to transcode; say so when handing the file over, since QuickTime and Safari cannot play it while Chrome, Firefox and Slack can.

The video is written on `context.close()`. A script that throws before that leaves nothing, so let the run finish even when an assertion fails — record the failure in the receipts and close cleanly.

Write the script to a scratch dir, outside the repo. Reuse it: a second AC block is a new scene list against the same harness, and a `verify({ label, ... })` function beats copy-paste.

## Scene rules

Each of these produces a misleading video when ignored.

- **Change the caption in the same beat as the state it describes.** A caption that outlives its modal is a false still to anyone who scrubs rather than watches. Never `click(close)` → `sleep` → `caption()`; do `click(close)` → `caption()` → `sleep`.
- **Put anything you cannot dismiss in the final scene.** Some dialogs have no reachable close, so opening one ends the run wherever it sits.
- **4–7 s per scene.** Under 4 s is unreadable; a title card carrying context wants 6 s.
- **One highlight at a time.** `highlight` clears the previous outline for exactly this reason.
- **Say what a "was failing" caption is quoting.** The video shows the current build only. Captioning a prior verdict as though it were filmed history invents a before-state. Name it as the earlier report's wording, and offer a real before/after — check out the base commit, record twice — when that is what is wanted.
- **Label the opening seconds.** Setup and login are recorded too. Unlabelled, they read as part of the feature.

## Selectors that hold up

- **Pin a row by its visible key plus a discriminator.** One key can legitimately map to several records, so a key-only locator can grab the wrong one and pass for the wrong reason.
- **Match on the underlying value, not the formatted one.** A value rendered with an en-dash or a non-breaking space does not match its ASCII form.
- **Resolve column indices from header text at runtime.** Two views are not guaranteed to share a layout, and a hardcoded index that drifts turns every caption into a lie.
- **Absence of a role is not absence of the element.** A button a role query cannot see may be plainly visible in the frame. Trust the click inventory and the request log over a zero count.

## Verify the recording yourself

The receipts prove the assertions. They say nothing about what the video *looks* like, and the two defects this check reliably catches — a caption outliving its modal, a modal never painted — are invisible in the logs.

Extract frames across the timeline and read them:

```bash
FF=$(ls ~/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac 2>/dev/null || ls ~/.cache/ms-playwright/ffmpeg-*/ffmpeg-linux)
for t in 10 20 30 40 50; do "$FF" -v error -ss $t -i in.webm -frames:v 1 -c:v png f$t.png -y; done
```

`-c:v png` is required — that ffmpeg build has no mjpeg encoder, so `.jpg` fails with "Encoder not found". Sample every scene, then narrow to 1 s steps around each transition, which is where caption and state fall out of step.

Done when every scene's caption matches its frame, `allPass()` is true, and the mutation guard recorded zero violations.

## Hand-off

Ship the video, per-scene stills pulled from it (`-ss <t>` at each scene), and a results file: the receipts table, the user and gate, and the caveats — anything the recording does **not** cover (a flow stopped at a dialog, assertions covering only the first page), plus any pre-existing defect visible in frame, attributed to the commit that introduced it so nobody reads it as new.
