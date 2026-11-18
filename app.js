/* The page script for index.html (BGM lists and cue sheets) and albums.html (the albums and their tracks).
   The pages set window.MMB_VIEW before loading it; everything above the view-specific part is shared. */
(async () => {
/* which page this is: 'cues' (index.html) or 'albums' (albums.html). Row links on the albums page go to index.html.
   A link to the other page carries ?from=, so the page it opens offers "← Back" (see backBtn); the browser's referrer
   would do, but it is empty for pages opened from a file. */
const VIEW = window.MMB_VIEW === 'albums' ? 'albums' : 'cues', HOME = VIEW === 'cues' ? '' : 'index.html?from=albums';
const ALBUMS_PAGE = 'albums.html?from=bgm';
/* Browser auto-translate. The Japanese and romaji are marked translate="no", so translation can only ever change the
   English. A reader whose browser already reads English gets no offer to translate (Chrome otherwise sees the hidden
   Japanese lines and offers to translate the page into English); everyone else can still translate the English. */
document.documentElement.lang = 'en';
if ((navigator.languages || [navigator.language || '']).some(l => /^en\b/i.test(l))) {
  document.documentElement.setAttribute('translate', 'no');
  // Chrome also checks this tag, which holds even when the page's visible text is mostly Japanese
  const m = document.createElement('meta'); m.name = 'google'; m.content = 'notranslate'; document.head.appendChild(m);
}
/* data.js normally arrives through the script tag above. Where script tags for local files are blocked
   (some hosts' security rules), fetch it instead and read the JSON after its first line. */
let D = window.MMB_DATA;
if (!D) {
  try {
    const res = await fetch('data.js');
    if (!res.ok) throw new Error(res.status);
    const text = await res.text();
    D = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  } catch (e) {}
}
/* same for styles.css: if the stylesheet link was blocked, fetch it and apply it inline */
if (!getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()) {
  try {
    const res = await fetch('styles.css');
    if (res.ok) { const st = document.createElement('style'); st.textContent = await res.text(); document.head.appendChild(st); }
  } catch (e) {}
}
if (!D) {
  document.getElementById('app').insertAdjacentHTML('beforeend',
    '<p class="note">Could not load data.js, which needs to be in the same folder as this page.</p>');
  return;
}
const UI = {
  // the site's own labels are English only; the booklet's and the CDs' text keeps its Japanese (and romaji)
  mast: 'Sailor Moon BGM Lists & Cue Sheets, Annotated', back: 'Back', notes: 'Notes', close: 'Close',
  openAll: 'Expand all', closeAll: 'Collapse all',
  part: p => p==='TOP' ? ['TOPパート','TOP paato','Top part'] : [p+'パート',p+' paato',p+' part'],
  // the book's columns: h = header as [Japanese (as printed), romaji, English], c = the column's class
  epHead: [{h: ['M','M','M'], c: 'num'}, {h: ['曲の内容','Kyoku no naiyou','Scene / music']}, {h: ['クレジット','Kurejitto','Cue'], c: 'code'}, {h: ['秒','Byou','Sec.'], c: 'tm'}],
  bgmHead: [{h: ['M-NO.','M-NO.','M-NO.'], c: 'code'}, {h: ['TIME','TIME','Time'], c: 'tm'}, {h: ['内容','Naiyou','Description']}, {h: ['収録CD','Shuuroku CD','CD'], c: 'num'}],
  qHead: [{h: ['NO.','NO.','No.'], c: 'num'}, {h: ['M-NO.','M-NO.','M-NO.'], c: 'code'}, {h: ['TIME','TIME','Time'], c: 'tm'}, {h: ['内容','Naiyou','Description']}, {h: ['収録CD','Shuuroku CD','CD'], c: 'num'}],
  albums: 'Albums', albumsMast: 'Sailor Moon Albums, Annotated', cuesNav: 'BGM Lists & Cue Sheets',   // cuesNav: the albums page's link back
};
/* the editor's columns, after the book's own: not in the booklet */
const ED_HEAD = {
  cd: {en: 'CD / Track', c: 'ed'},
  used: {en: 'Uses', c: 'ed'},
  notes: {en: 'Notes', c: 'ed'},
};
/* the films: short name in English (for Uses lists), the season they sit under, their panel title, the key that finds their
   table in the p.117 instrumentals list, and m: the table heads its first column "M" instead of "NO." */
const FILMS = {
  'MOVIE-R':      {short: 'R movie', season: 'R', title: ['劇場版', 'Movie']},
  'MOVIE-MAKEUP': {short: 'Make Up!', season: 'R', m: true,
                   title: ['短編映画「メイクアップ！セーラー戦士」', 'Make Up! Sailor Guardians (short film)']},
  'MOVIE-S':      {short: 'S movie', season: 'S', title: ['劇場版', 'Movie'], inst: 'セーラームーンS '},
  'MOVIE-SS':     {short: 'SuperS movie', season: 'SS', m: true, title: ['劇場版', 'Movie'], inst: 'セーラームーンSupers '},
  'MOVIE-AMI':    {short: 'Ami\'s First Love', season: 'SS', m: true,
                   title: ['短編映画「亜美ちゃんの初恋」', 'Ami\'s First Love (short film)']},
};
/* the ids of linkable rows: a BGM-list cue (cue-M-58) and a film cue-sheet row (q-MOVIE-S-12) */
const cueId = code => 'cue-' + code;
const filmRowId = (w, r) => `q-${w.id}-${r.m}`;

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* Language display. The checkboxes set body.l-ja / l-ro / l-en, and styles.css shows or hides each line from those.
   - bi(jaHtml, enHtml, cls): any text with a Japanese and an English version (titles, headings, notes, labels,
     buttons). Shows whichever of the two is switched on, the English under the Japanese when both are,
     and the English when only romaji is on. cls 'full' keeps the English full-size (notes, running text);
     'inl' puts both on one line (buttons, counts).
   - tx(triple, fix, cls): bi() for a [Japanese, romaji, English] triple (or a [Japanese, English] pair), escaped,
     with an optional misprint correction in the Japanese.
   - stack(triple): table cells, the only place romaji appears: every enabled language on its own line.
   - tm(time, fix, marker): times (printed and/or decimal), with a note marker after a misprint.
   - en(html): text this site wrote, which is English only and always shown.
   In the data, a time, description or credit that reads the same in all three languages is one string, and a blank one
   is left out; tri() turns either back into a triple. */
const tri = a => Array.isArray(a) ? a : [a ?? '', a ?? '', a ?? ''];
const ext = (url, text, note) => `<a href="${esc(url)}" target="_blank" rel="noopener" title="${esc(note)}">${text}</a>`;
/* a link when there is a source address, plain text when there isn't */
const extOr = (url, text, note) => url ? ext(url, text, note) : text;
const fixSpan = (printed, mark) => `<span class="fixed"><s>${printed}</s><mark>${mark}</mark></span>`;
/* a misprint inside Japanese text: f = {p: printed, c: corrected, n: note, u: url | g: in-page target} */
/* a link to a row elsewhere on the page, by the row's id (cue-M-58 in a BGM list, q-MOVIE-S-12 in a film cue sheet);
   the click handler at the end opens the row's panel first */
const goLink = (id, text, note) => `<a class="go" href="${HOME}#${esc(id)}" data-go="${esc(id)}" title="${esc(note)}">${esc(text)}</a>`;
/* which panel holds each linkable row: {panel, section} */
const ROW_PANEL = {};
function fixLink(f){
  if (f.u) return ext(f.u, esc(f.c), f.n);
  if (f.g) return goLink(f.g, f.c, f.n);
  return `<span title="${esc(f.n)}">${esc(f.c)}</span>`;
}
const jaFix = (s, f) => f ? esc(s).replace(esc(f.p), fixSpan(esc(f.p), fixLink(f))) : esc(s);
/* Japanese quoted inside English (半, ラジオ体操): marked so browser auto-translate leaves it alone; only text between tags is touched */
const jaWords = html => html.split(/(<[^>]*>)/).map(part => part.startsWith('<') ? part
  : part.replace(/[\u3000-\u30ff\u3400-\u9fff\uff00-\uffef]+/g, m => `<span lang="ja" translate="no">${m}</span>`)).join('');
/* the booklet's typeface slants a half-width ! in Japanese text (its full-width ！ stands upright), so the page tilts
   it too (.sl in styles.css); the text itself stays a plain ! for copying and search */
const slant = h => h.replace(/!(?![^<]*>)/g, '<span class="sl">!</span>');
const bi = (j, e, cls) => `<span class="tx${cls ? ' ' + cls : ''}"><span class="ja" lang="ja" translate="no">${slant(j)}</span><span class="en">${jaWords(e)}</span></span>`;
const tx = (a, f, cls) => bi(jaFix(a[0], f), esc(a[a.length - 1]), cls);
/* text this site wrote (labels, notes, tooltips): English only, shown whichever languages are switched on.
   en() takes HTML; Japanese quoted inside it is still marked for auto-translate. */
const en = h => `<span class="en1">${jaWords(h)}</span>`;
const label = (id, s) => { document.getElementById(id).innerHTML = en(esc(s)); };
/* times: as printed (28"半) when Japanese is on; the decimal (28.5") when Japanese is off, and also under the printed
   time when English is on. Times that read the same either way (32") are written once. A misprint (f) gets note
   marker k after it. */
function tm(t, f, k){
  const [j, , e] = tri(t), jm = f ? esc(j).replace(esc(f.p), esc(f.p) + mk(k)) : esc(j);
  return j === e ? `<span class="tj tsame">${jm}</span>` : `<span class="tj">${jm}</span><span class="te">${esc(e)}${f ? mk(k) : ''}</span>`;
}

/* ---------- static labels ---------- */
label('mastTitle', VIEW === 'albums' ? UI.albumsMast : UI.mast);
/* the bar's link to the other page */
{ const nav = document.getElementById('navLink');
  if (nav) { nav.innerHTML = en(esc(VIEW === 'albums' ? UI.cuesNav : UI.albums)); nav.href = VIEW === 'albums' ? HOME : ALBUMS_PAGE; } }
/* the intro line under the title; the notes are in the Editor's Notes panel under Notes */
const ED_NOTES = [
  'The Memorial Music Box booklet contents are transcribed as printed.',
  'Columns that are not in the booklet have been added in some places (shaded green, under an “Added by this site” heading):<ul class="ed-sub"><li>Notes, with corrections and their sources</li><li>CD / Track, showing which disc and track each BGM-list piece is on, with any corrections applied (the cover links to the album and the track number to the track, on the Albums page)</li><li>Uses, listing every episode and film that uses a piece</li></ul>',
  'Japanese episode titles are as printed in the booklet. A few differ from the official titles on <a href="https://lineup.toei-anim.co.jp/ja/tv/sailor_moon/episode/" target="_blank" rel="noopener">Toei Animation\'s site</a>, perhaps because they changed during production. These also differ from the episode list on Japanese Wikipedia:<ul class="ed-sub"><li>Episode 18: 進悟純情 (official: 進悟の純情), "Shingo\'s pure heart": the booklet leaves out the particle の, with the same meaning</li><li>Episode 20: 幽霊もよ！ (official: 幽霊もよ), "…and ghosts too": the booklet adds an exclamation mark at the end</li><li>Episode 29: 大混戦, "a big free-for-all" (official: 大混線, "a big tangle of crossed lines", a pun on the love quadrangle getting its wires crossed); both are read daikonsen</li><li>Episode 33: 最後のセーラー戦士　ヴィーナス登場 (official: 最後のセーラー戦士、ヴィーナス登場), "The last Sailor Guardian, Venus appears": a space where the official title has a comma</li><li>Episode 102: 絶対絶命 (official: 絶体絶命), "in a desperate situation": both are read zettai zetsumei, but 絶体絶命 is the correct spelling and 絶対絶命 a common misspelling</li><li>Episode 163: 捕らえられた (official: 捕えられた), "captured": two accepted spellings of the same word</li><li>Episode 179: 敵？味方！, "Enemy? Ally!" (official: 敵？味方？, "Enemy? Ally?"): the booklet answers the question the official title leaves open</li><li>Episode 194: 銀河の聖戦！ (official: 銀河の聖戦), "The holy war of the galaxy": the booklet adds an exclamation mark</li></ul>',
  'English episode titles are Viz Media\'s official translations, as listed on <a href="https://www.hulu.com/series/sailor-moon-4e1c9108-f973-48fb-8824-a69280ca0438" target="_blank" rel="noopener">Hulu</a>.',
  '半 in the original means "and a half": 28"半 is 28.5 seconds. When the 日本語 button is off, times are shown as decimals.',
  'Many thanks to <a href="https://sailormusic.net/guide-to-sailor-moon-music-cues/" target="_blank" rel="noopener">sailormusic.net</a> for providing the scans of the booklet! The site also has information about the library tracks (ライブラリー) credited in the cue sheets.',
  'Many of the romaji and English track titles are based on <a href="https://sailormusic.net/anime/memorial-music-box/" target="_blank" rel="noopener">sailormusic.net</a> and <a href="https://vgmdb.net/album/26875" target="_blank" rel="noopener">VGMdb</a>, edited to match this site\'s style. The box set\'s Japanese track titles come from the tray-card scans on VGMdb, and every album\'s cover and the other albums\' track titles from VGMdb. Thank you to both!'];
const ALBUMS_ART = 'Album art from the scans on <a href="https://vgmdb.net/" target="_blank" rel="noopener">VGMdb</a>, with thanks!';
// the main page has no line under its title; the albums page thanks VGMdb
{ const lede = document.getElementById('lede'); if (lede && VIEW === 'albums') lede.innerHTML = `<p>${en(ALBUMS_ART)}</p>`; }   // the same as albums.html has, so nothing shifts
const noteList = items => `<ul class="ednotes">${items.map(h => `<li>${en(h)}</li>`).join('')}</ul>`;
/* production terms the cue sheets and lists use throughout: [term as printed, explanation ja (not shown), term en, explanation en].
   Shown in English, with the booklet's term beside each. */
const GLOSSARY = [
  ['アイキャッチ', 'CMの前後に入る短い映像とその曲。', 'Eyecatch', 'the short bumper before and after the mid-episode commercial break, and its music.'],
  ['サブタイトル', '各話のタイトルが出る場面の曲。', 'Subtitle', 'the music under the episode-title card.'],
  ['ブリッジ（Br.）', '場面と場面をつなぐ短い曲。', 'Bridge (Br.)', 'a short cue that links one scene to the next.'],
  ['決まり物', '変身・必殺技・サブタイトルなど、毎回同じ場面で使う曲。', 'Stock pieces', 'cues used at the same point in every episode: transformations, attacks, title cards.'],
  ['予告', '次回予告の曲。', 'Preview', 'music for the next-episode preview.'],
  ['ヒキ（引き）', '次回への期待を引く終わり方。', 'Hook', 'an ending that leaves viewers wanting the next episode.'],
  ['頭／尻', '曲の始まり／終わり。「尻合わせ」は場面の終わりに曲の終わりを合わせること。', 'Start / end', 'the beginning and end of a cue. 尻合わせ means timing the end of the music to the end of the scene.'],
  ['盛', '曲の盛り上がり。', 'Climax', 'the music swelling to a peak.'],
  ['転調', '曲の途中で調が変わること。', 'Key change', 'the music shifts to a different key partway through.'],
  ['ライブラリー', '番組のために作られたのではない、既成の音楽ライブラリーの曲。', 'Library', 'stock music from a production music library, not written for the show. sailormusic.net has more on these tracks.'],
  ['カラオケ／コーラスヌキ', 'ボーカルやコーラスを抜いたバージョン。', 'Karaoke / without chorus', 'a version of a piece without its vocals or chorus.'],
  ['SE', '効果音。', 'SE', 'sound effect.'],
  ['劇伴', 'ドラマやアニメの劇中音楽（BGM）。', 'Score', 'the show\'s background music.'],
];
const glossary = () => noteList(GLOSSARY.map(([tj, , te, de]) => `<b>${te}</b> (${tj}): ${de}`));
label('notesBtn', UI.notes); label('openAll', UI.openAll); label('closeAll', UI.closeAll);

/* ---------- builders ---------- */
/* One cell, every enabled language stacked in it (Japanese, then romaji, then English).
   A line identical to an earlier one is not repeated: that earlier line also shows for the later language instead.
   fmt(text, lang) renders each line (escaping, typo marks). */
const same = (x, y) => String(x).trim().toLowerCase() === String(y).trim().toLowerCase();
function stack(a, fmt = s => esc(s)){
  const [j, r, e] = tri(a);
  const also = [[], [], []];                 // extra languages each line stands in for
  const keepR = r !== '' && !same(r, j);
  if (!keepR) also[0].push('ro');
  const keepE = e !== '' && !same(e, j) && !(keepR && same(e, r));
  if (!keepE) (same(e, j) || !keepR ? also[0] : also[1]).push('en');
  const cls = (base, extra) => base + extra.map(l => ' or-' + l).join('');
  // the Japanese and romaji lines are never machine-translated (browser auto-translate would mangle them)
  return `<span class="${cls('cv cj', also[0])}" lang="ja" translate="no">${slant(fmt(j, 'ja'))}</span>`
       + (keepR ? `<span class="${cls('cv cr', also[1])}" translate="no">${fmt(r, 'ro')}</span>` : '')
       + (keepE ? `<span class="cv ce">${fmt(e, 'en')}</span>` : '');
}
/* fixed column widths, so every table of a kind lines up the same way (widths are in styles.css); the editor's
   columns come last */
const COLS = {
  tv: ['w-m', 'w-scene', 'w-credit', 'w-time', 'ed w-notes'],
  list: ['w-mno', 'w-time', 'w-desc', 'w-cd', 'ed w-cdtrk', 'ed w-used', 'ed w-notes'],
  film: ['w-no', 'w-mno', 'w-time', 'w-desc', 'w-cd', 'ed w-cdtrk', 'ed w-used', 'ed w-notes'],
  album: ['w-no', 'w-ttl', 'w-time', 'w-pseg', 'w-auses', 'w-aref', 'w-also'],   // Same as takes the rest
};
const colgroup = kind => '<colgroup>' + COLS[kind].map(c => `<col class="${c}">`).join('') + '</colgroup>';
/* a title row spans every column */
const spanAttr = kind => `colspan="${COLS[kind].length}"`;
const tableTag = kind => `<table class="bk" data-kind="${kind}">${colgroup(kind)}`;
/* a column-head row; when the table has editor's columns, a thin row above it labels which columns are the booklet's and
   which this site added (those are also shaded green, styles.css) */
function headRow(h, group = true){
  const edN = h.filter(col => /\bed\b/.test(col.c || '')).length;
  const label = t => `<span class="grp-label">${en(t)}</span>`;
  const grp = group && edN
    ? `<tr class="grp"><th colspan="${h.length - edN}">${label('Transcribed from the Memorial Music Box Booklet')}</th>`
      + `<th colspan="${edN}" class="ed">${label('Added by this site')}</th></tr>` : '';
  // a column the booklet prints has its heading in each language; one this site added (col.en) is English only
  // col.t: a ? icon after the heading that shows a box explaining the column (on hover, or on focus from the keyboard)
  // t: a string, or lines: a string, or [key, text] for a key line (its key in bold), each on a line of its own
  const lines = t => [].concat(t).map(l => Array.isArray(l) ? `<span class="tip-line"><b>${esc(l[0])}</b> ${esc(l[1])}</span>` : `<span class="tip-line">${esc(l)}</span>`).join('');
  const plain = t => [].concat(t).map(l => [].concat(l).join(' ')).join('. ');
  // col.k: a second icon (a key) with its own tip, for a key to the symbols used in the column
  const KEY_I = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="5.5" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 8h6M12.5 8v2.6M14.5 8v1.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  const tip = (t, key) => `<span class="tip${key ? ' tip-key' : ''}" tabindex="0" aria-label="${esc(plain(t))}"><span class="tip-i" aria-hidden="true">${key ? '&#8203;' + KEY_I : '?'}</span>`
    + `<span class="tip-box" role="tooltip">${lines(t)}</span></span>`;
  // col.sub: a small note under the heading (a cue sheet's Notes: "Added by this site")
  return grp + '<tr class="cols">' + h.map(col => `<th class="${col.c || ''}">${col.en ? `<span class="cv en1">${esc(col.en)}</span>` : stack(col.h)}${col.sub ? label(col.sub) : ''}${col.t ? tip(col.t) : ''}${col.k ? tip(col.k, true) : ''}</th>`).join('') + '</tr>';
}
/* stack() line formatter for headings: a misprint (f) corrected in place in the Japanese line, an editor's note
   (n = {t, u}) after the English one. Table rows put theirs in the Notes column instead (rowNotes below). */
const lineFmt = (f, n) => (s, l) => l === 'ja' ? jaFix(s, f) : esc(s) + (l === 'en' && n ? edNote(n.t, n.u, n.t) : '');

/* ---------- the Notes column ----------
   Table cells keep the booklet's text exactly as printed. Anything the editor adds (a correction, an explanation, a
   source) goes in the row's Notes column, numbered; a marker with the same number in the cell shows where it applies. */
const mk = (k, cls) => k ? `<sup class="mk${cls ? ' ' + cls : ''}" data-n="${k}"></sup>` : '';
/* web addresses written in a note's text ("reddit.com/r/…") become links */
const linkify = html => html.replace(/\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|net|org|jp)\/[^\s<)"]*[^\s<)".,;])/gi,
  url => `<a href="${url.startsWith('http') ? url : 'https://' + url}" target="_blank" rel="noopener">${url}</a>`);
/* "the box-set tray card for Disc 2" links to that card's scan (images/tray-cards, from VGMdb), "the box-set tray cards" to the box set's VGMdb page (albums.js) */
const cardLinks = html => {
  const A = window.MMB_ALBUMS || {}, a = (url, text) => `<a href="${esc(url)}" target="_blank" rel="noopener">${text}</a>`;
  return html.replace(/box-set tray card for Disc (\d+)/g, (m, d) => A[d]?.card ? a(A[d].card, m) : m)
    .replace(/box-set tray cards/g, m => A.MMB?.v ? a(`https://vgmdb.net/album/${A.MMB.v}`, m) : m);
};
const noteText = s => jaWords(cardLinks(linkify(esc(s))));
const printedAs = p => ` <span class="was">(printed ${jaWords(esc(p))})</span>`;
/* an editor's note is stored as "[Editor's note: …]"; in its own column the brackets and label are dropped */
const edText = t => t.replace(/^\[Editor's note:\s*/, '').replace(/\]$/, '').replace(/^./, c => c.toUpperCase());
const goTitle = id => id.startsWith('q-') ? 'Show in the movie cue sheet' : 'Show in the BGM list';
/* a row's notes, numbered in the order their markers appear across the row: credit/code, description, time, CD.
   Returns the note list and the number each marker should show (0 = none). */
function rowNotes(r){
  const items = [], mark = {cl: []};
  const add = html => items.push(html);
  (r.cl || []).forEach(([p, t, fix, note], i) => {
    if (fix) mark.cl[i] = add(`<b>${t ? goLink(t, fix, goTitle(t)) : esc(fix)}</b>${printedAs(p)}.${note ? ' ' + noteText(note) : ''}`);
    else if (note) mark.cl[i] = add(noteText(note));   // a note on a credit that stands as printed
  });
  if (r.cx) mark.code = add(`<b>${extOr(r.cx[1], esc(r.cx[0]), '')}</b>${printedAs(r.c)}. ${noteText(r.cx[2])}`);
  if (r.dx) {
    const f = r.dx, fix = f.u ? ext(f.u, esc(f.c), '') : f.g ? goLink(f.g, f.c, goTitle(f.g)) : esc(f.c);
    mark.dx = add(`<b lang="ja">${fix}</b>${printedAs(f.p)}. ${noteText(f.n)}`);
  }
  if (r.dn) mark.dn = add(noteText(edText(r.dn.t)) + (r.dn.u ? ` ${ext(r.dn.u, '(source)', '')}` : ''));
  if (r.tx) mark.tx = add(`<b>${jaWords(esc(r.tx.c))}</b>${printedAs(r.tx.p)}. ${noteText(r.tx.n)}`);
  // CD notes open with "Book prints 1-18;", which the "(printed …)" already says; a CD place in one (3-11-1, R-7-3,
  // 歌-5-8) links to that track on the albums page
  const cdRefs = h => h.replace(/(^|[\s(])((?:ST[12]|SS|EX|R|S|歌|\d{1,2})-\d{1,2}(?:-\d{1,2})?(?:-\d)?)(?=[\s).,;:]|$)/g, (m, pre, place) => {
    const o = parseCd(place);
    return o && ALBUMS[o.code]?.t[o.key] ? `${pre}<a class="go" href="${ALBUMS_PAGE}#${trackId(o.code, o.key)}" title="Show on the albums page">${place}</a>` : m;
  });
  if (r.cdx) mark.cd = add(`<b>${extOr(r.cdu, r.cdx === NO_CD ? 'Not on the CD' : 'CD ' + esc(r.cdx), '')}</b>${r.cd ? printedAs(r.cd) : ' <span class="was">(no CD printed)</span>'}. `
    + cdRefs(noteText(r.cdn.replace(/^Book prints [^;]+;\s*/, '').replace(/^./, c => c.toUpperCase()))));
  else if (r.cdn) mark.cd = add(cdRefs(noteText(r.cdn)));   // a note on a CD entry that stands as printed
  return {items, mark};
}
const notesCell = n => `<td class="ed notes">${n.items.map((h, i) => `<p>${mk(i + 1)} ${h}</p>`).join('')}</td>`;

/* a description cell, as printed: a marker after a misprint in the Japanese line (or at the end of the cell while
   Japanese is off), and one at the end for an editor's note. End-of-cell markers go on every line and styles.css shows
   only the one on the last line showing. */
const dcells = (a, f, kf, kn) => `<td>${stack(a, (s, l) =>
  (l === 'ja' && f ? esc(s).replace(esc(f.p), esc(f.p) + mk(kf)) : esc(s)) + (l !== 'ja' ? mk(kf, 'end noja') : '') + mk(kn, 'end'))}</td>`;
const cdCell = (r, k) => esc(r.cd) + mk(k);
/* a BGM-list description that names another piece (M-344 SAXヌキ, "continues from H-1") links it to that piece's row;
   only in the BGM lists, where a code always means a BGM-list piece (in a cue sheet, M-9 is that sheet's own cue 9) */
const pieceLinks = (html, self) => html.replace(/(?<![\w-])((?:M|[A-J])-\d+[A-Za-z]?\d*'?)(?![\w])(?![^<]*>)/g,
  (m, code) => code !== self && ROW_PANEL[cueId(code)] ? goLink(cueId(code), code, goTitle(cueId(code))) : m);
/* a BGM-list code: as printed, or with its variant word in each language (r.cn: M-16 ラジオトーン / M-16 radio tone) */
function codeCell(r, k){
  return (r.cn ? stack(r.cn) : esc(r.c)) + mk(k);
}
/* a cue-sheet credit: a cue code reads the same in every language; variant words after it (ラジオトーン) and other credits
   (ライブラリー, songs…) show each language that is switched on. Each code links to its row in the BGM lists (or the film
   cue sheet that lists it). r.cl = [[printed, target, corrected, note], …] in printed order; a misprinted code stays as
   printed, links to the corrected cue's row, and carries a marker for its note. A note with no correction (corrected
   null) annotates a credit that stands as printed. */
function creditCell(r, mark){
  const one = s => {
    let out = '', at = 0;
    (r.cl || []).forEach(([p, t, fix], n) => {
      const i = s.indexOf(p, at); if (i < 0) return;
      out += esc(s.slice(at, i)) + (t ? goLink(t, p, goTitle(t)) : esc(p)) + mk(mark?.cl[n]);
      at = i + p.length;
    });
    return out + esc(s.slice(at));
  };
  return stack(r.c, one);
}

/* ---------- related info: what each code points to, and where each cue is used ---------- */
/* the id of a cue-sheet row: TV rows r-TV-98-B-19, film rows q-MOVIE-R-6 (the film tables double as music lists).
   A few episodes repeat an M number in another part, and three print one twice in a part: the second gets -2. */
const ROW_ID = new Map();
D.works.forEach(w => { const seen = new Set(); w.parts.forEach(p => p.r.forEach(r => {
  let id = w.type === 'movie' ? filmRowId(w, r) : `r-${w.id}-${p.k[0]}-${r.m}`;
  if (seen.has(id)) id += '-2';
  seen.add(id); ROW_ID.set(r, id);
})); });
/* every use of every cue, by the target's row id: [{w, rows: [{id, part, m}]}] in page order (TV episodes, then films) */
const USES = {};
[...D.works.filter(w => w.type !== 'movie'), ...D.works.filter(w => w.type === 'movie')].forEach(w => w.parts.forEach(p => p.r.forEach(r =>
  new Set((r.cl || []).map(c => c[1]).filter(Boolean)).forEach(t => {
    const list = USES[t] || (USES[t] = []);
    let e = list[list.length - 1];
    if (!e || e.w !== w) list.push(e = {w, rows: []});
    e.rows.push({id: ROW_ID.get(r), part: w.type === 'movie' ? null : p.k[0], m: r.m, d: r.d});   // d: the row's description, for the albums page
  }))));
/* a film row that plays its own piece is one of that piece's uses (a film table is the film's cue sheet and its music
   list at once): by row id, the use it adds to its own Uses list, and to the list of any row elsewhere reusing it */
const OWN_USE = {};
D.works.filter(w => w.type === 'movie').forEach(w => w.parts.forEach(p => p.r.forEach(r => {
  if (!(r.cl || []).some(c => c[1])) { const id = ROW_ID.get(r); OWN_USE[id] = {w, rows: [{id, part: null, m: r.m}]}; }
})));
/* a BGM list or film row's Uses cell: the same "N uses" button and list as the albums page's Uses column */
const usedCell = (id, self) => usesCell(id, self, 'ed du');
/* a BGM list or film row's CD / Track cell: the album its CD position points to (cover) and the track (place and title),
   from albums.js, with any CD correction applied. */
const ALBUMS = window.MMB_ALBUMS || {};
/* a CD correction of — : the booklet prints a CD place, but the piece isn't on any CD (M-110B: 8-21-1 is really M-111B) */
const NO_CD = '—';
/* the track number, and the piece within it after a hyphen as in the booklet's own key (p.104: 1-1-1 = disc 1, track 1, first piece) */
/* a CD position: album code (a box-set disc number, or R, S, SS, ST1, ST2, EX, 歌), then track and piece; 歌 adds its
   disc first. key = the track's key in albums.js (歌: disc-track). */
const CD_RE = /^(\d+(?=-)|ST[12]|SS|EX|R|S|歌)-?(\d+)(?:-(\d+))?(?:-(\d+))?$/;
function parseCd(cd){
  const o = CD_RE.exec(cd || ''); if (!o) return null;
  const multi = o[1] === '歌';
  return {code: o[1], disc: multi ? o[2] : '', n: multi ? o[3] : o[2], piece: multi ? o[4] : o[3], key: multi ? o[2] + '-' + o[3] : o[2]};
}
/* a track's id on the albums page (al-7-22, al-歌-2-10) */
const trackId = (code, key) => `al-${code}-${key}`;
/* an album's cover as a small square thumbnail, as on the albums page (its closed-state picture, th, when it has one) */
const cover = al => `<img class="cover" src="${esc(al.th || al.img)}" alt="" loading="lazy" width="44" height="44">`;
/* two codes on one piece (albums.js x): each one's letter, in the order they play (3-11-3: J-12B is a, F-5B is b) */
function partLetter(code, key, c){
  const x = ALBUMS[code]?.x?.[key];
  if (!x || !x[c] || x[c][3] === 'layered') return '';   // layered codes both cover the whole piece: no letters
  const same = Object.entries(x).filter(([, v]) => v[0] === x[c][0]).sort((a, b) => a[1][1] - b[1][1]);
  return 'abcdefgh'[same.findIndex(([k]) => k === c)];
}
/* a CD position as one cell: the cover (a link to the album on the albums page, its full name in the tooltip) beside
   the place in the booklet's form, corrected (8-3-1, R-8-3, 歌-2-10; a link to the track), and the track's title;
   c = the row's code, for a part of a shared piece (3-11-3a) */
function cdCells(cd, c){
  if (!cd || cd === NO_CD) return '<td class="ed"></td>';
  const o = parseCd(cd), al = o && ALBUMS[o.code], at = al && al.t[o.key];
  // a box-set disc only when the track exists; another album even without its title
  // a piece the booklet names but the CD has no audio for (3-11-5, M-105B SE; its note says so): nothing to show
  if (al && o.piece && al.s?.[o.key] && +o.piece > al.s[o.key].length) return '<td class="ed"></td>';
  if (al && (at || !al.p)) {
    // a disc of a set listed by disc (the song box): that disc's own cover, title and section
    const disc = o.disc && al.dn?.[o.disc];
    const name = disc ? `Disc ${o.disc}: ${disc[1]}` : al.n.length === 2 ? `${al.n[0]} / ${al.n[1]}` : al.n.join(' / ');
    const letter = c && o.piece ? partLetter(o.code, o.key, c) : '';
    const place = `${o.code}-${o.key}${o.piece ? '-' + o.piece : ''}${letter}`;
    // the cover, and beside it the place above the title
    return `<td class="ed"><div class="trk"><a href="${ALBUMS_PAGE}#al-${esc(o.code)}${disc ? '-' + esc(o.disc) : ''}" title="${esc(name)}">${cover(disc ? {img: disc[2]} : al)}</a>`
      + `<div class="tname"><a class="go tno" translate="no" href="${ALBUMS_PAGE}#${trackId(o.code, o.key)}" title="Show on the albums page">${esc(place)}</a>`
      + `${at ? stack(at) : ''}</div></div></td>`;
  }
  return `<td class="ed"><div class="trow"><span class="tno" translate="no">${esc(cd)}</span></div></td>`;
}
const pageTag = (a, b) => `<div class="page">${b && b !== a ? 'pp. ' + a + '–' + b : 'p. ' + a}</div>`;
/* a heading note that also carries a ※ note (p.124): keep only the heading part */
const headPart = x => [x[0].split('※')[0].trim(), x[1].split('※')[0].trim().replace(/\.$/, ''), x[2].split(' ※')[0].trim().replace(/\.$/, '')];
const plainNotes = D.notes.filter(n => !n.h);
const headings = D.notes.filter(n => n.h);
/* the same notes as bullets, for the Notes dialog */
const noteBullets = list => `<ul class="kome"><li>${legendItems(list.map(n => [n.x[0], n.x[n.x.length - 1]]))}</li></ul>`;
function noteBlock(list){ return list.map(n => `<p class="note">${tx(n.x, null, 'full')}</p>`).join(''); }
const bookNotes = D.notes.filter(n => n.x[0].includes('※')).map(n => {
  const k = n.x[0].indexOf('※'); const r = n.x[1].indexOf('※'); const e = n.x[2].indexOf('※');
  return {...n, x: [n.x[0].slice(k), r >= 0 ? n.x[1].slice(r) : n.x[1], e >= 0 ? n.x[2].slice(e) : n.x[2]]};
});

/* one section of a BGM list: its table, any note printed under it, and its page */
function catHtml(c, heart = true){
  const head = c.tt ? UI.bgmHead.map(col => col.h[0] === '内容' ? {h: ['曲タイトル', 'Kyoku taitoru', 'Song title']} : col) : UI.bgmHead;
  let html = `<div class="cat"><div class="scroll">${tableTag('list')}<thead>
      <tr><th ${spanAttr('list')} class="cap">${stack(c.n)}</th></tr>${headRow([...head, ED_HEAD.cd, ED_HEAD.used, ED_HEAD.notes])}</thead><tbody>`;
  c.r.forEach(r => {
    const id = r.c !== '—' ? cueId(r.c) : '', n = rowNotes(r);
    html += `<tr${id ? ` id="${esc(id)}"` : ''}><td class="code">${codeCell(r, n.mark.code)}</td><td class="tm" translate="no">${tm(r.t)}</td>`
      + `${pieceLinks(dcells(r.d, r.dx, n.mark.dx, n.mark.dn), r.c)}<td class="num" translate="no">${r.cd ? cdCell(r, n.mark.cd) : '<span class="blank"></span>' + mk(n.mark.cd)}</td>${cdCells(r.cdx || r.cd, r.c)}`
      + `${id ? usedCell(id) : '<td class="ed"></td>'}${notesCell(n)}</tr>`;
  });
  return html + `</tbody></table></div>${noteBlock(bookNotes.filter(n => n.c === c.id))}${pageTag(c.pp[0] ?? c.p, c.pp[1])}${heart ? '<div class="heart" aria-hidden="true">❤</div>' : ''}</div>`;
}
function renderBgm(s){
  let html = `<div class="bgm-head"><div class="sheets">`;
  if (s.img) html += `<img src="${s.img}" alt="${esc(s.alt)}" loading="lazy">`;
  if (s.img2) html += `<img src="${s.img2}" alt="${esc(s.alt2)}" loading="lazy">`;
  html += '</div></div><div class="cats">';
  let lastSession = null;
  s.cats.forEach(c => {
    if (c.g && JSON.stringify(c.g) !== lastSession) { html += `<div class="session"><span>${stack(c.g)}</span></div>`; lastSession = JSON.stringify(c.g); }
    html += catHtml(c);
  });
  html += '</div>';
  return html;
}

function cueTable(w, noCap){
  const film = w.type === 'movie';
  const kind = film ? 'film' : 'tv', nc = spanAttr(kind);   // title rows span every column
  let html = `<div class="scroll">${tableTag(kind)}<thead>`
    + (noCap ? '' : `<tr><th ${nc} class="cap">${stack(w.h, lineFmt(w.hx))}</th></tr>`);
  // the Make Up!, SuperS and Ami film tables head their first column "M" instead of "NO."
  if (film) html += headRow([...(FILMS[w.id].m ? [{h: ['M','M','M'], c: 'num'}, ...UI.qHead.slice(1)] : UI.qHead), ED_HEAD.cd, ED_HEAD.used, ED_HEAD.notes]);
  html += '</thead>';
  w.parts.forEach(p => {
    html += '<tbody>';
    if (p.seg) html += `<tr><th ${nc} class="cap">${stack(p.seg)}</th></tr>`;
    // a TV cue sheet's part: its name, then the column heads; only Notes is this site's, so it says so itself
    if (!film) html += `<tr class="part"><th ${nc}><span class="part-name">${stack(UI.part(p.k[0]))}</span></th></tr>`
      + headRow([...UI.epHead, {...ED_HEAD.notes, sub: 'Added by this site'}], false);
    // credit cells that the book prints merged across several M rows
    const span = {};
    p.r.forEach(r => { if (r.sh) span[r.sh] = (span[r.sh] || 1) + 1; });
    // and the reverse (TV-78 B-26): one M row whose number and description cover several credits ("cont" rows)
    const more = p.r.map(() => 0);
    p.r.forEach((r, i) => { if (r.cont) { let j = i - 1; while (p.r[j].cont) j--; more[j]++; } });
    p.r.forEach((r, i) => {
      const rs = span[r.m] && !r.sh ? ` rowspan="${span[r.m]}"` : '', n = rowNotes(r), id = ROW_ID.get(r);
      const mrs = more[i] ? ` rowspan="${more[i] + 1}"` : '';
      // credit + time, merged like the book's credit cell
      const ct = r.sh ? '' : `<td class="code"${rs}>${creditCell(r, n.mark)}</td><td class="tm" translate="no"${rs}>${tm(r.t, r.tx, n.mark.tx)}</td>`;
      const m = r.cont ? '' : `<td class="num" translate="no"${mrs}>${esc(r.m)}</td>`;
      const d = r.cont ? '' : dcells(r.d, r.dx, n.mark.dx, n.mark.dn).replace('<td', '<td' + mrs);
      // a row that reuses a cue from another table (its credit links there) shows that cue's uses, its own among them
      const reused = film && (r.cl || []).find(c => c[1])?.[1];
      const used = film ? (reused ? usedCell(reused, OWN_USE[reused]) : usedCell(id, OWN_USE[id])) : '';
      html += film ? `<tr id="${esc(id)}">${m}${ct}${d}<td class="num" translate="no">${cdCell(r, n.mark.cd)}</td>${cdCells(r.cdx || r.cd)}${used}${notesCell(n)}</tr>`
                   : `<tr id="${esc(id)}">${m}${d}${ct}${notesCell(n)}</tr>`;
    });
    html += '</tbody>';
  });
  html += '</table></div>';
  return html;
}

/* a collapsible tree level: <details class="sec|sub"> with a chevron summary and an empty body */
function details(cls, id, summaryHtml, bodyCls){
  const d = document.createElement('details');
  d.className = cls; d.id = id;
  d.innerHTML = `<summary><span class="chev">▶</span>${summaryHtml}</summary><div class="${bodyCls}"></div>`;
  return d;
}
/* a panel inside a section; its contents are rendered the first time it opens */
/* every table line one pixel: a cell spanning rows down to the table's outline, or to a part row (which draws its own line
   above), drops its own bottom line (the stylesheet does this for ordinary rows) */
function fixSpanBorders(root){
  root.querySelectorAll('table.bk').forEach(t => {
    const rows = [...t.rows];
    t.querySelectorAll('td[rowspan], th[rowspan]').forEach(c => {
      const end = rows.indexOf(c.parentElement) + c.rowSpan - 1, next = rows[end + 1];
      if (!next || next.classList.contains('part')) c.style.borderBottom = '0';
    });
  });
}
function subDetails(id, summaryHtml, meta, render){
  // a count (127 tracks) sits under the title, as on the albums page
  const d = details('sub', id, meta ? `<span class="sum-title">${summaryHtml}<span class="sum-meta">${meta}</span></span>` : summaryHtml, 'inner');
  // tables are built the first time a panel opens; build() also lets a jump build them right away
  d.build = () => { if (!d.dataset.done) { d.querySelector('.inner').innerHTML = render(); d.dataset.done = 1; fixSpanBorders(d); measureXcols(d); setTimeout(() => measureXcols(d), 300); } };   // again once fonts and covers have settled
  d.addEventListener('toggle', () => { if (d.open) d.build(); });
  return d;
}
/* open a section and one of its panels, building the panel's tables immediately */
function openPanel(secId, panelId){
  document.getElementById(secId).open = true;
  const p = document.getElementById(panelId); p.open = true; p.build();
}
/* jump to an element: instantly, then again once the layout has settled (opened panels and late-loading
   images can shift it), and flash it so the eye finds it */
let jumpSeq = 0;   // a newer jump cancels the follow-up scrolls of an older one
function goTo(el, block, flashMs){
  const seq = ++jumpSeq;
  const go = () => { if (seq === jumpSeq) el.scrollIntoView({behavior: 'auto', block}); };
  go(); requestAnimationFrame(go); setTimeout(go, 250); setTimeout(go, 700);
  el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), flashMs);
}

/* ---------- page sections: Notes, then one per season (BGM list, TV cue sheets, films) ---------- */
const app = document.getElementById('app');
function section(id, summaryHtml){
  const d = app.appendChild(details('sec', id, summaryHtml, 'sec-body'));
  return d.querySelector('.sec-body');
}
/* an editor's note: nothing is struck, the note is added, linked to its source */
const edNote = (text, url, note) => `<span class="fixed ins"><mark>${url ? ext(url, jaWords(esc(text)), note) : jaWords(esc(text))}</mark></span>`;
/* the p.104 legend's editor's notes: a numbered marker in the text, the notes themselves listed below the legend */
const LEGEND_NOTES = [
  {u: 'https://wikimoon.org/index.php/Memorial_Music_Box', src: 'WikiMoon',
   en: 'Disc 1 of the Sailor Moon Memorial Music Box'},
  {en: 'Probably the first Music Collection; no reference in the lists uses it. The letter S is also used for the S Music Collection, and all four "S-" references in the lists (S-1-1, S-1-2, S-3-1, S-6-2) are S Music Collection tracks.'},
  {en: 'Sailor Moon Music Collection Extra Version'},
  {u: 'https://wikimoon.org/index.php/Memorial_Music_Box', src: 'WikiMoon',
   en: 'The Sailor Moon Memorial Music Box CD set this booklet came with.'},
];
const legendFoot = () => `<aside class="ed-box"><div class="ed-box-h">${en('Site notes')}</div><ol class="ed-foot">${LEGEND_NOTES.map((n, i) =>
  `<li value="${i + 1}">${en(esc(n.en) + (n.u ? ` ${ext(n.u, '(' + esc(n.src) + ')', '')}` : ''))}</li>`).join('')}</ol></aside>`;
/* the p.104 notes, in the book's order and wording: each item holds its Japanese and English, one per line */
const LEGEND104 = [
  // the key to the CD references leads, in bold, followed by the album abbreviations in two columns
  {h: ['※収録CD表示凡例', '※Key to the CD references'], bold: true, items: [
    [`<b>1-1-1</b>＝DISC-1${mk(1)} トラック1の一曲目`,
     `<b>1-1-1</b> = Disc 1${mk(1)}, Track 1, first piece`]], cols: [
    ['<b>R</b>＝R音楽集', '<b>R</b> = R Music Collection'],
    [`<b>S</b>＝音楽集${mk(2)}`,
     `<b>S</b> = Music Collection${mk(2)}`],
    ['<b>S</b>＝S音楽集', '<b>S</b> = S Music Collection'],
    ['<b>SS</b>＝Supers音楽集', '<b>SS</b> = SuperS Music Collection'],
    [`<b>EX</b>＝エキストラヴァージョン${mk(3)}`,
     `<b>EX</b> = Extra Version${mk(3)}`],
    ['<b>ST1</b>＝セーラースターズ・ミュージックコレクション1', '<b>ST1</b> = Sailor Stars Music Collection 1'],
    ['<b>ST2</b>＝セーラースターズ・ミュージックコレクション2', '<b>ST2</b> = Sailor Stars Music Collection 2'],
    ['<b>歌</b>＝メモリアルソングBOX', '<b>歌</b> (Song) = Memorial Song Box']]},
  {h: ['※TIMEは、オリジナルのBGMリストより転載しています。', '※TIMEs are taken from the original BGM list.'], flat: true, items: [
    [`今回の収録${mk(4)}にあたって編集を施した楽曲は、このリストのTIME表示と実際の収録時間が異なる場合があります。`,
     `For pieces edited for this release${mk(4)}, the TIME in this list may differ from the actual length on the CD.`],
    ['また、資料等で正確なTIMEが不明なものに関しては空欄になっています。', 'Where no reliable source gives an exact TIME, the field is left blank.']]},
];
const legendItems = (list, cls) => `<ul${cls ? ` class="${cls}"` : ''}>${list.map(([j, e]) => `<li>${bi(j, e, 'full')}</li>`).join('')}</ul>`;
const legendGroup = g => g.flat
  // a note whose heading is just its first sentence: heading and items as bullets of one list
  ? `<li>${legendItems([g.h, ...g.items])}</li>`
  : `<li>${g.bold ? `<b class="nh-key">${tx(g.h, null, 'full')}</b>` : tx(g.h, null, 'full')}`
    + legendItems(g.items) + (g.cols ? legendItems(g.cols, 'cols2') : '') + '</li>';
const legendHtml = () => `<ul class="kome">${LEGEND104.map(legendGroup).join('')}</ul>${legendFoot()}`;

/* "127 tracks": the number of rows across a list's sections or a film's parts */
const trackCount = groups => { const n = groups.reduce((a, g) => a + g.r.length, 0); return en(`${n} ${n === 1 ? 'track' : 'tracks'}`); };
/* a BGM list panel, headed with the list's own title from the book (e.g. …セーラースターズ　BGM追加曲リスト) */
function bgmPanel(s){
  // inside a season section the English heading drops the show's name (the section heading carries it)
  const head = s.id === 'SM' ? ['BGMリスト', 'BGM risuto', 'BGM List'] : ['BGM追加曲リスト', 'BGM tsuika-kyoku risuto', 'Additional BGM List'];
  return subDetails('bgm-' + s.id, tx(head), trackCount(s.cats), () => renderBgm(s));
}

/* a film's combined cue sheet and music list */
function filmPanel(w){
  // inside its season the English heading says which film it is, without the show's name
  const [ja, e] = FILMS[w.id].title;
  return subDetails('film-' + w.id, tx([ja + '　Qシート表&BGMリスト', '', e + ': Cue Sheet & BGM List']), trackCount(w.parts), () =>
    (w.lab ? `<p class="note">${tx(w.lab, null, 'full')}</p>` : '') + cueTable(w) + pageTag(w.pp[0], w.pp[1]) + noteBlock(bookNotes.filter(x => x.w === w.id))
    + filmInstrumentals(w).map(c => catHtml(c, false)).join(''));
}
/* the film instrumentals list (p.117) has one table per film; each is shown inside its film's panel */
function filmInstrumentals(w){
  const list = D.bgm.find(b => b.id === 'MOVIE'); if (!list) return [];
  const key = FILMS[w.id].inst;
  return key ? list.cats.filter(c => c.n[0].includes(key)) : [];
}
/* in-list headings: "Pretty Guardian Sailor Moon SuperS Special: music roll (cue sheet) table" -> "SuperS Special: Cue Sheet" */
const shortHead = x => [x[0], x[1], x[2].replace(/^Pretty Guardian Sailor Moon (.+?): music roll \(cue sheet\) tables?$/, '$1: Cue Sheet')];
/* the list entry: the title without its "第N話" / "Episode N:" prefix, since the number has its own column */
function epTitle(w){
  const [j, r, e] = w.h;
  return tx([j.replace(/^第\d+話\s*/, ''), r.replace(/^Dai \d+-wa:\s*/, ''), e.replace(/^Episode \d+:\s*/, '')], w.hx);
}
/* a season's TV cue sheets: headed with the book's heading (…音楽ロール（Qシート）表), opening to a clickable episode list */
function tvPanel(sid){
  const eps = D.works.filter(w => (w.type === 'tv' || w.type === 'special') && w.s === sid);
  const tvN = eps.filter(w => w.type === 'tv').length, spN = eps.length - tvN;
  const count = `${tvN} ${tvN === 1 ? 'episode' : 'episodes'}` + (spN ? ` and ${spN} ${spN === 1 ? 'special' : 'specials'}` : '');
  return subDetails('tv-' + sid, tx(['TVシリーズ　音楽ロール（Qシート）表', 'TV shiriizu ongaku rooru (Q shiito) hyou', 'TV Cue Sheets']), en(count), () =>
    '<div class="eplist">' + eps.map(w =>
      headings.filter(h => h.w === w.id).map(h => `<div class="ep-head">${tx(shortHead(headPart(h.x)))}</div>`).join('') +
      `<details class="epi" id="${w.n ? 'ep' + w.n : 'sp'}" data-w="${w.id}"><summary><span class="chev">▶</span>`
      + `<span class="epn" translate="no">${w.n ?? 'SP'}</span><span class="ept">${epTitle(w)}</span></summary><div class="epbody"></div></details>`).join('') + '</div>');
}

/* Notes: the book's notes that apply across seasons */
{
  // the notes live in a dialog opened from the bar's Notes button, not in the page body
  const dlg = document.createElement('dialog');
  dlg.id = 'notesDlg'; dlg.className = 'notes-dlg'; dlg.setAttribute('aria-labelledby', 'notesDlgH');
  const parts = [];
  const noteSec = (id, title, render) => parts.push({id, title, html: render()});
  noteSec('ed-notes', en('About This Site'), () => noteList(ED_NOTES));
  noteSec('glossary', en('Glossary'), glossary);
  noteSec('bgm-notes', en('BGM List Notes'), () => `<div class="notes-top">${legendHtml()}</div>`);
  const tvNote = bookNotes.find(n => n.p === 124);
  if (tvNote) noteSec('tv-notes', en('TV Cue Sheet Notes'), () => `<div class="notes-top">${noteBullets([tvNote])}</div>`);
  // p.118: the note on how the film tables work applies to every film
  const filmNotes = plainNotes.filter(n => n.s === 'MOVIE' && !n.w && !n.c);
  if (filmNotes.length) noteSec('film-notes', en('Movie Notes'), () => `<div class="notes-top">${noteBullets(filmNotes)}</div>`);
  dlg.innerHTML = `<div class="dlg-head"><h2 id="notesDlgH">${en(UI.notes)}</h2>`
    + `<nav class="dlg-toc">${parts.map(p => `<a href="#${p.id}" data-note="${p.id}">${p.title}</a>`).join('')}</nav>`
    + `<button class="btn dlg-x" type="button">${en(UI.close)}</button></div>`
    + `<div class="dlg-body">${parts.map(p => `<section id="${p.id}"><h3>${p.title}</h3>${p.html}</section>`).join('')}</div>`;
  document.body.appendChild(dlg);
  const body = dlg.querySelector('.dlg-body');
  window.openNotes = id => {
    if (!dlg.open) dlg.showModal();
    const el = id && document.getElementById(id);
    body.scrollTop = el ? el.offsetTop - body.offsetTop - 8 : 0;
  };
  document.getElementById('notesBtn').onclick = () => openNotes();
  dlg.querySelector('.dlg-x').onclick = () => dlg.close();
  dlg.addEventListener('click', e => {
    if (e.target === dlg) dlg.close();   // a click on the backdrop
    const a = e.target.closest('a[data-note]'); if (a) { e.preventDefault(); openNotes(a.dataset.note); }
  });
}
/* each film belongs with the season it came out alongside (FILMS) */
D.bgm.forEach(b => { if (b.id !== 'MOVIE') b.cats.forEach(c => c.r.forEach(r => { ROW_PANEL[cueId(r.c)] = {section: 'sec-' + b.id, panel: 'bgm-' + b.id}; })); });
D.works.forEach(w => { if (FILMS[w.id]) w.parts.forEach(p => p.r.forEach(r => { ROW_PANEL[filmRowId(w, r)] = {section: 'sec-' + FILMS[w.id].season, panel: 'film-' + w.id}; })); });
/* TV cue-sheet rows (for Uses links and the Back button) and the episodes themselves (#ep98) */
D.works.forEach(w => { if (w.type !== 'movie') {
  const at = {section: 'sec-' + w.s, panel: 'tv-' + w.s, ep: w.n ? 'ep' + w.n : 'sp'};
  ROW_PANEL[at.ep] = at;
  w.parts.forEach(p => p.r.forEach(r => { ROW_PANEL[ROW_ID.get(r)] = at; }));
} });
/* ---------- the albums page ----------
   Every album in albums.js, each track with the pieces the BGM lists and film tables place on it (1-1-1 = disc 1,
   track 1, first piece): M-NO., time and description as printed, and where each is used. A film row that reuses a cue
   from another table (its credit links there) is left out; its use shows under that cue. */
/* the albums tables are this site's, so their headings are English only */
const ALBUM_HEAD = [
  {en: 'No.', c: 'num'},
  {en: 'Track title'},
  {en: 'Time', c: 'tm'},
  {en: 'Piece', c: 'seg', t: 'Each piece on the track and where it plays: start–end, with its length in brackets. Measured from the CD audio at the silent gaps between pieces',
    k: [['~', 'Approximate: a change in the music with no gap'], ['×', 'Crossfade: two codes on one piece, one fading into the other']]},
  {en: 'Uses', t: 'Every episode and film that uses the piece, with that cue sheet\'s description. Click the button to show them'},
  {en: 'BGM list reference', t: 'The piece\'s M-NO. in the BGM list (or the film\'s cue sheet) and its description there, from the booklet. The link icon goes to that entry, which also has the length printed in the booklet (TIME). Long text is cut off with …: click the cell to show the whole column'},
  {en: 'Same as', c: 'also', t: 'The same recording on another album, found from the audio: the box set\'s place for an original-album piece, or the original albums\' pieces for a box-set piece'}];
const ALBUM_PANEL = {};   // album code -> the panel it sits in (a box-set disc: the box set's), or '' at the top level
function albumPieces(){
  const at = {};   // album code -> track key -> [{piece, r, id, w?}]
  const add = (cd, x) => { const o = parseCd(cd); if (!o) return;
    ((at[o.code] ||= {})[o.key] ||= []).push({piece: o.piece, ...x}); };
  D.bgm.forEach(b => b.cats.forEach(c => c.r.forEach(r => add(r.cdx || r.cd, {r, id: r.c !== '—' ? cueId(r.c) : ''}))));
  D.works.filter(w => w.type === 'movie').forEach(w => w.parts.forEach(p => p.r.forEach(r => {
    if (!(r.cl || []).some(c => c[1])) add(r.cdx || r.cd, {r, w, id: filmRowId(w, r)});
  })));
  return at;
}
/* track keys in order: 12 before 13, and the song box's 2-10 after 1-30 */
const keyOrder = (a, b) => { const x = a.split('-').map(Number), y = b.split('-').map(Number); return x[0] - y[0] || (x[1] || 0) - (y[1] || 0); };
/* a piece's place on the CD (albums.js s: [start, duration, break, checked]), as m:ss; a start found only from a change in
   the music, with no gap, is approximate (~) */
const mss = x => { const t = Math.floor(x + 1e-6); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };   // whole seconds dropped, as CD players and VGMdb show them
const BREAK_NOTE = {silence: 'a silent gap', dip: 'a quiet moment', change: 'a change in the music, with no gap (approximate)'};
/* a piece's segment of the track: start–end (length) */
/* minutes padded to two digits so the right-aligned times line up; a mark in front: ~ an approximate break, × a crossfade,
   + layered */
const mss2 = x => mss(x).padStart(5, '0');
const segText = (start, end, a = '') => `${a ? `<span class="mark">${a}</span>` : ''}${mss2(start)} – ${mss2(end)} <span class="seglen">(${mss2(end - start)})</span>`;
/* the Piece cell: the piece number (3, 3a) and where it runs in the track */
const pnoTag = t => `<span class="pno">${esc(t || '')}</span>`;
/* the number at the left and the times at the right, on one baseline (the times are a smaller monospace) */
const segRow = (t, times) => `<span class="segrow">${pnoTag(t)}<span class="segt">${times}</span></span>`;
function segCell(sp, t, end){
  if (!sp) return `<td class="seg" translate="no">${pnoTag(t)}</td>`;
  const [start, dur, brk] = sp;
  const title = brk ? `Found from the audio: ${BREAK_NOTE[brk]}` : 'Found from the audio';
  return `<td class="seg" translate="no" title="${esc(title)}">${segRow(t, segText(start, end ?? start + dur, brk === 'change' ? '~' : ''))}</td>`;
}
/* one of two codes sharing a piece (albums.js x: [piece, start, end]): where it plays within it, approximate */
/* × a crossfade (one fades into the other; times approximate), + layered (one plays within the other, so both cover the
   whole piece); joined end to end at a dip or a clear change in the audio: no mark, the time is exact */
const MIX = {crossfade: ['×', 'Crossfade: this part fades into the other. Approximate, found by ear'],
  layered: ['+', 'Layered: one code plays within the other here, so each covers the whole piece'],
  joined: ['', 'Joined end to end: the next code starts straight after, at a near-silent dip or a clear change in the music, found from the audio']};
const partSeg = ([, start, end, mix], t) => { const [mark, title] = MIX[mix] || MIX.crossfade;
  return `<td class="seg" translate="no" title="${esc(title)}">${segRow(t, segText(start, end, mark))}</td>`; };
/* a piece the tray card prints but the booklet never places at this track (albums.js e: [as printed, code]): its code
   (linked to its BGM-list row), what the card adds (編集 = an edit, ―4種 = four versions), and a note */
const EXTRA_WORDS = [[/編集$/, ['編集', 'henshuu', 'edit']], [/―4種$/, ['4種', 'yonshu', '4 versions']]];
function extraCells(ex, also = ''){
  if (!ex) return `<td></td><td></td><td class="also">${also}</td>`;
  const [printed, code, cardNote] = ex;
  const fmt = p => p.replace(/^([A-Z]+)(\d)/, '$1-$2');      // J10 -> J-10
  const word = EXTRA_WORDS.find(([re]) => re.test(printed));
  const list = code ? [code] : printed.split('+').map(fmt);   // two joined: C1a+C1b (the icon goes to the first)
  // what the card's label means, when the site has worked it out (J11編集: an edit of J-11, and which parts)
  const note = 'Not on BGM list (the tray card prints ' + printed + ')' + (cardNote ? ': ' + cardNote : '');
  return '<td></td>' + refCell(cueId(list[0]), `${esc(list.join('+'))}${word ? ` <span class="src">${tx(word[1], null, 'inl')}</span>` : ''}`, en(esc(note)), 'was')
    + `<td class="also">${also}</td>`;
}
function albumTable(code, al, pieces){
  let html = `<div class="scroll">${tableTag('album')}<thead>${headRow(ALBUM_HEAD, false)}</thead>`;
  const keys = [...new Set([...Object.keys(al.t), ...Object.keys(pieces || {})])].sort(keyOrder);
  keys.forEach(key => {
    let cited = (pieces?.[key] || []).slice().sort((a, b) => (+a.piece || 0) - (+b.piece || 0));
    // every piece the audio shows, cited or not (an uncited piece gets a row with only its place on the CD)
    const places = al.s?.[key] || [];
    const twins = al.q?.[key] || {};   // an original album's piece that is the same recording as a box-set piece
    // the booklet citing a whole multi-piece track (SS-4 for M-32): the one piece with no citation and no box-set twin
    if (places.length && cited.some(x => !x.piece)) {
      const open = places.map((_, i) => String(i + 1)).filter(p => !twins[p] && !cited.some(x => x.piece === p));
      if (open.length === 1) cited = cited.map(x => x.piece ? x : {...x, piece: open[0]});
    }
    // a piece the booklet names that has no audio on the CD (3-11-5, M-105B SE; its BGM-list note says so): left out
    const list = cited.filter(x => !(places.length && +x.piece > places.length));
    // an uncited piece with a box-set twin: the booklet's entries for that box-set place, marked with where they come from
    const twinRows = (p, shown) => {
      const o = parseCd(twins[p]); if (!o) return [];
      const at = ((albumTable.all ||= albumPieces())[o.code]?.[o.key] || []).filter(x => o.piece ? x.piece === o.piece : !x.piece);
      return at.length ? at.map(x => ({...x, piece: shown, twin: twins[p]})) : [{piece: shown, blank: true, twin: twins[p]}];
    };
    places.forEach((_, i) => { const p = String(i + 1); if (!cited.some(x => +x.piece === i + 1)) list.push(...(twins[p] ? twinRows(p, p) : [{piece: p, blank: true}])); });
    if (!places.length && !list.length && twins['1']) list.push(...twinRows('1', ''));
    const partStart = x => al.x?.[key]?.[x.r?.c]?.[1] ?? 0;   // two codes on one piece: in the order they play
    list.sort((a, b) => (+a.piece || 0) - (+b.piece || 0) || partStart(a) - partStart(b));
    const rows = list.length || 1, n = al.p === 'MMB' ? `${al.d}-${key}` : key;   // disc-track (the song box's keys already are)
    html += `<tbody id="${esc(trackId(code, key))}">`;
    // Time: the whole track's length, once, beside its title; Piece: each piece and its place in the track
    const len = al.l?.[key];
    const head = `<td class="num" translate="no" rowspan="${rows}">${esc(n)}</td>` + xcolCell('title', al.t[key] ? stack(al.t[key]) : '', {max: '26em', cls: 'ttl', attrs: ` rowspan="${rows}"`})
      + `<td class="tm" translate="no" rowspan="${rows}"${len ? ' title="Measured from the audio"' : ''}>${len ? mss(len) : ''}</td>`;
    // the last piece ends where the track does (its stored duration is rounded to a tenth of a second)
    const segOf = (x, t) => segCell(places.length && x.piece && places[x.piece - 1], t, len && +x.piece === places.length ? len : undefined);
    const ex = al.e?.[key];
    // Same as: an original album's piece -> its box-set place; a box-set piece -> the original albums' pieces with that recording
    const also = x => x.twin ? twinTag(x.twin)
      : al.p === 'MMB' ? sameAsOriginals(places.length > 1 && x.piece ? `${code}-${key}-${x.piece}` : `${code}-${key}`) : '';
    if (!list.length) html += `<tr>${head}${segOf({}, '')}${extraCells(ex?.['1'], also({}))}</tr>`;
    // several codes on one whole piece (M-330 and its edit M-330A on 4-20-2): one Piece cell spanning their rows. A code
    // with its own part of a piece (a, b) keeps its own cell.
    const pieceKey = x => x.blank || (!(x.w && FILMS[x.w.id]) && al.x?.[key]?.[x.r.c]) ? null : 'p' + (x.piece || '');
    const span = list.map((x, i) => { const k = pieceKey(x); if (!k) return 1; if (i && pieceKey(list[i - 1]) === k) return 0;
      let n = 1; while (i + n < list.length && pieceKey(list[i + n]) === k) n++; return n; });
    const spanned = (cell, i) => !span[i] ? '' : span[i] > 1 ? cell.replace('<td class="seg"', `<td class="seg" rowspan="${span[i]}"`) : cell;
    list.forEach((x, i) => {
      if (x.blank && x.twin) { html += `<tr>${i ? '' : head}${segOf(x, x.piece)}<td></td><td></td><td class="also">${also(x)}</td></tr>`; return; }
      if (x.blank) { html += `<tr>${i ? '' : head}${segOf(x, x.piece)}${extraCells(ex?.[x.piece], also(x))}</tr>`; return; }
      const r = x.r, film = x.w && FILMS[x.w.id];
      const part = !film && al.x?.[key]?.[r.c];
      const pt = (x.piece || '') + (part ? partLetter(code, key, r.c) : '');
      const placeHere = part ? partSeg(part, pt) : segOf(x, pt);
      const codeTxt = r.c && r.c !== '—' ? r.c : film ? 'M ' + r.m : '';
      // a code with a variant word (M-58 S・マーキュリー), or a film credit printed with words ((M-520別)), shows it in each
      // language, as in the BGM list
      const shown = !film && r.cn ? stack(r.cn) : Array.isArray(codeTxt) ? stack(codeTxt) : esc(codeTxt);
      const self = film ? {w: x.w, rows: [{id: x.id, part: null, m: r.m}]} : null;
      html += `<tr>${i ? '' : head}${spanned(placeHere, i)}`
        + usesCell(x.id, self)
        + refCell(x.id, `${shown}${film ? ` <span class="src">${en(esc(film.short))}</span>` : ''}`, r.d ? stack(r.d) : '')
        + `<td class="also">${also(x)}</td></tr>`;
    });
    html += '</tbody>';
  });
  return html + '</table></div>';
}
/* a piece's uses: a button ("N uses") that shows or hides every use of the piece, each with that cue-sheet row's
   description. self = a film row, which is its own use (its description is the one beside it, so it isn't repeated).
   Used by the albums page's Uses column and the BGM lists' and film tables' Uses column. */
function usesCell(id, self, cls = 'du'){
  const uses = [...(self ? [{...self, self: true}] : []), ...(USES[id] || [])].flatMap(e => e.rows.map(x => ({w: e.w, self: e.self, ...x})));
  const n = uses.length; if (!n) return `<td class="${cls}"></td>`;
  const count = `${n} ${n === 1 ? 'use' : 'uses'}`;
  const toggle = `<button type="button" class="du-toggle" aria-expanded="false" title="Show or hide the uses">${en(count)}<svg class="du-chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
  const line = u => {
    const film = u.w.type === 'movie';
    const name = film ? FILMS[u.w.id].short : u.w.n ? 'Ep ' + u.w.n : 'SP';
    const where = (u.part ? u.part + ' part, ' : '') + 'M ' + u.m;
    const title = (film ? FILMS[u.w.id].short : u.w.n ? 'Episode ' + u.w.n : 'Special') + ': ' + where;
    // as the BGM list references: a link icon, then the episode › its cue-sheet row's description
    const desc = u.d && !u.self ? stack(u.d) : '';
    return `<li class="du-use">${refLink(u.id, title,
      `<span class="du-text"><span class="du-ep">${en(esc(name))}</span>${desc ? REF_SEP + `<span class="du-desc">${desc}</span>` : ''}</span>`)}</li>`;
  };
  return `<td class="${cls}">${toggle}<ul class="du-uses" hidden>${uses.map(line).join('')}</ul></td>`;
}
/* the albums page's BGM list reference: an icon linking to the piece's BGM-list (or film-table) row, then its code (and
   film) and its description, run together: M-58 Sailor Mars › … */
const REF_ICON = '<svg class="ref-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="currentColor"/><path d="M10.6 13.4l2.8-2.8M9.4 11.2l-1.5 1.5a2.6 2.6 0 0 0 3.7 3.7l1.5-1.5M14.6 12.8l1.5-1.5a2.6 2.6 0 0 0-3.7-3.7l-1.5 1.5" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>';   // a chain link in a circle
const REF_SEP = '<span class="refsep" aria-hidden="true"> › </span>';
// a reference link: the icon and its text together, one link (cls: more classes for the link itself)
const refLink = (id, title, body, cls = '') =>
  `<a class="go ref-link${cls ? ' ' + cls : ''}" href="${HOME}#${esc(id)}" data-go="${esc(id)}" title="${esc(title)}"><span class="ref-go">${REF_ICON}</span>${body}</a>`;
/* ---------- expandable columns ----------
   A column whose text never wraps: past the column's limit (max, any CSS length) a cell is cut off with …, and an icon at
   its right edge marks it. Clicking (or Enter on) a cut-off cell shows that whole column of its table in full, one line per
   language, and clicking again shortens it. A table can have several; each is named by col (unique within the table).
   xcolCell(col, html, {max, cls, before, attrs, link}) writes a cell (before: anything ahead of the text, like a link icon;
   link(inner, cls): wraps the cell's row in a link instead of a plain div);
   measureXcols(root) marks which cells are cut off (call it after building cells or changing what fits). */
const xcolCell = (col, html, {max = '30em', cls = '', before = '', attrs = '', link = null} = {}) => {
  const inner = before + `<span class="xcol-text">${html}</span>`;
  return `<td class="xcol${cls ? ' ' + cls : ''}" data-xcol="${esc(col)}" style="--xcol-max:${max}"${attrs}>`
    + (link ? link(inner, 'xcol-row') : `<div class="xcol-row">${inner}</div>`) + '</td>';
};
function measureXcols(root = document){
  root.querySelectorAll('td.xcol').forEach(td => {
    // an expanded column keeps the mark on the cells that were cut off, so they can shorten it again
    if (!td.classList.contains('open')) {
      const t = td.querySelector('.xcol-text'), over = e => e.scrollWidth > e.clientWidth + 1;
      // cut off only when the text has reached its limit (a glyph poking past its line, like a slanted !, doesn't count)
      const atMax = t && t.clientWidth >= parseFloat(getComputedStyle(t).maxWidth) - 1;
      td.classList.toggle('cut', !!atMax && (over(t) || [...t.querySelectorAll('.cv')].some(over)));   // or one language's line
    }
    const cut = td.classList.contains('cut'), open = td.classList.contains('open');
    td.tabIndex = cut ? 0 : -1;
    if (cut) { td.title = open ? 'Click to shorten this column' : 'Click to show this column in full'; td.setAttribute('aria-expanded', open); }
    else { td.removeAttribute('title'); td.removeAttribute('aria-expanded'); }
  });
}
function toggleXcol(td){
  const table = td.closest('table'), open = !td.classList.contains('open');
  table.querySelectorAll(`td.xcol[data-xcol="${CSS.escape(td.dataset.xcol)}"]`).forEach(c => c.classList.toggle('open', open));
  measureXcols(table);
}
document.addEventListener('click', e => { const td = e.target.closest('td.xcol.cut'); if (td && !e.target.closest('a, button')) toggleXcol(td); });
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('td.xcol.cut')) { e.preventDefault(); toggleXcol(e.target); }
});
{ let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => measureXcols(), 150); }); }
/* ---------- where you are ----------
   A line under the top bar naming the sections scrolled into: season › panel › episode › table heading › film segment, or album ›
   disc. A level shows once its heading has gone under the bar; clicking one scrolls back to that heading.
   Under it, once a table's column heads scroll under, a small one-line copy of them, lined up with the columns. (A copy, not
   the heads themselves pinned: shrinking the real row would pull the rows below it up and make the table jump.) */
{
  const bar = document.getElementById('bar'), crumbs = document.createElement('nav'), pin = document.createElement('div');
  crumbs.className = 'crumbs'; crumbs.hidden = true; crumbs.setAttribute('aria-label', 'Where you are');
  pin.className = 'pinhead'; pin.hidden = true; pin.setAttribute('aria-hidden', 'true');
  bar.append(crumbs, pin);
  // the first line showing of a heading, in the languages switched on (a hidden element's innerText is all its text, so skip it)
  const shown = el => (el?.getClientRects().length ? el.innerText : '').split('\n').map(s => s.trim()).find(Boolean) || '';
  const label = sum => {
    const t = shown(sum.querySelector('.ept, .tx') || sum), n = sum.querySelector('.epn')?.textContent;
    return n ? (/^\d+$/.test(n) ? 'Ep ' + n : n) + ': ' + t : t;
  };
  // a season's logo, or an album's thumbnail (which gets the albums' thin blue frame)
  const picture = sum => { const i = sum.querySelector('img.al-th, img:not(.al-full)');
    return i ? `<img src="${esc(i.getAttribute('src'))}" alt=""${sum.querySelector('.al-title') ? ' class="cover"' : ''}>` : ''; };
  const TO_TOP = '<button type="button" class="to-top" data-top title="Back to the top" aria-label="Back to the top">'
    + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1z" fill="currentColor"/>'
    + '<path d="M18.2 3.2l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" fill="currentColor"/></svg></button><span aria-hidden="true">›</span>';   // a crescent and a twinkle
  /* the bar is fixed to the window, so it takes no room in the page: the page starts below the bar's full height (--barh),
     and the bar's buttons can shrink while this line shows without moving anything under it */
  let full = 0;
  const compact = on => {
    bar.classList.remove('compact');
    full = bar.offsetHeight; document.documentElement.style.setProperty('--barh', full + 'px');
    if (on) bar.classList.add('compact');
  };
  compact(false);
  let marks = [], key = '', pinned = null, pinLang = '';
  function update(){
    // the bar at full size, and this line's own height below it
    const line = bar.getBoundingClientRect().top + full + 30;
    const items = [];   // [label, element to go back to]
    let inner = null;
    document.querySelectorAll('details[open]').forEach(d => {
      const s = d.firstElementChild, r = d.getBoundingClientRect();
      if (s.getBoundingClientRect().bottom < line && r.bottom > line) { items.push([label(s), d, picture(s)]); inner = d; }
    });
    // inside a table: its heading, then the last film-segment heading gone under the bar (cue sheet parts, A part / B part,
    // aren't a level: the episode is enough)
    const table = inner && [...inner.querySelectorAll('table.bk')].find(t => { const r = t.getBoundingClientRect(); return r.top < line && r.bottom > line; });
    if (table) {
      let last = null;
      table.querySelectorAll('tbody th.cap').forEach(th => { if (th.getBoundingClientRect().bottom < line) last = th; });
      // a table's title band, unless it repeats its section's name (a film's "…: cue sheet and BGM list" under its
      // "Movie: Cue Sheet & BGM List" panel): the same words after the last colon (in Japanese, the last wide space)
      const head = table.tHead?.querySelector('th.cap'), tail = t => t.split(/: |\u3000/).pop().toLowerCase().replace(/&/g, 'and');
      if (head && head.getBoundingClientRect().bottom < line && tail(shown(head)) !== tail(items.at(-1)[0])) items.push([shown(head), head]);
      if (last) items.push([shown(last), last]);
    }
    const list = items.filter(([t], i) => t && t !== items[i - 1]?.[0]), k = list.map(([t]) => t).join('\u0000');
    if (k !== key) {
      key = k; marks = list.map(([, el]) => el);
      crumbs.hidden = !list.length;
      if (bar.classList.contains('compact') === crumbs.hidden) compact(!crumbs.hidden);
      crumbs.innerHTML = TO_TOP + list.map(([t, , img = ''], i) =>   // table headings have no picture
         `<button type="button" data-i="${i}" title="Back to ${esc(t)}">${img}<span>${esc(t)}</span></button>`).join('<span aria-hidden="true">›</span>');
    }
    pinHeads(table);
  }
  function pinHeads(table){
    const b = bar.getBoundingClientRect(), top = crumbs.hidden ? b.bottom : crumbs.getBoundingClientRect().bottom;
    // the table's last column-head row to reach the line (a cue sheet has one per part)
    let row = null;
    if (table) table.querySelectorAll('tr.cols').forEach(tr => { if (tr.getBoundingClientRect().top < top) row = tr; });
    if (row && table.getBoundingClientRect().bottom < top + pin.offsetHeight + 8) row = null;   // the table is nearly gone
    pin.hidden = !row;
    if (!row) { pinned = null; return; }
    const cells = [...row.cells];
    if (row !== pinned || pinLang !== document.body.className) {
      pinned = row; pinLang = document.body.className;
      // each head's text (not its ? tips), with its own alignment and colours (this site's columns are green)
      const text = th => [...th.children].filter(c => !c.matches('.tip')).map(shown).find(Boolean) || '';
      pin.innerHTML = '<div class="ph-row">' + cells.map(th => { const c = getComputedStyle(th);
        return `<span style="text-align:${c.textAlign};background:${c.backgroundColor};color:${c.color}">${esc(text(th))}</span>`; }).join('') + '</div>';
    }
    // line up with the columns, cut to what shows of the table (its own scroll box, the window)
    const box = table.parentElement, r = table.getBoundingClientRect(), scrolls = getComputedStyle(box).overflowX !== 'visible';
    const br = box.getBoundingClientRect();
    const left = Math.max(r.left, scrolls ? br.left : r.left, 0), right = Math.min(r.right, scrolls ? br.right : r.right, document.documentElement.clientWidth);
    Object.assign(pin.style, {top: top - b.top + 'px', left: left - b.left + 'px', width: Math.max(0, right - left) + 'px'});
    const rowEl = pin.firstChild;
    rowEl.style.transform = `translateX(${cells[0].getBoundingClientRect().left - left}px)`;
    cells.forEach((th, i) => { rowEl.children[i].style.width = th.getBoundingClientRect().width + 'px'; });
  }
  crumbs.addEventListener('click', e => {
    if (e.target.closest('[data-top]')) { scrollTo(0, 0); return; }
    const el = marks[e.target.closest('button')?.dataset.i]; if (!el) return;
    scrollBy(0, el.getBoundingClientRect().top - bar.getBoundingClientRect().bottom - 4);
  });
  // scroll events already come once a frame; update() only touches the page when the line's text changes
  // (caught on the way down, so a table scrolled sideways in its own box moves its heads' copy too)
  document.addEventListener('scroll', update, {passive: true, capture: true}); addEventListener('resize', () => { compact(!crumbs.hidden); update(); });   // the bar may wrap differently
  document.addEventListener('toggle', update, true); document.addEventListener('change', () => { key = ''; update(); });
}
const refCell = (id, code, desc, cls = '') => {
  const linked = id && ROW_PANEL[id];   // unlinked: an empty icon space keeps the text in line
  return xcolCell('ref', (code ? `<span class="refcode">${code}</span>` : '') + (code && desc ? REF_SEP : '') + (desc ? `<span class="refdesc">${desc}</span>` : ''),
    {max: '75ch', cls: 'ref' + (cls ? ' ' + cls : ''), before: linked ? '' : '<span class="ref-go"></span>',
     link: linked ? (inner, c) => refLink(id, goTitle(id), inner, c) : null});
};
/* the Same as column on a box-set disc: the original albums' pieces that are the same recording as this box-set place
   (albums.js q, read backwards), each linked to its track: SS-12-1, or S-8 for a single-piece track */
let ORIGINALS;
function sameAsOriginals(place){
  if (!ORIGINALS) {
    ORIGINALS = {};
    Object.entries(ALBUMS).forEach(([a, al]) => Object.entries(al.q || {}).forEach(([t, ps]) => Object.entries(ps).forEach(([p, src]) =>
      (ORIGINALS[src] ||= []).push({a, t, label: `${a}-${t}${(al.s?.[t]?.length || 0) > 1 ? '-' + p : ''}`}))));
  }
  return (ORIGINALS[place] || []).map(o => {
    const name = ALBUMS[o.a].n[ALBUMS[o.a].n.length - 1];
    return `<span class="same" title="${esc(`The same recording is on ${name} as ${o.label} (found from the audio)`)}">`
      + `<a class="go" href="#${esc(trackId(o.a, o.t))}" translate="no">${esc(o.label)}</a></span>`;
  }).join('');
}
/* the Same as column on an original album: its piece found on the box set (albums.js q), linked to that track */
function twinTag(place){
  const o = parseCd(place), id = o && trackId(o.code, o.key);
  const label = `<span translate="no">BOX ${esc(place)}</span>`;
  return `<span title=""${esc(`The same recording is on the box set at ${place} (found from the audio)`)}">`
    + (id ? `<a class="go" href="#${esc(id)}">${label}</a>` : label) + '</span>';
}
/* an album's heading: cover, name and, while it is open, its links (VGMdb, tray card) under the name; the cover grows
   while it is open (styles.css). A link inside a summary opens the link without toggling the panel. */
/* an album's cover: when it has a separate closed-state picture (th), that shows while closed and the cover itself while open */
const albumSummary = (al, title, count) => (al.th ? `<img class="al-th" src="${esc(al.th)}" alt=""><img class="al-full" src="${esc(al.img)}" alt="">`
  : al.img ? `<img src="${esc(al.img)}" alt="">` : '') + `<span class="al-title">${title}${albumSub(al, count)}</span>`;
/* under an album's title: its track (or disc) count, and once open, its VGMdb link */
const albumSub = (al, count) => `<span class="al-sub">${en(count)}${al.v ? `<span class="al-links"> · ${ext(`https://vgmdb.net/album/${al.v}`, 'VGMdb', '')}</span>` : ''}</span>`;
/* an album whose every track is listed and measured (the box-set discs, the S album): not just the cited tracks */
const albumComplete = al => !!al.l && Object.keys(al.t).every(k => al.l[k]);
/* every album at the top level, in order. A set (the box set, the song box) shows its cover and links at the top of its
   panel and its discs nested inside it as albums of their own; the song box's discs are cut from its one track list */
function renderAlbums(){
  const pieces = albumPieces();
  const panel = (id, al, parent, title, code = id, pc = pieces[code]) => {
    ALBUM_PANEL[id] = parent;
    const n = Object.keys(al.t).length;
    return subDetails('al-' + id, albumSummary(al, title, `${n} ${n === 1 ? 'track' : 'tracks'}`), '',
      () => (al.p || al.dn || albumComplete(al) ? '' : `<p class="note">${en('Only the tracks the booklet cites are listed.')}</p>`)
        + albumTable(code, al, pc));
  };
  const set = (code, al, discs) => {
    ALBUM_PANEL[code] = '';
    const d = app.appendChild(details('sub', 'al-' + code, albumSummary(al, tx(al.n), `${discs.length} discs`), 'inner discs'));
    d.build = () => {};   // its discs are already in place; each builds its own table when opened
    const body = d.querySelector('.inner');
    discs.forEach(([id, dal, title, dcode, dpc]) => body.appendChild(panel(id, dal, 'al-' + code, title, dcode, dpc)));
  };
  const discTitle = (n, name) => tx([`ディスク${n}　${name[0]}`, `Disc ${n}: ${name[1]}`]);
  const ofDisc = (o, n) => o && Object.fromEntries(Object.entries(o).filter(([key]) => key.split('-')[0] === n));
  Object.keys(ALBUMS).filter(k => !ALBUMS[k].p).forEach(k => {
    const al = ALBUMS[k];
    if (k === 'MMB') set(k, al, Object.keys(ALBUMS).filter(c => ALBUMS[c].p === 'MMB').sort((a, b) => ALBUMS[a].d - ALBUMS[b].d)
      .map(c => [c, ALBUMS[c], discTitle(ALBUMS[c].d, ALBUMS[c].n)]));
    else if (al.dn) set(k, al, Object.entries(al.dn).map(([n, name]) =>
      [`${k}-${n}`, {t: ofDisc(al.t, n), l: ofDisc(al.l, n), img: name[2], dn: al.dn}, discTitle(n, name), k, ofDisc(pieces[k], n)]));
    else app.appendChild(panel(k, al, '', tx(al.n)));
  });
}
/* an albums-page link (#al-7, #al-7-22) opens its album (and the box set, for a disc) and scrolls to it */
function revealAlbum(id){
  const code = Object.keys(ALBUM_PANEL).filter(c => id === 'al-' + c || id.startsWith('al-' + c + '-')).sort((a, b) => b.length - a.length)[0];
  if (!code) return false;
  [ALBUM_PANEL[code], 'al-' + code].filter(Boolean).forEach(pid => { const p = document.getElementById(pid); p.open = true; p.build(); });
  const el = document.getElementById(id); if (!el) return false;
  goTo(el, id === 'al-' + code ? 'start' : 'center', id === 'al-' + code ? 0 : 1800);
  return true;
}

/* one section per season: its BGM list, its TV cue sheets, then its films */
if (VIEW === 'albums') renderAlbums();
else ['SM','R','S','SS','ST'].forEach(sid => {
  const logo = `<img src="${D.logos[sid]}" alt="${esc(D.logoAlt[sid])}">`;
  const box = section('sec-' + sid, logo + tx(D.ser[sid]));
  const list = D.bgm.find(b => b.id === sid); if (list) box.appendChild(bgmPanel(list));
  box.appendChild(tvPanel(sid));
  D.works.filter(w => w.type === 'movie' && FILMS[w.id]?.season === sid).forEach(w => box.appendChild(filmPanel(w)));
});
/* an episode's cue sheet is built the first time it is opened */
function buildEpisode(d){
  if (d.dataset.done) return;
  const w = D.works.find(x => x.id === d.dataset.w);
  d.querySelector('.epbody').innerHTML = cueTable(w, true) + noteBlock(plainNotes.filter(n => n.w === w.id)) + pageTag(w.pp[0], w.pp[1]);
  fixSpanBorders(d);
  d.dataset.done = 1;
}
document.addEventListener('toggle', e => { const d = e.target; if (d.classList && d.classList.contains('epi') && d.open) buildEpisode(d); }, true);

/* ---------- expand / collapse ---------- */
document.getElementById('openAll').onclick = () => document.querySelectorAll('details').forEach(d => d.open = true);
document.getElementById('closeAll').onclick = () => document.querySelectorAll('details').forEach(d => d.open = false);

/* ---------- language checkboxes ---------- */
const langBox = document.getElementById('langs'), langInputs = [...langBox.querySelectorAll('input')];
function setLangs(on){
  ['ja', 'ro', 'en'].forEach(l => document.body.classList.toggle('l-' + l, on.includes(l)));
  // the page's main language (for screen readers and font choice): Japanese only when English is off
  document.documentElement.lang = on.includes('ja') && !on.includes('en') ? 'ja' : 'en';
  langInputs.forEach(i => { i.checked = on.includes(i.dataset.l); });
}
/* the page opens in English; a choice the reader makes is remembered for later visits */
langBox.addEventListener('change', e => {
  const on = langInputs.filter(i => i.checked).map(i => i.dataset.l);
  if (!on.length) { e.target.checked = true; return; }  // keep at least one language
  setLangs(on); measureXcols();   // what fits changes with the languages shown
  try { localStorage.setItem('mmb-lang-choice', on.join(',')); } catch (e) {}
});
let saved = null; try { saved = localStorage.getItem('mmb-lang-choice'); } catch (e) {}
const savedLangs = (saved || '').split(',').filter(l => ['ja', 'ro', 'en'].includes(l));
setLangs(savedLangs.length ? savedLangs : ['en']);

/* a "← Back" button floats at the bottom of the screen after a jump: one within this page, or a link from the other page
   (a Track link to the albums, a code or Uses link back to the BGM lists), which Back returns to */
const backBtn = document.createElement('button');
backBtn.className = 'btn back'; backBtn.type = 'button'; backBtn.hidden = true;
backBtn.innerHTML = en('← ' + UI.back);
backBtn.onclick = () => history.back();
document.body.appendChild(backBtn);
const pageOf = path => path.replace(/index\.html$/, '');
const tagged = new URLSearchParams(location.search).has('from') && history.length > 1;
const fromOther = tagged || (() => { try { const r = new URL(document.referrer); return r.origin === location.origin && pageOf(r.pathname) !== pageOf(location.pathname); } catch (e) { return false; } })();
if (fromOther && !history.state?.depth) history.replaceState({...history.state, depth: 1}, '');
// tidy the address (a copied link shouldn't carry the tag); some browsers refuse this for files, which is harmless
if (tagged) { try { const u = new URL(location.href); u.searchParams.delete('from'); history.replaceState(history.state, '', u.href); } catch (e) {} }
let depth = history.state?.depth || 0;   // jumps since arriving, so Back is only offered when it goes somewhere on the site
const showBack = () => { backBtn.hidden = depth < 1; };
/* a link to the other page: remember the row it was in (an album track, a BGM-list or cue-sheet row, or an episode), and
   whether it was inside an open Uses list, so Back to this page returns to that row */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]'); if (!a || a.target === '_blank') return;
  let u; try { u = new URL(a.href, location.href); } catch (err) { return; }
  if (u.origin !== location.origin || pageOf(u.pathname) === pageOf(location.pathname)) return;
  const inPop = a.closest('#uses-pop'), from = inPop && usesPop.owner || a;   // a link in the uses box: the row of its button
  const row = from.closest('tbody[id^="al-"], tr[id], details.epi'), tr = from.closest('tr');
  history.replaceState({...history.state, anchor: row?.id, row: row?.tBodies || !row?.rows ? -1 : [...row.rows].indexOf(tr),
    uses: !!inPop, y: scrollY, depth}, '');
}, true);
// set when this page was left by such a link and is now being returned to; a refresh starts fresh instead
const navType = performance.getEntriesByType?.('navigation')[0]?.type;
// the browser's own scroll restore would land on an arbitrary row, since panels reopen closed: Back to a row is handled above
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (navType === 'reload' && history.state?.anchor) history.replaceState({...history.state, anchor: undefined, uses: false}, '');
const backTo = navType === 'back_forward' ? history.state?.anchor : undefined;
// Back to this page from the other one, restored from the browser's back-forward cache: the page is as it was left
// (no reload, so nothing reopens it), so just flash the row the link was in, as a jump does
addEventListener('pageshow', e => {
  if (!e.persisted) return;
  const el = history.state?.anchor && document.getElementById(history.state.anchor); if (!el) return;
  el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1800);
});
/* a piece's uses (the Uses column on both pages): its button opens the list in a box under it, which
   closes on a second click, a click elsewhere or Escape */
const usesPop = document.createElement('div');
usesPop.id = 'uses-pop'; usesPop.className = 'uses-pop'; usesPop.hidden = true; usesPop.tabIndex = -1;
usesPop.setAttribute('role', 'dialog');
document.body.appendChild(usesPop);
const closeUses = () => {
  if (usesPop.hidden) return;
  usesPop.hidden = true; usesPop.owner?.setAttribute('aria-expanded', 'false'); usesPop.owner = null;
};
const openUses = b => {
  closeUses();
  const list = b.closest('td').querySelector('.du-uses');
  usesPop.innerHTML = `<ul>${list.innerHTML}</ul>`;
  usesPop.setAttribute('aria-label', b.textContent.trim());
  usesPop.owner = b; b.setAttribute('aria-expanded', 'true'); usesPop.hidden = false;
  // under the button, its list lined up with the button's text; kept inside the window
  const r = b.getBoundingClientRect(), w = usesPop.offsetWidth;
  const left = Math.max(8, Math.min(r.left, document.documentElement.clientWidth - w - 8));
  usesPop.style.left = left + scrollX + 'px'; usesPop.style.top = r.bottom + scrollY + 4 + 'px';
};
const toggleUses = b => (usesPop.owner === b ? closeUses() : openUses(b));
addEventListener('keydown', e => { if (e.key === 'Escape' && !usesPop.hidden) { const b = usesPop.owner; closeUses(); b?.focus(); } });
addEventListener('resize', closeUses);
document.addEventListener('click', e => {
  const b = e.target.closest('.du-toggle'); if (b) { toggleUses(b); return; }
  if (!e.target.closest('#uses-pop')) closeUses();
});
/* back to the row a link left from: its uses list open again if the link was in it */
const reopenUses = el => { const b = history.state?.uses && el?.querySelector('.du-toggle'); if (b) setTimeout(() => openUses(b), 800); };   // after the scroll to the row settles

if (VIEW === 'albums') {
  // the box set opens by default; a link to a disc or track (#al-7-22) opens straight to it
  document.getElementById('al-MMB')?.setAttribute('open', '');
  // back from the other page: the track the link was in, with its uses list open again if the link was in it;
  // otherwise a link to a disc or track (#al-7-22) opens straight to it
  const st = history.state || {}, id = decodeURIComponent(location.hash.slice(1));
  if (backTo && revealAlbum(backTo)) reopenUses(document.getElementById(backTo)?.rows[st.row]);
  else if (id) revealAlbum(id);
  addEventListener('hashchange', () => revealAlbum(decodeURIComponent(location.hash.slice(1))));
  showBack();
} else {
/* ---------- links to a row elsewhere on the page (credit codes, Uses, notes) ----------
   A jump opens the row's section, panel and episode, scrolls to it and flashes it. Each jump is a browser history
   entry (the address shows #row-id), so Back returns to the row the link was in, and any row can be linked to. */
function reveal(id, flash = true){
  const p = ROW_PANEL[id]; if (!p) return false;
  openPanel(p.section, p.panel);
  if (p.ep) { const d = document.getElementById(p.ep); if (d) { d.open = true; buildEpisode(d); } }
  const el = document.getElementById(id); if (!el) return false;
  goTo(el, 'center', flash ? 1800 : 0);
  return true;
}
function jump(id, from){
  if (from?.closest('#uses-pop')) from = usesPop.owner;   // a link in the uses box: it started from its button's row
  closeUses();
  // remember where the jump started (the row the link is in, or failing that the scroll position)
  history.replaceState({...history.state, anchor: from?.closest('tr[id], details.epi')?.id, y: scrollY, depth}, '');
  depth++;
  history.pushState({anchor: id, depth}, '', '#' + id);
  reveal(id); showBack();
}
addEventListener('popstate', e => {
  const s = e.state || {};
  depth = s.depth || 0;
  if (!(s.anchor && reveal(s.anchor))) {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!(id && reveal(id)) && s.y != null) scrollTo(0, s.y);
  }
  showBack();
});
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-go]'); if (!a) return;
  e.preventDefault();
  if (ROW_PANEL[a.dataset.go]) jump(a.dataset.go, a);
});

/* open the first season so the page doesn't start as a wall of closed headings */
document.getElementById('sec-SM').open = true;
/* a link to a row or episode (#r-TV-98-B-19, #cue-M-206, #ep98) opens straight to it */
{ const nid = decodeURIComponent(location.hash.slice(1)); if (nid && document.querySelector(`#notesDlg section[id="${nid}"], #notesDlg #${CSS.escape(nid)}`)) openNotes(nid); }
// back from the albums page: the row the link was in; otherwise the row the address names
{ const id = decodeURIComponent(location.hash.slice(1));
  if (backTo && ROW_PANEL[backTo]) { reveal(backTo, true); reopenUses(document.getElementById(backTo)); }
  else if (id && ROW_PANEL[id]) { history.replaceState({anchor: id, depth}, ''); reveal(id); } }
showBack();
}
})();
