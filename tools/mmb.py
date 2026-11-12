#!/usr/bin/env python3
"""The site's data as a relational database.

mmb.db (SQLite) is the master copy. After editing it, run

    python3 tools/mmb.py export

to regenerate what the site reads (data.js, albums.js) and the readable text copy (db/*.csv) that GitHub can diff.

    python3 tools/mmb.py import    rebuild mmb.db from data.js and albums.js (overwrites mmb.db)
    python3 tools/mmb.py restore   rebuild mmb.db from db/*.csv, if the binary is ever lost or damaged
    python3 tools/mmb.py check     export to memory and confirm it matches the files on disk, and that the
                                   booklet's Japanese still matches booklet.txt (the proofread baseline)
    python3 tools/mmb.py booklet   show how the booklet's Japanese differs from booklet.txt;
                                   add --accept to update booklet.txt (only for a real transcription fix)

Standard library only. Text that the booklet gives in three forms has _ja, _ro and _en columns; data.js writes a
value that reads the same in all three as a single string, so export does the same when all three columns match.
"""
import csv, json, os, sqlite3, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, 'mmb.db')
CSV_DIR = os.path.join(ROOT, 'db')
DATA_JS = os.path.join(ROOT, 'data.js')
ALBUMS_JS = os.path.join(ROOT, 'albums.js')

SCHEMA = """
-- one row per series (SM, R, S, SS, ST)
CREATE TABLE series (
  id TEXT PRIMARY KEY, ord INTEGER NOT NULL,
  name_ja TEXT, name_ro TEXT, name_en TEXT,
  logo TEXT, logo_alt TEXT
);
-- the BGM lists, pp.104-123: one per series, plus MOVIE (the films' extra lists)
CREATE TABLE bgm_lists (
  id TEXT PRIMARY KEY, ord INTEGER NOT NULL,
  img TEXT, alt TEXT, img2 TEXT, alt2 TEXT
);
-- a heading within a BGM list ([A] Opening theme arrangements, ...), each its own table on the page
CREATE TABLE bgm_categories (
  id INTEGER PRIMARY KEY,                      -- the category number used by notes and the page
  list_id TEXT NOT NULL REFERENCES bgm_lists(id), ord INTEGER NOT NULL,
  name_ja TEXT, name_ro TEXT, name_en TEXT,
  group_ja TEXT, group_ro TEXT, group_en TEXT, -- a heading printed above this category (recording session, ...)
  page INTEGER, page_from INTEGER, page_to INTEGER,
  tt INTEGER NOT NULL DEFAULT 0
);
-- a row of a BGM list: one cue
CREATE TABLE bgm_cues (
  id INTEGER PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES bgm_categories(id), ord INTEGER NOT NULL,
  code TEXT,                                   -- M-NO. as printed
  time_ja TEXT, time_ro TEXT, time_en TEXT,
  desc_ja TEXT, desc_ro TEXT, desc_en TEXT,
  cd TEXT,                                     -- source CD as printed (disc-track-piece)
  cd_fix TEXT, cd_fix_url TEXT, cd_fix_note TEXT,          -- editor's CD correction
  code_name_ja TEXT, code_name_ro TEXT, code_name_en TEXT, -- a code printed with words (M-2 コーラスヌキ)
  code_fix TEXT, code_fix_url TEXT, code_fix_note TEXT,    -- editor's code correction
  desc_fix_printed TEXT, desc_fix_correct TEXT, desc_fix_url TEXT, desc_fix_note TEXT
);
-- a TV episode, special or film cue sheet
CREATE TABLE works (
  id TEXT PRIMARY KEY, ord INTEGER NOT NULL,
  type TEXT NOT NULL,                          -- tv, special, movie
  series_id TEXT REFERENCES series(id),
  episode INTEGER,
  page_from INTEGER, page_to INTEGER,
  title_ja TEXT, title_ro TEXT, title_en TEXT,
  title_fix_printed TEXT, title_fix_correct TEXT, title_fix_url TEXT, title_fix_note TEXT,
  label_ja TEXT, label_ro TEXT, label_en TEXT  -- a film's line above its table ('94 New Year ...)
);
-- a part of a cue sheet (TOP, A, B, ...), or a film's single table (Q)
CREATE TABLE parts (
  id INTEGER PRIMARY KEY,
  work_id TEXT NOT NULL REFERENCES works(id), ord INTEGER NOT NULL,
  kind TEXT NOT NULL,                          -- TOP, A, B, C, D, Q
  subtitle TEXT,                               -- the special's segment a part belongs to
  seg_ja TEXT, seg_ro TEXT, seg_en TEXT        -- a segment heading printed above this part
);
-- a row of a cue sheet
CREATE TABLE cue_rows (
  id INTEGER PRIMARY KEY,
  part_id INTEGER NOT NULL REFERENCES parts(id), ord INTEGER NOT NULL,
  m TEXT,                                      -- M number as printed (1, 1', 7A, ...)
  credit_ja TEXT, credit_ro TEXT, credit_en TEXT,  -- the credit cell as printed
  time_ja TEXT, time_ro TEXT, time_en TEXT,
  desc_ja TEXT, desc_ro TEXT, desc_en TEXT,
  cd TEXT,                                     -- films: source CD as printed
  shares_credit_of TEXT,                       -- the book merges this row's credit cell with row m = this
  continues_row INTEGER NOT NULL DEFAULT 0,    -- 1: this credit belongs to the previous row's M number and description
  desc_fix_printed TEXT, desc_fix_correct TEXT, desc_fix_goto TEXT, desc_fix_url TEXT, desc_fix_note TEXT,
  desc_note TEXT, desc_note_url TEXT,          -- editor's note on the description ([Editor's note: ...])
  time_fix_printed TEXT, time_fix_correct TEXT, time_fix_note TEXT,
  cd_fix TEXT, cd_fix_note TEXT                -- films: editor's CD correction (the printed cd stays in cd)
);
-- each cue code within a cue-sheet credit, in printed order, with its link target and any correction
CREATE TABLE credits (
  row_id INTEGER NOT NULL REFERENCES cue_rows(id), ord INTEGER NOT NULL,
  printed TEXT NOT NULL,                       -- the code as printed
  target TEXT,                                 -- the page anchor it links to (cue-M-206, q-MOVIE-R-6)
  corrected TEXT,                              -- editor's correction, if any
  note TEXT,                                   -- editor's note
  PRIMARY KEY (row_id, ord)
);
-- the booklet's notes and section headings
CREATE TABLE notes (
  id INTEGER PRIMARY KEY, ord INTEGER NOT NULL,
  page INTEGER, category_id INTEGER, work_id TEXT, section TEXT,
  heading INTEGER NOT NULL DEFAULT 0,
  text_ja TEXT, text_ro TEXT, text_en TEXT
);
-- every album the booklet's CD column cites, by its code in the p.104 key (not from the booklet): the box set (MMB)
-- and its ten discs (1-10, whose parent is MMB), and the other albums (R, S, SS, ST1, ST2, EX, 歌)
CREATE TABLE albums (
  code TEXT PRIMARY KEY, ord INTEGER NOT NULL,
  parent TEXT REFERENCES albums(code),         -- the box set a disc belongs to
  disc INTEGER,                                -- its disc number in that set
  name_ja TEXT, name_en TEXT, catalog TEXT, vgmdb INTEGER, img TEXT
);
-- the box-set discs' full track lists; for the other albums, only the tracks the booklet cites
CREATE TABLE album_tracks (
  album TEXT NOT NULL REFERENCES albums(code), ord INTEGER NOT NULL,
  track TEXT NOT NULL,                         -- track number (歌: disc-track)
  title_ja TEXT, title_ro TEXT, title_en TEXT,
  PRIMARY KEY (album, track)
);

-- research in progress: NOT exported to data.js, so none of it appears on the site. Kept in the database and db/*.csv.
-- Library-music identifications: a clip from a fan collection (RattleMan's rips on sailormusic.net) matched to a cue-sheet
-- row by episode, scene and length. The row is named by work_id + part + ord (its position in the part), with m for reading;
-- all three are NULL for a clip that matches no row.
CREATE TABLE library_matches (
  id INTEGER PRIMARY KEY,
  clip TEXT NOT NULL,                          -- file name in Library Pieces/audio_rips (or original_sources)
  clip_seconds REAL,
  work_id TEXT, part TEXT, ord INTEGER, m TEXT,
  confidence TEXT NOT NULL,                    -- strong (length within 2.5 s), plausible, box set, no row
  identified_as TEXT,                          -- a named piece, when the collection or the box set names one
  note TEXT,
  status TEXT NOT NULL DEFAULT 'unverified'    -- unverified, confirmed, rejected
);
-- The box set's tray cards (the back card in each disc's case): every track with the cue codes it contains, as printed.
-- An independent source for the booklet's 収録CD column. Photos: ~/Music/Sailor Moon Memorial Music Box/Tray Cards.
CREATE TABLE tray_cards (
  disc INTEGER NOT NULL, track INTEGER NOT NULL,
  ord INTEGER NOT NULL,                        -- the code's place in the track's list (1 = first piece)
  printed TEXT NOT NULL,                       -- as printed: M129C, J11編集, M115+M118, M16ラジオトーン, M520別
  code TEXT,                                   -- the booklet's form of the code it names (M-129C, J-11), for joining
  note TEXT,                                   -- reading or source caveats
  PRIMARY KEY (disc, track, ord)
);

-- convenience views (read-only)
CREATE VIEW library_research AS
  SELECT lm.work_id, lm.part, lm.m, r.desc_ja, r.time_ja AS printed_time, lm.clip, lm.clip_seconds, lm.confidence,
         lm.identified_as, lm.status, lm.note
  FROM library_matches lm LEFT JOIN parts p ON p.work_id = lm.work_id AND p.kind = lm.part
  LEFT JOIN cue_rows r ON r.part_id = p.id AND r.ord = lm.ord
  ORDER BY lm.id;
CREATE VIEW cue_sheet AS
  SELECT w.id AS work_id, w.type, w.series_id, w.episode, w.page_from, p.kind AS part, r.ord, r.m,
         r.credit_ja AS credit, r.time_ja AS time, r.desc_ja AS desc_ja, r.desc_en AS desc_en, r.cd, r.id AS row_id
  FROM cue_rows r JOIN parts p ON p.id = r.part_id JOIN works w ON w.id = p.work_id
  ORDER BY w.ord, p.ord, r.ord;
CREATE VIEW uses AS
  SELECT COALESCE(c.corrected, c.printed) AS code, c.printed, w.id AS work_id, w.episode, p.kind AS part, r.m
  FROM credits c JOIN cue_rows r ON r.id = c.row_id JOIN parts p ON p.id = r.part_id JOIN works w ON w.id = p.work_id;
"""

# ---------- three-language values ----------
def split3(v):
    """data.js value -> (ja, ro, en): a string stands for all three"""
    if v is None: return (None, None, None)
    if isinstance(v, str): return (v, v, v)
    assert isinstance(v, list) and len(v) == 3, v
    return tuple(v)

def join3(ja, ro, en):
    """(ja, ro, en) -> data.js value: one string when all three read the same"""
    if ja is None and ro is None and en is None: return None
    return ja if ja == ro == en else [ja, ro, en]

def put(obj, key, value):
    if value is not None: obj[key] = value

# ---------- import: data.js / albums.js -> database ----------
def read_js(path, *names):
    s = open(path, encoding='utf-8').read()
    out = []
    for name in names:
        i = s.index(f'window.{name} =') + len(f'window.{name} =')
        j = s.index(';\n', i)
        out.append(json.loads(s[i:j]))
    return out

def do_import(conn):
    (d,) = read_js(DATA_JS, 'MMB_DATA')
    (albums,) = read_js(ALBUMS_JS, 'MMB_ALBUMS')
    conn.executescript(SCHEMA)
    q = conn.execute
    def ins(table, *vals):
        # ins('t', None, (a, b)) for a table whose first column is an autonumbered id
        v = list(vals[:-1]) + list(vals[-1])
        return q(f'INSERT INTO {table} VALUES ({",".join("?" * len(v))})', v)
    for i, sid in enumerate(d['ser']):
        ins('series', (sid, i, *split3(d['ser'][sid]), d['logos'].get(sid), d['logoAlt'].get(sid)))
    for i, b in enumerate(d['bgm']):
        ins('bgm_lists', (b['id'], i, b.get('img'), b.get('alt'), b.get('img2'), b.get('alt2')))
        for ci, c in enumerate(b['cats']):
            pp = c.get('pp') or [None, None]
            ins('bgm_categories', (c['id'], b['id'], ci, *split3(c['n']), *split3(c.get('g')), c.get('p'), pp[0], pp[1], int(c['tt'])))
            for ri, r in enumerate(c['r']):
                dx, cx = r.get('dx') or {}, r.get('cx') or [None, None, None]
                ins('bgm_cues', None, (c['id'], ri, r.get('c'), *split3(r.get('t')), *split3(r.get('d')), r.get('cd'),
                   r.get('cdx'), r.get('cdu'), r.get('cdn'), *split3(r.get('cn')), *cx,
                   dx.get('p'), dx.get('c'), dx.get('u'), dx.get('n')))
    for wi, w in enumerate(d['works']):
        hx = w.get('hx') or {}
        pp = w.get('pp') or [None, None]
        ins('works', (w['id'], wi, w['type'], w.get('s'), w.get('n'), pp[0], pp[1], *split3(w.get('h')),
           hx.get('p'), hx.get('c'), hx.get('u'), hx.get('n'), *split3(w.get('lab'))))
        for pi, p in enumerate(w['parts']):
            cur = ins('parts', None, (w['id'], pi, p['k'][0], p['k'][1], *split3(p.get('seg'))))
            part_id = cur.lastrowid
            for ri, r in enumerate(p['r']):
                dx, dn, tx = r.get('dx') or {}, r.get('dn') or {}, r.get('tx') or {}
                cur = ins('cue_rows', None, (part_id, ri, r.get('m'), *split3(r.get('c')), *split3(r.get('t')), *split3(r.get('d')),
                         r.get('cd'), r.get('sh'), int(bool(r.get('cont'))),
                         dx.get('p'), dx.get('c'), dx.get('g'), dx.get('u'), dx.get('n'),
                         dn.get('t'), dn.get('u'), tx.get('p'), tx.get('c'), tx.get('n'), r.get('cdx'), r.get('cdn')))
                row_id = cur.lastrowid
                for k, cl in enumerate(r.get('cl') or []):
                    ins('credits', (row_id, k, cl[0], cl[1], cl[2], cl[3] if len(cl) > 3 else None))
                if 'cl' in r and not r['cl']:
                    raise ValueError(f'empty cl in {w["id"]}')
    for i, n in enumerate(d['notes']):
        ins('notes', None, (i, n.get('p'), n.get('c'), n.get('w'), n.get('s'), int(n['h']), *split3(n['x'])))
    # parents first, so a disc's parent exists when it is inserted
    for i, (code, a) in sorted(enumerate(albums.items()), key=lambda x: 'p' in x[1][1]):
        ins('albums', (code, i, a.get('p'), a.get('d'), a['n'][0], a['n'][1], a.get('cat'), a.get('v'), a.get('img')))
        for k, (track, tr) in enumerate(a['t'].items()):
            ins('album_tracks', (code, k, track, *tr))
    conn.commit()

# ---------- export: database -> data.js / albums.js / CSV ----------
def rows(conn, sql, *args):
    conn.row_factory = sqlite3.Row
    return conn.execute(sql, args).fetchall()

def build_data(conn):
    d = {'bgm': [], 'works': [], 'notes': [], 'logos': {}, 'logoAlt': {}, 'ser': {}}
    for s in rows(conn, 'SELECT * FROM series ORDER BY ord'):
        d['ser'][s['id']] = join3(s['name_ja'], s['name_ro'], s['name_en'])
        d['logos'][s['id']] = s['logo']
        d['logoAlt'][s['id']] = s['logo_alt']
    for b in rows(conn, 'SELECT * FROM bgm_lists ORDER BY ord'):
        bo = {'id': b['id']}
        for k in ('img', 'alt', 'img2', 'alt2'): put(bo, k, b[k])
        bo['cats'] = []
        for c in rows(conn, 'SELECT * FROM bgm_categories WHERE list_id=? ORDER BY ord', b['id']):
            co = {'n': join3(c['name_ja'], c['name_ro'], c['name_en'])}
            put(co, 'g', join3(c['group_ja'], c['group_ro'], c['group_en']))
            co['id'] = c['id']
            put(co, 'p', c['page'])
            co['r'] = []
            for r in rows(conn, 'SELECT * FROM bgm_cues WHERE category_id=? ORDER BY ord', c['id']):
                ro = {}
                put(ro, 'c', r['code'])
                put(ro, 't', join3(r['time_ja'], r['time_ro'], r['time_en']))
                put(ro, 'd', join3(r['desc_ja'], r['desc_ro'], r['desc_en']))
                for k, col in (('cd', 'cd'), ('cdx', 'cd_fix'), ('cdu', 'cd_fix_url'), ('cdn', 'cd_fix_note')): put(ro, k, r[col])
                put(ro, 'cn', join3(r['code_name_ja'], r['code_name_ro'], r['code_name_en']))
                if r['code_fix'] is not None: ro['cx'] = [r['code_fix'], r['code_fix_url'], r['code_fix_note']]
                if r['desc_fix_printed'] is not None:
                    dx = {'p': r['desc_fix_printed'], 'c': r['desc_fix_correct']}
                    put(dx, 'u', r['desc_fix_url']); dx['n'] = r['desc_fix_note']
                    ro['dx'] = dx
                co['r'].append(ro)
            co['tt'] = bool(c['tt'])
            if c['page_from'] is not None: co['pp'] = [c['page_from'], c['page_to']]
            bo['cats'].append(co)
        d['bgm'].append(bo)
    for w in rows(conn, 'SELECT * FROM works ORDER BY ord'):
        wo = {'id': w['id'], 'type': w['type']}
        put(wo, 's', w['series_id']); put(wo, 'n', w['episode'])
        if w['page_from'] is not None: wo['pp'] = [w['page_from'], w['page_to']]
        put(wo, 'h', join3(w['title_ja'], w['title_ro'], w['title_en']))
        put(wo, 'lab', join3(w['label_ja'], w['label_ro'], w['label_en']))
        wo['parts'] = []
        for p in rows(conn, 'SELECT * FROM parts WHERE work_id=? ORDER BY ord', w['id']):
            po = {'k': [p['kind'], p['subtitle']]}
            put(po, 'seg', join3(p['seg_ja'], p['seg_ro'], p['seg_en']))
            po['r'] = []
            for r in rows(conn, 'SELECT * FROM cue_rows WHERE part_id=? ORDER BY ord', p['id']):
                ro = {'m': r['m']}
                cl = rows(conn, 'SELECT * FROM credits WHERE row_id=? ORDER BY ord', r['id'])
                if cl: ro['cl'] = [[c['printed'], c['target'], c['corrected']] + ([c['note']] if c['note'] is not None else []) for c in cl]
                put(ro, 'd', join3(r['desc_ja'], r['desc_ro'], r['desc_en']))
                put(ro, 'c', join3(r['credit_ja'], r['credit_ro'], r['credit_en']))
                put(ro, 't', join3(r['time_ja'], r['time_ro'], r['time_en']))
                put(ro, 'cd', r['cd']); put(ro, 'cdx', r['cd_fix']); put(ro, 'cdn', r['cd_fix_note']); put(ro, 'sh', r['shares_credit_of'])
                if r['continues_row']: ro['cont'] = True
                if r['desc_fix_printed'] is not None:
                    dx = {'p': r['desc_fix_printed'], 'c': r['desc_fix_correct']}
                    put(dx, 'g', r['desc_fix_goto']); put(dx, 'u', r['desc_fix_url']); dx['n'] = r['desc_fix_note']
                    ro['dx'] = dx
                if r['desc_note'] is not None: ro['dn'] = {'t': r['desc_note'], 'u': r['desc_note_url']}
                if r['time_fix_printed'] is not None:
                    ro['tx'] = {'p': r['time_fix_printed'], 'c': r['time_fix_correct'], 'n': r['time_fix_note']}
                po['r'].append(ro)
            wo['parts'].append(po)
        if w['title_fix_printed'] is not None:
            wo['hx'] = {'p': w['title_fix_printed'], 'c': w['title_fix_correct'], 'u': w['title_fix_url'], 'n': w['title_fix_note']}
        d['works'].append(wo)
    for n in rows(conn, 'SELECT * FROM notes ORDER BY ord'):
        no = {'p': n['page']}
        put(no, 'c', n['category_id']); put(no, 'w', n['work_id']); put(no, 's', n['section'])
        no['h'] = bool(n['heading']); no['x'] = join3(n['text_ja'], n['text_ro'], n['text_en'])
        d['notes'].append(no)
    return d

ALBUMS_HEAD = ("/* Every album the booklet's CD column cites, keyed by its code in the p.104 key (MMB, the box set, is the site's own). Not from the booklet.\n"
               "   The box set (MMB) and its discs 1-10 (p = parent, d = disc number; disc names from each disc's cover, covers from\n"
               "   sailormusic.net, every track); the other albums R, S, SS, ST1, ST2, EX and 歌 (original CD releases, covers from\n"
               "   VGMdb, only the tracks the booklet cites; 歌 keyed by disc-track). n = name [Japanese, English], cat = catalog number,\n"
               "   v = VGMdb album number, t = tracks [Japanese (VGMdb), romaji, English (the site's own)]. */\n")

def build_albums(conn):
    albums = {}
    for a in rows(conn, 'SELECT * FROM albums ORDER BY ord'):
        o = {'n': [a['name_ja'], a['name_en']]}
        put(o, 'p', a['parent']); put(o, 'd', a['disc']); put(o, 'cat', a['catalog']); put(o, 'v', a['vgmdb']); put(o, 'img', a['img'])
        o['t'] = {t['track']: [t['title_ja'], t['title_ro'], t['title_en']]
                  for t in rows(conn, 'SELECT * FROM album_tracks WHERE album=? ORDER BY ord', a['code'])}
        albums[a['code']] = o
    return albums

def render(conn):
    # compact, so the page loads faster; db/*.csv is the readable copy for reviewing changes
    data = 'window.MMB_DATA =\n' + json.dumps(build_data(conn), ensure_ascii=False, separators=(',', ':')) + ';\n'
    albums_js = ALBUMS_HEAD + 'window.MMB_ALBUMS =\n' + json.dumps(build_albums(conn), ensure_ascii=False, indent=1) + ';\n'
    return data, albums_js

# research tables: in the database and CSVs, but never exported to the site; "import" (which rebuilds from data.js)
# reloads them from db/*.csv so they survive
RESEARCH = ['library_matches', 'tray_cards']
TABLES = ['series', 'bgm_lists', 'bgm_categories', 'bgm_cues', 'works', 'parts', 'cue_rows', 'credits', 'notes',
          'albums', 'album_tracks'] + RESEARCH

def write_csv(conn):
    os.makedirs(CSV_DIR, exist_ok=True)
    conn.row_factory = None
    for t in TABLES:
        cur = conn.execute(f'SELECT * FROM {t} ORDER BY rowid')
        with open(os.path.join(CSV_DIR, t + '.csv'), 'w', encoding='utf-8', newline='') as f:
            w = csv.writer(f, lineterminator='\n')
            w.writerow([c[0] for c in cur.description])
            # NULL is written as \N so it survives the round trip distinct from an empty string
            for r in cur: w.writerow(['\\N' if v is None else v for v in r])

def do_restore(conn):
    conn.executescript(SCHEMA)
    for t in TABLES:
        with open(os.path.join(CSV_DIR, t + '.csv'), encoding='utf-8', newline='') as f:
            rd = csv.reader(f); cols = next(rd)
            types = {r[1]: r[2] for r in conn.execute(f'PRAGMA table_info({t})')}
            def conv(c, v):
                if v == '\\N': return None
                return int(v) if types[c] == 'INTEGER' else float(v) if types[c] == 'REAL' else v
            conn.executemany(f'INSERT INTO {t} ({",".join(cols)}) VALUES ({",".join("?" * len(cols))})',
                             ([conv(c, v) for c, v in zip(cols, r)] for r in rd))
    conn.commit()

def load_research(conn):
    """after an import from data.js, bring back the research tables from their CSVs (data.js doesn't carry them)"""
    for t in RESEARCH:
        path = os.path.join(CSV_DIR, t + '.csv')
        if not os.path.exists(path): continue
        with open(path, encoding='utf-8', newline='') as f:
            rd = csv.reader(f); cols = next(rd)
            types = {r[1]: r[2] for r in conn.execute(f'PRAGMA table_info({t})')}
            conv = lambda c, v: None if v == '\\N' else (int(v) if types[c] == 'INTEGER' else float(v) if types[c] == 'REAL' else v)
            conn.executemany(f'INSERT INTO {t} ({",".join(cols)}) VALUES ({",".join("?" * len(cols))})',
                             ([conv(c, v) for c, v in zip(cols, r)] for r in rd))
    conn.commit()

# ---------- booklet.txt: the Japanese exactly as printed, the proofread baseline ----------
BOOKLET_TXT = os.path.join(ROOT, 'booklet.txt')
BOOKLET_HEAD = """\
# The booklet's Japanese text exactly as printed, in booklet order. Proofread against the scans; this is the baseline.
# "python3 tools/mmb.py check" fails if mmb.db no longer produces this file. Change it only for a real transcription
# fix (the booklet was misread), with "python3 tools/mmb.py booklet --accept", and check the diff against the scan.
# Editor's corrections, romaji, English and the CD track titles are not here: they never change what is printed.
# Columns are tab-separated. BGM lists: M-NO. | TIME | 内容 | 収録CD | printed with the code. Cue sheets: M | credit | TIME | 内容 | 収録CD.
"""

def build_booklet(conn):
    v = lambda x: '' if x is None else str(x)
    line = lambda *xs: '\t'.join(v(x) for x in xs).rstrip('\t')
    out = [BOOKLET_HEAD]
    for s in rows(conn, 'SELECT * FROM series ORDER BY ord'):
        out.append(line('series', s['id'], s['name_ja']))
    for b in rows(conn, 'SELECT * FROM bgm_lists ORDER BY ord'):
        for c in rows(conn, 'SELECT * FROM bgm_categories WHERE list_id=? ORDER BY ord', b['id']):
            out.append('')
            if c['group_ja']: out.append(f"## {c['group_ja']}")
            out.append(f"== BGM {b['id']} p.{v(c['page'] or c['page_from'])}  {v(c['name_ja'])}")
            for r in rows(conn, 'SELECT * FROM bgm_cues WHERE category_id=? ORDER BY ord', c['id']):
                out.append(line(r['code'], r['time_ja'], r['desc_ja'], r['cd'], r['code_name_ja']))
    for w in rows(conn, 'SELECT * FROM works ORDER BY ord'):
        out.append('')
        out.append(f"== {w['id']} p.{v(w['page_from'])}  {v(w['title_ja'])}")
        if w['label_ja']: out.append(f"   {w['label_ja']}")
        for p in rows(conn, 'SELECT * FROM parts WHERE work_id=? ORDER BY ord', w['id']):
            if p['seg_ja']: out.append(f"## {p['seg_ja']}")
            out.append(f"-- {p['kind']}" + (f" ({p['subtitle']})" if p['subtitle'] else ''))
            for r in rows(conn, 'SELECT * FROM cue_rows WHERE part_id=? ORDER BY ord', p['id']):
                out.append(line(r['m'], r['credit_ja'], r['time_ja'], r['desc_ja'], r['cd']))
    out.append('')
    out.append('== Notes')
    for n in rows(conn, 'SELECT * FROM notes ORDER BY ord'):
        out.append(line(f"p.{v(n['page'])}", n['text_ja']))
    return '\n'.join(out) + '\n'

def booklet_diff(conn):
    """the differences between mmb.db's booklet text and booklet.txt, as a unified diff ('' when they match)"""
    import difflib
    new = build_booklet(conn)
    old = open(BOOKLET_TXT, encoding='utf-8').read() if os.path.exists(BOOKLET_TXT) else ''
    return new, ''.join(difflib.unified_diff(old.splitlines(True), new.splitlines(True), 'booklet.txt', 'mmb.db', n=1))

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'export'
    if cmd in ('import', 'restore'):
        if os.path.exists(DB): os.remove(DB)
        conn = sqlite3.connect(DB)
        conn.execute('PRAGMA foreign_keys = ON')
        (do_import if cmd == 'import' else do_restore)(conn)
        print(f'{cmd}: wrote {os.path.relpath(DB, ROOT)}')
        if cmd == 'import':
            load_research(conn)
            write_csv(conn)
        return
    if not os.path.exists(DB): sys.exit('no mmb.db: run "import" (from data.js) or "restore" (from db/*.csv) first')
    conn = sqlite3.connect(DB)
    n = conn.execute("SELECT count(*) FROM sqlite_master WHERE type='table'").fetchone()[0]
    if n < len(TABLES) or not conn.execute('SELECT count(*) FROM cue_rows').fetchone()[0]:
        sys.exit('mmb.db is incomplete; nothing written')
    if cmd == 'booklet':
        new, diff = booklet_diff(conn)
        if not diff: print('booklet: mmb.db matches booklet.txt'); return
        sys.stdout.write(diff)
        if '--accept' in sys.argv[2:]:
            open(BOOKLET_TXT, 'w', encoding='utf-8').write(new)
            print('booklet: booklet.txt updated; check each change above against the scan')
        else:
            print('booklet: MISMATCH (above). If every change is a real transcription fix: booklet --accept')
            sys.exit(1)
        return
    data, albums_js = render(conn)
    _, bdiff = booklet_diff(conn)
    if cmd == 'check':
        ok = open(DATA_JS, encoding='utf-8').read() == data and open(ALBUMS_JS, encoding='utf-8').read() == albums_js
        print('check: data.js and albums.js match mmb.db' if ok else 'check: MISMATCH; run export')
        if bdiff: sys.stdout.write(bdiff)
        print('check: booklet text matches booklet.txt' if not bdiff else
              'check: BOOKLET TEXT CHANGED (above): fix mmb.db, or if it is a real transcription fix, run booklet --accept')
        sys.exit(0 if ok and not bdiff else 1)
    if cmd != 'export': sys.exit(__doc__)
    open(DATA_JS, 'w', encoding='utf-8').write(data)
    open(ALBUMS_JS, 'w', encoding='utf-8').write(albums_js)
    write_csv(conn)
    print('export: wrote data.js, albums.js, db/*.csv')
    if bdiff: print('export: WARNING: the booklet text no longer matches booklet.txt; run "check" to see what changed')

if __name__ == '__main__':
    main()
