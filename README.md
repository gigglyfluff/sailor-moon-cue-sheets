# Sailor Moon BGM Lists & Cue Sheets

The background music lists and TV/movie cue sheets from pages 104–195 of the *Sailor Moon Memorial Music Box* booklet, transcribed in Japanese with romaji and English.

**[Open the page](index.html)** (or the GitHub Pages address in the sidebar).

- Japanese is transcribed exactly as printed, typos and mistakes included. Typos, mistakes and editor's comments are marked with a numbered note. Beside the booklet's own columns, the editor's columns show: Notes (corrections and their sources), which disc and track each BGM-list piece is on (cover, disc name, track number and title), and every episode that uses each piece.
- Every row has its own link (for example `#r-TV-98-B-19` or `#cue-M-206`), and the browser's Back button returns from a jump.
- Every cue code in the cue sheets links to its entry in the BGM lists.
- English episode titles are Viz Media's official translations.

Many thanks to [sailormusic.net](https://sailormusic.net/guide-to-sailor-moon-music-cues/) for providing the scans of the booklet and the disc covers, and to [VGMdb](https://vgmdb.net/album/26875) for the scans of the box set's tray cards (the source of the box set's Japanese track titles) and the other albums' tracks and covers. Many of the romaji and English track titles are based on both sites' track lists, edited to follow this site's romaji style and Viz's English terms; the site's other romaji and English (the BGM lists, cue sheets and notes) are its own.

## Found a mistake?

Please [open an issue](../../issues) with the episode or list, the row, and what it should say. A photo or page number from the booklet helps.

## Files

| File | What it is |
|---|---|
| `index.html` | The page |
| `styles.css` | Its styling |
| `mmb.db` | **The master copy of all the data**, as a SQLite database |
| `db/*.csv` | A readable copy of the database, one file per table, so GitHub can show what changed |
| `data.js` | The transcribed data the page reads, generated from `mmb.db` (written compact; review changes in `db/*.csv`) |
| `albums.js` | The albums the booklet's CD column cites (the box set's discs with all their tracks, and the other albums with the tracks cited; not from the booklet), generated from `mmb.db` |
| `booklet.txt` | The booklet's Japanese exactly as printed, in booklet order: the proofread baseline that `check` compares against |
| `tools/mmb.py` | Builds `data.js`, `albums.js` and `db/*.csv` from the database |
| `images/` | `logos/` (series logos), `bgm-list-illustrations/`, `album-covers/` (box-set discs as `disc-NN-…`, other albums by title) and `tray-cards/` (each box-set disc's tray card, from VGMdb) |

## Editing the data

Edit `mmb.db` (for example in [DB Browser for SQLite](https://sqlitebrowser.org/)), then run

    python3 tools/mmb.py export

and commit `mmb.db`, `db/` and the regenerated `data.js` and `albums.js` together. The tables mirror the booklet: `bgm_lists` → `bgm_categories` → `bgm_cues` for the BGM lists, and `works` → `parts` → `cue_rows` → `credits` for the cue sheets. `albums` → `album_tracks` holds every album the CD column cites, by its code in the booklet's key: the box set's discs are `1`–`10`, with the box set itself (`MMB`) as their `parent`. Japanese, romaji and English text have their own `_ja`, `_ro` and `_en` columns.

**Research notes (not on the site).** The `library_matches` table holds library-music identifications still being checked: clips from RattleMan's library rips on sailormusic.net matched to cue-sheet rows by episode, scene and length, with a `confidence` (strong, plausible, box set, no row) and a `status` (unverified, confirmed, rejected). The `library_research` view shows them beside the cue-sheet rows. Export never writes this table to `data.js`, so nothing in it appears on the page until it is moved into the notes.

The `tray_cards` table transcribes the back card in each box-set disc's case, read from the flat scans on [VGMdb](https://vgmdb.net/album/26875), kept in `images/tray-cards/` in case they move (each disc's scan is its `card` in `albums`): every track with the cue codes it contains, as printed (`J11編集`, `M16ラジオトーン`, `M115+M118`), with `code` giving the booklet's form for joining and `note` for reading caveats. It is an independent check on the booklet's 収録CD column; every entry agrees with the booklet, apart from the edits (編集) and M-413's four solo versions, which the booklet doesn't list separately, and J4 on Disc 1 track 11, which the booklet places only on Disc 2. The site's CD and code corrections cite the tray cards as their source, and the page links each "box-set tray card for Disc N" in a note to that disc's scan. The box-set track titles in `album_tracks` are also as printed on the cards. Like `library_matches`, it stays off the site.

**Keeping the Japanese verbatim.** `booklet.txt` holds every piece of Japanese the booklet prints (headings, BGM lists, cue sheets, notes), checked against the scans. Run

    python3 tools/mmb.py check

after each round of edits. It fails and shows a diff if any printed Japanese in `mmb.db` has changed; romaji, English, the editor's corrections and the CD track titles are ignored, so translation work never trips it. If a change is a real transcription fix (the booklet was misread), confirm it against the scan and run `python3 tools/mmb.py booklet --accept`, then commit `booklet.txt` with it so the fix shows in the history. Never accept a change you haven't checked against the scan.

Other commands: `check` also confirms the generated files match the database; `restore` rebuilds `mmb.db` from `db/*.csv` if the binary is ever lost; `import` rebuilds it from `data.js` and `albums.js`.

Sailor Moon © Naoko Takeuchi / PNP / Toei Animation. This is a fan reference; the booklet's content belongs to its rights holders.
