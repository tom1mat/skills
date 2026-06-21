#!/usr/bin/env bash
# Symlink every skill in this repo into ~/.claude/skills.
# Re-runnable: existing symlinks are refreshed; existing real directories are
# left untouched and reported, so nothing is clobbered.
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
src_dir="$repo_dir/skills"
dest_dir="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"

mkdir -p "$dest_dir"

for skill in "$src_dir"/*/; do
  name="$(basename "$skill")"
  target="$dest_dir/$name"

  if [ -L "$target" ]; then
    ln -sfn "$skill" "$target"
    echo "↻ relinked  $name"
  elif [ -e "$target" ]; then
    echo "⚠ skipped   $name (a real directory already exists at $target)"
  else
    ln -s "$skill" "$target"
    echo "✓ linked    $name"
  fi
done
