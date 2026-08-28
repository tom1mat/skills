# The repo profile

The profile is what makes this skill agnostic. The method is constant; the facts are not. Discover each repo's facts once, write them down, and every later run starts at step 2.

## Where it lives

Repo root, at `.claude/verify-in-browser.md`. Committed, it stops being your private note and starts being the answer for everyone — and for the next agent session, which remembers nothing.

Where a file must not be added to the repo — a checkout you do not own, a worktree that will be deleted — put it at `~/.claude/browser-profiles/<repo-dir-name>.md` instead, and say in the report where it went.

Check both paths before concluding there is no profile.

## What it records

Six fields. Anything you had to work out twice belongs in here.

| field | what it answers |
| --- | --- |
| **app** | the start command per process, the working dir, the ports, and the readiness check |
| **session** | how a browser gets an authenticated session, and where the test credentials live |
| **oracle** | the request or element that names the currently logged-in user |
| **gates** | how the app decides a feature is visible, and where that lives in code |
| **surfaces** | URL per screen already verified, plus a known-good control |
| **artefacts** | environment failures seen in this repo that imitate bugs |

## Discovering each field

Read, in this order, and stop at the first that answers: a project skill or `CLAUDE.md` / `AGENTS.md` covering how to run the app; then the environment as source of truth — `package.json` scripts, `Makefile`, `docker-compose.yml`, `Procfile`, `mise.toml`, `justfile`; then the README. The built-in `run` skill already encodes the per-project-type patterns for launching an app, so reach for it rather than re-deriving them here.

**app.** Name every process, not just the one that serves the UI. A frontend proxying to an API is two processes and one environment variable that binds them, and getting that variable wrong produces a 504 against a backend that is perfectly healthy. Record the readiness URL per process; a port that accepts a connection is not a server that answers.

**session.** Four shapes cover almost everything: a login form posted with fixture credentials, a magic or one-time link minted by a CLI, a cookie or token seeded directly into the context, or an auth provider stubbed in dev mode. Find which by reading the auth middleware and the e2e suite's setup — an existing e2e fixture has already solved this, and copying it beats inventing a fifth way. Record *where* the credentials live, never the credentials.

**oracle.** Grep for the endpoint the app itself calls to populate its user menu — `/me`, `/session`, `/api/user`, `whoami`. That is the oracle. Failing that, name the DOM element that displays the user. The oracle exists so that "I am logged in as the right user" is a fact you assert, not an assumption you inherit from a page that loaded.

**gates.** Find the helper the UI calls to decide whether to render — `hasFeature`, `can`, `isEnabled`, a policy object, a permissions hook, a flag-service client. Read the helper, not the call site: two gates that look identical at the call site often resolve through completely different mechanisms, one client-side and one server-side, and a surface can be gated twice by both. Record how to satisfy each, and how to *observe* it from inside the page — usually one line of `evaluate_script` reading the same store the helper reads.

**artefacts.** Grows one line at a time, per run, and is the field that saves the most future hours. An artefact recorded here is one you will recognise instead of re-diagnose.

## Template

```markdown
# verify-in-browser profile

## app
- start: `<command>` in `<dir>` — serves <url>
- start: `<command>` in `<dir>` — API on <port>; the client needs `<VAR>=<port>` or it proxies to the wrong place
- ready: `curl -s -o /dev/null -w '%{http_code}' <url>` → 200

## session
- <form login | magic link | seeded cookie | stubbed provider>: <the steps>
- credentials: `<path to the fixture file>` — read at point of use
- interstitial: <anything to dismiss before the app is usable>

## oracle
- `GET <path>` → assert on `<field>`
- fallback: the element reading `<text>` in the header

## gates
- mechanism: <flag service | role | entitlement | env var>, resolved by `<function>` in `<file:line>`
- observe from the page: `<one-line evaluate_script>`
- satisfying user: <who, and why they satisfy it>

## surfaces
- <name>: <url> — gate: <gate> — control: <url of an unchanged neighbour>

## artefacts
- <symptom> → <cause> → <what to do>
```

Keep it this short. A profile that grows into a manual stops being read.
