---
name: buy-the-best
description: Guided process for choosing the best product to buy among competing brands, models, and prices.
disable-model-invocation: true
---

# Buy the best

Turn an open-ended "which X should I get?" into one defensible pick by running the
same five steps every time. The agent's default is to recall three product names and
crown one — this skill replaces that reflex with a **brief**, a **sourced** comparison,
and the **catch** behind each contender.

Two rules hold across every step:

- **Sourced, not recalled.** Every price and spec comes from a search result or a
  product/retailer page opened *now*, carrying its URL and date. Prices and
  availability go stale, and your memory of them is already stale. Never state a price
  from memory.
- **Measured against the brief.** "Best" is meaningless in the abstract — a $2000 AVR
  is "best" only if the brief needs what the extra $1000 buys. Every judgement is "best
  *for this brief*", led by the one criterion the user ranked first.

## Step 1 — Pin the brief

Interview the user first. Do **not** search until the brief is written down and the
user has confirmed it.

Elicit and record:

- **Budget** — a ceiling, and whether it's hard or stretchable.
- **Use case** — what it's actually for, and the room / setup / devices it plugs into.
- **Must-haves** — non-negotiable features ("HDMI 2.1 4K120", "must drive 4-ohm speakers").
- **Deal-breakers** — what disqualifies a candidate outright.
- **The deciding criterion** — the single thing that breaks a tie (sound quality? price?
  longevity? features? resale?). Force a rank. "All of them" is not an answer.

Completion criterion: a brief with a budget ceiling, at least one must-have, and exactly
one top-ranked deciding criterion, **confirmed by the user**.

## Step 2 — Build the candidate set

Search for real, currently-sold candidates — do not list from memory. Cast wide, then
cut to 3–5 contenders that clear every must-have and every deal-breaker.

Deliberately include the value angles the default skips:

- **Last generation** — last year's model, often the value pick once the new one ships.
- **Open-box / refurb / B-stock** from reputable sellers.
- **The dependency** — what the product needs to actually work (speakers need an amp; an
  AVR needs the right HDMI spec; a camera body needs lenses). Fold its cost in here, not later.

Completion criterion: 3–5 candidates, each with a current **sourced** price (URL + date)
and each confirmed to clear the must-haves.

## Step 3 — Compare like-for-like

Build one table: rows are candidates, columns are the brief's criteria with the deciding
one first. Specs are **sourced** from product pages, not from marketing summaries. Compare
equivalents — same channel count, same tier, same warranty terms — not a flagship against
a budget model.

Completion criterion: every candidate scored on every brief criterion, deciding criterion
in the first column.

## Step 4 — Find the catch

Every product has one. For each finalist, hunt the real downside — owner reviews,
professional reviews, complaint threads, known reliability faults — not the spec sheet.

Discount these as evidence:

- Affiliate "best of 2026" listicles — they rank by commission, not quality.
- Five-star reviews with no specifics, and bursts of identical phrasing (incentivized or fake).

Weight specifics over scores: one detailed owner report of a real fault outweighs a
hundred "works great" ratings.

Completion criterion: each finalist carries at least one named, **sourced** downside — or
an explicit "no significant catch found; checked X, Y, Z".

## Step 5 — Recommend

Deliver:

- **The pick** — one product, justified by the brief's deciding criterion.
- **The runner-up** — and the single condition under which it wins instead ("if you can
  stretch $200", "if you don't need the 11.4-channel").
- **Total cost** — the product plus the dependency and any accessories from Step 2.
- **Timing** — flag any imminent sale or new-model release that should change *when* to buy.

Completion criterion: one named pick, tied to the deciding criterion, with its catch
stated and total cost shown.
