# verify-in-browser

A [Claude Code](https://claude.com/claude-code) skill for proving a change in a real browser instead of in tests — visual and behavioural ACs, before/after captures, reproducing something that only renders for a certain user or feature flag, and captioned video proof for people who will not read a report.

Framework- and repo-agnostic. The skill holds the method; every repo-specific fact lives in a per-repo **profile** it builds on first run and reuses afterwards.

## Install

```bash
git clone <this repo> ~/.claude/skills/verify-in-browser
```

It needs the Chrome DevTools MCP server:

```bash
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest --no-usage-statistics
```

Then ask Claude to verify something in the browser, or type `/verify-in-browser`.

The video branch additionally needs Playwright, which it resolves from the repo under test where possible.

## How it works

Seven steps, each ending on a checkable condition:

1. **Load or build the profile** — the repo's start command, session path, identity oracle, gates.
2. **Name the gate** — what makes each surface visible: auth, role, feature flag, entitlement, data shape.
3. **Bring the app up** — start each process, poll readiness rather than assuming it.
4. **Get a session in a clean room** — a fresh isolated browser context, identity confirmed against an oracle.
5. **Extract, diffably** — structured JSON per surface, not a screenshot to squint at.
6. **Report** — findings separated from environment artefacts, control surface included.
7. **Record** — optional captioned video where every scene carries an assertion.

## The profile

Discovery is the expensive part, so it happens once. The profile records six fields: `app`, `session`, `oracle`, `gates`, `surfaces`, `artefacts`. It is written to `.claude/verify-in-browser.md` in the repo under test, or to `~/.claude/browser-profiles/<repo>.md` where a file must not be added to that repo.

Committing it makes it the answer for the whole team, and for the next agent session, which remembers nothing.

## Layout

| file | what it holds |
| --- | --- |
| `SKILL.md` | the seven-step method |
| `profile.md` | what a profile records, and how to discover each field |
| `extraction.md` | recipes: tables, lists, form state, computed style, payloads, console, diffing |
| `troubleshooting.md` | symptom → cause → fix for the failures that imitate bugs |
| `recording.md` | the Playwright video harness, scene rules, frame check |
| `scripts/demo-helpers.mjs` | `caption`, `highlight`, `columnIndex`, `receipts`, `mutationGuard`, `textLineCount` |

## Design notes

Two ideas do most of the work.

**Extraction over screenshots.** A screenshot proves a screen existed; an extraction proves what was on it, diffs against a baseline, and survives a re-run.

**Every claim carries a receipt.** In a report that means the control surface alongside the changed one. In a video it means an assertion running at the moment of the caption that checks the same claim, so the recording is evidence rather than narration.
