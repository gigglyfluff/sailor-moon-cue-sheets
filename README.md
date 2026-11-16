# Sailor Moon BGM Lists & Cue Sheets

The background music lists and TV/movie cue sheets from pages 104–195 of the *Sailor Moon Memorial Music Box* booklet, transcribed in Japanese with romaji and English. Only the booklet's and the CDs' own text has Japanese and romaji; everything the site adds (labels, notes, the albums tables) is in English. The page opens in English, and a language choice is remembered for later visits.

**[Open the page](index.html)** (or the GitHub Pages address in the sidebar).

A second page, **[Albums](albums.html)**, lists every album the BGM lists cite, track by track: the pieces on each track (the booklet's 1-1-1 = disc 1, track 1, first piece) with their M-NO., time and description, and the episodes each is used in. Each track number in the main page's Track column links to it. For tracks with several pieces it also gives where each piece starts on the CD and how long it runs there, measured from the audio at the silent gaps between pieces and fitted to the printed TIMEs (the `track_pieces` table). Every other box-set track shows its whole length on the CD, also measured from the audio (`album_tracks.length`). The original BGM albums are listed in full too: the ones the booklet cites (R, S, SS, ST1, ST2, EX) and the four it doesn't (the first *Music Collection*, MC, and the three movie albums, RM, SM and SSM), each with every track's title as printed on its tray card (kept in `images/tray-cards/`, with the covers in `images/album-covers/`, both from VGMdb's scans) and every track's length. Their pieces were found by matching the audio against the box set, which reissues the same recordings re-cut into more tracks: each box-set piece was located inside the album tracks (chroma matching; true matches score 0.99 or more), and a stretch the box set doesn't have became a piece of its own, split at its silences, unless joining it to its neighbour brought that piece nearer the booklet's printed time (the album's M-59 has a 23-second intro the box set's cut lacks). Every place the booklet cites on these albums lands on the piece it names, and the SuperS tray card's printed cue numbers agree with every match. Each album piece that is the same recording as a box-set piece is recorded in `piece_sources`; the Albums page shows the booklet's entry for that box-set place on an album piece the booklet doesn't cite, with a BOX link to the box-set track. A version without its chorus matches the version with it, so those (EX-2, ST2-18 to 20) are left unlinked. The script is `cue-matcher/breaks/album_align.py` in the research folder. Where the booklet places two codes on one piece (the tray card's J12B+F5B), `piece_parts` gives where each plays within it, found by ear.

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
| `index.html` | The BGM lists and cue sheets |
| `albums.html` | The albums and their tracks |
| `app.js` | The script both pages share (each page sets which one it builds) |
| `styles.css` | Their styling |
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

The `tray_cards` table transcribes the back card in each box-set disc's case, read from the flat scans on [VGMdb](https://vgmdb.net/album/26875), kept in `images/tray-cards/` in case they move (each disc's scan is its `card` in `albums`): every track with the cue codes it contains, as printed (`J11編集`, `M16ラジオトーン`, `M115+M118`), with `code` giving the booklet's form for joining and `note` for reading caveats. It is an independent check on the booklet's 収録CD column; every entry agrees with the booklet, apart from the edits (編集) and M-413's four solo versions, which the booklet doesn't list separately, and J4 on Disc 1 track 11, which the booklet places only on Disc 2, plus the two joined long versions on Disc 2 track 30 (`C1a+C1b`, `H1+H2`). Card and booklet agree but are both wrong in one place: E11 and F10 are swapped on the CD (Disc 1 tracks 36 and 38, confirmed by ear). The site's CD and code corrections cite the tray cards as their source, and the page links each "box-set tray card for Disc N" in a note to that disc's scan. The box-set track titles in `album_tracks` are also as printed on the cards. The table itself stays off the site, but the entries the booklet never places at their track (the edits, J4, M-413's versions, the 2-30 long versions) are exported to `albums.js` (`e`), so the Albums page can fill in those rows.

The `piece_relations` table records how pieces relate to each other, read one way: `code` is a `kind` of `related` (E-12 is an `arrangement` of E-22). `kind` is one of arrangement, edit, variant, quotes (shares a theme or motif) or same, and `basis` says how it is known (booklet, tray card, by ear, audio match), with the evidence in `note`. It is gathered for a later look at the score's families of pieces and is not exported to the site.

**Keeping the Japanese verbatim.** `booklet.txt` holds every piece of Japanese the booklet prints (headings, BGM lists, cue sheets, notes), checked against the scans. Run

    python3 tools/mmb.py check

after each round of edits. It fails and shows a diff if any printed Japanese in `mmb.db` has changed; romaji, English, the editor's corrections and the CD track titles are ignored, so translation work never trips it. If a change is a real transcription fix (the booklet was misread), confirm it against the scan and run `python3 tools/mmb.py booklet --accept`, then commit `booklet.txt` with it so the fix shows in the history. Never accept a change you haven't checked against the scan.

Other commands: `check` also confirms the generated files match the database; `restore` rebuilds `mmb.db` from `db/*.csv` if the binary is ever lost; `import` rebuilds it from `data.js` and `albums.js`.

Sailor Moon © Naoko Takeuchi / PNP / Toei Animation. This is a fan reference; the booklet's content belongs to its rights holders.
