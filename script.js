/* KMS Mawdu’i – Reference Prototype: application script (extracted from the single-file prototype) */

/* ---------- Data ---------- */

/* Verse records (id, theme, surah, Arabic text, translation, tafsir note, theme-fit check, source) */
const R = [
  {
    "id": "R01",
    "theme": "Sabr",
    "surah": "al-Baqarah",
    "num": 2,
    "verse": "153",
    "ar": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ",
    "en": "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    "note": "Ibn Kathir explains that patience and prayer are the best means of easing the effects of affliction. The verse links endurance with worship and closes with the assurance that Allah is with those who are patient.",
    "fit": "Fits Sabr: the verse names patience (al-sabr) directly and ends with al-sabirin.",
    "src": "Tafsir Ibn Kathir (Abridged), English edition as presented on Quran.com (online); cited by surah:verse, no print page recorded"
  },
  {
    "id": "R02",
    "theme": "Sabr",
    "surah": "Ali 'Imran",
    "num": 3,
    "verse": "200",
    "ar": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱصْبِرُوا۟ وَصَابِرُوا۟ وَرَابِطُوا۟ وَٱتَّقُوا۟ ٱللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
    "en": "O you who have believed, persevere and endure and remain stationed and fear Allah that you may be successful.",
    "note": "Ibn Kathir reports al-Hasan al-Basri's view that the believers are commanded to be patient in Islam, the religion Allah chose for them. Murabatah (remaining stationed) is explained as endurance in acts of worship and perseverance.",
    "fit": "Fits Sabr: the verse commands patience (isbiru) and mutual perseverance (sabiru).",
    "src": "Tafsir Ibn Kathir (Abridged), English edition as presented on Quran.com (online); cited by surah:verse, no print page recorded"
  },
  {
    "id": "R03",
    "theme": "Shukr",
    "surah": "Ibrahim",
    "num": 14,
    "verse": "7",
    "ar": "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ",
    "en": "And [remember] when your Lord proclaimed, 'If you are grateful, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe.'",
    "note": "Ibn Kathir explains the promise as follows: if people appreciate the favour Allah has given them, He will give them more of it. The verse also warns of the consequence of ingratitude.",
    "fit": "Fits Shukr: the verse states the principle of gratitude (shakartum) and its result.",
    "src": "Tafsir Ibn Kathir (Abridged), English edition as presented on Quran.com (online); cited by surah:verse, no print page recorded"
  },
  {
    "id": "R04",
    "theme": "Shukr",
    "surah": "Luqman",
    "num": 31,
    "verse": "12",
    "ar": "وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ ۖ وَمَن كَفَرَ فَإِنَّ اللَّهَ غَنِيٌّ حَمِيدٌ",
    "en": "And We had certainly given Luqman wisdom [and said], \"Be grateful to Allah.\" And whoever is grateful is grateful for [the benefit of] himself. And whoever denies [His favor] - then indeed, Allah is Free of need and Praiseworthy.",
    "note": "Ibn Kathir explains al-hikmah in this verse as understanding, knowledge and eloquence. The verse joins wisdom with the command to give thanks to Allah.",
    "fit": "Fits Shukr: the verse gives the command 'ishkur lillah' and explains who benefits from gratitude.",
    "src": "Tafsir Ibn Kathir (Abridged), English edition as presented on Quran.com (online); cited by surah:verse, no print page recorded"
  },
  {
    "id": "R05",
    "theme": "'Ilm",
    "surah": "Taha",
    "num": 20,
    "verse": "114",
    "ar": "فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۗ وَلَا تَعْجَلْ بِالْقُرْآنِ مِن قَبْلِ أَن يُقْضَىٰ إِلَيْكَ وَحْيُهُ ۖ وَقُل رَّبِّ زِدْنِي عِلْمًا",
    "en": "So high [above all] is Allah, the Sovereign, the Truth. And, [O Muhammad], do not hasten with [recitation of] the Qur'an before its revelation is completed to you, and say, \"My Lord, increase me in knowledge.\"",
    "note": "Ibn Kathir explains the supplication 'My Lord, increase me in knowledge' as a request for more knowledge from Allah, and cites Ibn 'Uyaynah's statement that the Prophet kept increasing in knowledge until Allah took him.",
    "fit": "Fits 'Ilm: the verse contains the supplication to increase in knowledge ('ilman).",
    "src": "Tafsir Ibn Kathir (Abridged), English edition as presented on Quran.com (online); cited by surah:verse, no print page recorded"
  },
  {
    "id": "R06",
    "theme": "'Ilm",
    "surah": "al-Mujadilah",
    "num": 58,
    "verse": "11",
    "ar": "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قِيلَ لَكُمْ تَفَسَّحُوا فِي الْمَجَالِسِ فَافْسَحُوا يَفْسَحِ اللَّهُ لَكُمْ ۖ وَإِذَا قِيلَ انشُزُوا فَانشُزُوا يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ",
    "en": "O you who have believed, when you are told, \"Space yourselves\" in assemblies, then make space; Allah will make space for you. And when you are told, \"Arise,\" then arise; Allah will raise those who have believed among you and those who were given knowledge, by degrees. And Allah is Aware of what you do.",
    "note": "Ibn Kathir relates that the verse teaches manners in gatherings, and that Allah will exalt in degrees those who believe and those who have been granted knowledge.",
    "fit": "Fits 'Ilm: the verse states that Allah raises 'those who were given knowledge' in degrees. Its context (manners of assemblies) is noted in the tafsir.",
    "src": "Tafsir Ibn Kathir (Abridged), English edition as presented on Quran.com (online); cited by surah:verse, no print page recorded"
  }
];

/* Resource Library entries: [title, description, URL, tag] */
const RES = [
  [
    "Quran.com",
    "Online Quran with Arabic text, translations and tafsir, including Ibn Kathir (Abridged). Used to check the six records.",
    "https://quran.com",
    "Quranic text and tafsir"
  ],
  [
    "Quranic Arabic Corpus",
    "Annotated linguistic resource for the Quran with word-by-word grammar and translation.",
    "https://corpus.quran.com",
    "Language study"
  ],
  [
    "Tafsir Ibn Kathir (Abridged) on Quran.com",
    "The tafsir source cited for all six notes in this prototype.",
    "https://quran.com/2/153/tafsirs/en-tafisr-ibn-kathir",
    "Tafsir"
  ],
  [
    "El-Mesawi, M. E.-T. (2005). The methodology of al-tafsir al-mawdu'i: A comparative analysis",
    "Journal article on the methodology of thematic Quranic interpretation. Intellectual Discourse, 13(1), 1-30.",
    "https://journals.iium.edu.my/intdiscourse/index.php/id/article/view/118/98",
    "Academic article"
  ],
  [
    "Alavi & Leidner (2001). Knowledge management and knowledge management systems",
    "Review article on KM processes and the role of IT. MIS Quarterly, 25(1), 107-136.",
    "https://doi.org/10.2307/3250961",
    "Academic article"
  ],
  [
    "Nonaka (1994). A dynamic theory of organizational knowledge creation",
    "Article on tacit and explicit knowledge. Organization Science, 5(1), 14-37.",
    "https://doi.org/10.1287/orsc.5.1.14",
    "Academic article"
  ]
];

/* Themes: [transliterated name, English meaning, short description] */
const THEMES = [
  [
    "Sabr",
    "Patience",
    "Steadfastness in hardship and in obedience."
  ],
  [
    "Shukr",
    "Gratitude",
    "Giving thanks to Allah for His favours."
  ],
  [
    "'Ilm",
    "Knowledge",
    "The value and pursuit of knowledge."
  ]
];

/* Navigation pages: [route key, label] */
const PAGES = [
  [
    "home",
    "Home Page"
  ],
  [
    "themes",
    "Explore Themes"
  ],
  [
    "repo",
    "Quranic Verse Repository"
  ],
  [
    "notes",
    "Tafsir and Knowledge Notes"
  ],
  [
    "lib",
    "Resource Library"
  ],
  [
    "about",
    "About the System"
  ]
];

/* ---------- State & helpers ---------- */

/* Current repository filter: selected theme and keyword query */
let state = { theme: "All", q: "" };

/* Escape &, <, >, " and ' so text is safe to insert as HTML text or inside an attribute value */
const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Components ---------- */

/* Rebuild the navigation bar and highlight the active page */
function nav(p) {
  document.getElementById("nav").innerHTML = PAGES.map(([k, l]) => `<a href="#${k}" class="${k===p?"on":""}" data-page="${k}">${l}</a>`).join("");
}

/* Verse card. full=true shows the tafsir note, source and theme check; otherwise shows an "Open tafsir note" link */
function card(r, full) {
  return `<article class="card" id="rec-${r.id}" data-record="${r.id}"><span class="tag">${esc(r.theme)}</span> <strong>Surah ${esc(r.surah)} (${r.num}:${r.verse})</strong>
<div class="ar" lang="ar" dir="rtl">${r.ar}</div><p>${esc(r.en)}</p><p class="mut">Translation: Sahih International</p>${full?`<h3>Tafsir and knowledge note</h3><p>${esc(r.note)}</p><p class="mut">Source: ${esc(r.src)}</p><p class="mut">Theme check: ${esc(r.fit)}</p>`:`<a href="#notes" data-open="${r.id}">Open tafsir note</a>`}</article>`;
}

/* ---------- Page views (one function per route) ---------- */

const views = {
  home() {
    return `<h2>Welcome</h2><div class="card"><p>KMS Mawdu’i organises selected Quranic knowledge by theme. Choose a theme to read the verse, its translation and a short tafsir note with its source.</p><a class="btn" href="#themes">Explore Themes</a></div>
<div class="grid">${THEMES.map(t=>`<div class="card"><h3>${t[0]} · ${t[1]}</h3><p class="mut">${R.filter(r=>r.theme===t[0]).length} verse records</p></div>`).join("")}</div>`;
  },

  themes() {
    return `<h2>Explore Themes</h2><div class="grid">${THEMES.map(t=>`<div class="card" data-theme-card="${t[0]}"><h3>${t[0]} (${t[1]})</h3><p>${t[2]}</p><p class="mut">${R.filter(r=>r.theme===t[0]).length} records</p><a href="#repo" data-theme="${t[0]}">View verses</a></div>`).join("")}</div>`;
  },

  repo() {
    const th = ["All", ...THEMES.map(t => t[0])];
    const q = state.q.toLowerCase();
    const list = R.filter(r => (state.theme === "All" || r.theme === state.theme) && (!q || (r.en + " " + r.surah + " " + r.theme + " " + r.note).toLowerCase().includes(q)));
    return `<h2>Quranic Verse Repository</h2><div>${th.map(t=>`<button class="t ${state.theme===t?"on":""}" data-filter="${t}">${t}</button>`).join("")}</div>
 <input type="search" id="q" placeholder="Filter by keyword (English translation, surah, theme or note)" value="${esc(state.q)}" aria-label="Filter records"><p class="mut" id="count">${list.length} of ${R.length} records shown</p>${list.map(r=>card(r,false)).join("")||'<p>No records match.</p>'}`;
  },

  notes() {
    return `<h2>Tafsir and Knowledge Notes</h2><p class="mut">Notes summarise Ibn Kathir (Abridged); they are not the group’s own interpretations.</p>${R.map(r=>card(r,true)).join("")}`;
  },

  lib() {
    return `<h2>Resource Library</h2>${RES.map(x=>`<div class="card"><span class="tag">${esc(x[3])}</span> <strong>${esc(x[0])}</strong><p>${esc(x[1])}</p><a href="${x[2]}" target="_blank" rel="noopener">${esc(x[2])}</a></div>`).join("")}`;
  },

  about() {
    return `<h2>About the System</h2><div class="card"><p>KMS Mawdu’i is a prototype Knowledge Management System for SKJ4283 Pengurusan Ilmu (Semester 1, 2026/2027), Universiti Sains Islam Malaysia. It has three themes (Sabr, Shukr, ’Ilm) and six verse records.</p>
<p><strong>KM processes:</strong> Knowledge Capture (records compiled from the Quranic text and Ibn Kathir), Knowledge Storage (structured repository), Knowledge Retrieval (theme navigation and keyword filter), Knowledge Sharing (published pages and resource library).</p>
<p class="mut">Limitations: six records only; the keyword filter matches text in the records and is not a full search engine; notes are concise summaries.</p></div>`;
  }
};

/* ---------- Rendering & events ---------- */

/* Render the page named in the URL hash (falls back to Home) and wire up the keyword filter */
function render() {
  const p = (location.hash || "#home").slice(1);
  const k = views[p] ? p : "home";
  nav(k);
  document.getElementById("app").innerHTML = views[k]();

  const q = document.getElementById("q");
  if (q) {
    q.addEventListener("input", e => {
      state.q = e.target.value;
      const pos = e.target.selectionStart;
      render();
      /* Restore focus and caret position after the re-render */
      const n = document.getElementById("q");
      n.focus();
      n.setSelectionRange(pos, pos);
    });
  }
}

/* Delegated clicks: theme filter buttons (repository) and "View verses" links (themes page) */
document.addEventListener("click", e => {
  const f = e.target.closest("[data-filter]");
  if (f) {
    state.theme = f.dataset.filter;
    render();
    return;
  }
  const t = e.target.closest("[data-theme]");
  if (t) {
    state.theme = t.dataset.theme;
  }
});

/* Re-render on hash navigation, then draw the initial page */
window.addEventListener("hashchange", render);
render();
