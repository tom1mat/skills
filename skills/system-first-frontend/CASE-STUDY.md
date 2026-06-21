# Case study: a warm, opinionated system

This is one real system that lands every principle in `SKILL.md`. It's a community marketplace built around **Sections** — self-contained workspaces (Buy/Sell, Accommodation, Events…), each with its own navigation, accent, and default view, all sharing one global shell. Use it to see the principles realised; the principles, not these specifics, are what transfer.

## The system, one source — *principle 1*
The entire UI is built **only from the kit**: one shared component library, one canonical component per control. There is exactly one segmented tab (a sliding-indicator `SlidingTabs`), one button, one card — reused everywhere a tab/button/card is needed. New needs are met by adding a prop/variant to the canonical component, never by hand-rolling a twin. The rule is enforced: a custom lint rule fails the build on raw colours and px/rem literals in component class names, so "build from the system" is mechanical, not aspirational.

## Token-first, three tiers — *principle 2*
- **Primitives** (`--p-*`): the raw palette — the only layer a theme picker edits.
- **Semantic**: `--canvas`, `--surface`, `--ink`, `--ink-muted`, `--line`, feedback colours, and a single contextual `--accent`.
- **Scale**: pill/card radii, soft warm shadows, the type and space scale, motion tokens.

Components read semantic + scale tokens only (`rounded-[var(--radius-card)]`, `bg-[var(--surface)]`, `text-[var(--ink)]`). A change to one primitive re-skins every button, badge, ring, and link at once. Typography is a single characterful display+body face used large and warm.

## One accent, set once, re-tints a workspace — *principle 3*
Colour encodes **which Section you're in**, never a post's offer/need state (that legacy state-colouring was explicitly retired). A `data-section` attribute on a wrapper overrides `--accent` / `--accent-soft` / `--accent-strong`, and *every* component inside reads `--accent` — so the button, tag, filter pill, and focus ring all adopt the Section's hue with zero prop drilling. The accent is registered with `@property … syntax:"<color>"`, so switching Sections **interpolates** the colour over a slow ease — it feels like walking into a different room.

## Invariant shell, divergent interior — *principle 4*
The **global layer** — top nav with a workspace-switcher dropdown, typography, dark mode, base palette, the notification bell, the "+ New" entry — is identical in every Section. Only the *inside* of a Section diverges: feed layout (cards vs map vs calendar vs directory), accent, Section-specific filters, post-form fields, empty states, microcopy. People learn the frame once and trust it everywhere; each workspace still gets the shape its content needs.

## Atomic layering — *principle 5*
Components sit in tiers with downward-only dependencies: **atoms** (Button, Badge, Avatar, Input/Field, Switch, Skeleton) → **molecules** (Card, Dialog, Sheet, Tabs, Toast, EmptyState, the sliding segmented tab) → **organisms** (PostCard, SectionNav, Filters, the post form). An atom never reaches up into an organism.

## One signature: the wave — *principle 6*
The product's single motif is a hand-built, pure-CSS **wave** (a surf-town identity). It appears in a few deliberate, capped placements — an animated footer, a first-load reveal that sweeps off once, "light on water" skeleton shimmers, a water-ripple tap feedback, and a small wave-tick under the active bottom-nav item — and nowhere else. Earlier, more decorative placements (wavy section dividers, per-section "depth of water" tints) were tried and **dropped** for adding noise without signal. The contract is explicit: *one motif, extend don't fork, cap placements.*

## Motion, tokenised and reduced-motion-first — *principle 7*
Motion tokens define durations (`--dur-quick/moderate/slow`) and easings (a tactile ease-out, a springy ease). Motion comes in a few families: entrance choreography (a staggered fade-rise `Reveal`), tactile controls (the sliding tab indicator, button hover-lift), the contextual accent tween, and small feedback delights. Two hard rules: every animation **no-ops under `prefers-reduced-motion`**, and the entrance reveal only animates once armed client-side — **the server render is always visible**, so content is never hidden behind motion.

## Words as design material — *principle 8*
A single canonical glossary (a `CONTEXT.md`) is the source for UI vocabulary: *Section*, *Global layer*, *Sub-view*, *Direction*, *Bundle* — named for what the user recognises, never for the schema. UI uses those exact words; an action keeps its name through the whole flow; empty states are an invitation to act, errors give direction in the interface's voice.

## The floor — *principle 9*
Focus states use the contextual accent (`focus-visible:ring-[var(--accent)]`), markup is semantic, layouts are mobile-first, and reduced motion is honoured throughout — present everywhere, announced nowhere.
