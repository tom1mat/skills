---
name: buy-the-best
description: Guided process for choosing the best product to buy among competing brands, models, and prices.
disable-model-invocation: true
---

# Buy the best

Turn an open-ended "which X should I get?" into one defensible pick by running the same
six steps every time. The agent's default is to recall three product names and crown one
— before even checking whether that *category* is the right answer to the user's actual
need. This skill replaces that reflex with a **grilled** brief, a **sourced** comparison,
a weighted verdict, and the **catch** behind each contender.

Three rules hold across every step:

- **Sourced, not recalled.** Every price and spec comes from a search result or a
  product/retailer page opened *now*, carrying its URL and date. Prices and availability
  go stale, and your memory of them is already stale. Never state a price from memory.
- **Measured against the brief.** "Best" is meaningless in the abstract — a $2000 AVR is
  "best" only if the brief needs what the extra $1000 buys. Every judgement is "best *for
  this brief*", led by the one criterion the user ranked first.
- **Weighted, not vibes-scored.** A verdict built from a named weight table beats one
  built from an impression of "which felt best overall" — see Step 3.

---

## Step 1 — Grill the brief

**Grill** the user before anything else — a real interview, not a form. Do **not** search
until the brief is written down and the user has confirmed it. Grilling mechanics matter
more than the topic list:

- **One question at a time.** Never dump the whole list in one message — ask, wait, then
  ask the next. A batch of six is bewildering; a single question is answerable.
- **Come with a recommended answer.** Don't hand a blank prompt — propose your best guess
  given what they've said ("my guess is this is for a home office, not a living room —
  right?"). Reacting to a proposal is faster than generating from nothing, and wrong
  guesses surface hidden constraints fast.
- **Look it up before you ask.** If a fact is discoverable (a spec, a price range, the
  current model year), find it yourself. Only ask what only they can answer: their need,
  budget, tolerance for tradeoffs.
- **Walk the decision tree in dependency order.** Some answers gate others — which room it
  goes in decides which size questions make sense. Resolve the gating question first, not
  in flat arbitrary order.
- **The decisions are theirs.** However confident the guess feels, put it to the user and
  wait for their actual answer before treating it as settled.

Grill through, in dependency order:

- **The need** — the underlying problem, and why now. Name the pain, not the product.
- **The category** — does the named product actually serve that need, or would an adjacent
  category, a cheaper class of thing, or no purchase at all serve it better? Propose your
  guess and let them confirm or switch — this gates everything after it.
- **Use case** — what it's actually for, and the room / setup / devices it plugs into.
- **Budget** — a ceiling, and whether it's hard or stretchable. Push once if the first
  answer sounds like a guess ("is that what you'd like to spend, or the most you'd
  tolerate?").
- **Must-haves** — non-negotiable features ("HDMI 2.1 4K120", "must drive 4-ohm speakers").
- **Deal-breakers** — what disqualifies a candidate outright.
- **The deciding criterion** — the single thing that breaks a tie (sound quality? price?
  longevity? features? resale?). Force a rank. "All of them" is not an answer.
- **The horizon** — how many years of satisfactory ownership this purchase needs to clear.
  Short-horizon commodity buys and 15-20-year keepers are graded differently in Step 5.

Finally, **pick the criteria set**: match the confirmed category against the criteria
sections below and name which one you're using for Steps 3-4. If nothing fits well, say so
and use the **General** fallback.

**Completion criterion:** a brief recording the underlying need, a confirmed category
decision (named product kept, switched, or a "no purchase" exit), a budget ceiling, at
least one must-have, exactly one top-ranked deciding criterion, an ownership horizon, and a
named criteria set — each put to the user one at a time with a recommended answer, and each
**confirmed by the user**, not assumed.

---

## Step 2 — Build the candidate set

Search for real, currently-sold candidates — do not list from memory. Cast wide — across
the adjacent categories Step 1 surfaced, not only the obvious one, and including the low-
or no-cost option where it's live — then cut to 3–5 contenders that clear every must-have
and every deal-breaker.

Deliberately include the value angles the default skips:

- **Last generation** — last year's model, often the value pick once the new one ships.
- **Open-box / refurb / B-stock** from reputable sellers.
- **The dependency** — what the product needs to actually work (speakers need an amp; an
  AVR needs the right HDMI spec; a camera body needs lenses). Fold its cost in here, not
  later.

**Completion criterion:** 3–5 candidates, each with a current **sourced** price (URL +
date) and each confirmed to clear the must-haves.

---

## Step 3 — Compare on the weighted matrix

Open the criteria section named in Step 1. It gives a default weight table and the
engineering sub-criteria that actually apply to this product type (a fridge is judged on
thermal design and hinges; a laptop on cooling and keyboard feel — don't force one set's
categories onto the other's product). Re-rank the weights so the brief's deciding criterion
sits highest, and confirm the adjusted weights with the user before scoring.

Build one table: rows are candidates, columns are the weighted criteria, deciding criterion
first. Specs are **sourced** from product pages, not marketing summaries. Compare
equivalents — same tier, same warranty terms — not a flagship against a budget model. Tag
every data point that isn't a plain spec (owner-report claim, professional-review verdict)
with a confidence rating:

- **A** — strong evidence from multiple independent sources.
- **B** — good evidence, minor uncertainty.
- **C** — limited evidence, one source.
- **D** — marketing claim or insufficient evidence — do not let a D-rated claim move the score.

**Completion criterion:** every candidate scored on every weighted criterion, deciding
criterion first, adjusted weights confirmed by the user, and every non-spec data point
carrying a confidence rating.

---

## Step 4 — Find the catch, keep the red-flag register

Every product has one. For each finalist, hunt the real downside — owner reviews,
professional reviews, complaint threads, known reliability faults — not the spec sheet. Log
what you find in a red-flag register: common failures, design flaws, recurring complaints,
parts shortages, software/firmware issues, safety concerns. A candidate with a *recurring,
well-sourced* design flaw is eliminated here regardless of its Step 3 score — a great matrix
score doesn't buy back a known failure mode.

Discount these as evidence (rate them D, keep them out of the register):

- Affiliate "best of 2026" listicles — they rank by commission, not quality.
- Five-star reviews with no specifics, and bursts of identical phrasing (incentivized/fake).
- Isolated one-off complaints (shipping damage, a single DOA unit) with no pattern behind them.

Weight specifics over scores: one detailed owner report of a real fault outweighs a hundred
"works great" ratings.

**Completion criterion:** each finalist carries at least one named, **sourced**,
confidence-rated register entry — or an explicit "no significant catch found; checked X, Y,
Z" — and any candidate eliminated for a recurring flaw is named as such.

---

## Step 5 — Risk-check and recommend

For each remaining finalist, name the single biggest risk as **likelihood / impact /
mitigation** (e.g. "likely: yes, minor — this model's known screen-uniformity issue;
mitigation: buy from a retailer with a no-quibble return window").

Before naming the pick, clear four gates — and say so out loud whenever one changes the answer:

- **No-purchase / cheaper-90%** — was a do-nothing option, or a materially cheaper one
  that's ~90% as good, actually weighed and ruled out?
- **Premium justified** — if the pick isn't the cheapest that clears the brief, name in
  concrete terms what the extra money buys.
- **Won't be outgrown** — the pick still fits over the brief's ownership horizon, not only today.
- **Would recommend it to family** — say plainly whether you'd tell a close friend or family
  member making this exact purchase to buy this exact product. If the honest answer is "no,
  but it's fine for a stranger," that's a reason to keep looking, not a caveat to bury.

Then deliver:

- **The pick** — one product, justified by the brief's deciding criterion and framed for
  *this* user ("if I were buying today for your setup, I'd take X, because…"), not a generic
  "best".
- **The runner-up** — and the single condition under which it wins instead ("if you can
  stretch $200", "if you don't need the 11.4-channel").
- **Total cost** — the product plus the dependency and any accessories from Step 2.
- **Timing** — flag any imminent sale or new-model release that should change *when* to buy.
- **Decision log offer** — ask if they'd like this run saved as a doc. If yes, follow the
  Decision Log Template below. Only write one if they say yes.

**Completion criterion:** one named pick, tied to the deciding criterion and framed against
the brief, all four gates cleared, its catch and biggest risk stated, total cost shown, and
a decision-log doc offered.

---

# Category criteria

Pick the one Step 1 named. Each gives a default weight table (re-rank so the brief's
deciding criterion sits first before scoring in Step 3), sub-criteria to check per
candidate, and red-flags to watch for.

## Major appliances

Fridges, washers, dryers, dishwashers, ovens, ACs, and similar 10-20-year durable goods
where mechanical engineering and long-term ownership dominate.

| Category                        | Weight |
| ------------------------------- | ------ |
| Reliability                     | 30%    |
| Quiet operation                 | 20%    |
| Repairability                   | 15%    |
| Day-to-day user experience      | 15%    |
| Build quality                   | 10%    |
| Energy efficiency               | 5%     |
| Ease of cleaning / maintenance  | 3%     |
| Smart features                  | 2%     |

Sub-criteria per candidate:

- **Engineering** — design and manufacturing quality, mechanical and electrical
  engineering, materials, thermal design.
- **Reliability** — known failure rates, component quality, manufacturing consistency,
  warranty experience, long-term (3+ year) ownership reports.
- **Repairability** — parts availability, exploded diagrams / service manuals, modular
  design, ease of servicing, expected repair cost, manufacturer support responsiveness.
- **User experience** — ease of operation, interface quality, ergonomics, daily usability,
  learning curve, whether extra features are actually used or just marketed.
- **Noise & refinement** — operating noise, vibration, mechanical refinement, tonal
  characteristics, intrusiveness in normal use.
- **Build quality** — materials, fit and finish, component robustness, hinge quality,
  structural rigidity, surface durability.
- **Energy efficiency** — annual consumption, operational efficiency, running costs.
- **Maintenance** — cleaning, consumables, filter replacement, ease and cost of upkeep.

*Owner-experience filter:* when reading owner reviews, ignore delivery, installation,
courier, and retailer complaints — none are about the product. Prioritise long-term
ownership reports, repeat-purchase intent, daily-experience notes, unexpected
annoyances/positives, and failure patterns.

*Lifetime satisfaction gate (for Step 5):* before naming the pick, the finalist should clear
these — any "no" is worth surfacing: Would you buy this again / recommend it to family? Will
it still be appreciated in 10-20 years given this category's lifespan? Does it solve a
genuine problem without unnecessary complexity? Does it justify its price — and would you
regret not spending more, or spending this much?

*Red flags:* common failures, design flaws, recurring complaints, poor manufacturer
support, reliability concerns, parts shortages, software issues (smart-appliance firmware),
safety concerns.

## Electronics & AV

TVs, home audio, headphones, cameras, and similar gear where the engineering that matters is
signal/optical quality and software longevity rather than mechanical durability.

| Category                                        | Weight |
| ----------------------------------------------- | ------ |
| Core performance (picture/sound/image quality)  | 25%    |
| Reliability                                     | 20%    |
| Software / firmware support longevity           | 15%    |
| Day-to-day user experience                      | 15%    |
| Build quality                                   | 10%    |
| Repairability                                   | 5%     |
| Noise (fan/coil whine, where applicable)        | 5%     |
| Ecosystem / accessory lock-in                   | 5%     |

Sub-criteria per candidate:

- **Core performance** — for TVs: panel type, motion handling, HDR brightness, viewing
  angles; for audio: driver/DAC/amp quality, frequency response, distortion at volume; for
  cameras: sensor/lens quality, autofocus reliability, low-light performance.
- **Reliability** — known failure modes (panel uniformity, capacitor/PSU failures,
  connector wear), warranty length, brand's repair-turnaround reputation.
- **Software/firmware** — years of updates actually delivered on prior models, whether core
  features live behind a subscription, whether the device still works well if the company's
  app or service is discontinued.
- **User experience** — remote/app usability, menu quality, setup friction, ergonomics.
- **Build quality** — materials, port quality, stand/mount sturdiness.
- **Repairability** — whether a real repair shop can fix a failure (often poor for sealed
  electronics — say so plainly rather than scoring it generously by default).
- **Noise** — fan noise under load, coil whine, only where the product runs actively.
- **Ecosystem lock-in** — proprietary accessories, cables, or app ecosystems the user would
  be tied into.

*Red flags:* panel/component defects reported at scale, recurring firmware bugs, features
pulled post-purchase, weak warranty support, planned-obsolescence patterns (forced updates
that degrade older hardware), safety recalls.

## Computers & PCs

Laptops, desktops, monitors, and peripherals, where thermal design, upgradeability, and
input quality dominate over raw spec-sheet comparisons.

| Category                              | Weight |
| ------------------------------------- | ------ |
| Reliability                           | 25%    |
| Performance for the stated use case   | 20%    |
| Repairability / upgradeability        | 20%    |
| Day-to-day user experience            | 15%    |
| Build quality                         | 10%    |
| Thermal / noise behaviour under load  | 5%     |
| Battery life (portables only)         | 5%     |

Sub-criteria per candidate:

- **Reliability** — known failure points (hinges, GPU solder joints, SSD firmware bugs),
  component-quality tier (VRM/PCB quality on motherboards), warranty terms, manufacturer
  support quality.
- **Performance** — matched to the brief's actual workload, not benchmark-chart peak numbers
  — a workload that never uses the extra cores shouldn't be scored on them.
- **Repairability / upgradeability** — RAM/storage user-replaceable or soldered, battery
  replaceable, official service manuals or right-to-repair score, parts availability, whether
  the manufacturer sells parts to consumers at all.
- **User experience** — keyboard/trackpad feel, display quality and calibration, port
  selection, OS experience out of the box, bloatware level.
- **Build quality** — chassis materials and rigidity, hinge quality on laptops, screen
  coating durability.
- **Thermal/noise** — sustained performance under load without throttling, fan noise and
  coil whine at typical load, not just idle.
- **Battery life** — real-world (not manufacturer-claimed) runtime for the stated use case,
  on portables only.

*Red flags:* recurring hardware failures (hinge cracks, GPU die/solder issues, swelling
batteries), thermal-throttling patterns under normal use, soldered components marketed as
upgradeable, weak driver/BIOS update history, discontinued parts availability.

## General (fallback)

Use when the product doesn't fit the sections above. Also the template to copy if spinning
up a new category mid-task — duplicate this, rename, swap in the sub-criteria that actually
matter for that product type.

| Category                        | Weight |
| ------------------------------- | ------ |
| Reliability                     | 30%    |
| Day-to-day usability            | 20%    |
| Repairability / serviceability  | 15%    |
| Build quality                   | 15%    |
| Cost of ownership               | 10%    |
| Efficiency / running cost       | 5%     |
| Maintenance burden              | 3%     |
| Extra features                  | 2%     |

Sub-criteria per candidate:

- **Reliability** — known failure rates, warranty length and what it actually covers,
  manufacturing consistency, long-term owner reports (3+ years old, not launch reviews).
- **Usability** — learning curve, ergonomics, how it fits the actual daily routine described
  in the brief.
- **Repairability** — parts availability, service manuals or teardown guides, whether a
  normal repair shop (not just the manufacturer) can fix it, expected repair cost.
- **Build quality** — materials, fit and finish, structural rigidity.
- **Cost of ownership** — consumables, accessories, subscriptions required to use the core
  function, resale value if that matters to the brief.
- **Efficiency** — energy/resource consumption if it's a running cost the user will notice.
- **Maintenance** — cleaning, filters, firmware updates, anything the user has to actively
  do to keep it working.

*Red flags:* common failures, design flaws, recurring complaints, poor manufacturer
support, parts shortages, software issues, safety concerns.

---

# Decision log template

Use only when the user says yes to saving a run as a doc (Step 5). Structure the doc with
these sections, in this order, filling each from what the run already produced — don't
re-derive, just organize:

1. **Executive Summary** — the pick, in one paragraph, with the deciding criterion.
2. **Requirements** — the Step 1 brief: need, category decision, use case, budget,
   must-haves, deal-breakers, deciding criterion, ownership horizon.
3. **Candidate List** — the 3-5 candidates from Step 2, each with sourced price (URL + date).
4. **Technical Comparison** — the weighted matrix from Step 3, in full.
5. **Engineering Assessment** — the engineering-specific sub-criteria from the loaded
   category section, scored per candidate.
6. **Owner Experience Summary** — the daily-use and long-term-ownership findings from Step
   4's research, filtered per the category's owner-experience filter where one exists.
7. **Repairability Assessment** — repairability/upgradeability sub-criteria from the
   category section, scored per candidate.
8. **Risk Register** — the likelihood/impact/mitigation entries from Step 5.
9. **Financial Comparison** — price, total cost (with dependencies/accessories), and any
   financing or promotions surfaced in Step 2.
10. **Final Recommendation** — the pick, restated with its full justification.
11. **Runner-up Recommendation** — the runner-up and the condition under which it wins instead.
12. **Confidence Rating** — the overall A-D rating for the recommendation, based on the
    weakest confidence-rated data point it depends on.
13. **Decision Rationale** — why this pick over the others, tied explicitly to the deciding
    criterion and the four gates from Step 5.
