---
name: descargar-playlist
description: Download a tracklist from YouTube as ALAC into Tomi's music library. Use when given a playlist screenshot or track list and asked for YouTube links, a download script, or the audio files themselves.
---

# Descargar playlist

Turn a tracklist (usually Spotify screenshots: title, artist, album, duration) into ALAC files in a playlist folder. Talk to Tomi in Rioplatense Spanish.

## 1. Tracklist

Transcribe every row from every screenshot into `$CLAUDE_JOB_DIR/tmp/tracks.txt` as `n|<artists> <title> <remix/version>|<m:ss>`. Done when the numbering runs 1..N with no gaps across screenshots (rows cut at a screenshot edge usually appear whole in the next one).

## 2. Search

yt-dlp lives at `~/.local/bin/yt-dlp`. Search every track in parallel, 8 at a time, in the background:

```sh
mkdir -p res
while IFS='|' read n q d; do
  ( ~/.local/bin/yt-dlp --flat-playlist --print "%(id)s|%(duration_string)s|%(channel)s|%(title)s" "ytsearch3:$q" > res/$n.txt 2>/dev/null ) &
  while [ $(jobs -r | wc -l) -ge 8 ]; do sleep 0.3; done
done < tracks.txt; wait
```

Pick one video per track:
- Duration within ~3s of the tracklist.
- Prefer the `<Artist> - Topic` channel: its metadata carries the artist, so the filename comes out `Artist - Title`. Any other upload names the file after the uploading channel (`Houseum - Jeigo - An Ode To Midnight`).
- Next best: the label's channel, then the artist's own.

When a track has no match, retry with `"Artist - Title"`, then with the album added, then with the **artist name alone** (Jesse Futerman's "Eyes Open" only appeared that way). An official video that runs a few seconds longer is fine; say so.

Done when every track has a link or has failed all four queries. Show Tomi the numbered list (`n. Artist – Title: https://youtu.be/ID`), flagging weak matches (missing channel, duration off).

## 3. Download

Ask for the playlist name. Name it by **genre/style** (e.g. "Deepy & Dubby" for deep house + dub techno); a title borrowed from a track was rejected. Playlists live side by side in `~/Music/mi_musica/<Name>/`. Check the folder doesn't already exist, then download straight into it:

```sh
yt-dlp -f 251/bestaudio -x --audio-format alac --embed-metadata -o "%(artist,uploader)s - %(title)s.%(ext)s" "$url"
```

Tomi's base command is `-f 251`; the `/bestaudio` fallback keeps a video without format 251 from failing. If Tomi asks for a script, write it to a durable path (e.g. `~/descargar-<name>.sh`, `#!/bin/zsh`, a `urls=( ... )` array, then a loop), `chmod +x`, and check it with `zsh -n`.

## 4. Verify

Count the files in the folder against the tracklist. A run of 50 once left 3 missing with no visible error, so match each track to a file and list the missing ones with their links. Re-download those. Done when the count equals N or Tomi has the list of what is still missing.

## 5. Add as a playlist

- **Apple Music**: drag the folder onto the sidebar's Playlists section to create a playlist named after the folder. Under Ajustes → Archivos, "Copiar archivos a la carpeta de Music Media" duplicates the files; turn it off to keep them in `mi_musica`.
- **rekordbox**: drag the folder onto Playlists in the tree; it imports and names the playlist. Analyze the tracks (BPM/grid) before mixing.

Download the missing tracks before creating the playlist; anything added later goes into the playlist by hand.
