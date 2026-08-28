---
name: verify-in-browser
description: Use when a change has to be proven in a real browser rather than in tests — checking a visual or behavioural AC against a locally running app, capturing before/after of a screen, reproducing something that only renders for a certain user, role or feature flag, or recording a captioned video of a flow for someone who will not read a report. Also when the app needs bringing up and a session minting before any of that. Framework- and repo-agnostic: it learns each repo's start command, session path and gates once, then reuses them.
---

# Verify a change in the browser

Produce **proof**: a *diffable* extraction plus screenshots showing the change renders as specified, for a user who can actually see it, on the changed surface *and* on an unchanged **control** surface.

Drive the browser with `mcp__chrome-devtools__*`. Recording a video ([step 7](#7-record-the-proof-when-someone-has-to-watch-it)) is the one branch that leaves those tools, because video needs Playwright. Durable specs are a different job and belong in the repo's own e2e suite.

This skill holds the *method*. Every repo-specific fact it needs — start command, ports, session path, identity oracle, gate mechanism — lives in a **profile** that step 1 loads or builds, so the second run in a repo skips the discovery.

Point it at localhost, or at a test environment the user named in this conversation. Never at a production hostname. Read credentials from wherever the repo already keeps its test fixtures, at the moment of use, and keep them out of files, command lines and reports.

When something unexpected happens — a proxy error, a 401, a blank screen, a session that vanishes — read [`troubleshooting.md`](troubleshooting.md) before improvising. Most of those symptoms have one known cause.

> Working in `frontends/product`? Use `verify-product-frontend` instead. It carries that stack's ports, kproxy setup, persona mechanics and its own troubleshooting table, all of which this skill deliberately does not know.

## 1. Load or build the profile

Read [`profile.md`](profile.md). If a profile exists for this repo, load it and go to step 2.

If none exists, build it now by reading the repo rather than by trying things in a browser: the start command, the readiness check, how a session is obtained, which request or element names the logged-in user, and how feature visibility is decided. Discovery is cheap in a file and expensive in a browser.

Done when you hold a profile naming, at minimum, the start command, the app URL, the readiness check, the session path and the identity oracle — and it is written to disk, not just held in your head.

## 2. Name the gate before touching a browser

Whether the change is reproducible at all is decided before the browser opens. For every surface under test — changed *and* control — classify what makes it visible: open to any visitor, gated on authentication, gated on a role or permission, gated on a feature flag or entitlement, or gated on the shape of the data.

Read the gating code. A guess here costs a whole debug cycle, because a gate that is off renders the old screen and your change is simply not there — a user problem wearing the costume of a bug.

Done when, for every surface, you can name its gate and the user that satisfies it.

## 3. Bring the app up

Run the profile's start command. Background each process, and keep its log where you can read it — the log is where a misconfigured port confesses.

Poll for readiness; never assume it. A first build can take minutes, and a process that has started is not a process that is serving.

```bash
curl -s -o /dev/null -w '%{http_code}\n' "$APP_URL"     # want 200
```

Background processes started in an earlier session die with that session. Re-check the ports at the start of every session rather than trusting a note that says the stack is up.

Done when the readiness check passes for every process the profile lists.

## 4. Get a session in a clean room

Navigating a login path in a context that already holds a session silently keeps the **old** user. Always a **clean room**: `mcp__chrome-devtools__new_page` with a fresh `isolatedContext` name. Pages sharing a context name share cookies and storage; pages in different ones are fully isolated.

Then `take_snapshot` for element uids and drive whatever the profile's session path is — a login form, a magic link, a seeded cookie, a token written to storage. Clear any interstitial the app puts in front of the first usable screen; until that is done the session often is not really established.

Confirm identity against the **oracle**, never against the fact that navigation succeeded:

```js
async () => (await fetch('/api/me')).json()   // assert on the identity field; path comes from the profile
```

Where the app exposes no such endpoint, the oracle is a DOM element that names the current user. Assert on it by text, and record which it was in the report.

Done when the oracle returns the intended user.

## 5. Extract, diffably

`resize_page` first, so every capture in the run shares one viewport.

Structured data beats eyeballing a screenshot: it diffs, it survives a re-run, and it catches what an eye slides over. One `evaluate_script` can answer layout, content and interactivity at once. For a table:

```js
async () => {
  const table = document.querySelector('table')
  const clean = el => el.innerText.replace(/\n+/g, ' | ').trim()
  return {
    headers: [...table.querySelectorAll('thead th')].map(th => ({
      label: clean(th),
      sortable: !!th.querySelector('button')
    })),
    rows: [...table.querySelectorAll('tbody tr')].map(tr =>
      [...tr.querySelectorAll('td')].map(clean))
  }
}
```

`\n` → ` | ` keeps a two-line cell legible in one string, which is what makes the output diffable. `sortable` is the presence of a `<button>` inside the `th` — that single check surfaces sorting silently disabled on one view but not another.

[`extraction.md`](extraction.md) has the recipes for lists and cards, form state, computed style and wrapping, the network payload behind a rendered value, console errors, and how to diff two extractions.

Navigating within the app: find the control by its text, click it, then `wait_for` the text you expect on the other side. A blind delay is a flake. Re-extract after the wait.

`take_screenshot` with `filePath` for the visual record.

Done when you hold, per surface, one extraction and one screenshot — for the change *and* for the control.

## 6. Report

Per surface: the user and the gate it satisfied, the baseline-versus-change extraction diff, and the screenshot paths. Include the control surface even though nothing about it changed — that is what proves you did not regress it.

**Separate environment artefacts from findings.** A local stack fails in ways that imitate real bugs: a session dropped on reload, a proxy 504, a click lost during navigation. When the behaviour under test is *itself* an auth, navigation or loading failure, the artefact is indistinguishable from the bug at a glance, and filing it as a reproduction is worse than filing nothing. Before writing any symptom into a result, say what triggered it. If the answer is "a reload" or "a click I fired mid-navigation" rather than the user action under test, it is yours, not the product's — say so in the report so nobody re-files it.

The same discipline covers a selector that quietly matched the wrong thing. Where one visible key can legitimately map to several records, pin the element by that key **plus** a discriminator, and re-check any surprising outcome against the API payload before calling it a failure.

Then update the profile with anything this run taught you: a new surface URL, a gate you had to satisfy, an artefact you hit. That is what makes the next run in this repo short.

Done when the report distinguishes findings from artefacts, and the profile is updated.

## 7. Record the proof, when someone has to watch it

An extraction and a screenshot convince a reviewer who reads. Someone signing off an AC usually will not — a captioned recording of the flow does that job instead.

Follow [`recording.md`](recording.md): the Playwright harness, the scene rules, and the frame check that catches what assertions cannot see. Its one non-negotiable idea is that every **scene** carries a **receipt** — an assertion run at that moment, checking the same claim the caption makes — so the video is evidence rather than narration.

Done when every scene's caption matches its extracted frame, every receipt passed, and the mutation guard recorded zero violations.
