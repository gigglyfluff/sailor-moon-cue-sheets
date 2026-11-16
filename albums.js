/* Every album the booklet's CD column cites, keyed by its code in the p.104 key (MMB, the box set, is the site's own), and the
   other original BGM albums (MC, RM, SM, SSM). Not from the booklet.
   The box set (MMB) and its discs 1-10 (p = parent, d = disc number; disc names from each disc's cover, covers from
   sailormusic.net); the original CD releases MC, R, RM, S, SM, SS, SSM, ST1, ST2, EX (covers and tray cards from VGMdb's
   scans) and 歌 (only the tracks the booklet cites; keyed by disc-track). Every track of every album except 歌 is listed.
   n = name [Japanese, English], cat = catalog number, v = VGMdb album number, card = the album's tray card (VGMdb's scan,
   kept in images/tray-cards), t = tracks [Japanese as printed on the tray card, romaji, English (edited to the site's
   style)], l = each track's length on the CD (seconds, from the audio), s = where each piece of a multi-piece track
   starts on the CD [start, duration (seconds), what marks the break (silence, dip, change), 1 if checked by ear], found
   from the audio, e = pieces the tray card prints that the booklet never places at that track {track: {piece: [as printed,
   code]}}, x = two codes on one piece: where each plays within it {code: [piece, start, end]} (approximate: one fades
   into the other), q = an original album's piece that is the same recording as a box-set piece {track: {piece: place}},
   found by matching the audio. */
window.MMB_ALBUMS =
{
 "MMB": {
  "n": [
   "美少女戦士セーラームーンシリーズ メモリアルミュージックボックス",
   "Sailor Moon Memorial Music Box"
  ],
  "cat": "COCC-14785~94",
  "v": 26875,
  "t": {}
 },
 "1": {
  "n": [
   "美少女戦士セーラームーン ミュージックコレクション-1",
   "Sailor Moon Music Collection 1"
  ],
  "p": "MMB",
  "d": 1,
  "cat": "COCC-14785",
  "img": "images/album-covers/disc-01-sailor-moon-music-collection-1.jpg",
  "card": "images/tray-cards/disc-01.jpg",
  "t": {
   "1": [
    "ムーンライト伝説　TVサイズ",
    "Muunraito Densetsu TV Saizu",
    "Moonlight Legend (TV Size)"
   ],
   "2": [
    "あたしだって普通の女の子1",
    "Atashi Datte Futsuu no Onnanoko 1",
    "I'm Just an Ordinary Girl, Too 1"
   ],
   "3": [
    "あたしだって普通の女の子2",
    "Atashi Datte Futsuu no Onnanoko 2",
    "I'm Just an Ordinary Girl, Too 2"
   ],
   "4": [
    "あたしだって普通の女の子3",
    "Atashi Datte Futsuu no Onnanoko 3",
    "I'm Just an Ordinary Girl, Too 3"
   ],
   "5": [
    "あたしだって普通の女の子4",
    "Atashi Datte Futsuu no Onnanoko 4",
    "I'm Just an Ordinary Girl, Too 4"
   ],
   "6": [
    "あたしだって普通の女の子5",
    "Atashi Datte Futsuu no Onnanoko 5",
    "I'm Just an Ordinary Girl, Too 5"
   ],
   "7": [
    "あたしだって普通の女の子6",
    "Atashi Datte Futsuu no Onnanoko 6",
    "I'm Just an Ordinary Girl, Too 6"
   ],
   "8": [
    "あたしだって普通の女の子7",
    "Atashi Datte Futsuu no Onnanoko 7",
    "I'm Just an Ordinary Girl, Too 7"
   ],
   "9": [
    "本当に選ばれた戦士なの？1",
    "Hontou ni Erabareta Senshi na no? 1",
    "Was I Really Chosen to Be a Guardian? 1"
   ],
   "10": [
    "本当に選ばれた戦士なの？2",
    "Hontou ni Erabareta Senshi na no? 2",
    "Was I Really Chosen to Be a Guardian? 2"
   ],
   "11": [
    "本当に選ばれた戦士なの？3",
    "Hontou ni Erabareta Senshi na no? 3",
    "Was I Really Chosen to Be a Guardian? 3"
   ],
   "12": [
    "本当に選ばれた戦士なの？4",
    "Hontou ni Erabareta Senshi na no? 4",
    "Was I Really Chosen to Be a Guardian? 4"
   ],
   "13": [
    "本当に選ばれた戦士なの？5",
    "Hontou ni Erabareta Senshi na no? 5",
    "Was I Really Chosen to Be a Guardian? 5"
   ],
   "14": [
    "本当に選ばれた戦士なの？6",
    "Hontou ni Erabareta Senshi na no? 6",
    "Was I Really Chosen to Be a Guardian? 6"
   ],
   "15": [
    "星空はミステリアス1",
    "Hoshizora wa Misuteriasu 1",
    "The Starry Sky Is Mysterious 1"
   ],
   "16": [
    "星空はミステリアス2",
    "Hoshizora wa Misuteriasu 2",
    "The Starry Sky Is Mysterious 2"
   ],
   "17": [
    "星空はミステリアス3",
    "Hoshizora wa Misuteriasu 3",
    "The Starry Sky Is Mysterious 3"
   ],
   "18": [
    "星空はミステリアス4",
    "Hoshizora wa Misuteriasu 4",
    "The Starry Sky Is Mysterious 4"
   ],
   "19": [
    "星空はミステリアス5",
    "Hoshizora wa Misuteriasu 5",
    "The Starry Sky Is Mysterious 5"
   ],
   "20": [
    "星空はミステリアス6",
    "Hoshizora wa Misuteriasu 6",
    "The Starry Sky Is Mysterious 6"
   ],
   "21": [
    "おっちょこちょいは生まれつき1",
    "Occhokochoi wa Umaretsuki 1",
    "Scatterbrained by Nature 1"
   ],
   "22": [
    "おっちょこちょいは生まれつき2",
    "Occhokochoi wa Umaretsuki 2",
    "Scatterbrained by Nature 2"
   ],
   "23": [
    "おっちょこちょいは生まれつき3",
    "Occhokochoi wa Umaretsuki 3",
    "Scatterbrained by Nature 3"
   ],
   "24": [
    "おっちょこちょいは生まれつき4",
    "Occhokochoi wa Umaretsuki 4",
    "Scatterbrained by Nature 4"
   ],
   "25": [
    "おっちょこちょいは生まれつき5",
    "Occhokochoi wa Umaretsuki 5",
    "Scatterbrained by Nature 5"
   ],
   "26": [
    "おっちょこちょいは生まれつき6",
    "Occhokochoi wa Umaretsuki 6",
    "Scatterbrained by Nature 6"
   ],
   "27": [
    "おっちょこちょいは生まれつき7",
    "Occhokochoi wa Umaretsuki 7",
    "Scatterbrained by Nature 7"
   ],
   "28": [
    "恋する乙女心1",
    "Koisuru Otomegokoro 1",
    "A Maiden's Heart in Love 1"
   ],
   "29": [
    "恋する乙女心2",
    "Koisuru Otomegokoro 2",
    "A Maiden's Heart in Love 2"
   ],
   "30": [
    "恋する乙女心3",
    "Koisuru Otomegokoro 3",
    "A Maiden's Heart in Love 3"
   ],
   "31": [
    "恋する乙女心4",
    "Koisuru Otomegokoro 4",
    "A Maiden's Heart in Love 4"
   ],
   "32": [
    "恋する乙女心5",
    "Koisuru Otomegokoro 5",
    "A Maiden's Heart in Love 5"
   ],
   "33": [
    "恋する乙女心6",
    "Koisuru Otomegokoro 6",
    "A Maiden's Heart in Love 6"
   ],
   "34": [
    "恋する乙女心7",
    "Koisuru Otomegokoro 7",
    "A Maiden's Heart in Love 7"
   ],
   "35": [
    "恋する乙女心8",
    "Koisuru Otomegokoro 8",
    "A Maiden's Heart in Love 8"
   ],
   "36": [
    "誰かが狙われている1",
    "Dareka ga Nerawarete Iru 1",
    "Someone Is Being Targeted 1"
   ],
   "37": [
    "誰かが狙われている2",
    "Dareka ga Nerawarete Iru 2",
    "Someone Is Being Targeted 2"
   ],
   "38": [
    "誰かが狙われている3",
    "Dareka ga Nerawarete Iru 3",
    "Someone Is Being Targeted 3"
   ],
   "39": [
    "誰かが狙われている4",
    "Dareka ga Nerawarete Iru 4",
    "Someone Is Being Targeted 4"
   ],
   "40": [
    "誰かが狙われている5",
    "Dareka ga Nerawarete Iru 5",
    "Someone Is Being Targeted 5"
   ],
   "41": [
    "誰かが狙われている6",
    "Dareka ga Nerawarete Iru 6",
    "Someone Is Being Targeted 6"
   ],
   "42": [
    "夢見るおだんごアタマ1",
    "Yumemiru Odango Atama 1",
    "Dreamy Dumpling-Head 1"
   ],
   "43": [
    "夢見るおだんごアタマ2",
    "Yumemiru Odango Atama 2",
    "Dreamy Dumpling-Head 2"
   ],
   "44": [
    "夢見るおだんごアタマ3",
    "Yumemiru Odango Atama 3",
    "Dreamy Dumpling-Head 3"
   ],
   "45": [
    "夢見るおだんごアタマ4",
    "Yumemiru Odango Atama 4",
    "Dreamy Dumpling-Head 4"
   ],
   "46": [
    "夢見るおだんごアタマ5",
    "Yumemiru Odango Atama 5",
    "Dreamy Dumpling-Head 5"
   ],
   "47": [
    "夢見るおだんごアタマ6",
    "Yumemiru Odango Atama 6",
    "Dreamy Dumpling-Head 6"
   ],
   "48": [
    "夢見るおだんごアタマ7",
    "Yumemiru Odango Atama 7",
    "Dreamy Dumpling-Head 7"
   ],
   "49": [
    "夕暮れ時は妖魔の予感1",
    "Yuuguredoki wa Youma no Yokan 1",
    "Dusk Brings a Premonition of Monsters 1"
   ],
   "50": [
    "夕暮れ時は妖魔の予感2",
    "Yuuguredoki wa Youma no Yokan 2",
    "Dusk Brings a Premonition of Monsters 2"
   ],
   "51": [
    "夕暮れ時は妖魔の予感3",
    "Yuuguredoki wa Youma no Yokan 3",
    "Dusk Brings a Premonition of Monsters 3"
   ],
   "52": [
    "夕暮れ時は妖魔の予感4",
    "Yuuguredoki wa Youma no Yokan 4",
    "Dusk Brings a Premonition of Monsters 4"
   ],
   "53": [
    "夕暮れ時は妖魔の予感5",
    "Yuuguredoki wa Youma no Yokan 5",
    "Dusk Brings a Premonition of Monsters 5"
   ],
   "54": [
    "夕暮れ時は妖魔の予感6",
    "Yuuguredoki wa Youma no Yokan 6",
    "Dusk Brings a Premonition of Monsters 6"
   ],
   "55": [
    "夕暮れ時は妖魔の予感7",
    "Yuuguredoki wa Youma no Yokan 7",
    "Dusk Brings a Premonition of Monsters 7"
   ],
   "56": [
    "HEART MOVING　TVサイズ",
    "HEART MOVING TV Saizu",
    "HEART MOVING (TV Size)"
   ],
   "57": [
    "ミラクルロマンス",
    "Mirakuru Romansu",
    "Miracle Romance"
   ],
   "58": [
    "「ムーンライト伝説」～ピアノファンタジアヴァージョン～",
    "\"Muunraito Densetsu\" ~Piano Fantajia Vaajon~",
    "Moonlight Legend ~Piano Fantasia Version~"
   ],
   "59": [
    "「ムーンライト伝説」～マーチヴァージョン～",
    "\"Muunraito Densetsu\" ~Maachi Vaajon~",
    "Moonlight Legend ~March Version~"
   ]
  },
  "l": {
   "1": 86.492,
   "2": 14.551,
   "3": 64.602,
   "4": 67.737,
   "5": 77.872,
   "6": 78.917,
   "7": 10.607,
   "8": 75.417,
   "9": 72.987,
   "10": 70.27,
   "11": 68.703,
   "12": 14.812,
   "13": 70.584,
   "14": 106.006,
   "15": 65.229,
   "16": 61.807,
   "17": 70.715,
   "18": 15.622,
   "19": 49.242,
   "20": 106.241,
   "21": 16.092,
   "22": 68.05,
   "23": 84.716,
   "24": 67.371,
   "25": 80.824,
   "26": 14.003,
   "27": 78.682,
   "28": 17.843,
   "29": 73.118,
   "30": 18.208,
   "31": 76.331,
   "32": 79.57,
   "33": 18.861,
   "34": 87.224,
   "35": 42.502,
   "36": 88.608,
   "37": 60.71,
   "38": 69.252,
   "39": 90.045,
   "40": 12.67,
   "41": 117.186,
   "42": 85.212,
   "43": 14.995,
   "44": 82.052,
   "45": 78.891,
   "46": 13.872,
   "47": 74.006,
   "48": 100.128,
   "49": 18.313,
   "50": 78.212,
   "51": 15.648,
   "52": 73.275,
   "53": 63.766,
   "54": 85.526,
   "55": 88.582,
   "56": 96.941,
   "57": 422.088,
   "58": 193.124,
   "59": 224.497
  },
  "s": {
   "57": [
    [
     0.0,
     86.1,
     null,
     0
    ],
    [
     86.1,
     90.3,
     "silence",
     0
    ],
    [
     176.5,
     71.4,
     "silence",
     0
    ],
    [
     247.9,
     115.0,
     "silence",
     0
    ],
    [
     362.9,
     59.2,
     "silence",
     0
    ]
   ]
  },
  "e": {
   "11": {
    "1": [
     "J4",
     "J-4"
    ]
   }
  }
 },
 "2": {
  "n": [
   "美少女戦士セーラームーン ミュージックコレクション-2",
   "Sailor Moon Music Collection 2"
  ],
  "p": "MMB",
  "d": 2,
  "cat": "COCC-14786",
  "img": "images/album-covers/disc-02-sailor-moon-music-collection-2.jpg",
  "card": "images/tray-cards/disc-02.jpg",
  "t": {
   "1": [
    "アバンタイトル音楽",
    "Aban Taitoru Ongaku",
    "Avant-title Music"
   ],
   "2": [
    "「ムーンライト伝説」TVサイズ、SE入り",
    "\"Muunraito Densetsu\" TV Saizu, SE-iri",
    "Moonlight Legend (TV Size with Sound Effects)"
   ],
   "3": [
    "セーラームーンサブタイトル音楽",
    "Seeraa Muun Sabutaitoru Ongaku",
    "Sailor Moon Subtitle Music"
   ],
   "4": [
    "うさぎ－ブリッジコレクション－",
    "Usagi - Burijji Korekushon -",
    "Usagi - Bridge Collection -"
   ],
   "5": [
    "乙女心",
    "Otomegokoro",
    "A Maiden's Heart"
   ],
   "6": [
    "「夢見るだけじゃダメ」～インストヴァージョン～",
    "\"Yumemiru Dake ja Dame\" ~Insuto Vaajon~",
    "Just Dreaming Isn't Enough ~Instrumental Version~"
   ],
   "7": [
    "セーラームーンアイキャッチ音楽",
    "Seeraa Muun Aikyatchi Ongaku",
    "Sailor Moon Eyecatch Music"
   ],
   "8": [
    "クインベリル",
    "Kuin Beriru",
    "Queen Beryl"
   ],
   "9": [
    "「愛のエナジーを奪え」～インストヴァージョン～",
    "\"Ai no Enajii wo Ubae\" ~Insuto Vaajon~",
    "Steal the Energy of Love ~Instrumental Version~"
   ],
   "10": [
    "ムーンパワーで変装",
    "Muun Pawaa de Hensou",
    "Disguise with Moon Power"
   ],
   "11": [
    "「合コトバはムーン・プリズム・パワー・メイクアップ！」～インストヴァージョン～",
    "\"Aikotoba wa Muun Purizumu Pawaa Meikuappu!\" ~Insuto Vaajon~",
    "The Password Is Moon Prism Power Make Up! ~Instrumental Version~"
   ],
   "12": [
    "華麗なるムーンプリズムパワーメイクアップ",
    "Kareinaru Muun Purizumu Pawaa Meikuappu",
    "Magnificent Moon Prism Power Make Up"
   ],
   "13": [
    "「月にかわっておしおきよ」～インストヴァージョン～",
    "\"Tsuki ni Kawatte Oshioki yo\" ~Insuto Vaajon~",
    "In the Name of the Moon, I'll Punish You ~Instrumental Version~"
   ],
   "14": [
    "ムーンティアラアクション",
    "Muun Tiara Akushon",
    "Moon Tiara Action"
   ],
   "15": [
    "「幻の銀水晶～シルバークリスタル」～インストヴァージョン～",
    "\"Maboroshi no Ginzuishou ~ Shirubaa Kurisutaru\" ~Insuto Vaajon~",
    "The Illusionary Silver Crystal ~ Silver Crystal ~Instrumental Version~"
   ],
   "16": [
    "絶望と悪1",
    "Zetsubou to Aku 1",
    "Despair and Evil 1"
   ],
   "17": [
    "絶望と悪2",
    "Zetsubou to Aku 2",
    "Despair and Evil 2"
   ],
   "18": [
    "絶望と悪3",
    "Zetsubou to Aku 3",
    "Despair and Evil 3"
   ],
   "19": [
    "絶望と悪4",
    "Zetsubou to Aku 4",
    "Despair and Evil 4"
   ],
   "20": [
    "絶望と悪5",
    "Zetsubou to Aku 5",
    "Despair and Evil 5"
   ],
   "21": [
    "絶望と悪6",
    "Zetsubou to Aku 6",
    "Despair and Evil 6"
   ],
   "22": [
    "セーラー戦士集結",
    "Seeraa Senshi Shuuketsu",
    "The Sailor Guardians Assemble"
   ],
   "23": [
    "星たちに守られて",
    "Hoshi-tachi ni Mamorarete",
    "Protected by the Stars"
   ],
   "24": [
    "リベンジ！セーラー戦士",
    "Ribenji! Seeraa Senshi",
    "Revenge! Sailor Guardians"
   ],
   "25": [
    "「ムーンライト伝説」～インストヴァージョン～",
    "\"Muunraito Densetsu\" ~Insuto Vaajon~",
    "Moonlight Legend ~Instrumental Version~"
   ],
   "26": [
    "「プリンセス・ムーン」TVサイズ",
    "\"Purinsesu Muun\" TV Saizu",
    "Princess Moon (TV Size)"
   ],
   "27": [
    "セーラームーン予告編音楽",
    "Seeraa Muun Yokokuhen Ongaku",
    "Sailor Moon Preview Music"
   ],
   "28": [
    "「HEART MOVING」～インストヴァージョン～",
    "\"HEART MOVING\" ~Insuto Vaajon~",
    "HEART MOVING ~Instrumental Version~"
   ],
   "29": [
    "「プリンセス・ムーン」～インストヴァージョン～",
    "\"Purinsesu Muun\" ~Insuto Vaajon~",
    "Princess Moon ~Instrumental Version~"
   ],
   "30": [
    "サブタイトル音楽、メイクアップのテーマ　ロングヴァージョン",
    "Sabutaitoru Ongaku, Meikuappu no Teema Rongu Vaajon",
    "Subtitle Music, Make Up Theme (Long Version)"
   ]
  },
  "l": {
   "1": 21.082,
   "2": 92.318,
   "3": 43.417,
   "4": 66.352,
   "5": 160.941,
   "6": 305.111,
   "7": 12.54,
   "8": 130.404,
   "9": 283.142,
   "10": 39.812,
   "11": 260.651,
   "12": 263.55,
   "13": 278.519,
   "14": 139.025,
   "15": 270.604,
   "16": 13.036,
   "17": 58.881,
   "18": 21.813,
   "19": 62.643,
   "20": 12.566,
   "21": 67.188,
   "22": 156.684,
   "23": 564.847,
   "24": 87.59,
   "25": 173.872,
   "26": 92.161,
   "27": 49.111,
   "28": 218.045,
   "29": 242.731,
   "30": 138.816
  },
  "s": {
   "3": [
    [
     0.0,
     31.3,
     null,
     0
    ],
    [
     31.3,
     12.1,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     14.2,
     null,
     0
    ],
    [
     14.2,
     9.6,
     "silence",
     0
    ],
    [
     23.8,
     14.3,
     "silence",
     0
    ],
    [
     38.1,
     11.0,
     "silence",
     0
    ],
    [
     49.0,
     17.3,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     80.8,
     null,
     0
    ],
    [
     80.8,
     80.2,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     43.7,
     null,
     0
    ],
    [
     43.7,
     86.7,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     21.4,
     null,
     0
    ],
    [
     21.4,
     18.4,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     69.1,
     null,
     0
    ],
    [
     69.1,
     41.2,
     "silence",
     0
    ],
    [
     110.3,
     60.2,
     "silence",
     0
    ],
    [
     170.5,
     93.1,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     81.5,
     null,
     0
    ],
    [
     81.5,
     57.6,
     "silence",
     0
    ]
   ],
   "22": [
    [
     0.0,
     24.6,
     null,
     0
    ],
    [
     24.6,
     55.1,
     "silence",
     0
    ],
    [
     79.8,
     76.9,
     "silence",
     0
    ]
   ],
   "23": [
    [
     0.0,
     148.2,
     null,
     0
    ],
    [
     148.2,
     105.7,
     "silence",
     0
    ],
    [
     253.9,
     105.9,
     "silence",
     0
    ],
    [
     359.8,
     99.4,
     "silence",
     0
    ],
    [
     459.2,
     105.6,
     "silence",
     0
    ]
   ],
   "24": [
    [
     0.0,
     16.3,
     null,
     0
    ],
    [
     16.3,
     71.3,
     "silence",
     0
    ]
   ],
   "27": [
    [
     0.0,
     30.6,
     null,
     0
    ],
    [
     30.6,
     18.5,
     "silence",
     0
    ]
   ],
   "30": [
    [
     0.0,
     40.6,
     null,
     0
    ],
    [
     40.6,
     98.3,
     "silence",
     0
    ]
   ]
  },
  "e": {
   "30": {
    "1": [
     "C1a+C1b",
     null
    ],
    "2": [
     "H1+H2",
     null
    ]
   }
  }
 },
 "3": {
  "n": [
   "美少女戦士セーラームーンR ミュージックコレクション",
   "Sailor Moon R Music Collection"
  ],
  "p": "MMB",
  "d": 3,
  "cat": "COCC-14787",
  "img": "images/album-covers/disc-03-sailor-moon-r-music-collection.jpg",
  "card": "images/tray-cards/disc-03.jpg",
  "t": {
   "1": [
    "戦士の記憶",
    "Senshi no Kioku",
    "Memories of a Guardian"
   ],
   "2": [
    "「乙女のポリシー」～インストヴァージョン～",
    "\"Otome no Porishii\" ~Insuto Vaajon~",
    "A Maiden's Policy ~Instrumental Version~"
   ],
   "3": [
    "うさぎ",
    "Usagi",
    "Usagi"
   ],
   "4": [
    "「ほっとけないよ」～インストヴァージョン～",
    "\"Hottokenai yo\" ~Insuto Vaajon~",
    "I Can't Leave You Alone ~Instrumental Version~"
   ],
   "5": [
    "エイルとアン",
    "Eiru to An",
    "Ail and An"
   ],
   "6": [
    "魔界樹",
    "Makaiju",
    "The Makai Tree"
   ],
   "7": [
    "ブラックムーン",
    "Burakku Muun",
    "Black Moon"
   ],
   "8": [
    "Rアイキャッチ音楽",
    "R Aikyatchi Ongaku",
    "R Eyecatch Music"
   ],
   "9": [
    "うさぎと衛",
    "Usagi to Mamoru",
    "Usagi and Mamoru"
   ],
   "10": [
    "「好きと言って」～インストヴァージョン～",
    "\"Suki to Itte\" ~Insuto Vaajon~",
    "Say You Love Me ~Instrumental Version~"
   ],
   "11": [
    "ちびうさ",
    "Chibiusa",
    "Chibi-Usa"
   ],
   "12": [
    "さびしさを越えて",
    "Sabishisa wo Koete",
    "Beyond Loneliness"
   ],
   "13": [
    "セーラープルート",
    "Seeraa Puruuto",
    "Sailor Pluto"
   ],
   "14": [
    "黒い月、総攻撃",
    "Kuroi Tsuki, Soukougeki",
    "Black Moon, All-Out Attack"
   ],
   "15": [
    "ムーンクリスタルパワーメイクアップ",
    "Muun Kurisutaru Pawaa Meikuappu",
    "Moon Crystal Power Make Up"
   ],
   "16": [
    "愛",
    "Ai",
    "Love"
   ],
   "17": [
    "夕陽",
    "Yuuhi",
    "Setting Sun"
   ],
   "18": [
    "「乙女のポリシー」TVサイズ",
    "\"Otome no Porishii\" TV Saizu",
    "A Maiden's Policy (TV Size)"
   ],
   "19": [
    "R予告編音楽",
    "R Yokokuhen Ongaku",
    "R Preview Music"
   ],
   "20": [
    "「乙女のポリシー」～マーチヴァージョン～",
    "\"Otome no Porishii\" ~Maachi Vaajon~",
    "A Maiden's Policy ~March Version~"
   ]
  },
  "l": {
   "1": 133.539,
   "2": 193.412,
   "3": 202.476,
   "4": 269.115,
   "5": 163.528,
   "6": 199.211,
   "7": 411.769,
   "8": 24.608,
   "9": 381.389,
   "10": 277.813,
   "11": 186.228,
   "12": 266.215,
   "13": 298.659,
   "14": 467.097,
   "15": 239.544,
   "16": 249.993,
   "17": 208.301,
   "18": 90.254,
   "19": 32.628,
   "20": 210.783
  },
  "s": {
   "1": [
    [
     0.0,
     91.9,
     null,
     0
    ],
    [
     91.9,
     41.7,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     86.7,
     null,
     0
    ],
    [
     86.7,
     115.8,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     54.2,
     null,
     0
    ],
    [
     54.2,
     23.1,
     "silence",
     0
    ],
    [
     77.3,
     86.2,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     110.1,
     null,
     0
    ],
    [
     110.1,
     89.1,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     106.9,
     null,
     0
    ],
    [
     106.9,
     89.3,
     "silence",
     0
    ],
    [
     196.1,
     116.8,
     "silence",
     0
    ],
    [
     312.9,
     98.8,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     10.7,
     null,
     0
    ],
    [
     10.7,
     13.9,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     87.8,
     null,
     0
    ],
    [
     87.8,
     77.5,
     "silence",
     0
    ],
    [
     165.3,
     109.4,
     "silence",
     0
    ],
    [
     274.7,
     106.7,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     9.6,
     null,
     0
    ],
    [
     9.6,
     96.4,
     "silence",
     0
    ],
    [
     106.0,
     66.8,
     "silence",
     0
    ],
    [
     172.7,
     13.5,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     93.3,
     null,
     0
    ],
    [
     93.3,
     29.1,
     "silence",
     0
    ],
    [
     122.3,
     143.9,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     111.2,
     null,
     0
    ],
    [
     111.2,
     110.6,
     "silence",
     0
    ],
    [
     221.8,
     76.9,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     98.1,
     null,
     0
    ],
    [
     98.1,
     78.4,
     "silence",
     0
    ],
    [
     176.5,
     95.3,
     "silence",
     0
    ],
    [
     271.8,
     95.5,
     "silence",
     0
    ],
    [
     367.3,
     99.8,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     38.7,
     null,
     0
    ],
    [
     38.7,
     28.0,
     "silence",
     0
    ],
    [
     66.8,
     88.2,
     "silence",
     0
    ],
    [
     154.9,
     84.6,
     "silence",
     0
    ]
   ],
   "16": [
    [
     0.0,
     123.6,
     null,
     0
    ],
    [
     123.6,
     126.3,
     "silence",
     0
    ]
   ],
   "17": [
    [
     0.0,
     99.2,
     null,
     0
    ],
    [
     99.2,
     109.1,
     "silence",
     0
    ]
   ]
  },
  "x": {
   "11": {
    "J-12B": [
     3,
     106.0,
     121.0
    ],
    "F-5B": [
     3,
     115.0,
     172.7
    ]
   }
  },
  "e": {
   "8": {
    "1": [
     "J11編集",
     "J-11"
    ]
   },
   "11": {
    "1": [
     "J10編集",
     "J-10"
    ]
   },
   "19": {
    "1": [
     "M110編集",
     "M-110"
    ]
   }
  }
 },
 "4": {
  "n": [
   "美少女戦士セーラームーンS ミュージックコレクション",
   "Sailor Moon S Music Collection"
  ],
  "p": "MMB",
  "d": 4,
  "cat": "COCC-14788",
  "img": "images/album-covers/disc-04-sailor-moon-s-music-collection.jpg",
  "card": "images/tray-cards/disc-04.jpg",
  "t": {
   "1": [
    "運命の戦士",
    "Unmei no Senshi",
    "Guardians of Destiny"
   ],
   "2": [
    "「ムーンライト伝説」TVサイズSE入り",
    "\"Muunraito Densetsu\" TV Saizu SE-iri",
    "Moonlight Legend (TV Size with Sound Effects)"
   ],
   "3": [
    "Sサブタイトル音楽",
    "S Sabutaitoru Ongaku",
    "S Subtitle Music"
   ],
   "4": [
    "ピュアな心",
    "Pyua na Kokoro",
    "Pure Heart"
   ],
   "5": [
    "はるかとみちる",
    "Haruka to Michiru",
    "Haruka and Michiru"
   ],
   "6": [
    "デスバスターズ",
    "Desu Basutaazu",
    "Death Busters"
   ],
   "7": [
    "ダイモーン出現",
    "Daimoon Shutsugen",
    "A Daimon Appears"
   ],
   "8": [
    "ダイモーン",
    "Daimoon",
    "Daimon"
   ],
   "9": [
    "追跡",
    "Tsuiseki",
    "Pursuit"
   ],
   "10": [
    "セーラーウラヌス＆ネプチューン",
    "Seeraa Uranusu & Nepuchuun",
    "Sailor Uranus & Neptune"
   ],
   "11": [
    "スパイラルハートムーンロッド",
    "Supairaru Haato Muun Roddo",
    "Spiral Heart Moon Rod"
   ],
   "12": [
    "ムーンコズミックパワーメイクアップ",
    "Muun Kozumikku Pawaa Meikuappu",
    "Moon Cosmic Power Make Up"
   ],
   "13": [
    "ピュアな心の結晶は無事",
    "Pyua na Kokoro no Kesshou wa Buji",
    "The Pure Heart Crystal Is Safe"
   ],
   "14": [
    "セーラー戦士同士の対立",
    "Seeraa Senshi Doushi no Tairitsu",
    "Sailor Guardians in Conflict"
   ],
   "15": [
    "マントは虹色",
    "Manto wa Nijiiro",
    "The Cape Is Rainbow-Colored"
   ],
   "16": [
    "「タキシード・ミラージュ」～インストヴァージョン～",
    "\"Takishiido Miraaju\" ~Insuto Vaajon~",
    "Tuxedo Mirage ~Instrumental Version~"
   ],
   "17": [
    "Sアイキャッチ音楽",
    "S Aikyatchi Ongaku",
    "S Eyecatch Music"
   ],
   "18": [
    "聖杯",
    "Seihai",
    "The Holy Grail"
   ],
   "19": [
    "帰ってきたちびうさ",
    "Kaette Kita Chibiusa",
    "Return of Chibi-Usa"
   ],
   "20": [
    "セーラーサターン",
    "Seeraa Sataan",
    "Sailor Saturn"
   ],
   "21": [
    "スーパーセーラームーン",
    "Suupaa Seeraa Muun",
    "Super Sailor Moon"
   ],
   "22": [
    "「タキシード・ミラージュ」TVサイズ",
    "\"Takishiido Miraaju\" TV Saizu",
    "Tuxedo Mirage (TV Size)"
   ],
   "23": [
    "S予告編音楽",
    "S Yokokuhen Ongaku",
    "S Preview Music"
   ]
  },
  "l": {
   "1": 212.089,
   "2": 92.892,
   "3": 10.476,
   "4": 382.434,
   "5": 277.552,
   "6": 189.99,
   "7": 163.71,
   "8": 288.941,
   "9": 227.266,
   "10": 223.27,
   "11": 171.495,
   "12": 211.854,
   "13": 54.884,
   "14": 530.809,
   "15": 240.51,
   "16": 215.668,
   "17": 11.887,
   "18": 112.615,
   "19": 333.193,
   "20": 200.517,
   "21": 154.986,
   "22": 91.586,
   "23": 79.596
  },
  "s": {
   "1": [
    [
     0.0,
     30.0,
     null,
     0
    ],
    [
     30.0,
     57.8,
     "silence",
     0
    ],
    [
     87.8,
     124.3,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     75.1,
     null,
     0
    ],
    [
     75.1,
     110.9,
     "silence",
     0
    ],
    [
     186.0,
     102.2,
     "silence",
     0
    ],
    [
     288.2,
     94.2,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     71.7,
     null,
     0
    ],
    [
     71.7,
     53.5,
     "silence",
     0
    ],
    [
     125.2,
     87.0,
     "silence",
     0
    ],
    [
     212.2,
     65.4,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     92.6,
     null,
     0
    ],
    [
     92.6,
     97.4,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     49.2,
     null,
     0
    ],
    [
     49.2,
     114.5,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     97.8,
     null,
     0
    ],
    [
     97.8,
     87.4,
     "silence",
     0
    ],
    [
     185.2,
     103.7,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     113.7,
     null,
     0
    ],
    [
     113.7,
     113.6,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     96.8,
     null,
     0
    ],
    [
     96.8,
     36.4,
     "silence",
     0
    ],
    [
     133.2,
     90.1,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     63.6,
     null,
     0
    ],
    [
     63.6,
     107.9,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     33.4,
     null,
     0
    ],
    [
     33.4,
     127.7,
     "silence",
     0
    ],
    [
     161.1,
     50.7,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     21.9,
     null,
     0
    ],
    [
     21.9,
     33.0,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     97.3,
     null,
     0
    ],
    [
     97.3,
     109.8,
     "silence",
     0
    ],
    [
     207.1,
     98.6,
     "silence",
     0
    ],
    [
     305.7,
     99.1,
     "silence",
     0
    ],
    [
     404.8,
     126.0,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     115.9,
     null,
     0
    ],
    [
     115.9,
     124.6,
     "silence",
     0
    ]
   ],
   "19": [
    [
     0.0,
     121.8,
     null,
     0
    ],
    [
     121.8,
     91.9,
     "silence",
     0
    ],
    [
     213.7,
     59.7,
     "silence",
     0
    ],
    [
     273.4,
     59.8,
     "silence",
     0
    ]
   ],
   "20": [
    [
     0.0,
     100.6,
     null,
     0
    ],
    [
     100.6,
     99.9,
     "silence",
     0
    ]
   ],
   "21": [
    [
     0.0,
     13.7,
     null,
     0
    ],
    [
     13.7,
     50.4,
     "silence",
     0
    ],
    [
     64.1,
     90.9,
     "silence",
     0
    ]
   ],
   "23": [
    [
     0.0,
     31.2,
     null,
     0
    ],
    [
     31.2,
     31.0,
     "silence",
     0
    ],
    [
     62.2,
     17.4,
     "silence",
     0
    ]
   ]
  }
 },
 "5": {
  "n": [
   "美少女戦士セーラームーンSupers ミュージックコレクション",
   "Sailor Moon SuperS Music Collection"
  ],
  "p": "MMB",
  "d": 5,
  "cat": "COCC-14789",
  "img": "images/album-covers/disc-05-sailor-moon-supers-music-collection.jpg",
  "card": "images/tray-cards/disc-05.jpg",
  "t": {
   "1": [
    "水晶の森",
    "Suishou no Mori",
    "Crystal Forest"
   ],
   "2": [
    "「ムーンライト伝説」TVサイズ SE入り",
    "\"Muunraito Densetsu\" TV Saizu SE-iri",
    "Moonlight Legend (TV Size with Sound Effects)"
   ],
   "3": [
    "スーパーズサブタイトル音楽",
    "Suupaazu Sabutaitoru Ongaku",
    "SuperS Subtitle Music"
   ],
   "4": [
    "ちびうさの想い",
    "Chibiusa no Omoi",
    "Chibi-Usa's Feelings"
   ],
   "5": [
    "うさぎとちびうさ",
    "Usagi to Chibiusa",
    "Usagi and Chibi-Usa"
   ],
   "6": [
    "デッドムーン",
    "Deddo Muun",
    "Dead Moon"
   ],
   "7": [
    "アマゾントリオ",
    "Amazon Torio",
    "Amazon Trio"
   ],
   "8": [
    "アマゾントリオの罠",
    "Amazon Torio no Wana",
    "Amazon Trio's Trap"
   ],
   "9": [
    "ゆれる心",
    "Yureru Kokoro",
    "A Wavering Heart"
   ],
   "10": [
    "心の中のぞく",
    "Kokoro no Naka Nozoku",
    "Peeking Into Hearts"
   ],
   "11": [
    "レムレス",
    "Remuresu",
    "Lemures"
   ],
   "12": [
    "絶体絶命",
    "Zettai Zetsumei",
    "Desperate Situation"
   ],
   "13": [
    "ペガサス",
    "Pegasasu",
    "Pegasus"
   ],
   "14": [
    "ムーンクライシスメイクアップ",
    "Muun Kuraishisu Meikuappu",
    "Moon Crisis Make Up"
   ],
   "15": [
    "恋はLonely heart",
    "Koi wa Lonely heart",
    "Love Is a Lonely Heart"
   ],
   "16": [
    "「私たちになりたくて」TVサイズ",
    "\"Watashi-tachi ni Naritakute\" TV Saizu",
    "Wanting to Be Like Us (TV Size)"
   ],
   "17": [
    "スーパーズアイキャッチ音楽",
    "Suupaazu Aikyatchi Ongaku",
    "SuperS Eyecatch Music"
   ],
   "18": [
    "ペガサスとちびうさ",
    "Pegasasu to Chibiusa",
    "Pegasus and Chibi-Usa"
   ],
   "19": [
    "ちびうさ、ペガサスを信じて",
    "Chibiusa, Pegasasu wo Shinjite",
    "Chibi-Usa, Believe in Pegasus"
   ],
   "20": [
    "アマゾネスカルテット",
    "Amazonesu Karutetto",
    "Amazoness Quartet"
   ],
   "21": [
    "死の月、総攻撃",
    "Shi no Tsuki, Soukougeki",
    "Dead Moon, All-Out Attack"
   ],
   "22": [
    "クリスタルパワーメイクアップ",
    "Kurisutaru Pawaa Meikuappu",
    "Crystal Power Make Up"
   ],
   "23": [
    "スーパーズ予告編音楽",
    "Suupaazu Yokokuhen Ongaku",
    "SuperS Preview Music"
   ],
   "24": [
    "「\"らしく\"いきましょ」～マーチヴァージョン～",
    "\"'Rashiku' Ikimasho\" ~Maachi Vaajon~",
    "Let's Be True to Ourselves ~March Version~"
   ]
  },
  "l": {
   "1": 184.844,
   "2": 92.84,
   "3": 10.424,
   "4": 156.945,
   "5": 258.587,
   "6": 314.672,
   "7": 359.341,
   "8": 289.359,
   "9": 139.626,
   "10": 52.429,
   "11": 392.177,
   "12": 187.952,
   "13": 201.301,
   "14": 105.196,
   "15": 108.853,
   "16": 97.15,
   "17": 25.288,
   "18": 184.217,
   "19": 174.551,
   "20": 173.611,
   "21": 290.927,
   "22": 327.759,
   "23": 48.092,
   "24": 216.817
  },
  "s": {
   "1": [
    [
     0.0,
     100.8,
     null,
     0
    ],
    [
     100.8,
     84.1,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     101.1,
     null,
     0
    ],
    [
     101.1,
     55.9,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     76.7,
     null,
     0
    ],
    [
     76.7,
     101.8,
     "silence",
     0
    ],
    [
     178.5,
     80.1,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     134.6,
     null,
     0
    ],
    [
     134.6,
     91.2,
     "silence",
     0
    ],
    [
     225.8,
     88.9,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     121.8,
     null,
     0
    ],
    [
     121.8,
     121.4,
     "silence",
     0
    ],
    [
     243.2,
     116.2,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     99.0,
     null,
     0
    ],
    [
     99.0,
     76.6,
     "silence",
     0
    ],
    [
     175.6,
     113.8,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     94.3,
     null,
     0
    ],
    [
     94.3,
     20.9,
     "silence",
     0
    ],
    [
     115.2,
     24.4,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     27.0,
     null,
     0
    ],
    [
     27.0,
     25.4,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     85.1,
     null,
     0
    ],
    [
     85.1,
     84.8,
     "silence",
     0
    ],
    [
     169.9,
     115.3,
     "silence",
     0
    ],
    [
     285.2,
     107.0,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     94.4,
     null,
     0
    ],
    [
     94.4,
     93.5,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     93.0,
     null,
     0
    ],
    [
     93.0,
     108.3,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     32.8,
     null,
     0
    ],
    [
     32.8,
     25.9,
     "silence",
     0
    ],
    [
     58.7,
     46.5,
     "silence",
     0
    ]
   ],
   "17": [
    [
     0.0,
     12.7,
     null,
     0
    ],
    [
     12.7,
     12.6,
     "silence",
     0
    ]
   ],
   "18": [
    [
     0.0,
     60.1,
     null,
     0
    ],
    [
     60.1,
     49.5,
     "silence",
     0
    ],
    [
     109.6,
     74.7,
     "silence",
     0
    ]
   ],
   "19": [
    [
     0.0,
     115.8,
     null,
     0
    ],
    [
     115.8,
     58.7,
     "silence",
     0
    ]
   ],
   "20": [
    [
     0.0,
     88.8,
     null,
     0
    ],
    [
     88.8,
     84.8,
     "silence",
     0
    ]
   ],
   "21": [
    [
     0.0,
     83.4,
     null,
     0
    ],
    [
     83.4,
     22.8,
     "silence",
     0
    ],
    [
     106.2,
     23.6,
     "silence",
     0
    ],
    [
     129.8,
     77.2,
     "silence",
     0
    ],
    [
     207.0,
     84.0,
     "silence",
     0
    ]
   ],
   "22": [
    [
     0.0,
     101.0,
     null,
     0
    ],
    [
     101.0,
     108.9,
     "silence",
     0
    ],
    [
     209.9,
     117.8,
     "silence",
     0
    ]
   ],
   "23": [
    [
     0.0,
     30.8,
     null,
     0
    ],
    [
     30.8,
     17.3,
     "silence",
     0
    ]
   ]
  }
 },
 "6": {
  "n": [
   "美少女戦士セーラームーン セーラースターズ ミュージックコレクション-1",
   "Sailor Moon Sailor Stars Music Collection 1"
  ],
  "p": "MMB",
  "d": 6,
  "cat": "COCC-14790",
  "img": "images/album-covers/disc-06-sailor-moon-sailor-stars-music-collection-1.jpg",
  "card": "images/tray-cards/disc-06.jpg",
  "t": {
   "1": [
    "「ゴールデンクイーン・ギャラクシア」～オルゴールヴァージョン～",
    "\"Gooruden Kuiin Gyarakushia\" ~Orugooru Vaajon~",
    "Golden Queen Galaxia ~Music Box Version~"
   ],
   "2": [
    "「セーラースターソング」TVサイズ、SE入り",
    "\"Seeraa Sutaa Songu\" TV Saizu, SE-iri",
    "Sailor Star Song (TV Size with Sound Effects)"
   ],
   "3": [
    "セーラースターズサブタイトル音楽",
    "Seeraa Sutaazu Sabutaitoru Ongaku",
    "Sailor Stars Subtitle Music"
   ],
   "4": [
    "5人は高校生",
    "5-nin wa Koukousei",
    "The Five Are High School Students"
   ],
   "5": [
    "ネヘレニア復活",
    "Neherenia Fukkatsu",
    "Nehelenia's Resurrection"
   ],
   "6": [
    "ほたるの予言",
    "Hotaru no Yogen",
    "Hotaru's Prophecy"
   ],
   "7": [
    "ミラーパレドリー",
    "Miraa Paredorii",
    "Mirror Paredri"
   ],
   "8": [
    "とらわれのセーラー戦士",
    "Toraware no Seeraa Senshi",
    "Captured Sailor Guardians"
   ],
   "9": [
    "プリンセスのために……",
    "Purinsesu no Tame ni......",
    "For the Princess......"
   ],
   "10": [
    "エターナルの愛",
    "Etaanaru no Ai",
    "Eternal Love"
   ],
   "11": [
    "セーラースターズ予告編音楽",
    "Seeraa Sutaazu Yokokuhen Ongaku",
    "Sailor Stars Preview Music"
   ],
   "12": [
    "衛との別れ",
    "Mamoru to no Wakare",
    "Parting with Mamoru"
   ],
   "13": [
    "シャドウギャラクティカ",
    "Shadou Gyarakutika",
    "Shadow Galactica"
   ],
   "14": [
    "「ゴールデンクイーン・ギャラクシア」～インストヴァージョン～",
    "\"Gooruden Kuiin Gyarakushia\" ~Insuto Vaajon~",
    "Golden Queen Galaxia ~Instrumental Version~"
   ],
   "15": [
    "ボクたちの歌をきいて",
    "Boku-tachi no Uta wo Kiite",
    "Listen to Our Song"
   ],
   "16": [
    "「真夜中ひとり」～インストヴァージョン～",
    "\"Mayonaka Hitori\" ~Insuto Vaajon~",
    "Alone at Midnight ~Instrumental Version~"
   ],
   "17": [
    "「力を合わせて」～インストヴァージョン～",
    "\"Chikara wo Awasete\" ~Insuto Vaajon~",
    "Joining Forces ~Instrumental Version~"
   ],
   "18": [
    "「銀河一身分違いな片想い」～インストヴァージョン～",
    "\"Ginga Ichi Mibun Chigai na Kataomoi\" ~Insuto Vaajon~",
    "The Most Mismatched Unrequited Love in the Galaxy ~Instrumental Version~"
   ],
   "19": [
    "「流れ星へ」コーラスなしカラオケ",
    "\"Nagareboshi e\" Koorasu Nashi Karaoke",
    "To the Shooting Star (Karaoke without Chorus)"
   ]
  },
  "l": {
   "1": 161.438,
   "2": 96.55,
   "3": 10.476,
   "4": 319.426,
   "5": 260.546,
   "6": 102.244,
   "7": 298.372,
   "8": 311.146,
   "9": 224.524,
   "10": 199.916,
   "11": 120.452,
   "12": 310.545,
   "13": 237.559,
   "14": 239.936,
   "15": 231.812,
   "16": 213.944,
   "17": 366.682,
   "18": 259.919,
   "19": 284.71
  },
  "s": {
   "4": [
    [
     0.0,
     81.7,
     null,
     0
    ],
    [
     81.7,
     119.2,
     "silence",
     0
    ],
    [
     200.9,
     118.6,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     95.4,
     null,
     0
    ],
    [
     95.4,
     94.7,
     "silence",
     0
    ],
    [
     190.1,
     70.4,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     105.1,
     null,
     0
    ],
    [
     105.1,
     75.9,
     "silence",
     0
    ],
    [
     181.0,
     52.6,
     "silence",
     0
    ],
    [
     233.6,
     64.8,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     120.3,
     null,
     0
    ],
    [
     120.3,
     91.2,
     "silence",
     0
    ],
    [
     211.4,
     99.7,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     129.6,
     null,
     0
    ],
    [
     129.6,
     94.9,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     68.2,
     null,
     0
    ],
    [
     68.2,
     131.7,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     30.9,
     null,
     0
    ],
    [
     30.9,
     14.9,
     "silence",
     0
    ],
    [
     45.8,
     74.7,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     128.2,
     null,
     0
    ],
    [
     128.2,
     26.7,
     "silence",
     0
    ],
    [
     154.9,
     128.9,
     "silence",
     0
    ],
    [
     283.9,
     26.7,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     90.3,
     null,
     0
    ],
    [
     90.3,
     63.9,
     "silence",
     0
    ],
    [
     154.2,
     83.3,
     "silence",
     0
    ]
   ]
  }
 },
 "7": {
  "n": [
   "美少女戦士セーラームーン セーラースターズ ミュージックコレクション-2",
   "Sailor Moon Sailor Stars Music Collection 2"
  ],
  "p": "MMB",
  "d": 7,
  "cat": "COCC-14791",
  "img": "images/album-covers/disc-07-sailor-moon-sailor-stars-music-collection-2.jpg",
  "card": "images/tray-cards/disc-07.jpg",
  "t": {
   "1": [
    "「とどかぬ想い－my friend's love－」～インストヴァージョン～",
    "\"Todokanu Omoi - my friend's love -\" ~Insuto Vaajon~",
    "Unreachable Feelings - my friend's love - ~Instrumental Version~"
   ],
   "2": [
    "あの方はどこに……",
    "Ano Kata wa Doko ni......",
    "Where Is That Person......"
   ],
   "3": [
    "星野、大気、夜天",
    "Seiya, Taiki, Yaten",
    "Seiya, Taiki, Yaten"
   ],
   "4": [
    "学園のアイドル",
    "Gakuen no Aidoru",
    "School Idol"
   ],
   "5": [
    "美奈子の野望❤",
    "Minako no Yabou❤",
    "Minako's Ambition"
   ],
   "6": [
    "「愛の女神のHow to love」～インストヴァージョン～",
    "\"Ai no Megami no How to love\" ~Insuto Vaajon~",
    "The Goddess of Love's How to Love ~Instrumental Version~"
   ],
   "7": [
    "星野の想い",
    "Seiya no Omoi",
    "Seiya's Feelings"
   ],
   "8": [
    "「銀河一身分違いな片想い」～オルゴールヴァージョン～",
    "\"Ginga Ichi Mibun Chigai na Kataomoi\" ~Orugooru Vaajon~",
    "The Most Mismatched Unrequited Love in the Galaxy ~Music Box Version~"
   ],
   "9": [
    "セーラースターズアイキャッチ音楽",
    "Seeraa Sutaazu Aikyatchi Ongaku",
    "Sailor Stars Eyecatch Music"
   ],
   "10": [
    "銀河テレビでの策略",
    "Ginga Terebi de no Sakuryaku",
    "Scheme at Galaxy TV"
   ],
   "11": [
    "スターシードをいただくわ",
    "Sutaa Shiido wo Itadaku wa",
    "I'll Take the Star Seed"
   ],
   "12": [
    "襲い来るファージ",
    "Osoikuru Faaji",
    "The Phage Attacks"
   ],
   "13": [
    "スターパワーメイクアップ！",
    "Sutaa Pawaa Meikuappu!",
    "Star Power Make Up!"
   ],
   "14": [
    "セーラースターライツ出現",
    "Seeraa Sutaa Raitsu Shutsugen",
    "The Sailor Star Lights Appear"
   ],
   "15": [
    "「炎の狙撃者（FLAME SNIPER）」～インストヴァージョン～",
    "\"Honoo no Sogekisha (FLAME SNIPER)\" ~Insuto Vaajon~",
    "Flame Sniper ~Instrumental Version~"
   ],
   "16": [
    "「We believe you」～インストヴァージョン～",
    "\"We believe you\" ~Insuto Vaajon~",
    "We believe you ~Instrumental Version~"
   ],
   "17": [
    "華麗なるムーンエターナルメイクアップ",
    "Kareinaru Muun Etaanaru Meikuappu",
    "Magnificent Moon Eternal Make Up"
   ],
   "18": [
    "ちびちび",
    "Chibichibi",
    "Chibi-Chibi"
   ],
   "19": [
    "「セーラームーン・クリスマス」～インストヴァージョン～",
    "\"Seeraa Muun Kurisumasu\" ~Insuto Vaajon~",
    "Sailor Moon Christmas ~Instrumental Version~"
   ],
   "20": [
    "究極の悪",
    "Kyuukyoku no Aku",
    "Ultimate Evil"
   ],
   "21": [
    "決意",
    "Ketsui",
    "Resolve"
   ],
   "22": [
    "究極の愛",
    "Kyuukyoku no Ai",
    "Ultimate Love"
   ],
   "23": [
    "平和",
    "Heiwa",
    "Peace"
   ],
   "24": [
    "「愛をしんじてる」～インストヴァージョン～",
    "\"Ai wo Shinjiteru\" ~Insuto Vaajon~",
    "I Believe in Love ~Instrumental Version~"
   ],
   "25": [
    "「セーラースターソング」～マーチヴァージョン～",
    "\"Seeraa Sutaa Songu\" ~Maachi Vaajon~",
    "Sailor Star Song ~March Version~"
   ]
  },
  "l": {
   "1": 232.412,
   "2": 215.119,
   "3": 231.942,
   "4": 71.211,
   "5": 120.426,
   "6": 310.963,
   "7": 93.023,
   "8": 107.861,
   "9": 12.488,
   "10": 140.618,
   "11": 144.223,
   "12": 178.966,
   "13": 116.324,
   "14": 68.05,
   "15": 256.759,
   "16": 304.589,
   "17": 268.096,
   "18": 324.86,
   "19": 226.77,
   "20": 74.006,
   "21": 77.95,
   "22": 145.059,
   "23": 124.84,
   "24": 241.947,
   "25": 211.384
  },
  "s": {
   "2": [
    [
     0.0,
     68.7,
     null,
     0
    ],
    [
     68.7,
     68.0,
     "silence",
     0
    ],
    [
     136.6,
     78.5,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     76.8,
     null,
     0
    ],
    [
     76.8,
     69.0,
     "silence",
     0
    ],
    [
     145.8,
     86.2,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     79.6,
     null,
     0
    ],
    [
     79.6,
     21.3,
     "silence",
     0
    ],
    [
     100.9,
     19.5,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     76.4,
     null,
     0
    ],
    [
     76.4,
     64.2,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     20.3,
     null,
     0
    ],
    [
     20.3,
     123.9,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     75.0,
     null,
     0
    ],
    [
     75.0,
     78.7,
     "silence",
     0
    ],
    [
     153.7,
     25.3,
     "silence",
     0
    ]
   ],
   "17": [
    [
     0.0,
     38.5,
     null,
     0
    ],
    [
     38.5,
     121.9,
     "silence",
     0
    ],
    [
     160.4,
     29.1,
     "silence",
     0
    ],
    [
     189.5,
     12.5,
     "silence",
     0
    ],
    [
     202.0,
     28.4,
     "silence",
     0
    ],
    [
     230.4,
     37.7,
     "silence",
     0
    ]
   ],
   "18": [
    [
     0.0,
     58.4,
     null,
     0
    ],
    [
     58.4,
     63.5,
     "silence",
     0
    ],
    [
     121.9,
     66.4,
     "silence",
     0
    ],
    [
     188.3,
     95.5,
     "silence",
     0
    ],
    [
     283.8,
     41.1,
     "silence",
     0
    ]
   ],
   "22": [
    [
     0.0,
     38.4,
     null,
     0
    ],
    [
     38.4,
     106.6,
     "silence",
     0
    ]
   ]
  }
 },
 "8": {
  "n": [
   "劇場版 美少女戦士セーラームーンR ミュージックコレクション",
   "Sailor Moon R Movie Music Collection"
  ],
  "p": "MMB",
  "d": 8,
  "cat": "COCC-14792",
  "img": "images/album-covers/disc-08-sailor-moon-r-movie-music-collection.jpg",
  "card": "images/tray-cards/disc-08.jpg",
  "t": {
   "1": [
    "プロローグ",
    "Puroroogu",
    "Prologue"
   ],
   "2": [
    "「ムーンライト伝説」TVサイズ カラオケ",
    "\"Muunraito Densetsu\" TV Saizu Karaoke",
    "Moonlight Legend (TV Size Karaoke)"
   ],
   "3": [
    "衛の回想",
    "Mamoru no Kaisou",
    "Mamoru's Reminiscence"
   ],
   "4": [
    "フィオレ出現",
    "Fiore Shutsugen",
    "Fiore Appears"
   ],
   "5": [
    "うさぎの心配",
    "Usagi no Shinpai",
    "Usagi's Worry"
   ],
   "6": [
    "妖花魔グリシナ",
    "Youkama Gurishina",
    "Flower Monster Glycina"
   ],
   "7": [
    "セーラー4戦士、スターパワーメイクアップ",
    "Seeraa 4 Senshi, Sutaa Pawaa Meikuappu",
    "Four Sailor Guardians, Star Power Make Up"
   ],
   "8": [
    "セーラームーンVSグリシア",
    "Seeraa Muun VS Gurishia",
    "Sailor Moon vs. Glycina"
   ],
   "9": [
    "キセニアン",
    "Kisenian",
    "Xenian"
   ],
   "10": [
    "タキシード仮面登場 ～衛とフィオレ",
    "Takishiido Kamen Toujou ~ Mamoru to Fiore",
    "Tuxedo Mask Appears ~ Mamoru and Fiore"
   ],
   "11": [
    "フィオレの回想",
    "Fiore no Kaisou",
    "Fiore's Reminiscence"
   ],
   "12": [
    "セーラー・テレポート！",
    "Seeraa Terepooto!",
    "Sailor Teleport!"
   ],
   "13": [
    "地球侵略計画",
    "Chikyuu Shinryaku Keikaku",
    "Earth Invasion Plan"
   ],
   "14": [
    "花迷宮の死闘",
    "Hana Meikyuu no Shitou",
    "Death Match in the Flower Labyrinth"
   ],
   "15": [
    "セーラームーンVSフィオレ",
    "Seeraa Muun VS Fiore",
    "Sailor Moon vs. Fiore"
   ],
   "16": [
    "生還",
    "Seikan",
    "Coming Back Alive"
   ],
   "17": [
    "「Moon Revenge」コーラスなしカラオケ",
    "\"Moon Revenge\" Koorasu Nashi Karaoke",
    "Moon Revenge (Karaoke without Chorus)"
   ],
   "18": [
    "復活のセレナーデ",
    "Fukkatsu no Serenaade",
    "Resurrection Serenade"
   ],
   "19": [
    "「Moon Revenge」劇場版サイズ",
    "\"Moon Revenge\" Gekijou-ban Saizu",
    "Moon Revenge (Movie Size)"
   ],
   "20": [
    "「I am セーラームーン」劇場版サイズ",
    "\"I am Seeraa Muun\" Gekijou-ban Saizu",
    "I am Sailor Moon (Movie Size)"
   ],
   "21": [
    "第2回録音未収録劇伴集",
    "Dai 2-kai Rokuon Mishuuroku Gekiban-shuu",
    "Unreleased Score from the 2nd Recording Session"
   ],
   "22": [
    "「タキシード・ナイト」～インストヴァージョン～",
    "\"Takishiido Naito\" ~Insuto Vaajon~",
    "Tuxedo Knight ~Instrumental Version~"
   ],
   "23": [
    "「ルナ！」～インストヴァージョン～",
    "\"Runa!\" ~Insuto Vaajon~",
    "Luna! ~Instrumental Version~"
   ],
   "24": [
    "「イニシャル・U」～インストヴァージョン～",
    "\"Inisharu U\" ~Insuto Vaajon~",
    "Initial U ~Instrumental Version~"
   ],
   "25": [
    "「戦士の想い」～インストヴァージョン～",
    "\"Senshi no Omoi\" ~Insuto Vaajon~",
    "A Guardian's Feelings ~Instrumental Version~"
   ],
   "26": [
    "「ガーネット・ガーディアン」～インストヴァージョン～",
    "\"Gaanetto Gaadian\" ~Insuto Vaajon~",
    "Garnet Guardian ~Instrumental Version~"
   ],
   "27": [
    "「再来」～インストヴァージョン～",
    "\"Sairai\" ~Insuto Vaajon~",
    "Second Coming ~Instrumental Version~"
   ],
   "28": [
    "SE集「ムーンライト伝説」アレンジ",
    "SE-shuu \"Muunraito Densetsu\" Arenji",
    "Sound Effects: \"Moonlight Legend\" Arrangement"
   ],
   "29": [
    "SE集 セーラームーン①",
    "SE-shuu Seeraa Muun 1",
    "Sound Effects: Sailor Moon 1"
   ],
   "30": [
    "SE集 セーラームーン②",
    "SE-shuu Seeraa Muun 2",
    "Sound Effects: Sailor Moon 2"
   ]
  },
  "l": {
   "1": 91.273,
   "2": 84.22,
   "3": 123.586,
   "4": 90.881,
   "5": 149.866,
   "6": 180.115,
   "7": 156.422,
   "8": 120.582,
   "9": 74.737,
   "10": 143.831,
   "11": 155.926,
   "12": 115.488,
   "13": 58.359,
   "14": 134.009,
   "15": 248.713,
   "16": 227.319,
   "17": 241.843,
   "18": 92.135,
   "19": 145.216,
   "20": 94.381,
   "21": 126.695,
   "22": 181.996,
   "23": 117.578,
   "24": 275.985,
   "25": 303.675,
   "26": 146.705,
   "27": 180.847,
   "28": 107.443,
   "29": 113.059,
   "30": 118.179
  },
  "s": {
   "3": [
    [
     0.0,
     49.6,
     null,
     0
    ],
    [
     49.6,
     74.0,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     92.6,
     null,
     0
    ],
    [
     92.6,
     63.8,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     39.9,
     null,
     0
    ],
    [
     39.9,
     19.5,
     "silence",
     0
    ],
    [
     59.3,
     22.7,
     "silence",
     0
    ],
    [
     82.0,
     38.6,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     43.0,
     null,
     0
    ],
    [
     43.0,
     38.7,
     "silence",
     0
    ],
    [
     81.7,
     62.2,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     115.8,
     null,
     0
    ],
    [
     115.8,
     40.1,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     40.3,
     null,
     0
    ],
    [
     40.3,
     75.2,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     80.5,
     null,
     0
    ],
    [
     80.5,
     168.2,
     "silence",
     0
    ]
   ],
   "16": [
    [
     0.0,
     36.9,
     null,
     0
    ],
    [
     36.9,
     105.0,
     "silence",
     0
    ],
    [
     142.0,
     62.5,
     "silence",
     0
    ],
    [
     204.4,
     22.9,
     "silence",
     0
    ]
   ],
   "21": [
    [
     0.0,
     84.4,
     null,
     0
    ],
    [
     84.4,
     42.3,
     "silence",
     0
    ]
   ]
  }
 },
 "9": {
  "n": [
   "劇場版 美少女戦士セーラームーンS ミュージックコレクション",
   "Sailor Moon S Movie Music Collection"
  ],
  "p": "MMB",
  "d": 9,
  "cat": "COCC-14793",
  "img": "images/album-covers/disc-09-sailor-moon-s-movie-music-collection.jpg",
  "card": "images/tray-cards/disc-09.jpg",
  "t": {
   "1": [
    "雪の女王",
    "Yuki no Joou",
    "Snow Queen"
   ],
   "2": [
    "「ムーンライト伝説」オリジナルカラオケ",
    "\"Muunraito Densetsu\" Orijinaru Karaoke",
    "Moonlight Legend (Original Karaoke)"
   ],
   "3": [
    "のんきなうさぎ",
    "Nonki na Usagi",
    "Carefree Usagi"
   ],
   "4": [
    "翔のやさしさ",
    "Kakeru no Yasashisa",
    "Kakeru's Kindness"
   ],
   "5": [
    "翔の夢やさしく",
    "Kakeru no Yume Yasashiku",
    "Kakeru's Gentle Dreams"
   ],
   "6": [
    "侵略作戦開始",
    "Shinryaku Sakusen Kaishi",
    "The Invasion Operation Begins"
   ],
   "7": [
    "セーラー4戦士VSスノーダンサー",
    "Seeraa 4 Senshi VS Sunoo Dansaa",
    "Four Sailor Guardians vs. Snow Dancers"
   ],
   "8": [
    "セーラーちびムーンにメイクアップ",
    "Seeraa Chibi Muun ni Meikuappu",
    "Make Up into Sailor Chibi Moon"
   ],
   "9": [
    "野望",
    "Yabou",
    "Ambition"
   ],
   "10": [
    "ドキドキ",
    "Dokidoki",
    "Heart Pounding"
   ],
   "11": [
    "翔の想い",
    "Kakeru no Omoi",
    "Kakeru's Feelings"
   ],
   "12": [
    "つらい別れ",
    "Tsurai Wakare",
    "Painful Farewell"
   ],
   "13": [
    "スノーカグヤ出現",
    "Sunoo Kaguya Shutsugen",
    "Snow Kaguya Appears"
   ],
   "14": [
    "最終決戦",
    "Saishuu Kessen",
    "The Final Battle"
   ],
   "15": [
    "恋する心",
    "Koisuru Kokoro",
    "Hearts in Love"
   ],
   "16": [
    "愛と友情の力",
    "Ai to Yuujou no Chikara",
    "The Power of Love and Friendship"
   ],
   "17": [
    "愛のメッセージ",
    "Ai no Messeeji",
    "Message of Love"
   ],
   "18": [
    "「Moonlight Destiny」劇場版サイズ",
    "\"Moonlight Destiny\" Gekijou-ban Saizu",
    "Moonlight Destiny (Movie Size)"
   ],
   "19": [
    "セーラー4戦士、メイクアップテーマ　ソロヴァージョン",
    "Seeraa 4 Senshi, Meikuappu Teema Soro Vaajon",
    "Four Sailor Guardians, Make Up Theme (Solo Version)"
   ],
   "20": [
    "「セーラーチームのテーマ」～インストヴァージョン～",
    "\"Seeraa Chiimu no Teema\" ~Insuto Vaajon~",
    "Sailor Team's Theme ~Instrumental Version~"
   ],
   "21": [
    "「Moonlight Destiny」～インストヴァージョン～",
    "\"Moonlight Destiny\" ~Insuto Vaajon~",
    "Moonlight Destiny ~Instrumental Version~"
   ],
   "22": [
    "「セーラームーン・クリスマス」～オルゴールヴァージョン～",
    "\"Seeraa Muun Kurisumasu\" ~Orugooru Vaajon~",
    "Sailor Moon Christmas ~Music Box Version~"
   ],
   "23": [
    "「イニシャル・U」～オルゴールヴァージョン～",
    "\"Inisharu U\" ~Orugooru Vaajon~",
    "Initial U ~Music Box Version~"
   ],
   "24": [
    "「戦士の想い」～オルゴールヴァージョン～",
    "\"Senshi no Omoi\" ~Orugooru Vaajon~",
    "A Guardian's Feelings ~Music Box Version~"
   ],
   "25": [
    "「ガーネット・ガーディアン」～オルゴールヴァージョン～",
    "\"Gaanetto Gaadian\" ~Orugooru Vaajon~",
    "Garnet Guardian ~Music Box Version~"
   ],
   "26": [
    "「再来」～オルゴールヴァージョン～",
    "\"Sairai\" ~Orugooru Vaajon~",
    "Second Coming ~Music Box Version~"
   ],
   "27": [
    "「愛をしんじてる」～オルゴールヴァージョン～",
    "\"Ai wo Shinjiteru\" ~Orugooru Vaajon~",
    "I Believe in Love ~Music Box Version~"
   ],
   "28": [
    "SE集 セーラームーン③",
    "SE-shuu Seeraa Muun 3",
    "Sound Effects: Sailor Moon 3"
   ],
   "29": [
    "SE集 セーラームーン④",
    "SE-shuu Seeraa Muun 4",
    "Sound Effects: Sailor Moon 4"
   ],
   "30": [
    "SE集 赤いバラ、他",
    "SE-shuu Akai Bara, Hoka",
    "Sound Effects: Red Rose, etc."
   ]
  },
  "l": {
   "1": 102.845,
   "2": 173.115,
   "3": 90.907,
   "4": 155.064,
   "5": 72.648,
   "6": 92.083,
   "7": 142.604,
   "8": 93.807,
   "9": 66.718,
   "10": 67.763,
   "11": 105.954,
   "12": 127.348,
   "13": 175.622,
   "14": 198.558,
   "15": 110.786,
   "16": 161.072,
   "17": 209.712,
   "18": 136.073,
   "19": 96.079,
   "20": 234.842,
   "21": 357.513,
   "22": 121.941,
   "23": 134.688,
   "24": 135.289,
   "25": 90.646,
   "26": 63.505,
   "27": 177.843,
   "28": 183.433,
   "29": 219.064,
   "30": 176.824
  },
  "s": {
   "1": [
    [
     0.0,
     50.0,
     null,
     0
    ],
    [
     50.0,
     52.8,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     44.0,
     null,
     0
    ],
    [
     44.0,
     46.9,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     53.0,
     null,
     0
    ],
    [
     53.0,
     32.1,
     "silence",
     0
    ],
    [
     85.2,
     69.9,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     44.8,
     null,
     0
    ],
    [
     44.8,
     27.9,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     54.9,
     null,
     0
    ],
    [
     54.9,
     37.2,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     89.3,
     null,
     0
    ],
    [
     89.3,
     22.0,
     "silence",
     0
    ],
    [
     111.2,
     31.4,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     21.6,
     null,
     0
    ],
    [
     21.6,
     22.4,
     "silence",
     0
    ],
    [
     43.9,
     31.1,
     "silence",
     0
    ],
    [
     75.0,
     18.8,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     9.1,
     null,
     0
    ],
    [
     9.1,
     28.2,
     "silence",
     0
    ],
    [
     37.3,
     30.5,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     42.8,
     null,
     0
    ],
    [
     42.8,
     18.4,
     "silence",
     0
    ],
    [
     61.3,
     44.7,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     72.2,
     null,
     0
    ],
    [
     72.2,
     55.1,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     53.8,
     null,
     0
    ],
    [
     53.8,
     81.4,
     "silence",
     0
    ],
    [
     135.2,
     40.4,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     43.9,
     null,
     0
    ],
    [
     43.9,
     66.3,
     "silence",
     0
    ],
    [
     110.2,
     49.3,
     "silence",
     0
    ],
    [
     159.5,
     39.0,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     67.0,
     null,
     0
    ],
    [
     67.0,
     43.8,
     "silence",
     0
    ]
   ],
   "17": [
    [
     0.0,
     152.6,
     null,
     0
    ],
    [
     152.6,
     57.1,
     "silence",
     0
    ]
   ]
  },
  "e": {
   "19": {
    "1": [
     "M413―4種",
     "M-413"
    ]
   }
  }
 },
 "10": {
  "n": [
   "劇場版 美少女戦士セーラームーンSupers ミュージックコレクション",
   "Sailor Moon SuperS Movie Music Collection"
  ],
  "p": "MMB",
  "d": 10,
  "cat": "COCC-14794",
  "img": "images/album-covers/disc-10-sailor-moon-supers-movie-music-collection.jpg",
  "card": "images/tray-cards/disc-10.jpg",
  "t": {
   "1": [
    "笛吹き",
    "Fuefuki",
    "Flute Player"
   ],
   "2": [
    "「ムーンライト伝説」TVサイズ",
    "\"Muunraito Densetsu\" TV Saizu",
    "Moonlight Legend (TV Size)"
   ],
   "3": [
    "クッキー教室",
    "Kukkii Kyoushitsu",
    "Cookie Lesson"
   ],
   "4": [
    "ペルル",
    "Peruru",
    "Perle"
   ],
   "5": [
    "ププラン",
    "Pupuran",
    "Poupelin"
   ],
   "6": [
    "ボンボンベイビー",
    "Bonbon Beibii",
    "Bonbon Baby"
   ],
   "7": [
    "セーラー4戦士、クリスタルパワーメイクアップ",
    "Seeraa 4 Senshi, Kurisutaru Pawaa Meikuappu",
    "Four Sailor Guardians, Crystal Power Make Up"
   ],
   "8": [
    "タキシード仮面",
    "Takishiido Kamen",
    "Tuxedo Mask"
   ],
   "9": [
    "ペルルの反抗",
    "Peruru no Hankou",
    "Perle's Rebellion"
   ],
   "10": [
    "戦闘再開",
    "Sentou Saikai",
    "Resuming Combat"
   ],
   "11": [
    "女王バディヤーヌ",
    "Joou Badiyaanu",
    "Queen Badiane"
   ],
   "12": [
    "マジパンヌ・キャッスル",
    "Majipannu Kyassuru",
    "Marzipan Castle"
   ],
   "13": [
    "外部太陽系3戦士",
    "Gaibu Taiyoukei 3 Senshi",
    "The Three Outer Solar System Guardians"
   ],
   "14": [
    "ブラックドリームホール",
    "Burakku Doriimu Hooru",
    "Black Dream Hole"
   ],
   "15": [
    "命をかけて",
    "Inochi wo Kakete",
    "Risking Our Lives"
   ],
   "16": [
    "勇気100倍クッキー",
    "Yuuki 100-bai Kukkii",
    "100-Times Courage Cookie"
   ],
   "17": [
    "夢の棺",
    "Yume no Hitsugi",
    "Dream Coffin"
   ],
   "18": [
    "愛の光",
    "Ai no Hikari",
    "Love's Light"
   ],
   "19": [
    "家に帰ろう",
    "Uchi ni Kaerou",
    "Let's Go Home"
   ],
   "20": [
    "「Morning Moonで会いましょう」劇場版サイズ",
    "\"Morning Moon de Aimashou\" Gekijou-ban Saizu",
    "Let's Meet at Morning Moon (Movie Size)"
   ],
   "21": [
    "亜美ちゃんの朝",
    "Ami-chan no Asa",
    "Ami-chan's Morning"
   ],
   "22": [
    "水野亜美",
    "Mizuno Ami",
    "Ami Mizuno"
   ],
   "23": [
    "可愛い企み",
    "Kawaii Takurami",
    "Cute Scheme"
   ],
   "24": [
    "地霊ボンノーン",
    "Chirei Bonnoon",
    "Earth Spirit Bonnon"
   ],
   "25": [
    "セーラーマーキュリー",
    "Seeraa Maakyurii",
    "Sailor Mercury"
   ],
   "26": [
    "マーキュリーアクアミラージュ",
    "Maakyurii Akua Miraaju",
    "Mercury Aqua Mirage"
   ],
   "27": [
    "終曲",
    "Shuukyoku",
    "Finale"
   ],
   "28": [
    "「\"らしく\"いきましょ」TVサイズ",
    "\"'Rashiku' Ikimasho\" TV Saizu",
    "Let's Be True to Ourselves (TV Size)"
   ],
   "29": [
    "第1回録音未収録劇伴集",
    "Dai 1-kai Rokuon Mishuuroku Gekiban-shuu",
    "Unreleased Score from the 1st Recording Session"
   ],
   "30": [
    "「三時の妖精」～インストヴァージョン～",
    "\"Sanji no Yousei\" ~Insuto Vaajon~",
    "The Three O'Clock Fairy ~Instrumental Version~"
   ],
   "31": [
    "「Morning Moonで会いましょう」～インストヴァージョン～",
    "\"Morning Moon de Aimashou\" ~Insuto Vaajon~",
    "Let's Meet at Morning Moon ~Instrumental Version~"
   ],
   "32": [
    "「あしたもまた自転車」～オルゴールヴァージョン～",
    "\"Ashita mo Mata Jitensha\" ~Orugooru Vaajon~",
    "Bicycle Again Tomorrow ~Music Box Version~"
   ],
   "33": [
    "「あしたもまた自転車」～インストヴァージョン～",
    "\"Ashita mo Mata Jitensha\" ~Insuto Vaajon~",
    "Bicycle Again Tomorrow ~Instrumental Version~"
   ]
  },
  "l": {
   "1": 157.441,
   "2": 83.724,
   "3": 135.315,
   "4": 122.071,
   "5": 186.777,
   "6": 60.292,
   "7": 96.941,
   "8": 119.564,
   "9": 88.844,
   "10": 146.182,
   "11": 53.082,
   "12": 172.879,
   "13": 102.323,
   "14": 203.965,
   "15": 138.528,
   "16": 37.408,
   "17": 159.74,
   "18": 224.941,
   "19": 109.95,
   "20": 107.678,
   "21": 84.481,
   "22": 170.607,
   "23": 71.237,
   "24": 149.291,
   "25": 51.018,
   "26": 52.742,
   "27": 86.466,
   "28": 94.643,
   "29": 272.092,
   "30": 204.148,
   "31": 269.715,
   "32": 139.417,
   "33": 233.692
  },
  "s": {
   "1": [
    [
     0.0,
     143.8,
     null,
     0
    ],
    [
     143.8,
     13.7,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     100.6,
     null,
     0
    ],
    [
     100.6,
     34.7,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     84.6,
     null,
     0
    ],
    [
     84.6,
     12.7,
     "silence",
     0
    ],
    [
     97.4,
     24.7,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     7.0,
     null,
     0
    ],
    [
     7.0,
     53.3,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     10.0,
     null,
     0
    ],
    [
     10.0,
     38.9,
     "silence",
     0
    ],
    [
     48.8,
     13.8,
     "silence",
     0
    ],
    [
     62.6,
     34.3,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     88.1,
     null,
     0
    ],
    [
     88.1,
     27.6,
     "silence",
     0
    ],
    [
     115.7,
     3.8,
     "dip",
     0
    ]
   ],
   "9": [
    [
     0.0,
     5.2,
     null,
     0
    ],
    [
     5.2,
     83.6,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     40.5,
     null,
     0
    ],
    [
     40.5,
     48.5,
     "silence",
     0
    ],
    [
     89.0,
     57.2,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     110.5,
     null,
     0
    ],
    [
     110.5,
     9.7,
     "silence",
     0
    ],
    [
     120.1,
     45.5,
     "silence",
     0
    ],
    [
     165.7,
     7.2,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     102.3,
     null,
     0
    ]
   ],
   "14": [
    [
     0.0,
     7.4,
     null,
     0
    ],
    [
     7.4,
     70.2,
     "silence",
     0
    ],
    [
     77.6,
     115.0,
     "silence",
     0
    ],
    [
     192.6,
     11.4,
     "silence",
     0
    ]
   ],
   "16": [
    [
     0.0,
     12.4,
     null,
     0
    ],
    [
     12.4,
     25.0,
     "silence",
     0
    ]
   ],
   "18": [
    [
     0.0,
     177.7,
     null,
     0
    ],
    [
     177.7,
     47.3,
     "silence",
     0
    ]
   ],
   "19": [
    [
     0.0,
     51.3,
     null,
     0
    ],
    [
     51.3,
     58.7,
     "silence",
     0
    ]
   ],
   "22": [
    [
     0.0,
     85.3,
     null,
     0
    ],
    [
     85.3,
     13.0,
     "silence",
     0
    ],
    [
     98.3,
     72.3,
     "silence",
     0
    ]
   ],
   "23": [
    [
     0.0,
     23.2,
     null,
     0
    ],
    [
     23.2,
     16.5,
     "silence",
     0
    ],
    [
     39.7,
     31.6,
     "silence",
     0
    ]
   ],
   "24": [
    [
     0.0,
     51.3,
     null,
     0
    ],
    [
     51.3,
     44.7,
     "silence",
     0
    ],
    [
     96.0,
     53.3,
     "silence",
     0
    ]
   ],
   "25": [
    [
     0.0,
     10.8,
     null,
     0
    ],
    [
     10.8,
     18.1,
     "silence",
     0
    ],
    [
     28.9,
     22.2,
     "silence",
     0
    ]
   ],
   "26": [
    [
     0.0,
     9.7,
     null,
     0
    ],
    [
     9.7,
     43.0,
     "silence",
     0
    ]
   ],
   "27": [
    [
     0.0,
     44.8,
     null,
     0
    ],
    [
     44.8,
     41.7,
     "dip",
     0
    ]
   ],
   "29": [
    [
     0.0,
     13.7,
     null,
     0
    ],
    [
     13.7,
     10.8,
     "silence",
     0
    ],
    [
     24.5,
     64.9,
     "silence",
     0
    ],
    [
     89.4,
     80.4,
     "silence",
     0
    ],
    [
     169.8,
     102.3,
     "silence",
     0
    ]
   ]
  }
 },
 "MC": {
  "n": [
   "美少女戦士セーラームーン 音楽集",
   "Sailor Moon Music Collection"
  ],
  "cat": "COCC-9896",
  "v": 26833,
  "img": "images/album-covers/sailor-moon-music-collection.jpg",
  "card": "images/tray-cards/music-collection.jpg",
  "t": {
   "1": [
    "ムーンライト伝説",
    "Muunraito Densetsu",
    "Moonlight Legend"
   ],
   "2": [
    "あたしだって普通の女の子",
    "Atashi Datte Futsuu no Onnanoko",
    "I'm Just an Ordinary Girl, Too"
   ],
   "3": [
    "本当に選ばれた戦士なの？",
    "Hontou ni Erabareta Senshi na no?",
    "Was I Really Chosen to Be a Guardian?"
   ],
   "4": [
    "星空はミステリアス",
    "Hoshizora wa Misuteriasu",
    "The Starry Sky Is Mysterious"
   ],
   "5": [
    "おっちょこちょいは生まれつき",
    "Occhokochoi wa Umaretsuki",
    "Scatterbrained by Nature"
   ],
   "6": [
    "恋する乙女心",
    "Koisuru Otomegokoro",
    "A Maiden's Heart in Love"
   ],
   "7": [
    "誰かが狙われている",
    "Dareka ga Nerawarete Iru",
    "Someone Is Being Targeted"
   ],
   "8": [
    "夢見るおだんごアタマ",
    "Yumemiru Odango Atama",
    "Dreamy Dumpling-Head"
   ],
   "9": [
    "夕暮れ時は妖魔の予感",
    "Yuuguredoki wa Youma no Yokan",
    "Dusk Brings a Premonition of Monsters"
   ],
   "10": [
    "ムーン・プリズム・パワー・メイクアップ！",
    "Muun Purizumu Pawaa Meikuappu!",
    "Moon Prism Power Make Up!"
   ],
   "11": [
    "HEART MOVING",
    "HEART MOVING",
    "HEART MOVING"
   ]
  },
  "l": {
   "1": 175.309,
   "2": 389.617,
   "3": 403.253,
   "4": 368.746,
   "5": 409.183,
   "6": 413.284,
   "7": 438.31,
   "8": 448.941,
   "9": 422.558,
   "10": 457.405,
   "11": 218.568
  },
  "s": {
   "2": [
    [
     0.0,
     14.4,
     null,
     0
    ],
    [
     14.4,
     64.6,
     "change",
     0
    ],
    [
     79.0,
     67.7,
     "change",
     0
    ],
    [
     146.7,
     77.9,
     "change",
     0
    ],
    [
     224.6,
     78.8,
     "change",
     0
    ],
    [
     303.4,
     10.7,
     "change",
     0
    ],
    [
     314.1,
     75.5,
     "change",
     0
    ]
   ],
   "3": [
    [
     0.0,
     72.8,
     null,
     0
    ],
    [
     72.8,
     70.3,
     "change",
     0
    ],
    [
     143.1,
     68.7,
     "change",
     0
    ],
    [
     211.8,
     14.7,
     "change",
     0
    ],
    [
     226.5,
     70.6,
     "change",
     0
    ],
    [
     297.1,
     106.2,
     "change",
     0
    ]
   ],
   "4": [
    [
     0.0,
     65.1,
     null,
     0
    ],
    [
     65.1,
     61.8,
     "change",
     0
    ],
    [
     126.9,
     70.7,
     "change",
     0
    ],
    [
     197.6,
     15.6,
     "change",
     0
    ],
    [
     213.2,
     49.2,
     "change",
     0
    ],
    [
     262.4,
     106.3,
     "change",
     0
    ]
   ],
   "5": [
    [
     0.0,
     15.9,
     null,
     0
    ],
    [
     15.9,
     68.1,
     "change",
     0
    ],
    [
     84.0,
     84.7,
     "change",
     0
    ],
    [
     168.7,
     67.3,
     "change",
     0
    ],
    [
     236.0,
     80.8,
     "change",
     0
    ],
    [
     316.8,
     14.0,
     "change",
     0
    ],
    [
     330.8,
     78.4,
     "change",
     0
    ]
   ],
   "6": [
    [
     0.0,
     17.7,
     null,
     0
    ],
    [
     17.7,
     73.1,
     "change",
     0
    ],
    [
     90.8,
     18.2,
     "change",
     0
    ],
    [
     109.0,
     76.2,
     "change",
     0
    ],
    [
     185.2,
     79.6,
     "change",
     0
    ],
    [
     264.8,
     18.8,
     "change",
     0
    ],
    [
     283.6,
     87.2,
     "change",
     0
    ],
    [
     370.8,
     42.5,
     "change",
     0
    ]
   ],
   "7": [
    [
     0.0,
     88.6,
     null,
     0
    ],
    [
     88.6,
     60.7,
     "change",
     0
    ],
    [
     149.3,
     69.2,
     "change",
     0
    ],
    [
     218.5,
     90.0,
     "change",
     0
    ],
    [
     308.5,
     12.7,
     "silence",
     0
    ],
    [
     321.2,
     117.1,
     "change",
     0
    ]
   ],
   "8": [
    [
     0.0,
     85.2,
     null,
     0
    ],
    [
     85.2,
     14.9,
     "change",
     0
    ],
    [
     100.1,
     82.0,
     "change",
     0
    ],
    [
     182.1,
     78.9,
     "change",
     0
    ],
    [
     261.0,
     13.9,
     "change",
     0
    ],
    [
     274.9,
     74.0,
     "change",
     0
    ],
    [
     348.9,
     100.0,
     "change",
     0
    ]
   ],
   "9": [
    [
     0.0,
     18.2,
     null,
     0
    ],
    [
     18.2,
     78.3,
     "change",
     0
    ],
    [
     96.5,
     15.6,
     "change",
     0
    ],
    [
     112.1,
     73.2,
     "change",
     0
    ],
    [
     185.3,
     63.8,
     "change",
     0
    ],
    [
     249.1,
     85.5,
     "change",
     0
    ],
    [
     334.6,
     88.0,
     "change",
     0
    ]
   ],
   "10": [
    [
     0.0,
     38.3,
     null,
     0
    ],
    [
     38.3,
     56.7,
     "change",
     0
    ],
    [
     95.0,
     93.1,
     "change",
     0
    ],
    [
     188.1,
     14.4,
     "change",
     0
    ],
    [
     202.5,
     18.4,
     "change",
     0
    ],
    [
     220.9,
     37.8,
     "change",
     0
    ],
    [
     258.7,
     40.1,
     "change",
     0
    ],
    [
     298.8,
     74.0,
     "change",
     0
    ],
    [
     372.8,
     84.6,
     "change",
     0
    ]
   ]
  },
  "q": {
   "2": {
    "1": "1-2",
    "2": "1-3",
    "3": "1-4",
    "4": "1-5",
    "5": "1-6",
    "6": "1-7",
    "7": "1-8"
   },
   "3": {
    "1": "1-9",
    "2": "1-10",
    "3": "1-11",
    "4": "1-12",
    "5": "1-13",
    "6": "1-14"
   },
   "4": {
    "1": "1-15",
    "2": "1-16",
    "3": "1-17",
    "4": "1-18",
    "5": "1-19",
    "6": "1-20"
   },
   "5": {
    "1": "1-21",
    "2": "1-22",
    "3": "1-23",
    "4": "1-24",
    "5": "1-25",
    "6": "1-26",
    "7": "1-27"
   },
   "6": {
    "1": "1-28",
    "2": "1-29",
    "3": "1-30",
    "4": "1-31",
    "5": "1-32",
    "6": "1-33",
    "7": "1-34",
    "8": "1-35"
   },
   "7": {
    "1": "1-36",
    "2": "1-37",
    "3": "1-38",
    "4": "1-39",
    "5": "1-40",
    "6": "1-41"
   },
   "8": {
    "1": "1-42",
    "2": "1-43",
    "3": "1-44",
    "4": "1-45",
    "5": "1-46",
    "6": "1-47",
    "7": "1-48"
   },
   "9": {
    "1": "1-49",
    "2": "1-50",
    "3": "1-51",
    "4": "1-52",
    "5": "1-53",
    "6": "1-54",
    "7": "1-55"
   },
   "10": {
    "1": "2-12-2",
    "2": "2-12-3",
    "3": "2-12-4",
    "5": "2-1",
    "6": "2-30-1",
    "7": "2-8-1",
    "8": "2-12-1",
    "9": "2-14-1"
   },
   "11": {
    "1": "2-28"
   }
  }
 },
 "R": {
  "n": [
   "美少女戦士セーラームーンR -音楽集-",
   "Sailor Moon R Music Collection"
  ],
  "cat": "COCC-10705",
  "v": 26831,
  "img": "images/album-covers/sailor-moon-r-music-collection.jpg",
  "card": "images/tray-cards/r-music-collection.jpg",
  "t": {
   "1": [
    "乙女のポリシー",
    "Otome no Porishii",
    "A Maiden's Policy"
   ],
   "2": [
    "友情、そして愛",
    "Yuujou, Soshite Ai",
    "Friendship, and Then Love"
   ],
   "3": [
    "魔界樹",
    "Makaiju",
    "The Makai Tree"
   ],
   "4": [
    "私が戦う",
    "Watashi ga Tatakau",
    "I Will Fight"
   ],
   "5": [
    "清く、明るく、△×□§...",
    "Kiyoku, Akaruku, △×□§...",
    "Pure, Bright, △×□§..."
   ],
   "6": [
    "新たなる敵",
    "Aratanaru Teki",
    "A New Enemy"
   ],
   "7": [
    "追跡は冒険のはじまり",
    "Tsuiseki wa Bouken no Hajimari",
    "The Chase Is the Start of an Adventure"
   ],
   "8": [
    "月は見ている",
    "Tsuki wa Mite Iru",
    "The Moon is Watching"
   ],
   "9": [
    "悲しみを勇気に変えて",
    "Kanashimi wo Yuuki ni Kaete",
    "Turning Sorrow into Courage"
   ],
   "10": [
    "好きと言って",
    "Suki to Itte",
    "Say You Love Me"
   ]
  },
  "l": {
   "1": 194.169,
   "2": 378.515,
   "3": 347.612,
   "4": 363.913,
   "5": 407.198,
   "6": 297.536,
   "7": 295.916,
   "8": 307.75,
   "9": 329.51,
   "10": 277.683
  },
  "s": {
   "2": [
    [
     0.0,
     84.8,
     null,
     0
    ],
    [
     84.8,
     97.3,
     "silence",
     0
    ],
    [
     182.1,
     86.8,
     "silence",
     0
    ],
    [
     268.9,
     109.6,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     88.6,
     null,
     0
    ],
    [
     88.6,
     106.9,
     "silence",
     0
    ],
    [
     195.5,
     63.5,
     "silence",
     0
    ],
    [
     259.0,
     88.6,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     99.5,
     null,
     0
    ],
    [
     99.5,
     114.2,
     "silence",
     0
    ],
    [
     213.7,
     23.3,
     "change",
     0
    ],
    [
     237.0,
     126.9,
     "change",
     0
    ]
   ],
   "5": [
    [
     0.0,
     108.3,
     null,
     0
    ],
    [
     108.3,
     108.7,
     "silence",
     0
    ],
    [
     217.0,
     96.4,
     "silence",
     0
    ],
    [
     313.4,
     93.8,
     "change",
     0
    ]
   ],
   "6": [
    [
     0.0,
     110.5,
     null,
     0
    ],
    [
     110.5,
     88.1,
     "silence",
     0
    ],
    [
     198.6,
     98.9,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     97.4,
     null,
     0
    ],
    [
     97.4,
     115.8,
     "silence",
     0
    ],
    [
     213.2,
     38.3,
     "change",
     0
    ],
    [
     251.5,
     44.4,
     "change",
     0
    ]
   ],
   "8": [
    [
     0.0,
     89.3,
     null,
     0
    ],
    [
     89.3,
     126.3,
     "silence",
     0
    ],
    [
     215.6,
     92.2,
     "change",
     0
    ]
   ],
   "9": [
    [
     0.0,
     90.7,
     null,
     0
    ],
    [
     90.7,
     92.5,
     "silence",
     0
    ],
    [
     183.2,
     146.3,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "2": {
    "1": "3-3-1",
    "2": "3-17-1",
    "3": "3-9-1",
    "4": "3-9-4"
   },
   "3": {
    "1": "3-7-2",
    "2": "3-7-1",
    "4": "3-5-3"
   },
   "4": {
    "1": "3-14-5",
    "2": "3-7-3",
    "3": "3-15-2",
    "4": "3-16-1"
   },
   "5": {
    "1": "3-17-2",
    "2": "3-9-3",
    "3": "3-11-2"
   },
   "6": {
    "1": "3-6-1",
    "2": "3-6-2",
    "3": "3-14-4"
   },
   "7": {
    "1": "3-14-1",
    "2": "3-3-2",
    "4": "3-1-2"
   },
   "8": {
    "1": "3-15-3",
    "2": "3-16-2"
   },
   "9": {
    "1": "3-1-1",
    "2": "3-12-1",
    "3": "3-12-3"
   },
   "10": {
    "1": "3-10"
   }
  }
 },
 "RM": {
  "n": [
   "劇場版 美少女戦士セーラームーンR 音楽集",
   "Sailor Moon R Movie Music Collection"
  ],
  "cat": "FMCC-5019",
  "v": 26829,
  "img": "images/album-covers/sailor-moon-r-movie-music-collection.jpg",
  "card": "images/tray-cards/r-movie-music-collection.jpg",
  "t": {
   "1": [
    "プロローグ",
    "Puroroogu",
    "Prologue"
   ],
   "2": [
    "Moon Revenge",
    "Moon Revenge",
    "Moon Revenge"
   ],
   "3": [
    "紅い髪の少年",
    "Akai Kami no Shounen",
    "The Red-Haired Boy"
   ],
   "4": [
    "植物園のハプニング！～侵略の予兆",
    "Shokubutsuen no Hapuningu! ~ Shinryaku no Yochou",
    "Happening at the Botanical Garden! ~ Signs of Invasion"
   ],
   "5": [
    "妖花魔グリシナ",
    "Youkama Gurishina",
    "Flower Monster Glycina"
   ],
   "6": [
    "メイクアップ！",
    "Meikuappu!",
    "Make Up!"
   ],
   "7": [
    "燃える美少女戦士",
    "Moeru Bishoujo Senshi",
    "Pretty Guardians Ablaze"
   ],
   "8": [
    "タキシード仮面登場～衛とフィオレ",
    "Takishiido Kamen Toujou ~ Mamoru to Fiore",
    "Tuxedo Mask Appears ~ Mamoru and Fiore"
   ],
   "9": [
    "セーラー・テレポート！",
    "Seeraa Terepooto!",
    "Sailor Teleport!"
   ],
   "10": [
    "追想のフィオレ",
    "Tsuisou no Fiore",
    "Fiore Remembered"
   ],
   "11": [
    "花迷宮の死闘",
    "Hana Meikyuu no Shitou",
    "Death Match in the Flower Labyrinth"
   ],
   "12": [
    "激突！セーラームーンVSフィオレ",
    "Gekitotsu! Seeraa Muun VS Fiore",
    "Clash! Sailor Moon vs. Fiore"
   ],
   "13": [
    "生命燃やして……",
    "Inochi Moyashite......",
    "Burning Life......"
   ],
   "14": [
    "復活のセレナーデ",
    "Fukkatsu no Serenaade",
    "Resurrection Serenade"
   ],
   "15": [
    "I am セーラームーン",
    "I am Seeraa Muun",
    "I am Sailor Moon"
   ]
  },
  "l": {
   "1": 92.135,
   "2": 242.339,
   "3": 141.271,
   "4": 226.012,
   "5": 181.448,
   "6": 194.404,
   "7": 153.052,
   "8": 142.891,
   "9": 116.246,
   "10": 212.951,
   "11": 135.132,
   "12": 283.874,
   "13": 189.493,
   "14": 93.337,
   "15": 297.562
  },
  "s": {
   "3": [
    [
     0.0,
     48.6,
     null,
     0
    ],
    [
     48.6,
     92.7,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     73.6,
     null,
     0
    ],
    [
     73.6,
     152.4,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     38.2,
     null,
     0
    ],
    [
     38.2,
     91.0,
     "silence",
     0
    ],
    [
     129.2,
     65.2,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     18.5,
     null,
     0
    ],
    [
     18.5,
     21.1,
     "silence",
     0
    ],
    [
     39.6,
     37.1,
     "silence",
     0
    ],
    [
     76.7,
     76.4,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     41.8,
     null,
     0
    ],
    [
     41.8,
     37.6,
     "silence",
     0
    ],
    [
     79.4,
     63.5,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     39.0,
     null,
     0
    ],
    [
     39.0,
     77.2,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     58.0,
     null,
     0
    ],
    [
     58.0,
     38.8,
     "silence",
     0
    ],
    [
     96.8,
     116.2,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     79.0,
     null,
     0
    ],
    [
     79.0,
     167.2,
     "silence",
     0
    ],
    [
     246.2,
     37.7,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     104.1,
     null,
     0
    ],
    [
     104.1,
     61.8,
     "silence",
     0
    ],
    [
     165.9,
     23.6,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "1": {
    "1": "8-1"
   },
   "2": {
    "1": "8-17"
   },
   "3": {
    "1": "8-3-1",
    "2": "8-4"
   },
   "4": {
    "1": "8-3-2",
    "2": "8-5"
   },
   "5": {
    "1": "8-6"
   },
   "6": {
    "1": "8-8-1",
    "2": "8-7-1",
    "3": "8-7-2"
   },
   "7": {
    "1": "8-8-2",
    "2": "8-8-3",
    "3": "8-8-4",
    "4": "8-9"
   },
   "8": {
    "1": "8-10-1",
    "2": "8-10-2",
    "3": "8-10-3"
   },
   "9": {
    "1": "8-12-1",
    "2": "8-12-2"
   },
   "10": {
    "1": "8-13",
    "2": "8-11-2",
    "3": "8-11-1"
   },
   "11": {
    "1": "8-14"
   },
   "12": {
    "1": "8-15-1",
    "2": "8-15-2",
    "3": "8-16-1"
   },
   "13": {
    "1": "8-16-2",
    "2": "8-16-3",
    "3": "8-16-4"
   },
   "14": {
    "1": "8-18"
   }
  }
 },
 "S": {
  "n": [
   "美少女戦士セーラームーンS 音楽集",
   "Sailor Moon S Music Collection"
  ],
  "cat": "COCC-11777",
  "v": 26827,
  "img": "images/album-covers/sailor-moon-s-music-collection.jpg",
  "card": "images/tray-cards/s-music-collection.jpg",
  "t": {
   "1": [
    "聖杯、救世主(メシア)……神秘なる世界",
    "Seihai, Kyuuseishu (Meshia)...... Shinpi naru Sekai",
    "The Holy Grail, the Messiah...... A Mysterious World"
   ],
   "2": [
    "サブタイトル",
    "Sabutaitoru",
    "Subtitle"
   ],
   "3": [
    "朝の並木道",
    "Asa no Namikimichi",
    "Avenue at Morning"
   ],
   "4": [
    "デスバスターズの野望",
    "Desu Basutaazu no Yabou",
    "The Death Busters' Ambition"
   ],
   "5": [
    "天王はるかと海王みちる",
    "Ten'ou Haruka to Kaiou Michiru",
    "Haruka Tenoh and Michiru Kaioh"
   ],
   "6": [
    "恋する乙女はとまらない！",
    "Koisuru Otome wa Tomaranai!",
    "You Can't Stop a Girl in Love!"
   ],
   "7": [
    "ダイモーン出現",
    "Daimoon Shutsugen",
    "A Daimon Appears"
   ],
   "8": [
    "アイキャッチ",
    "Aikyatchi",
    "Eyecatch"
   ],
   "9": [
    "奪われた純粋(ピュア)な心の結晶",
    "Ubawareta Junsui (Pyua) na Kokoro no Kesshou",
    "The Stolen Pure Heart Crystal"
   ],
   "10": [
    "戦士の宿命……",
    "Senshi no Shukumei......",
    "The Guardians' Fate......"
   ],
   "11": [
    "変身(メイクアップ)！セーラー戦士",
    "Henshin (Meikuappu)! Seeraa Senshi",
    "Make Up! Sailor Guardians"
   ],
   "12": [
    "ウラヌス、そして、ネプチューン",
    "Uranusu, Soshite, Nepuchuun",
    "Uranus, and Then, Neptune"
   ],
   "13": [
    "The Pretty Soldiers' Big War!",
    "The Pretty Soldiers' Big War!",
    "The Pretty Soldiers' Big War!"
   ],
   "14": [
    "愛の奇跡",
    "Ai no Kiseki",
    "The Miracle of Love"
   ],
   "15": [
    "来週も見てネ！",
    "Raishuu mo Mite ne!",
    "See You Next Week!"
   ]
  },
  "l": {
   "1": 120.974,
   "2": 13.01,
   "3": 251.821,
   "4": 196.99,
   "5": 146.208,
   "6": 302.63,
   "7": 281.052,
   "8": 15.152,
   "9": 192.576,
   "10": 282.62,
   "11": 271.387,
   "12": 341.813,
   "13": 263.838,
   "14": 127.139,
   "15": 32.889
  },
  "s": {
   "1": [
    [
     0.0,
     78.7,
     null,
     0
    ],
    [
     78.7,
     42.3,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     137.9,
     null,
     0
    ],
    [
     137.9,
     113.9,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     93.7,
     null,
     0
    ],
    [
     93.7,
     103.3,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     89.8,
     null,
     0
    ],
    [
     89.8,
     56.4,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     76.4,
     null,
     0
    ],
    [
     76.4,
     129.6,
     "silence",
     0
    ],
    [
     206.0,
     96.6,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     49.5,
     null,
     0
    ],
    [
     49.5,
     114.5,
     "silence",
     0
    ],
    [
     164.0,
     117.1,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     101.3,
     null,
     0
    ],
    [
     101.3,
     91.3,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     180.0,
     null,
     0
    ],
    [
     180.0,
     102.6,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     105.1,
     null,
     0
    ],
    [
     105.1,
     129.3,
     "silence",
     0
    ],
    [
     234.4,
     37.0,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     98.8,
     null,
     0
    ],
    [
     98.8,
     38.7,
     "silence",
     0
    ],
    [
     137.5,
     111.2,
     "silence",
     0
    ],
    [
     248.7,
     93.2,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     98.7,
     null,
     0
    ],
    [
     98.7,
     110.1,
     "silence",
     0
    ],
    [
     208.8,
     55.0,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     35.0,
     null,
     0
    ],
    [
     35.0,
     92.1,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "1": {
    "2": "4-18"
   },
   "2": {
    "1": "4-3"
   },
   "3": {
    "2": "4-4-2"
   },
   "4": {
    "1": "4-6-1",
    "2": "4-20-2"
   },
   "5": {
    "1": "4-5-3",
    "2": "4-5-2"
   },
   "6": {
    "1": "4-4-1",
    "3": "4-4-4"
   },
   "7": {
    "1": "4-7-1",
    "2": "4-9-2",
    "3": "4-7-2"
   },
   "8": {
    "1": "4-17"
   },
   "9": {
    "1": "4-14-3",
    "2": "4-8-2"
   },
   "11": {
    "1": "4-8-3",
    "2": "4-12-2",
    "3": "4-12-1"
   },
   "12": {
    "1": "4-10-1",
    "2": "4-10-2",
    "3": "4-14-2",
    "4": "4-10-3"
   },
   "13": {
    "1": "4-6-2",
    "3": "4-12-3"
   },
   "14": {
    "1": "4-13-2",
    "2": "4-21-3"
   },
   "15": {
    "1": "4-23-1"
   }
  }
 },
 "SM": {
  "n": [
   "'95正月劇場用アニメーション「美少女戦士セーラームーンS」ミュージックコレクション",
   "Sailor Moon S Movie Music Collection"
  ],
  "cat": "FMCC-5050",
  "v": 28236,
  "img": "images/album-covers/sailor-moon-s-movie-music-collection.jpg",
  "card": "images/tray-cards/s-movie-music-collection.jpg",
  "t": {
   "1": [
    "邪悪",
    "Jaaku",
    "Evil"
   ],
   "2": [
    "ルナ",
    "Runa",
    "Luna"
   ],
   "3": [
    "翔",
    "Kakeru",
    "Kakeru"
   ],
   "4": [
    "うさぎ",
    "Usagi",
    "Usagi"
   ],
   "5": [
    "胸騒ぎ",
    "Munasawagi",
    "Uneasy Feeling"
   ],
   "6": [
    "スノーダンサー襲来",
    "Sunoo Dansaa Shuurai",
    "The Snow Dancers Attack"
   ],
   "7": [
    "変身",
    "Henshin",
    "Transformation"
   ],
   "8": [
    "戦闘",
    "Sentou",
    "Battle"
   ],
   "9": [
    "愛と友情の力",
    "Ai to Yuujou no Chikara",
    "The Power of Love and Friendship"
   ],
   "10": [
    "愛のメッセージ",
    "Ai no Messeeji",
    "Message of Love"
   ],
   "11": [
    "Moonlight Destiny",
    "Moonlight Destiny",
    "Moonlight Destiny"
   ],
   "12": [
    "セーラーチームのテーマ",
    "Seeraa Chiimu no Teema",
    "Sailor Team's Theme"
   ]
  },
  "l": {
   "1": 131.136,
   "2": 212.089,
   "3": 212.377,
   "4": 166.95,
   "5": 221.154,
   "6": 365.846,
   "7": 112.615,
   "8": 201.353,
   "9": 162.221,
   "10": 211.279,
   "11": 357.461,
   "12": 233.98
  },
  "s": {
   "1": [
    [
     0.0,
     49.1,
     null,
     0
    ],
    [
     49.1,
     82.0,
     "silence",
     0
    ]
   ],
   "2": [
    [
     0.0,
     28.3,
     null,
     0
    ],
    [
     28.3,
     27.7,
     "silence",
     0
    ],
    [
     56.0,
     18.5,
     "silence",
     0
    ],
    [
     74.5,
     55.5,
     "silence",
     0
    ],
    [
     130.0,
     40.8,
     "silence",
     0
    ],
    [
     170.8,
     9.1,
     "silence",
     0
    ],
    [
     179.9,
     32.2,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     52.4,
     null,
     0
    ],
    [
     52.4,
     44.2,
     "silence",
     0
    ],
    [
     96.6,
     42.7,
     "silence",
     0
    ],
    [
     139.3,
     73.1,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     44.6,
     null,
     0
    ],
    [
     44.6,
     33.0,
     "silence",
     0
    ],
    [
     77.6,
     21.4,
     "silence",
     0
    ],
    [
     99.0,
     67.9,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     55.2,
     null,
     0
    ],
    [
     55.2,
     70.6,
     "silence",
     0
    ],
    [
     125.8,
     46.0,
     "silence",
     0
    ],
    [
     171.8,
     49.4,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     55.7,
     null,
     0
    ],
    [
     55.7,
     38.8,
     "silence",
     0
    ],
    [
     94.5,
     32.0,
     "silence",
     0
    ],
    [
     126.5,
     20.0,
     "silence",
     0
    ],
    [
     146.5,
     22.2,
     "silence",
     0
    ],
    [
     168.7,
     31.4,
     "silence",
     0
    ],
    [
     200.1,
     67.4,
     "silence",
     0
    ],
    [
     267.5,
     53.5,
     "silence",
     0
    ],
    [
     321.0,
     44.8,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     89.0,
     null,
     0
    ],
    [
     89.0,
     23.6,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     67.0,
     null,
     0
    ],
    [
     67.0,
     49.8,
     "silence",
     0
    ],
    [
     116.8,
     39.0,
     "silence",
     0
    ],
    [
     155.8,
     45.6,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     152.2,
     null,
     0
    ],
    [
     152.2,
     59.1,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "1": {
    "1": "9-1-1",
    "2": "9-13-2"
   },
   "2": {
    "1": "9-5-2",
    "2": "9-10-2",
    "3": "9-11-2",
    "4": "9-12-2",
    "5": "9-13-3",
    "6": "9-10-1",
    "7": "9-10-3"
   },
   "3": {
    "1": "9-4-1",
    "2": "9-5-1",
    "3": "9-11-1",
    "4": "9-12-1"
   },
   "4": {
    "1": "9-3-1",
    "2": "9-4-2",
    "3": "9-8-1",
    "4": "9-15-1"
   },
   "5": {
    "1": "9-1-2",
    "2": "9-4-3",
    "3": "9-11-3",
    "4": "9-3-2"
   },
   "6": {
    "1": "9-6-1",
    "2": "9-6-2",
    "3": "9-8-3",
    "4": "9-8-4",
    "5": "9-7-2",
    "6": "9-7-3",
    "8": "9-13-1",
    "9": "9-14-1"
   },
   "7": {
    "1": "9-7-1",
    "2": "9-8-2"
   },
   "8": {
    "1": "9-14-2",
    "2": "9-14-3",
    "3": "9-14-4",
    "4": "9-15-2"
   },
   "9": {
    "1": "9-16"
   },
   "10": {
    "1": "9-17-1",
    "2": "9-17-2"
   },
   "12": {
    "1": "9-20"
   }
  }
 },
 "SS": {
  "n": [
   "美少女戦士セーラームーンSuperS -音楽集-",
   "Sailor Moon SuperS Music Collection"
  ],
  "cat": "COCC-12836",
  "v": 26881,
  "img": "images/album-covers/sailor-moon-supers-music-collection.jpg",
  "card": "images/tray-cards/supers-music-collection.jpg",
  "t": {
   "1": [
    "オープニング「ムーンライト伝説」",
    "Oopuningu \"Muunraito Densetsu\"",
    "Opening: Moonlight Legend"
   ],
   "2": [
    "サブタイトル",
    "Sabutaitoru",
    "Subtitle"
   ],
   "3": [
    "夢で見た水晶の森",
    "Yume de Mita Suishou no Mori",
    "The Crystal Forest I Saw in a Dream"
   ],
   "4": [
    "セーラー戦士の優雅な放課後",
    "Seeraa Senshi no Yuuga na Houkago",
    "The Sailor Guardians' Elegant After-School"
   ],
   "5": [
    "大人達の憂鬱",
    "Otona-tachi no Yuuutsu",
    "The Grown-Ups' Melancholy"
   ],
   "6": [
    "怪人達のサーカス団",
    "Kaijin-tachi no Saakasu-dan",
    "The Monsters' Circus Troupe"
   ],
   "7": [
    "アマゾンBAR",
    "Amazon BAR",
    "Amazon Bar"
   ],
   "8": [
    "ちびうさのロマンス",
    "Chibiusa no Romansu",
    "Chibi-Usa's Romance"
   ],
   "9": [
    "アイキャッチ",
    "Aikyatchi",
    "Eyecatch"
   ],
   "10": [
    "アマゾントリオの罠",
    "Amazon Torio no Wana",
    "Amazon Trio's Trap"
   ],
   "11": [
    "美しい夢の鏡",
    "Utsukushii Yume no Kagami",
    "The Beautiful Dream Mirror"
   ],
   "12": [
    "セーラー戦士新たなる飛翔",
    "Seeraa Senshi Aratanaru Hishou",
    "A New Flight for the Sailor Guardians"
   ],
   "13": [
    "ダブル変身！ムーン＆ちびムーン",
    "Daburu Henshin! Muun & Chibi Muun",
    "Double Transformation! Moon & Chibi Moon"
   ],
   "14": [
    "ムーンゴージャスメディテイション！",
    "Muun Goojasu Meditishon!",
    "Moon Gorgeous Meditation!"
   ],
   "15": [
    "いつか、そんな“私たち”になりたい",
    "Itsuka, Sonna \"Watashi-tachi\" ni Naritai",
    "Someday, I Want Us to Be Like That"
   ],
   "16": [
    "それじゃあ、また来週ネ",
    "Sore jaa, Mata Raishuu ne",
    "Well Then, See You Next Week"
   ],
   "17": [
    "エンディング「“らしく”いきましょ」",
    "Endingu \"'Rashiku' Ikimasho\"",
    "Ending: Let's Be True to Ourselves"
   ]
  },
  "l": {
   "1": 174.29,
   "2": 12.279,
   "3": 279.642,
   "4": 339.671,
   "5": 253.284,
   "6": 314.986,
   "7": 212.272,
   "8": 186.777,
   "9": 14.76,
   "10": 291.763,
   "11": 277.578,
   "12": 327.185,
   "13": 144.981,
   "14": 198.218,
   "15": 228.677,
   "16": 33.438,
   "17": 212.35
  },
  "s": {
   "3": [
    [
     0.0,
     100.2,
     null,
     0
    ],
    [
     100.2,
     83.6,
     "silence",
     0
    ],
    [
     183.8,
     95.8,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     77.5,
     null,
     0
    ],
    [
     77.5,
     101.8,
     "silence",
     0
    ],
    [
     179.3,
     99.1,
     "silence",
     0
    ],
    [
     278.4,
     61.3,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     94.1,
     null,
     0
    ],
    [
     94.1,
     77.4,
     "silence",
     0
    ],
    [
     171.5,
     81.8,
     "silence",
     0
    ]
   ],
   "6": [
    [
     0.0,
     135.3,
     null,
     0
    ],
    [
     135.3,
     92.4,
     "silence",
     0
    ],
    [
     227.7,
     87.3,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     121.6,
     null,
     0
    ],
    [
     121.6,
     90.7,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     24.6,
     null,
     0
    ],
    [
     24.6,
     58.8,
     "silence",
     0
    ],
    [
     83.4,
     103.4,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     99.8,
     null,
     0
    ],
    [
     99.8,
     77.5,
     "silence",
     0
    ],
    [
     177.3,
     114.5,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     23.7,
     null,
     0
    ],
    [
     23.7,
     26.9,
     "silence",
     0
    ],
    [
     50.6,
     25.0,
     "silence",
     0
    ],
    [
     75.6,
     85.0,
     "silence",
     0
    ],
    [
     160.6,
     117.0,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     104.8,
     null,
     0
    ],
    [
     104.8,
     83.6,
     "silence",
     0
    ],
    [
     188.4,
     22.8,
     "silence",
     0
    ],
    [
     211.2,
     28.7,
     "silence",
     0
    ],
    [
     239.9,
     28.3,
     "silence",
     0
    ],
    [
     268.2,
     28.8,
     "silence",
     0
    ],
    [
     297.0,
     30.2,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     33.2,
     null,
     0
    ],
    [
     33.2,
     111.8,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     26.5,
     null,
     0
    ],
    [
     26.5,
     123.6,
     "silence",
     0
    ],
    [
     150.1,
     48.1,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     108.4,
     null,
     0
    ],
    [
     108.4,
     120.3,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "2": {
    "1": "5-3"
   },
   "3": {
    "1": "5-1-1",
    "2": "5-1-2",
    "3": "5-13-1"
   },
   "4": {
    "1": "5-5-1",
    "2": "5-5-2",
    "4": "5-19-2"
   },
   "5": {
    "1": "5-9-1",
    "2": "5-21-4",
    "3": "5-5-3"
   },
   "6": {
    "1": "5-6-1",
    "2": "5-6-2",
    "3": "5-20-2"
   },
   "7": {
    "1": "5-7-2",
    "2": "5-20-1"
   },
   "8": {
    "1": "5-9-3",
    "2": "5-18-1",
    "3": "5-4-1"
   },
   "9": {
    "1": "5-17-1"
   },
   "10": {
    "1": "5-8-1",
    "2": "5-8-2",
    "3": "5-8-3"
   },
   "11": {
    "1": "5-21-3",
    "2": "5-10-1",
    "3": "5-10-2",
    "4": "5-11-2",
    "5": "5-11-3"
   },
   "12": {
    "2": "5-21-5",
    "3": "5-21-2"
   },
   "13": {
    "1": "5-14-1",
    "2": "5-22-2"
   },
   "14": {
    "1": "5-14-2",
    "2": "5-22-1",
    "3": "5-14-3"
   },
   "15": {
    "1": "5-15",
    "2": "5-22-3"
   },
   "16": {
    "1": "5-23-1"
   }
  }
 },
 "SSM": {
  "n": [
   "'96正月劇場アニメーション 美少女戦士セーラームーンSupers ミュージックコレクション",
   "Sailor Moon SuperS Movie Music Collection"
  ],
  "cat": "COCC-13061",
  "v": 28516,
  "img": "images/album-covers/sailor-moon-supers-movie-music-collection.jpg",
  "card": "images/tray-cards/supers-movie-music-collection.jpg",
  "t": {
   "1": [
    "ムーンライト伝説",
    "Muunraito Densetsu",
    "Moonlight Legend"
   ],
   "2": [
    "亜美ちゃんの朝",
    "Ami-chan no Asa",
    "Ami-chan's Morning"
   ],
   "3": [
    "可愛い企み",
    "Kawaii Takurami",
    "Cute Scheme"
   ],
   "4": [
    "恐怖、危機、マーキュリー登場",
    "Kyoufu, Kiki, Maakyurii Toujou",
    "Terror, Crisis, Mercury Appears"
   ],
   "5": [
    "終曲",
    "Shuukyoku",
    "Finale"
   ],
   "6": [
    "“らしく”いきましょ",
    "\"Rashiku\" Ikimasho",
    "Let's Be True to Ourselves"
   ],
   "7": [
    "ふれあい～ペルルのテーマ～",
    "Fureai ~Peruru no Teema~",
    "Connection ~Perle's Theme~"
   ],
   "8": [
    "ププランの笛と子供達",
    "Pupuran no Fue to Kodomo-tachi",
    "Poupelin's Flute and the Children"
   ],
   "9": [
    "ボンボンベイビーの攻撃!!",
    "Bonbon Beibii no Kougeki!!",
    "The Bonbon Babies Attack!!"
   ],
   "10": [
    "変身と技",
    "Henshin to Waza",
    "Transformations and Attacks"
   ],
   "11": [
    "城",
    "Shiro",
    "The Castle"
   ],
   "12": [
    "バディヤーヌとブラック・ドリーム・ホール",
    "Badiyaanu to Burakku Doriimu Hooru",
    "Badiane and the Black Dream Hole"
   ],
   "13": [
    "命をかけて",
    "Inochi wo Kakete",
    "Risking Our Lives"
   ],
   "14": [
    "愛の光",
    "Ai no Hikari",
    "Love's Light"
   ],
   "15": [
    "家に帰ろう",
    "Uchi ni Kaerou",
    "Let's Go Home"
   ],
   "16": [
    "Morning Moonで会いましょう",
    "Morning Moon de Aimashou",
    "Let's Meet at Morning Moon"
   ]
  },
  "l": {
   "1": 175.074,
   "2": 86.728,
   "3": 73.405,
   "4": 285.964,
   "5": 88.556,
   "6": 214.545,
   "7": 111.257,
   "8": 145.738,
   "9": 56.295,
   "10": 170.137,
   "11": 73.98,
   "12": 168.491,
   "13": 140.279,
   "14": 225.96,
   "15": 111.753,
   "16": 269.297
  },
  "s": {
   "3": [
    [
     0.0,
     23.7,
     null,
     0
    ],
    [
     23.7,
     16.2,
     "silence",
     0
    ],
    [
     39.9,
     33.5,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     71.8,
     null,
     0
    ],
    [
     71.8,
     50.0,
     "silence",
     0
    ],
    [
     121.8,
     45.0,
     "silence",
     0
    ],
    [
     166.8,
     53.2,
     "silence",
     0
    ],
    [
     220.0,
     21.5,
     "silence",
     0
    ],
    [
     241.5,
     44.5,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     45.3,
     null,
     0
    ],
    [
     45.3,
     43.3,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     84.7,
     null,
     0
    ],
    [
     84.7,
     26.6,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     9.5,
     null,
     0
    ],
    [
     9.5,
     39.2,
     "silence",
     0
    ],
    [
     48.7,
     33.4,
     "silence",
     0
    ],
    [
     82.1,
     88.0,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     52.6,
     null,
     0
    ],
    [
     52.6,
     115.9,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     177.2,
     null,
     0
    ],
    [
     177.2,
     48.8,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     51.2,
     null,
     0
    ],
    [
     51.2,
     60.6,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "2": {
    "1": "10-21"
   },
   "3": {
    "1": "10-23-1",
    "2": "10-23-2",
    "3": "10-23-3"
   },
   "4": {
    "1": "10-22-3",
    "2": "10-24-1",
    "3": "10-24-2",
    "4": "10-24-3",
    "5": "10-25-3",
    "6": "10-26-2"
   },
   "5": {
    "1": "10-27-1",
    "2": "10-27-2"
   },
   "7": {
    "1": "10-4-1",
    "2": "10-4-3"
   },
   "8": {
    "1": "10-1-1"
   },
   "9": {
    "1": "10-6-2"
   },
   "10": {
    "1": "10-7-1",
    "2": "10-7-2",
    "3": "10-7-4",
    "4": "10-13"
   },
   "11": {
    "1": "10-14-2"
   },
   "12": {
    "1": "10-11",
    "2": "10-14-3"
   },
   "13": {
    "1": "10-15"
   },
   "14": {
    "1": "10-18-1",
    "2": "10-18-2"
   },
   "15": {
    "1": "10-19-1",
    "2": "10-19-2"
   },
   "16": {
    "1": "10-31"
   }
  }
 },
 "ST1": {
  "n": [
   "美少女戦士セーラームーン SAILORSTARS Music Collection",
   "Sailor Moon Sailor Stars Music Collection 1"
  ],
  "cat": "COCC-13576",
  "v": 26835,
  "img": "images/album-covers/sailor-moon-sailor-stars-music-collection-1.jpg",
  "card": "images/tray-cards/sailor-stars-music-collection-1.jpg",
  "t": {
   "1": [
    "エターナルセーラームーン",
    "Etaanaru Seeraa Muun",
    "Eternal Sailor Moon"
   ],
   "2": [
    "セーラースターソング",
    "Seeraa Sutaa Songu",
    "Sailor Star Song"
   ],
   "3": [
    "サブタイトル",
    "Sabutaitoru",
    "Subtitle"
   ],
   "4": [
    "5人は高校生",
    "5-nin wa Koukousei",
    "The Five Are High School Students"
   ],
   "5": [
    "ネヘレニア復活",
    "Neherenia Fukkatsu",
    "Nehelenia's Resurrection"
   ],
   "6": [
    "ほたるの予言",
    "Hotaru no Yogen",
    "Hotaru's Prophecy"
   ],
   "7": [
    "アイキャッチ",
    "Aikyatchi",
    "Eyecatch"
   ],
   "8": [
    "ミラーパレドリー",
    "Miraa Paredorii",
    "Mirror Paredri"
   ],
   "9": [
    "とらわれのセーラー戦士",
    "Toraware no Seeraa Senshi",
    "Captured Sailor Guardians"
   ],
   "10": [
    "プリンセスのために……",
    "Purinsesu no Tame ni......",
    "For the Princess......"
   ],
   "11": [
    "エターナルの愛",
    "Etaanaru no Ai",
    "Eternal Love"
   ],
   "12": [
    "スリーライツ",
    "Surii Raitsu",
    "Three Lights"
   ],
   "13": [
    "シャドウギャラクティカ",
    "Shadou Gyarakutika",
    "Shadow Galactica"
   ],
   "14": [
    "ムーンエターナルメイクアップ！",
    "Muun Etaanaru Meikuappu!",
    "Moon Eternal Make Up!"
   ],
   "15": [
    "セーラースターライツ出現",
    "Seeraa Sutaa Raitsu Shutsugen",
    "The Sailor Star Lights Appear"
   ],
   "16": [
    "風も空もきっと…",
    "Kaze mo Sora mo Kitto...",
    "Surely the Wind and the Sky..."
   ],
   "17": [
    "月の光は愛のメッセージ",
    "Tsuki no Hikari wa Ai no Messeeji",
    "Moonlight Is a Message of Love"
   ]
  },
  "l": {
   "1": 110.159,
   "2": 232.177,
   "3": 10.502,
   "4": 319.348,
   "5": 260.546,
   "6": 101.931,
   "7": 12.697,
   "8": 298.241,
   "9": 311.041,
   "10": 224.602,
   "11": 200.621,
   "12": 232.465,
   "13": 237.95,
   "14": 116.742,
   "15": 67.841,
   "16": 284.527,
   "17": 30.878
  },
  "s": {
   "4": [
    [
     0.0,
     81.6,
     null,
     0
    ],
    [
     81.6,
     119.2,
     "silence",
     0
    ],
    [
     200.8,
     118.5,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     95.4,
     null,
     0
    ],
    [
     95.4,
     94.7,
     "silence",
     0
    ],
    [
     190.1,
     70.4,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     104.9,
     null,
     0
    ],
    [
     104.9,
     75.9,
     "silence",
     0
    ],
    [
     180.8,
     52.6,
     "silence",
     0
    ],
    [
     233.4,
     64.8,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     120.2,
     null,
     0
    ],
    [
     120.2,
     91.1,
     "silence",
     0
    ],
    [
     211.3,
     99.7,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     129.6,
     null,
     0
    ],
    [
     129.6,
     95.0,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     68.2,
     null,
     0
    ],
    [
     68.2,
     132.4,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     90.2,
     null,
     0
    ],
    [
     90.2,
     63.9,
     "silence",
     0
    ],
    [
     154.1,
     83.8,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     38.3,
     null,
     0
    ],
    [
     38.3,
     29.1,
     "silence",
     0
    ],
    [
     67.4,
     12.5,
     "silence",
     0
    ],
    [
     79.9,
     28.4,
     "silence",
     0
    ],
    [
     108.3,
     8.4,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "3": {
    "1": "6-3"
   },
   "4": {
    "1": "6-4-1",
    "2": "6-4-2",
    "3": "6-4-3"
   },
   "5": {
    "1": "6-5-1",
    "2": "6-5-2",
    "3": "6-5-3"
   },
   "6": {
    "1": "6-6"
   },
   "7": {
    "1": "7-9"
   },
   "8": {
    "1": "6-7-1",
    "2": "6-7-2",
    "3": "6-7-3",
    "4": "6-7-4"
   },
   "9": {
    "1": "6-8-1",
    "2": "6-8-2",
    "3": "6-8-3"
   },
   "10": {
    "1": "6-9-1",
    "2": "6-9-2"
   },
   "11": {
    "1": "6-10-1",
    "2": "6-10-2"
   },
   "12": {
    "1": "6-15"
   },
   "13": {
    "1": "6-13-1",
    "2": "6-13-2",
    "3": "6-13-3"
   },
   "14": {
    "1": "7-17-1",
    "2": "7-17-3",
    "3": "7-17-4",
    "4": "7-17-5"
   },
   "15": {
    "1": "7-14"
   },
   "17": {
    "1": "6-11-1"
   }
  }
 },
 "ST2": {
  "n": [
   "美少女戦士セーラームーン セーラースターズ ミュージックコレクション Vol.②",
   "Sailor Moon Sailor Stars Music Collection 2"
  ],
  "cat": "COCC-13660",
  "v": 26836,
  "img": "images/album-covers/sailor-moon-sailor-stars-music-collection-2.jpg",
  "card": "images/tray-cards/sailor-stars-music-collection-2.jpg",
  "t": {
   "1": [
    "衛との別れ、そして……",
    "Mamoru to no Wakare, Soshite......",
    "Parting with Mamoru, and Then......"
   ],
   "2": [
    "ボクたちの歌をきいて",
    "Boku-tachi no Uta wo Kiite",
    "Listen to Our Song"
   ],
   "3": [
    "あの方はどこに……",
    "Ano Kata wa Doko ni......",
    "Where Is That Person......"
   ],
   "4": [
    "星野、大気、夜天",
    "Seiya, Taiki, Yaten",
    "Seiya, Taiki, Yaten"
   ],
   "5": [
    "ギターソロ・コレクション",
    "Gitaa Soro Korekushon",
    "Guitar Solo Collection"
   ],
   "6": [
    "学園のアイドル",
    "Gakuen no Aidoru",
    "School Idol"
   ],
   "7": [
    "美奈子の野望♡",
    "Minako no Yabou♡",
    "Minako's Ambition♡"
   ],
   "8": [
    "銀河テレビでの策略",
    "Ginga Terebi de no Sakuryaku",
    "Scheme at Galaxy TV"
   ],
   "9": [
    "スターシードをいただくわ",
    "Sutaa Shiido wo Itadaku wa",
    "I'll Take the Star Seed"
   ],
   "10": [
    "襲い来るファージ",
    "Osoikuru Faaji",
    "The Phage Attacks"
   ],
   "11": [
    "スターパワーメイクアップ！",
    "Sutaa Pawaa Meikuappu!",
    "Star Power Make Up!"
   ],
   "12": [
    "華麗なるエターナルセーラームーン",
    "Kareinaru Etaanaru Seeraa Muun",
    "Magnificent Eternal Sailor Moon"
   ],
   "13": [
    "究極の悪",
    "Kyuukyoku no Aku",
    "Ultimate Evil"
   ],
   "14": [
    "決意",
    "Ketsui",
    "Resolve"
   ],
   "15": [
    "究極の愛",
    "Kyuukyoku no Ai",
    "Ultimate Love"
   ],
   "16": [
    "平和",
    "Heiwa",
    "Peace"
   ],
   "17": [
    "今日からまたフツーの高校生",
    "Kyou kara Mata Futsuu no Koukousei",
    "Ordinary High School Students Again from Today"
   ],
   "18": [
    "スターパワーメイクアップ音楽 ～コーラスなし～",
    "Sutaa Pawaa Meikuappu Ongaku ~Koorasu Nashi~",
    "Star Power Make Up Music ~Without Chorus~"
   ],
   "19": [
    "ムーンエターナルメイクアップ音楽 ～コーラスなし～",
    "Muun Etaanaru Meikuappu Ongaku ~Koorasu Nashi~",
    "Moon Eternal Make Up Music ~Without Chorus~"
   ],
   "20": [
    "エターナルセーラームーン・アクション音楽 ～コーラスなし～",
    "Etaanaru Seeraa Muun Akushon Ongaku ~Koorasu Nashi~",
    "Eternal Sailor Moon Action Music ~Without Chorus~"
   ],
   "21": [
    "予告編音楽～15秒ヴァージョン～",
    "Yokokuhen Ongaku ~15-byou Vaajon~",
    "Preview Music ~15-Second Version~"
   ]
  },
  "l": {
   "1": 248.896,
   "2": 232.047,
   "3": 215.015,
   "4": 231.55,
   "5": 229.696,
   "6": 71.446,
   "7": 120.504,
   "8": 140.67,
   "9": 144.145,
   "10": 178.992,
   "11": 117.97,
   "12": 173.977,
   "13": 74.032,
   "14": 77.532,
   "15": 144.981,
   "16": 125.415,
   "17": 76.801,
   "18": 118.127,
   "19": 40.412,
   "20": 122.959,
   "21": 17.111
  },
  "s": {
   "1": [
    [
     0.0,
     128.7,
     null,
     0
    ],
    [
     128.7,
     26.3,
     "silence",
     0
    ],
    [
     155.0,
     93.9,
     "silence",
     0
    ]
   ],
   "3": [
    [
     0.0,
     68.5,
     null,
     0
    ],
    [
     68.5,
     67.9,
     "silence",
     0
    ],
    [
     136.4,
     78.6,
     "silence",
     0
    ]
   ],
   "4": [
    [
     0.0,
     76.7,
     null,
     0
    ],
    [
     76.7,
     69.0,
     "silence",
     0
    ],
    [
     145.7,
     85.9,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     75.7,
     null,
     0
    ],
    [
     75.7,
     68.5,
     "silence",
     0
    ],
    [
     144.2,
     85.5,
     "silence",
     0
    ]
   ],
   "7": [
    [
     0.0,
     79.4,
     null,
     0
    ],
    [
     79.4,
     21.3,
     "silence",
     0
    ],
    [
     100.7,
     19.8,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     76.5,
     null,
     0
    ],
    [
     76.5,
     64.2,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     20.3,
     null,
     0
    ],
    [
     20.3,
     123.8,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     75.0,
     null,
     0
    ],
    [
     75.0,
     78.8,
     "silence",
     0
    ],
    [
     153.8,
     25.2,
     "silence",
     0
    ]
   ],
   "12": [
    [
     0.0,
     13.9,
     null,
     0
    ],
    [
     13.9,
     121.8,
     "silence",
     0
    ],
    [
     135.7,
     38.3,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     38.4,
     null,
     0
    ],
    [
     38.4,
     106.6,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "1": {
    "1": "6-12-1",
    "2": "6-12-2",
    "3": "7-7"
   },
   "2": {
    "1": "6-15"
   },
   "3": {
    "1": "7-2-1",
    "2": "7-2-2",
    "3": "7-2-3"
   },
   "4": {
    "1": "7-3-1",
    "2": "7-3-2",
    "3": "7-3-3"
   },
   "6": {
    "1": "7-4"
   },
   "7": {
    "1": "7-5-1",
    "2": "7-5-2",
    "3": "7-5-3"
   },
   "8": {
    "1": "7-10-1",
    "2": "7-10-2"
   },
   "9": {
    "1": "7-11-1",
    "2": "7-11-2"
   },
   "10": {
    "1": "7-12-1",
    "2": "7-12-2",
    "3": "7-12-3"
   },
   "12": {
    "2": "7-17-2",
    "3": "7-17-6"
   },
   "13": {
    "1": "7-20"
   },
   "14": {
    "1": "7-21"
   },
   "15": {
    "1": "7-22-1",
    "2": "7-22-2"
   },
   "16": {
    "1": "7-23"
   },
   "17": {
    "1": "6-11-3"
   },
   "21": {
    "1": "6-11-2"
   }
  }
 },
 "EX": {
  "n": [
   "美少女戦士セーラームーン ミュージックコレクション エキストラ・ヴァージョン",
   "Sailor Moon Music Collection Extra Version"
  ],
  "cat": "COCC-13402",
  "v": 28536,
  "img": "images/album-covers/sailor-moon-music-collection-extra-version.jpg",
  "card": "images/tray-cards/music-collection-extra-version.jpg",
  "t": {
   "1": [
    "ムーンライト伝説（TVサイズ）",
    "Muunraito Densetsu (TV Saizu)",
    "Moonlight Legend (TV Size)"
   ],
   "2": [
    "アイキャッチ（コーラスなしヴァージョン）",
    "Aikyatchi (Koorasu Nashi Vaajon)",
    "Eyecatch (Version without Chorus)"
   ],
   "3": [
    "変身",
    "Henshin",
    "Transformation"
   ],
   "4": [
    "感動と決意",
    "Kandou to Ketsui",
    "Emotion and Resolve"
   ],
   "5": [
    "絶望と悪",
    "Zetsubou to Aku",
    "Despair and Evil"
   ],
   "6": [
    "休息",
    "Kyuusoku",
    "Rest"
   ],
   "7": [
    "ファンファーレ その他",
    "Fanfaare Sono Ta",
    "Fanfares and More"
   ],
   "8": [
    "アイキャッチ",
    "Aikyatchi",
    "Eyecatch"
   ],
   "9": [
    "エンディング・アレンジ～明るく元気にそしてロマンティックに～",
    "Endingu Arenji ~Akaruku Genki ni Soshite Romantikku ni~",
    "Ending Arrangement ~Cheerful and Romantic~"
   ],
   "10": [
    "変身と必殺技",
    "Henshin to Hissatsuwaza",
    "Transformations and Special Attacks"
   ],
   "11": [
    "うさぎのテーマ・葛藤・エイルのフルート",
    "Usagi no Teema, Kattou, Eiru no Furuuto",
    "Usagi's Theme · Conflict · Ail's Flute"
   ],
   "12": [
    "強い敵",
    "Tsuyoi Teki",
    "A Strong Enemy"
   ],
   "13": [
    "オープニング・アレンジ～感動的そして不安な～",
    "Oopuningu Arenji ~Kandouteki Soshite Fuan na~",
    "Opening Arrangement ~Moving, Then Uneasy~"
   ],
   "14": [
    "エンディング・アレンジ～ノスタルジックそしてロマンティックに～",
    "Endingu Arenji ~Nosutarujikku Soshite Romantikku ni~",
    "Ending Arrangement ~Nostalgic, Then Romantic~"
   ],
   "15": [
    "必殺技・戦士の宿命・敵の野望",
    "Hissatsuwaza, Senshi no Shukumei, Teki no Yabou",
    "Special Attacks · The Guardians' Fate · The Enemy's Ambition"
   ],
   "16": [
    "やさしい情景",
    "Yasashii Joukei",
    "Gentle Scene"
   ],
   "17": [
    "緊張の情景と行動的なBGM",
    "Kinchou no Joukei to Koudouteki na BGM",
    "Tense Scenes and Action BGM"
   ],
   "18": [
    "みちるとはるか",
    "Michiru to Haruka",
    "Michiru and Haruka"
   ],
   "19": [
    "ブリッジと悲しみ",
    "Burijji to Kanashimi",
    "Bridges and Sorrow"
   ],
   "20": [
    "予告",
    "Yokoku",
    "Preview"
   ],
   "21": [
    "エンディング・アレンジ",
    "Endingu Arenji",
    "Ending Arrangement"
   ],
   "22": [
    "敵とペガサスのテーマ",
    "Teki to Pegasasu no Teema",
    "Enemy and Pegasus Theme"
   ],
   "23": [
    "日常的BGM",
    "Nichijouteki BGM",
    "Everyday BGM"
   ],
   "24": [
    "戦闘的BGM",
    "Sentouteki BGM",
    "Battle BGM"
   ],
   "25": [
    "ピンチ… そして、決意",
    "Pinchi... Soshite, Ketsui",
    "In a Pinch... and Then, Resolve"
   ],
   "26": [
    "タキシード・ミラージュ（TVサイズ）",
    "Takishiido Miraaju (TV Saizu)",
    "Tuxedo Mirage (TV Size)"
   ]
  },
  "l": {
   "1": 85.448,
   "2": 14.159,
   "3": 43.756,
   "4": 113.817,
   "5": 236.853,
   "6": 62.852,
   "7": 88.112,
   "8": 29.049,
   "9": 204.801,
   "10": 125.755,
   "11": 103.864,
   "12": 112.354,
   "13": 173.428,
   "14": 241.738,
   "15": 247.328,
   "16": 322.613,
   "17": 343.355,
   "18": 139.025,
   "19": 139.835,
   "20": 31.4,
   "21": 116.977,
   "22": 195.11,
   "23": 600.504,
   "24": 109.95,
   "25": 79.048,
   "26": 93.415
  },
  "s": {
   "4": [
    [
     0.0,
     57.2,
     null,
     0
    ],
    [
     57.2,
     56.6,
     "silence",
     0
    ]
   ],
   "5": [
    [
     0.0,
     13.3,
     null,
     0
    ],
    [
     13.3,
     58.9,
     "change",
     0
    ],
    [
     72.2,
     21.8,
     "silence",
     0
    ],
    [
     94.0,
     62.6,
     "change",
     0
    ],
    [
     156.6,
     12.6,
     "silence",
     0
    ],
    [
     169.2,
     67.7,
     "change",
     0
    ]
   ],
   "7": [
    [
     0.0,
     17.6,
     null,
     0
    ],
    [
     17.6,
     16.6,
     "silence",
     0
    ],
    [
     34.2,
     14.9,
     "silence",
     0
    ],
    [
     49.1,
     10.2,
     "silence",
     0
    ],
    [
     59.3,
     14.8,
     "silence",
     0
    ],
    [
     74.1,
     14.0,
     "silence",
     0
    ]
   ],
   "8": [
    [
     0.0,
     14.4,
     null,
     0
    ],
    [
     14.4,
     14.6,
     "silence",
     0
    ]
   ],
   "9": [
    [
     0.0,
     92.7,
     null,
     0
    ],
    [
     92.7,
     112.1,
     "silence",
     0
    ]
   ],
   "10": [
    [
     0.0,
     39.9,
     null,
     0
    ],
    [
     39.9,
     85.9,
     "silence",
     0
    ]
   ],
   "11": [
    [
     0.0,
     79.1,
     null,
     0
    ],
    [
     79.1,
     24.8,
     "silence",
     0
    ]
   ],
   "13": [
    [
     0.0,
     107.9,
     null,
     0
    ],
    [
     107.9,
     65.5,
     "silence",
     0
    ]
   ],
   "14": [
    [
     0.0,
     124.6,
     null,
     0
    ],
    [
     124.6,
     117.1,
     "silence",
     0
    ]
   ],
   "15": [
    [
     0.0,
     51.6,
     null,
     0
    ],
    [
     51.6,
     97.0,
     "silence",
     0
    ],
    [
     148.6,
     98.7,
     "silence",
     0
    ]
   ],
   "16": [
    [
     0.0,
     122.2,
     null,
     0
    ],
    [
     122.2,
     107.0,
     "silence",
     0
    ],
    [
     229.2,
     93.4,
     "silence",
     0
    ]
   ],
   "17": [
    [
     0.0,
     91.7,
     null,
     0
    ],
    [
     91.7,
     124.6,
     "silence",
     0
    ],
    [
     216.3,
     127.1,
     "silence",
     0
    ]
   ],
   "18": [
    [
     0.0,
     72.5,
     null,
     0
    ],
    [
     72.5,
     66.5,
     "silence",
     0
    ]
   ],
   "19": [
    [
     0.0,
     14.3,
     null,
     0
    ],
    [
     14.3,
     22.3,
     "silence",
     0
    ],
    [
     36.6,
     103.2,
     "silence",
     0
    ]
   ],
   "20": [
    [
     0.0,
     14.4,
     null,
     0
    ],
    [
     14.4,
     17.0,
     "silence",
     0
    ]
   ],
   "22": [
    [
     0.0,
     89.7,
     null,
     0
    ],
    [
     89.7,
     29.1,
     "silence",
     0
    ],
    [
     118.8,
     76.3,
     "silence",
     0
    ]
   ],
   "23": [
    [
     0.0,
     25.4,
     null,
     0
    ],
    [
     25.4,
     23.1,
     "silence",
     0
    ],
    [
     48.5,
     83.4,
     "silence",
     0
    ],
    [
     131.9,
     22.7,
     "silence",
     0
    ],
    [
     154.6,
     26.4,
     "silence",
     0
    ],
    [
     181.0,
     94.0,
     "silence",
     0
    ],
    [
     275.0,
     85.1,
     "silence",
     0
    ],
    [
     360.1,
     26.5,
     "silence",
     0
    ],
    [
     386.6,
     116.2,
     "silence",
     0
    ],
    [
     502.8,
     23.9,
     "silence",
     0
    ],
    [
     526.7,
     20.9,
     "silence",
     0
    ],
    [
     547.6,
     23.5,
     "silence",
     0
    ],
    [
     571.1,
     29.4,
     "silence",
     0
    ]
   ]
  },
  "q": {
   "1": {
    "1": "1-1"
   },
   "3": {
    "1": "2-12-2"
   },
   "4": {
    "1": "2-14-2",
    "2": "2-22-2"
   },
   "5": {
    "1": "2-16",
    "2": "2-17",
    "3": "2-18",
    "4": "2-19",
    "5": "2-20",
    "6": "2-21"
   },
   "6": {
    "1": "4-19-3"
   },
   "7": {
    "1": "2-4-5",
    "2": "2-24-1",
    "3": "2-4-1",
    "4": "2-4-2",
    "5": "2-4-3",
    "6": "2-4-4"
   },
   "8": {
    "1": "3-8-2",
    "2": "3-11-4"
   },
   "9": {
    "2": "3-13-1"
   },
   "10": {
    "1": "3-15-1",
    "2": "3-15-4"
   },
   "11": {
    "1": "3-14-2"
   },
   "12": {
    "1": "3-6-1"
   },
   "13": {
    "1": "4-11-2",
    "2": "4-11-1"
   },
   "14": {
    "1": "4-15-2",
    "2": "4-15-1"
   },
   "15": {
    "1": "4-21-2",
    "2": "4-14-1",
    "3": "4-8-1"
   },
   "16": {
    "1": "4-19-1",
    "3": "4-19-2"
   },
   "17": {
    "2": "4-1-3",
    "3": "4-14-5"
   },
   "18": {
    "1": "4-5-1",
    "2": "4-5-4"
   },
   "19": {
    "1": "4-21-1",
    "2": "4-13-1",
    "3": "4-20-1"
   },
   "20": {
    "1": "5-17-1",
    "2": "5-23-2"
   },
   "21": {
    "1": "5-19-1"
   },
   "22": {
    "1": "5-6-3",
    "3": "5-18-3"
   },
   "23": {
    "3": "5-21-1",
    "6": "5-12-1",
    "7": "5-11-1",
    "9": "5-7-3",
    "11": "5-9-2"
   },
   "24": {
    "1": "5-11-4"
   },
   "26": {
    "1": "4-22"
   }
  }
 },
 "歌": {
  "n": [
   "美少女戦士セーラームーンシリーズ メモリアル・ソング・ボックス",
   "Sailor Moon Memorial Song Box"
  ],
  "cat": "COCC-14459~64",
  "v": 23044,
  "img": "images/album-covers/sailor-moon-memorial-song-box.jpg",
  "t": {
   "2-10": [
    "Someday...Somebody...",
    "Someday...Somebody...",
    "Someday...Somebody..."
   ],
   "2-11": [
    "永遠のメロディ",
    "Eien no Merodi",
    "Eternal Melody"
   ],
   "2-13": [
    "あなたの夢をみたわ",
    "Anata no Yume wo Mita wa",
    "I Dreamed of You"
   ],
   "2-15": [
    "YOU'RE JUST MY LOVE",
    "YOU'RE JUST MY LOVE",
    "You're Just My Love"
   ],
   "3-6": [
    "STARLIGHTにキスして",
    "STARLIGHT ni Kisu Shite",
    "Kiss the Starlight"
   ],
   "3-9": [
    "Moon Revenge",
    "Moon Revenge",
    "Moon Revenge"
   ]
  }
 }
};
