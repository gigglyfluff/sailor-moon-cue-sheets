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
  mast: ['セーラームーン　BGMリスト＆Qシート','Seeraa Muun BGM Risuto & Q Shiito','Sailor Moon BGM Lists & Cue Sheets'],
  back: ['戻る','Modoru','Back'],
  notes: ['注','Chuu','Notes'], close: ['閉じる','Tojiru','Close'],
  openAll: ['すべて開く','Subete hiraku','Expand all'], closeAll: ['すべて閉じる','Subete tojiru','Collapse all'],
  part: p => p==='TOP' ? ['TOPパート','TOP paato','Top part'] : [p+'パート',p+' paato',p+' part'],
  // the book's columns: h = header as [Japanese (as printed), romaji, English], c = the column's class
  epHead: [{h: ['M','M','M'], c: 'num'}, {h: ['曲の内容','Kyoku no naiyou','Scene / music']}, {h: ['クレジット','Kurejitto','Cue'], c: 'code'}, {h: ['秒','Byou','Sec.'], c: 'tm'}],
  bgmHead: [{h: ['M-NO.','M-NO.','M-NO.'], c: 'code'}, {h: ['TIME','TIME','Time'], c: 'tm'}, {h: ['内容','Naiyou','Description']}, {h: ['収録CD','Shuuroku CD','Source CD'], c: 'num'}],
  qHead: [{h: ['NO.','NO.','No.'], c: 'num'}, {h: ['M-NO.','M-NO.','M-NO.'], c: 'code'}, {h: ['TIME','TIME','Time'], c: 'tm'}, {h: ['内容','Naiyou','Description']}, {h: ['収録CD','Shuuroku CD','Source CD'], c: 'num'}],
  cues: ['曲','kyoku','tracks'],
  uses: ['回','kai','uses'],
  albums: ['アルバム','Arubamu','Albums'], albumsMast: ['セーラームーン　アルバム','Seeraa Muun Arubamu','Sailor Moon Albums'],
};
/* the editor's columns, after the book's own: not in the booklet */
const ED_HEAD = {
  cd: {h: ['CD・トラック','CD / Torakku','CD / Track'], c: 'ed'},
  used: {h: ['使用話','Shiyou-wa','Used in'], c: 'ed'},
  notes: {h: ['編注','Henchuu','Notes'], c: 'ed'},
};
/* the films: short name (for "Used in" lists), the season they sit under, their panel title, the key that finds their
   table in the p.117 instrumentals list, and m: the table heads its first column "M" instead of "NO." */
const FILMS = {
  'MOVIE-R':      {short: ['劇場版R', 'R movie'], season: 'R', title: ['劇場版', 'Movie']},
  'MOVIE-MAKEUP': {short: ['メイクアップ！', 'Make Up!'], season: 'R', m: true,
                   title: ['短編映画「メイクアップ！セーラー戦士」', 'Make Up! Sailor Guardians (short film)']},
  'MOVIE-S':      {short: ['劇場版S', 'S movie'], season: 'S', title: ['劇場版', 'Movie'], inst: 'セーラームーンS '},
  'MOVIE-SS':     {short: ['劇場版SuperS', 'SuperS movie'], season: 'SS', m: true, title: ['劇場版', 'Movie'], inst: 'セーラームーンSupers '},
  'MOVIE-AMI':    {short: ['亜美ちゃんの初恋', 'Ami\'s First Love'], season: 'SS', m: true,
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
const label = (id, a, cls) => { document.getElementById(id).innerHTML = tx(a, null, cls); };
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
  if (nav) { nav.innerHTML = tx(VIEW === 'albums' ? UI.mast : UI.albums, null, 'inl'); nav.href = VIEW === 'albums' ? HOME : ALBUMS_PAGE; } }
/* the intro line under the title; the notes are in the Editor's Notes panel under Notes */
const INTRO = ['「セーラームーン　メモリアルミュージックボックス」ブックレットより書き起こし。',
  'Transcribed from the Sailor Moon Memorial Music Box booklet'];
const ED_NOTES = [
  ['「メモリアルミュージックボックス」ブックレットの内容を、原文のまま書き起こしています。',
   'The Memorial Music Box booklet contents are transcribed as printed.'],
  ['ブックレットにはない列を、一部に追加しています（「当サイトによる追加」の見出しの下、緑色の列）：<ul class="ed-sub"><li>「編注」：訂正とその出典</li><li>「CD・トラック」：BGMリストの各曲が収録されているディスクとトラック（訂正済み。ジャケットからアルバム、トラック番号からその曲へ、アルバムのページで表示）</li><li>「使用話」：その曲が使われているすべての話</li></ul>',
   'Columns that are not in the booklet have been added in some places (shaded green, under an “Added by this site” heading):<ul class="ed-sub"><li>Notes, with corrections and their sources</li><li>CD / Track, showing which disc and track each BGM-list piece is on, with any corrections applied (the cover links to the album and the track number to the track, on the Albums page)</li><li>Used in, listing every episode that uses a piece</li></ul>'],
  ['各話の日本語タイトルは、ブックレットの表記のまま掲載しています。<a href="https://lineup.toei-anim.co.jp/ja/tv/sailor_moon/episode/" target="_blank" rel="noopener">東映アニメーション</a>の公式タイトルと一部異なるものがあります（制作途中でタイトルが変わった可能性があります）。日本語版Wikipediaの各話リストとも異なるものは次のとおり：<ul class="ed-sub"><li>第18話：進悟純情（公式：進悟の純情）　「の」の有無のみ</li><li>第20話：幽霊もよ！（公式：幽霊もよ）　末尾の「！」の有無</li><li>第29話：大混戦（公式：大混線）　読みは同じ「だいこんせん」。公式は恋の四角関係の「混線」にかけたもの</li><li>第33話：最後のセーラー戦士　ヴィーナス登場（公式：最後のセーラー戦士、ヴィーナス登場）　空白と読点の違い</li><li>第102話：絶対絶命（公式：絶体絶命）　「絶体絶命」が正しい表記</li><li>第163話：捕らえられた（公式：捕えられた）　送り仮名の違い</li><li>第179話：敵？味方！（公式：敵？味方？）　「味方」の後が「！」か「？」か</li><li>第194話：銀河の聖戦！（公式：銀河の聖戦）　「！」の有無</li></ul>',
   'Japanese episode titles are as printed in the booklet. A few differ from the official titles on <a href="https://lineup.toei-anim.co.jp/ja/tv/sailor_moon/episode/" target="_blank" rel="noopener">Toei Animation\'s site</a>, perhaps because they changed during production. These also differ from the episode list on Japanese Wikipedia:<ul class="ed-sub"><li>Episode 18: 進悟純情 (official: 進悟の純情), "Shingo\'s pure heart": the booklet leaves out the particle の, with the same meaning</li><li>Episode 20: 幽霊もよ！ (official: 幽霊もよ), "…and ghosts too": the booklet adds an exclamation mark at the end</li><li>Episode 29: 大混戦, "a big free-for-all" (official: 大混線, "a big tangle of crossed lines", a pun on the love quadrangle getting its wires crossed); both are read daikonsen</li><li>Episode 33: 最後のセーラー戦士　ヴィーナス登場 (official: 最後のセーラー戦士、ヴィーナス登場), "The last Sailor Guardian, Venus appears": a space where the official title has a comma</li><li>Episode 102: 絶対絶命 (official: 絶体絶命), "in a desperate situation": both are read zettai zetsumei, but 絶体絶命 is the correct spelling and 絶対絶命 a common misspelling</li><li>Episode 163: 捕らえられた (official: 捕えられた), "captured": two accepted spellings of the same word</li><li>Episode 179: 敵？味方！, "Enemy? Ally!" (official: 敵？味方？, "Enemy? Ally?"): the booklet answers the question the official title leaves open</li><li>Episode 194: 銀河の聖戦！ (official: 銀河の聖戦), "The holy war of the galaxy": the booklet adds an exclamation mark</li></ul>'],
  ['英語のエピソードタイトルは、Viz Mediaによる公式英語訳（<a href="https://www.hulu.com/series/sailor-moon-4e1c9108-f973-48fb-8824-a69280ca0438" target="_blank" rel="noopener">Hulu</a>掲載のもの）を使用しています。',
   'English episode titles are Viz Media\'s official translations, as listed on <a href="https://www.hulu.com/series/sailor-moon-4e1c9108-f973-48fb-8824-a69280ca0438" target="_blank" rel="noopener">Hulu</a>.'],
  ['原文の「半」は「と半分」の意味で、28"半は28.5秒。「日本語」ボタンをオフにすると、時間は小数で表示されます。',
   '半 in the original means "and a half": 28"半 is 28.5 seconds. When the 日本語 button is off, times are shown as decimals.'],
  ['ブックレットのスキャン画像は<a href="https://sailormusic.net/guide-to-sailor-moon-music-cues/" target="_blank" rel="noopener">sailormusic.net</a>よりご提供いただきました。ありがとうございます！同サイトには、Qシートで「ライブラリー」とクレジットされている曲の情報も掲載されています。',
   'Many thanks to <a href="https://sailormusic.net/guide-to-sailor-moon-music-cues/" target="_blank" rel="noopener">sailormusic.net</a> for providing the scans of the booklet! The site also has information about the library tracks (ライブラリー) credited in the cue sheets.'],
  ['CDのジャケット画像と、曲名のローマ字・英語訳の多くは<a href="https://sailormusic.net/anime/memorial-music-box/" target="_blank" rel="noopener">sailormusic.net</a>と<a href="https://vgmdb.net/album/26875" target="_blank" rel="noopener">VGMdb</a>をもとにしています（表記は本サイトの方針に合わせて修正）。ボックスのディスクの曲名はVGMdbに掲載されたトレイカードのスキャンから、ほかのアルバムの曲名とジャケットはVGMdbから引用しています。',
   'The disc covers, and many of the romaji and English track titles, are based on <a href="https://sailormusic.net/anime/memorial-music-box/" target="_blank" rel="noopener">sailormusic.net</a> and <a href="https://vgmdb.net/album/26875" target="_blank" rel="noopener">VGMdb</a>, edited to match this site\'s style. The box set\'s Japanese track titles come from the tray-card scans on VGMdb, and the other albums\' track titles and covers from VGMdb. Thank you to both!']];
const ALBUMS_INTRO = ['BGMリストが収録CDとして挙げるアルバムと、その各トラックに入っている曲（M-NO.・区間・使用話）。ブックレットにはない、当サイトがまとめた一覧です。',
  'The albums the BGM lists cite as source CDs, with the pieces on each track: their M-NO., where they play in the track, and the episodes they\'re used in. Not from the booklet: compiled by this site.'];
const ALBUMS_TIMES = ['「区間」は各曲がトラックのどこからどこまでか（かっこ内はその長さ）、「長さ」はトラック全体の長さです。どちらもCDの音声から曲間の無音部分を検出して測ったものです。BGMリストに印刷された元の長さ（TIME）は、M-NO.からBGMリストで確認できます。',
  'Segment is where each piece runs within its track (its length in brackets), and Duration is the length of the whole track, both measured from the CD audio at the silent gaps between pieces. The original length printed in the BGM list (TIME) is on the piece\'s BGM-list row, linked from its M-NO.'];
document.getElementById('lede').innerHTML = `<p>${bi(...(VIEW === 'albums' ? ALBUMS_INTRO : INTRO), 'full')}</p>`
  + (VIEW === 'albums' ? `<p class="note">${bi(...ALBUMS_TIMES, 'full')}</p>` : '');
const noteList = items => `<ul class="ednotes">${items.map(([j, e]) => `<li>${bi(j, e, 'full')}</li>`).join('')}</ul>`;
/* production terms the cue sheets and lists use throughout: [term ja, explanation ja, term en, explanation en] */
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
const glossary = () => noteList(GLOSSARY.map(([tj, dj, te, de]) => [`<b>${tj}</b>：${dj}`, `<b>${te}</b>: ${de}`]));
label('notesBtn', UI.notes, 'inl'); label('openAll', UI.openAll, 'inl'); label('closeAll', UI.closeAll, 'inl');

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
  album: ['w-no', 'w-ttl', 'w-time', 'w-pseg', 'w-mno', 'w-adesc', 'ed w-aused'],   // Used in takes the rest
};
const colgroup = kind => '<colgroup>' + COLS[kind].map(c => `<col class="${c}">`).join('') + '</colgroup>';
/* a title row spans every column */
const spanAttr = kind => `colspan="${COLS[kind].length}"`;
const tableTag = kind => `<table class="bk" data-kind="${kind}">${colgroup(kind)}`;
/* a column-head row; when the table has editor's columns, a thin row above it labels which columns are the booklet's and
   which this site added (those are also shaded green, styles.css) */
function headRow(h, group = true){
  const edN = h.filter(col => /\bed\b/.test(col.c || '')).length;
  const grp = group && edN
    ? `<tr class="grp"><th colspan="${h.length - edN}">${tx(['ブックレットの内容', 'From the booklet'], null, 'inl')}</th>`
      + `<th colspan="${edN}" class="ed">${tx(['当サイトによる追加', 'Added by this site'], null, 'inl')}</th></tr>` : '';
  return grp + '<tr>' + h.map(col => `<th class="${col.c || ''}">${stack(col.h)}</th>`).join('') + '</tr>';
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
const goTitle = id => id.startsWith('q-') ? '劇場版のQシートで表示 / Show in the movie cue sheet' : 'BGMリストで表示 / Show in the BGM list';
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
  // CD notes open with "Book prints 1-18;", which the "(printed …)" already says; a box-set place in one (3-11-1) links to
  // that track on the albums page
  const cdRefs = h => h.replace(/(^|[\s(])(\d{1,2})-(\d{1,2})(-\d)?(?=[\s).,;:]|$)/g, (m, pre, d, t, p) =>
    ALBUMS[d]?.p === 'MMB' && ALBUMS[d].t[t] ? `${pre}<a class="go" href="${ALBUMS_PAGE}#${trackId(d, t)}" title="アルバムのページで表示 / Show on the albums page">${d}-${t}${p || ''}</a>` : m);
  if (r.cdx) mark.cd = add(`<b>${extOr(r.cdu, 'CD ' + esc(r.cdx), '')}</b>${r.cd ? printedAs(r.cd) : ' <span class="was">(no CD printed)</span>'}. `
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
    e.rows.push({id: ROW_ID.get(r), part: w.type === 'movie' ? null : p.k[0], m: r.m});
  }))));
const USED_SHOWN = 12;   // episodes listed before the rest fold into "+N more"
function usedCell(id, self){
  const list = [...(self ? [self] : []), ...(USES[id] || [])]; if (!list.length) return '<td class="ed"></td>';
  const n = list.reduce((a, e) => a + e.rows.length, 0);
  const link = e => {
    const [first] = e.rows, film = e.w.type === 'movie';
    const name = film ? bi(...FILMS[e.w.id].short, 'inl') : esc(e.w.n ?? 'SP');
    const where = e.rows.map(x => (x.part ? x.part + ' part, ' : '') + 'M ' + x.m).join('; ');
    const title = (film ? FILMS[e.w.id].short[1] : e.w.n ? 'Episode ' + e.w.n : 'Special') + ': ' + where;
    return `<a class="go" href="${HOME}#${esc(first.id)}" data-go="${esc(first.id)}" title="${esc(title)}">${name}</a>${e.rows.length > 1 ? `<span class="x">×${e.rows.length}</span>` : ''}`;
  };
  const shown = list.slice(0, USED_SHOWN).map(link).join(' · ');
  const rest = list.slice(USED_SHOWN);
  return `<td class="ed used"><span class="cnt">${n} ${tx(n === 1 ? ['回', 'kai', 'use'] : UI.uses, null, 'inl')}</span>${shown}`
    + (rest.length ? ` <details class="more"><summary>+${rest.length}</summary>${rest.map(link).join(' · ')}</details>` : '') + '</td>';
}
/* a BGM list or film row's CD / Track cell: the album its CD position points to (cover) and the track (place and title),
   from albums.js, with any CD correction applied. */
const ALBUMS = window.MMB_ALBUMS || {};
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
const cover = (src, h) => `<img class="cover" src="${esc(src)}" alt="" loading="lazy" width="46" height="${h}">`;
/* two codes on one piece (albums.js x): each one's letter, in the order they play (3-11-3: J-12B is a, F-5B is b) */
function partLetter(code, key, c){
  const x = ALBUMS[code]?.x?.[key];
  if (!x || !x[c]) return '';
  const same = Object.entries(x).filter(([, v]) => v[0] === x[c][0]).sort((a, b) => a[1][1] - b[1][1]);
  return 'abcdefgh'[same.findIndex(([k]) => k === c)];
}
/* a CD position as one cell: the cover (a link to the album on the albums page, its full name in the tooltip) beside
   the place in the booklet's form, corrected (8-3-1, R-8-3, 歌-2-10; a link to the track), and the track's title;
   c = the row's code, for a part of a shared piece (3-11-3-a) */
function cdCells(cd, c){
  if (!cd) return '<td class="ed"></td>';
  const o = parseCd(cd), al = o && ALBUMS[o.code], at = al && al.t[o.key];
  // a box-set disc only when the track exists; another album even without its title
  if (al && (at || !al.p)) {
    const name = al.n.length === 2 ? `${al.n[0]} / ${al.n[1]}` : al.n.join(' / ');
    const letter = c && o.piece ? partLetter(o.code, o.key, c) : '';
    const place = `${o.code}-${o.key}${o.piece ? '-' + o.piece : ''}${letter ? '-' + letter : ''}`;
    // the cover, and beside it the place above the title
    return `<td class="ed"><div class="trk"><a href="${ALBUMS_PAGE}#al-${esc(o.code)}" title="${esc(name)}">${cover(al.img, al.p ? 58 : 46)}</a>`
      // a piece the booklet names but the CD has no audio for (3-11-5, M-105B SE) isn't on the albums page: no link
      + `<div class="tname">${o.piece && al.s?.[o.key] && +o.piece > al.s[o.key].length ? `<span class="tno" translate="no">${esc(place)}</span>`
        : `<a class="go tno" translate="no" href="${ALBUMS_PAGE}#${trackId(o.code, o.key)}" title="アルバムのページで表示 / Show on the albums page">${esc(place)}</a>`}`
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
      + `${pieceLinks(dcells(r.d, r.dx, n.mark.dx, n.mark.dn), r.c)}<td class="num" translate="no">${r.cd ? cdCell(r, n.mark.cd) : '<span class="blank"></span>'}</td>${cdCells(r.cdx || r.cd, r.c)}`
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
    if (!film) html += `<tr><th ${nc}>${stack(UI.part(p.k[0]))}</th></tr>` + headRow([...UI.epHead, ED_HEAD.notes]);
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
      html += film ? `<tr id="${esc(id)}">${m}${ct}${d}<td class="num" translate="no">${cdCell(r, n.mark.cd)}</td>${cdCells(r.cdx || r.cd)}${usedCell(id)}${notesCell(n)}</tr>`
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
function subDetails(id, summaryHtml, meta, render){
  const d = details('sub', id, summaryHtml + `<span class="meta">${meta}</span>`, 'inner');
  // tables are built the first time a panel opens; build() also lets a jump build them right away
  d.build = () => { if (!d.dataset.done) { d.querySelector('.inner').innerHTML = render(); d.dataset.done = 1; } };
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
   ja: '『美少女戦士セーラームーン メモリアルミュージックボックス』のディスク1。',
   en: 'Disc 1 of the Sailor Moon Memorial Music Box'},
  {ja: 'おそらく第1作の音楽集のこと。リスト中にこのCDを指す表示はない。「S-」の表示4つ（S-1-1、S-1-2、S-3-1、S-6-2）はすべてS音楽集の曲。',
   en: 'Probably the first Music Collection; no reference in the lists uses it. The letter S is also used for the S Music Collection, and all four "S-" references in the lists (S-1-1, S-1-2, S-3-1, S-6-2) are S Music Collection tracks.'},
  {ja: '『美少女戦士セーラームーン ミュージックコレクション エキストラ・ヴァージョン』',
   en: 'Sailor Moon Music Collection Extra Version'},
  {u: 'https://wikimoon.org/index.php/Memorial_Music_Box', src: 'WikiMoon',
   ja: 'このブックレットが付属する『美少女戦士セーラームーン メモリアルミュージックボックス』CDセットのこと。',
   en: 'The Sailor Moon Memorial Music Box CD set this booklet came with.'},
];
const legendFoot = () => `<aside class="ed-box"><div class="ed-box-h">${tx(['当サイトの注', 'Site notes'], null, 'inl')}</div><ol class="ed-foot">${LEGEND_NOTES.map((n, i) =>
  `<li value="${i + 1}">${bi(esc(n.ja), esc(n.en) + (n.u ? ` ${ext(n.u, '(' + esc(n.src) + ')', '')}` : ''), 'full')}</li>`).join('')}</ol></aside>`;
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

/* "127 曲 / tracks": the number of rows across a list's sections or a film's parts */
const trackCount = groups => `${groups.reduce((a, g) => a + g.r.length, 0)} ${tx(UI.cues, null, 'inl')}`;
/* a BGM list panel, headed with the list's own title from the book (e.g. …セーラースターズ　BGM追加曲リスト) */
function bgmPanel(s){
  // inside a season section the English heading drops the show's name (the section heading carries it)
  const head = s.id === 'SM' ? ['BGMリスト', 'BGM risuto', 'BGM List'] : ['BGM追加曲リスト', 'BGM tsuika-kyoku risuto', 'Additional BGM List'];
  return subDetails('bgm-' + s.id, tx(head), trackCount(s.cats), () => renderBgm(s));
}

/* a film's combined cue sheet and music list */
function filmPanel(w){
  // inside its season the English heading says which film it is, without the show's name
  const [ja, en] = FILMS[w.id].title;
  return subDetails('film-' + w.id, tx([ja + '　Qシート表&BGMリスト', '', en + ': Cue Sheet & BGM List']), trackCount(w.parts), () =>
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
  return subDetails('tv-' + sid, tx(['TVシリーズ　音楽ロール（Qシート）表', 'TV shiriizu ongaku rooru (Q shiito) hyou', 'TV Cue Sheets']), '', () =>
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
  noteSec('ed-notes', tx(['このサイトについて','About This Site']), () => noteList(ED_NOTES));
  noteSec('glossary', tx(['用語集','Glossary']), glossary);
  noteSec('bgm-notes', tx(['BGMリストの注','BGM List Notes']), () => `<div class="notes-top">${legendHtml()}</div>`);
  const tvNote = bookNotes.find(n => n.p === 124);
  if (tvNote) noteSec('tv-notes', tx(['TVシリーズ音楽ロールの注','TV Cue Sheet Notes']), () => `<div class="notes-top">${noteBullets([tvNote])}</div>`);
  // p.118: the note on how the film tables work applies to every film
  const filmNotes = plainNotes.filter(n => n.s === 'MOVIE' && !n.w && !n.c);
  if (filmNotes.length) noteSec('film-notes', tx(['劇場版の注','Movie Notes']), () => `<div class="notes-top">${noteBullets(filmNotes)}</div>`);
  dlg.innerHTML = `<div class="dlg-head"><h2 id="notesDlgH">${tx(UI.notes, null, 'inl')}</h2>`
    + `<nav class="dlg-toc">${parts.map(p => `<a href="#${p.id}" data-note="${p.id}">${p.title}</a>`).join('')}</nav>`
    + `<button class="btn dlg-x" type="button">${tx(UI.close, null, 'inl')}</button></div>`
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
/* TV cue-sheet rows (for "Used in" links and the Back button) and the episodes themselves (#ep98) */
D.works.forEach(w => { if (w.type !== 'movie') {
  const at = {section: 'sec-' + w.s, panel: 'tv-' + w.s, ep: w.n ? 'ep' + w.n : 'sp'};
  ROW_PANEL[at.ep] = at;
  w.parts.forEach(p => p.r.forEach(r => { ROW_PANEL[ROW_ID.get(r)] = at; }));
} });
/* ---------- the albums page ----------
   Every album in albums.js, each track with the pieces the BGM lists and film tables place on it (1-1-1 = disc 1,
   track 1, first piece): M-NO., time and description as printed, and where each is used. A film row that reuses a cue
   from another table (its credit links there) is left out; its use shows under that cue. */
const ALBUM_HEAD = [{h: ['No.', 'No.', 'No.'], c: 'num'}, {h: ['曲名', 'Kyokumei', 'Track title']}, {h: ['長さ', 'Nagasa', 'Duration'], c: 'tm'},
  {h: ['曲目・区間', 'Kyokume / Kukan', 'Piece / Segment'], c: 'seg'},
  {h: ['M-NO.', 'M-NO.', 'M-NO.'], c: 'code'}, {h: ['内容', 'Naiyou', 'Description']}, ED_HEAD.used];
const ALBUM_PANEL = {};   // album code -> section id
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
const segText = (start, end, a = '') => `${a}${mss(start)}–${a}${mss(end)} <span class="seglen">(${a}${mss(end - start)})</span>`;
/* the Piece / Segment cell: the piece number (3, 3-a) and where it runs in the track */
const pnoTag = t => `<span class="pno">${esc(t || '')}</span>`;
function segCell(sp, t, end){
  if (!sp) return `<td class="seg" translate="no">${pnoTag(t)}</td>`;
  const [start, dur, brk] = sp;
  const title = brk ? `Found from the audio: ${BREAK_NOTE[brk]}` : 'Found from the audio';
  return `<td class="seg" translate="no" title="${esc(title)}">${pnoTag(t)}${segText(start, end ?? start + dur, brk === 'change' ? '~' : '')}</td>`;
}
/* one of two codes sharing a piece (albums.js x: [piece, start, end]): where it plays within it, approximate */
const partSeg = ([, start, end], t) => `<td class="seg" translate="no" title="Approximate: found by ear; this part fades into the other">${pnoTag(t)}${segText(start, end, '~')}</td>`;
/* a piece the tray card prints but the booklet never places at this track (albums.js e: [as printed, code]): its code
   (linked to its BGM-list row), what the card adds (編集 = an edit, ―4種 = four versions), and a note */
const EXTRA_WORDS = [[/編集$/, ['編集', 'henshuu', 'edit']], [/―4種$/, ['4種', 'yonshu', '4 versions']]];
function extraCells(ex){
  if (!ex) return '<td class="code"></td><td></td><td class="ed"></td>';
  const [printed, code] = ex;
  const link = c => { const id = cueId(c); return ROW_PANEL[id] ? goLink(id, c, goTitle(id)) : esc(c); };
  const fmt = p => p.replace(/^([A-Z]+)(\d)/, '$1-$2');      // J10 -> J-10
  const word = EXTRA_WORDS.find(([re]) => re.test(printed));
  const codes = code ? link(code) : printed.split('+').map(p => link(fmt(p))).join('+');   // two joined: C1a+C1b
  const note = ['BGMリストではこのトラックに未掲載（トレイカードの表記：' + printed + '）',
    'BGM risuto de wa kono torakku ni mikeisai (torei kaado no hyouki: ' + printed + ')',
    'Not placed at this track in the BGM list (the tray card prints ' + printed + ')'];
  return `<td class="code">${codes}${word ? ` <span class="src">${tx(word[1], null, 'inl')}</span>` : ''}</td>`
    + `<td class="was">${tx(note, null, 'full')}</td><td class="ed"></td>`;
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
    const rows = list.length || 1, n = key;   // the song box: disc-track
    html += `<tbody id="${esc(trackId(code, key))}">`;
    // Duration: the whole track, once, beside its title; Piece / Segment: each piece and its place in the track
    const len = al.l?.[key];
    const head = `<td class="num" translate="no" rowspan="${rows}">${esc(n)}</td><td rowspan="${rows}">${al.t[key] ? stack(al.t[key]) : ''}</td>`
      + `<td class="tm" translate="no" rowspan="${rows}"${len ? ' title="Measured from the audio"' : ''}>${len ? mss(len) : ''}</td>`;
    // the last piece ends where the track does (its stored duration is rounded to a tenth of a second)
    const segOf = (x, t) => segCell(places.length && x.piece && places[x.piece - 1], t, len && +x.piece === places.length ? len : undefined);
    const ex = al.e?.[key];
    if (!list.length) html += `<tr>${head}${segOf({}, '')}${extraCells(ex?.['1'])}</tr>`;
    list.forEach((x, i) => {
      if (x.blank && x.twin) { html += `<tr>${i ? '' : head}${segOf(x, x.piece)}<td class="code">${twinTag(x.twin)}</td><td></td><td class="ed"></td></tr>`; return; }
      if (x.blank) { html += `<tr>${i ? '' : head}${segOf(x, x.piece)}${extraCells(ex?.[x.piece])}</tr>`; return; }
      const r = x.r, film = x.w && FILMS[x.w.id];
      const part = !film && al.x?.[key]?.[r.c];
      const pt = (x.piece || '') + (part ? '-' + partLetter(code, key, r.c) : '');
      const placeHere = part ? partSeg(part, pt) : segOf(x, pt);
      const codeTxt = r.c && r.c !== '—' ? r.c : film ? 'M ' + r.m : '';
      const linked = x.id && ROW_PANEL[x.id] ? goLink(x.id, codeTxt, goTitle(x.id)) : esc(codeTxt);
      const self = film ? {w: x.w, rows: [{id: x.id, part: null, m: r.m}]} : null;
      html += `<tr>${i ? '' : head}${placeHere}`
        + `<td class="code">${linked}${film ? `<span class="src">${bi(...film.short, 'inl')}</span>` : ''}${x.twin ? twinTag(x.twin) : ''}</td>`
        + `<td>${r.d ? stack(r.d) : ''}</td>${usedCell(x.id, self)}</tr>`;
    });
    html += '</tbody>';
  });
  return html + '</table></div>';
}
/* an original album's piece found on the box set (albums.js q): where, linked to that track */
function twinTag(place){
  const o = parseCd(place), id = o && trackId(o.code, o.key);
  const label = `<span translate="no">BOX ${esc(place)}</span>`;
  return `<span class="src" title="${esc(`メモリアルミュージックボックスの${place}と同じ録音（音声から照合） / The same recording is on the box set at ${place} (found from the audio)`)}">`
    + (id ? `<a class="go" href="#${esc(id)}">${label}</a>` : label) + '</span>';
}
function albumHead(al, noName){
  const links = [];
  if (al.v) links.push(ext(`https://vgmdb.net/album/${al.v}`, 'VGMdb', ''));
  if (al.card) links.push(ext(al.card, tx(['トレイカード', 'Tray card'], null, 'inl'), ''));
  return `<div class="al-head">${al.img ? `<img src="${esc(al.img)}" alt="" loading="lazy" width="120">` : ''}<div>`
    + (noName ? '' : `<div class="al-name">${stack(al.n.length === 2 ? [al.n[0], '', al.n[1]] : al.n)}</div>`)
    + (links.length ? `<div class="al-links">${links.join(' · ')}</div>` : '') + '</div></div>';
}
/* an album whose every track is listed and measured (the box-set discs, the S album): not just the cited tracks */
const albumComplete = al => !!al.l && Object.keys(al.t).every(k => al.l[k]);
function renderAlbums(){
  const pieces = albumPieces();
  const panel = (code, al, sec, title) => {
    ALBUM_PANEL[code] = sec;
    const n = Object.keys(al.t).length;
    return subDetails('al-' + code, (al.img ? `<img src="${esc(al.img)}" alt="">` : '') + title, `${n} ${tx(['曲', 'kyoku', n === 1 ? 'track' : 'tracks'], null, 'inl')}`,
      () => albumHead(al) + (al.p || albumComplete(al) ? '' : `<p class="note">${tx(['ブックレットが挙げるトラックのみ掲載。', 'Only the tracks the booklet cites are listed.'], null, 'full')}</p>`)
        + albumTable(code, al, pieces[code]));
  };
  const box = ALBUMS.MMB;
  const discs = Object.keys(ALBUMS).filter(k => ALBUMS[k].p === 'MMB').sort((a, b) => ALBUMS[a].d - ALBUMS[b].d);
  if (box) {
    const body = section('sec-MMB', tx(box.n));
    body.insertAdjacentHTML('beforeend', albumHead(box, true));   // the section heading already names it
    discs.forEach(k => body.appendChild(panel(k, ALBUMS[k], 'sec-MMB', tx([`ディスク${ALBUMS[k].d}　${ALBUMS[k].n[0]}`, `Disc ${ALBUMS[k].d}: ${ALBUMS[k].n[1]}`]))));
  }
  const others = Object.keys(ALBUMS).filter(k => k !== 'MMB' && !ALBUMS[k].p);
  const body = section('sec-other', tx(['その他のアルバム', 'Other Albums']));
  others.forEach(k => body.appendChild(panel(k, ALBUMS[k], 'sec-other', tx(ALBUMS[k].n))));
}
/* an albums-page link (#al-7, #al-7-22) opens its section and panel and scrolls to it */
function revealAlbum(id){
  const code = Object.keys(ALBUM_PANEL).filter(c => id === 'al-' + c || id.startsWith('al-' + c + '-')).sort((a, b) => b.length - a.length)[0];
  if (!code) return false;
  openPanel(ALBUM_PANEL[code], 'al-' + code);
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
/* a choice the reader makes is remembered; until then the page follows the browser's language */
langBox.addEventListener('change', e => {
  const on = langInputs.filter(i => i.checked).map(i => i.dataset.l);
  if (!on.length) { e.target.checked = true; return; }  // keep at least one language
  setLangs(on);
  try { localStorage.setItem('mmb-lang-choice', on.join(',')); } catch (e) {}
});
/* Japanese for readers whose browser prefers it; English for everyone else (browser auto-translate can carry it further) */
function browserLangs(){
  const first = (navigator.languages?.[0] || navigator.language || '').toLowerCase().split('-')[0];
  return [first === 'ja' ? 'ja' : 'en'];
}
let saved = null; try { saved = localStorage.getItem('mmb-lang-choice'); } catch (e) {}
const savedLangs = (saved || '').split(',').filter(l => ['ja', 'ro', 'en'].includes(l));
setLangs(savedLangs.length ? savedLangs : browserLangs());

/* a "← Back" button floats at the bottom of the screen after a jump: one within this page, or a link from the other page
   (a Track link to the albums, a code or "Used in" link back to the BGM lists), which Back returns to */
const backBtn = document.createElement('button');
backBtn.className = 'btn back'; backBtn.type = 'button'; backBtn.hidden = true;
backBtn.innerHTML = '← ' + tx(UI.back, null, 'inl');
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

if (VIEW === 'albums') {
  // the box set opens by default; a link to a disc or track (#al-7-22) opens straight to it
  document.getElementById('sec-MMB')?.setAttribute('open', '');
  const id = decodeURIComponent(location.hash.slice(1)); if (id) revealAlbum(id);
  addEventListener('hashchange', () => revealAlbum(decodeURIComponent(location.hash.slice(1))));
  showBack();
} else {
/* ---------- links to a row elsewhere on the page (credit codes, "Used in", notes) ----------
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
{ const id = decodeURIComponent(location.hash.slice(1)); if (id && ROW_PANEL[id]) { history.replaceState({anchor: id, depth}, ''); reveal(id); } }
showBack();
}
})();
