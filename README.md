# skills

My personal collection of [Claude Code](https://claude.com/claude-code) agent
skills. Each skill is a self-contained folder with a `SKILL.md` that teaches the
agent a repeatable process — invoked automatically by description, or by name
with `/<skill-name>`.

## Skills

| Skill | What it does |
|-------|--------------|
| [`product-advisor`](skills/product-advisor) | An experienced PM/UX advisor that orients from the project's own docs, researches comparable products, and always presents validated options — never deciding for you. |

## Layout

```
skills/
  <skill-name>/
    SKILL.md        # frontmatter (name, description) + the skill body
    *.md            # optional disclosed reference files (loaded on demand)
README.md
install.sh          # symlinks every skill into ~/.claude/skills
```

One folder per skill. Project-agnostic skills only — anything welded to a
specific codebase stays in that repo's `.claude/skills/` instead.

## Install

Symlink every skill in this repo into your personal skills directory
(`~/.claude/skills`), so edits here are picked up live:

```sh
./install.sh
```

Or install a single skill manually:

```sh
ln -s "$(pwd)/skills/product-advisor" ~/.claude/skills/product-advisor
```

Skills are also available in any project by copying a folder into that repo's
`.claude/skills/`.

## Adding a skill

Create `skills/<name>/SKILL.md` with YAML frontmatter:

```markdown
---
name: <name>
description: <what it is + when the agent should fire it>
---

# <Title>

...the process...
```

Keep `description` to genuine trigger phrases (one per branch), push on-demand
reference into sibling `.md` files, and prune anything the agent would do by
default. See Anthropic's guidance on writing skills for the principles.
