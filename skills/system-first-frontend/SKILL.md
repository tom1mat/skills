---
name: system-first-frontend
description: Building or reviewing UI inside an established design system — keeping it coherent by reusing components and tokens rather than inventing per screen. Use when creating product UI, adding a component, or auditing UI for design-system conformance. Reach for it when a feature or page flow hits its UI step. For one-off distinctive visual design with no system yet, use frontend-design instead.
---

# System-first frontend

**Extend the system, don't invent.** In a product with an established design system, the UI is good because every screen looks like it came from the same hand — not because any one screen is clever. Your job is to keep that true: reach for what already exists, configure it through tokens, and add to the system in the one place the system lives. Boldness goes into the system once; screens stay quiet and consistent.

This is the opposite job from `frontend-design`. That skill invents a distinctive look for greenfield work and rewards aesthetic risk. Here there is already a system, and risk taken per-screen reads as inconsistency. If there is no system yet, you are in the wrong skill — use `frontend-design`. If there is, read on.

A concrete realisation of every principle below — a real warm, opinionated system — is in [CASE-STUDY.md](CASE-STUDY.md). Read it when a principle feels abstract and you want to see it landed.

## The principles

These are the whole skill. **Building** applies them; **Reviewing** checks them. Same source, two directions — so each principle states the rule, why it holds, and how to spot its violation.

### 1. Extend the system, don't invent
One component library is the single source of truth, and **one canonical component per control** — one segmented tab, one button, one card. When you need something new, extend the canonical component (a prop, a variant, a tone) rather than hand-rolling a one-off beside it. *Why:* every fork is a second thing to restyle forever, and the first place consistency rots. *Violation:* bespoke markup that duplicates a control the system already owns; two components doing the same job differently.

### 2. Token-first, layered
Visual values live in a layered token system — **primitives** (raw palette) → **semantic** (canvas, surface, ink, line, accent) → **scale** (radius, shadow, space, type, motion) — and components read *semantic and scale* tokens only. No raw hex, no magic pixels in component styles. *Why:* one token edit re-skins the whole app; raw values are a thousand edits. *Violation:* an arbitrary colour or px literal in a component (this is lintable — treat it as a lint failure even by eye).

### 3. One contextual accent, set once
A single accent token carries identity for a region. Set it once on a wrapper attribute (e.g. `data-context`) and the whole interior re-tints — no prop drilling. Colour encodes **identity / place** (which area you are in), never transient state (don't colour-code offer-vs-need). Interpolate the accent on change so switching regions feels like moving rooms, not repainting. *Why:* identity-colour is learnable and calm; state-colour multiplies meanings onto one channel. *Violation:* a component hardcoding a region's colour; colour standing in for state; a hard cut on context change.

### 4. Invariant shell, divergent interior
Decide once what is **locked everywhere** — global navigation, typography, dark mode, base palette — and what each area may **specialise**: its feed layout, accent, filters, empty states, microcopy. Coherence comes from the invariant shell; usefulness comes from local divergence. *Why:* people learn the frame once and then trust it everywhere. *Violation:* a region overriding global chrome; or, inversely, two regions reinventing the same primitive instead of sharing it.

### 5. Atomic layering, downward-only
Components form tiers — atoms → molecules → organisms — and dependencies point **down only**. An atom never imports an organism. *Why:* keeps the system navigable and free of cycles, so a primitive can change without a ripple back up. *Violation:* an upward or sideways dependency between tiers.

### 6. One signature, applied with restraint
Pick a single memorable motif and apply it in a few deliberate places. Extend it, never fork it; **cap its placements**. The boldness of the product lives in this one signature; everything around it stays quiet. *Why:* a signature repeated sparingly is identity; the same flourish scattered is noise. *Violation:* decorative flourishes with no system behind them; the motif copied into a divergent variant; placement creep.

### 7. Motion is tokenised and restrained
Durations and easings are tokens, and motion comes in a small fixed set of families (entrance, tactile feedback, contextual tween, a little delight) rather than ad-hoc per component. **Reduced motion is first-class:** every animation no-ops under `prefers-reduced-motion`, and **content is never gated behind animation** — the initial / server render always shows it. *Why:* tokenised motion stays coherent and performant; gated content breaks for the people who most need it visible. *Violation:* ad-hoc durations; an animation that hides content until it runs; no reduced-motion path.

### 8. Words are design material
Maintain a ubiquitous-language glossary and name UI by **what the user controls and recognises**, not by how it is built. An action keeps the same name across the whole flow (the button that says *Publish* yields a *Published* toast). Empty and error states give direction in the interface's voice, not an apology. *Why:* consistent vocabulary is the signposting people navigate by. *Violation:* synonyms for one concept; system-speak labels; an action that renames mid-flow; a dead-end empty state.

### 9. Accessibility floor
Non-negotiable, built without announcing it: visible keyboard focus (use the accent), semantic HTML, responsive down to mobile, reduced motion respected. *Why:* it is the floor, not a feature. *Violation:* focus you cannot see, div-as-button, horizontal overflow on mobile, motion that ignores the preference.

## Building

When creating UI, work the principles in order:

1. **Start from the system.** Find the canonical component for each control you need (principle 1). Only when none exists do you add one — in the system, as a new component/variant, not inline.
2. **Wire with tokens.** Compose with semantic + scale tokens; no raw values (principle 2).
3. **Set the context.** Put the region's accent on the wrapper once; let the interior inherit (principle 3). Respect what the shell locks (principle 4).
4. **Layer correctly.** Place any new component at the right tier with downward-only deps (principle 5).
5. **Add motion last and sparingly.** Token families only; reduced-motion no-op; content visible without it (principles 6–7).
6. **Write the copy** as you place it — user-facing names, consistent action vocabulary, directional empty/error states (principle 8).
7. **Clear the floor** (principle 9).

**Done when:** every surface is built from existing components and tokens, no bespoke control was hand-rolled beside an existing one, any new component was added to the system at the correct tier, and the accessibility floor is cleared.

## Reviewing

Walk **every principle (1–9) against every changed surface** — not a sample, not "a few findings." For each hit, name the principle and the violation, and point at the fix (which canonical component, which token, which tier). A finding is concrete or it is noise.

**Done when:** all nine principles have been checked against all changed surfaces, each violation is reported with its principle named and a fix pointed to, and surfaces that pass are stated as passing so the coverage is visibly exhaustive.
