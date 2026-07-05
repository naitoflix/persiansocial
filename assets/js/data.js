/* ==========================================================================
   Persian FX — Social Activities · Data
   --------------------------------------------------------------------------
   DATI REALI @iipersian (aggiornati 2026-07-05) + Telegram (2.551,
   dato fornito). Le metriche "insight" private (reach, impression, salvataggi,
   condivisioni, visite profilo, click bio, follower persi) NON sono scrapabili:
   richiedono le Instagram Graph API (account Business/Creator collegato via
   login Meta) → marcate na:true. Collaborazione continuativa · Mese 1 (produzione dal 13 Lug).
   ========================================================================== */

const BRAND = {
  name: "Persian FX",
  tagline: "Social Activities",
  niche: "GOLD · XAUUSD",
  igHandle: "@iipersian",
  igUrl: "https://www.instagram.com/iipersian/",
  igFullName: "Persian | LifeStyle",
  igVerified: true,
  telegramLabel: "Gruppo Telegram gratuito",
  telegramUrl: "https://t.me/+EjGqKLKqfck5ZWI8",
  campaign: "Collaborazione continuativa · Mese 1",
  compliance:
    "Il trading comporta un rischio elevato di perdita del capitale. Contenuto a scopo informativo, non è consulenza finanziaria. Nessun rendimento è garantito.",
};

/* Stati del flusso di produzione (ordine = pipeline) */
const STATUSES = [
  { key: "da-registrare", label: "Da Registrare", color: "#8b5cf6" },
  { key: "in-montaggio", label: "In Montaggio", color: "#a78bfa" },
  { key: "da-revisionare", label: "Da Revisionare", color: "#f59e0b" },
  { key: "programmato", label: "Programmato", color: "#22d3ee" },
  { key: "pubblicato", label: "Pubblicato", color: "#22e39a" },
  { key: "da-analizzare", label: "Da Analizzare", color: "#38bdf8" },
];

const OBJECTIVES = ["Reach", "Authority", "Telegram", "Engagement", "Save", "Trust"];

/* ------------------------------------------------------------------ *
 *  KPI — Dashboard. value=numero reale · na:true=richiede Meta API   *
 * ------------------------------------------------------------------ */
/* dyn:"..." = valore calcolato a runtime sulla finestra ULTIMO MESE
   (ultimi 30 giorni ancorati all'ultimo contenuto reale · vedi app.js). */
const KPIS = [
  { key: "followers", label: "Follower (attuali)", value: 27623, group: "crescita", note: "" },
  { key: "following", label: "Profili seguiti", value: 1820, group: "crescita", note: "" },
  { key: "follow_gain", label: "Follower acquisiti (ultimo mese)", na: true, group: "crescita", note: "richiede Meta API" },
  { key: "follow_lost", label: "Follower persi (ultimo mese)", na: true, group: "crescita", note: "richiede Meta API" },

  { key: "posts", label: "Post totali (storico)", value: 1221, group: "produzione", note: "" },
  { key: "content_month", label: "Contenuti pubblicati (ultimo mese)", dyn: "count", group: "produzione", note: "" },

  { key: "reel_month", label: "Reel pubblicati (ultimo mese)", dyn: "reels", group: "performance", note: "" },
  { key: "reel_views", label: "Views Reel (ultimo mese)", dyn: "views", group: "performance", note: "" },
  { key: "reel_plays", label: "Play Reel (ultimo mese)", dyn: "plays", group: "performance", note: "" },
  { key: "reach", label: "Reach (ultimo mese)", na: true, group: "performance", note: "richiede Meta API" },

  { key: "likes", label: "Like (ultimo mese)", dyn: "likes", group: "engagement", note: "" },
  { key: "comments", label: "Commenti (ultimo mese)", dyn: "comments", group: "engagement", note: "" },
  { key: "saves", label: "Salvataggi (ultimo mese)", na: true, group: "engagement", note: "richiede Meta API" },
  { key: "shares", label: "Condivisioni (ultimo mese)", na: true, group: "engagement", note: "richiede Meta API" },
  { key: "engagement", label: "Engagement medio Reel (ultimo mese)", dyn: "engagement", unit: "%", group: "engagement", note: "interazioni / views" },

  { key: "profile_visits", label: "Profilo visitato (ultimo mese)", na: true, group: "funnel", note: "richiede Meta API" },
  { key: "bio_clicks", label: "Click al Link in Bio (ultimo mese)", na: true, group: "funnel", note: "richiede Meta API" },
  { key: "tg_members", label: "Iscritti Telegram (attuali)", value: 2551, group: "funnel", note: "" },
  { key: "conversion", label: "Conversione IG → Telegram", na: true, group: "funnel", note: "richiede bot / link UTM" },
];

/* Obiettivo del mese: iscritti Telegram (baseline reale 2.551) */
const MONTHLY_GOAL = {
  label: "Iscritti Telegram — obiettivo del mese",
  target: 3500,
  current: 2551,
  sub: "Baseline reale 2.551 · obiettivo del mese in corso",
};

/* Le serie dei grafici sono calcolate a runtime sulla finestra ULTIMO MESE
   a partire da IG_ANALYTICS.published (vedi monthlyStats() in app.js). */

/* ------------------------------------------------------------------ *
 *  CONTENT — piano contenuti GOLD · Mese 1 (produzione dal 13 Lug) *
 *  Non ancora prodotto → tutti "da-registrare", metriche a 0.        *
 * ------------------------------------------------------------------ */
const CONTENT = [
  {
    id: "R1", title: "Analisi giusta, conto in rosso", format: "Reel",
    objective: ["Authority", "Telegram"], date: "2026-07-13", platform: "Instagram",
    status: "da-registrare", angle: "Errore / Psicologia",
    hook: "Analisi giusta. Conto in rosso.",
    cta: "Il piano completo lo condivido nel gruppo gratuito — link in bio.",
    materials: ["Volto in camera", "Screen XAUUSD con zona segnata", "Mani alla tastiera"],
    accent: ["#8b5cf6", "#22d3ee"],
    script: "Avevi ragione sull'oro. E hai perso lo stesso. Il livello era corretto, il trend era corretto, ma sei entrato tardi per paura di perderti il movimento. Il problema non è l'analisi: è che non avevi un piano d'uscita scritto prima di entrare.",
    caption: "L'oro non ti fa perdere. Te lo fa perdere il piano che non hai scritto. Prima di ogni entrata su XAUUSD segna 3 cose: dove entri, dove esci in perdita, dove esci in profitto.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C1", title: "5 controlli prima di entrare su GOLD", format: "Carosello",
    objective: ["Save", "Telegram"], date: "2026-07-15", platform: "Instagram",
    status: "da-registrare", angle: "Checklist",
    hook: "Prima di premere BUY o SELL sull'oro, leggi questo.",
    cta: "Scrivi LINK nei commenti o clicca il LINK in bio — gruppo gratuito.",
    materials: ["7 slide 1080×1350", "Palette scura/oro sobria", "Endcard link in bio"],
    accent: ["#7c3aed", "#3ce0ff"],
    script: "Checklist a 7 slide: 1) Struttura, 2) Zona, 3) News, 4) Rischio, 5) Piano d'uscita. 5 sì = puoi valutare. Anche un solo no = stai fermo.",
    caption: "Salva questa checklist e rileggila prima di ogni entrata su XAUUSD. Cinque domande: struttura, zona, news, rischio, piano d'uscita.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R2", title: "\"L'oro sale con la paura\" — mezza verità", format: "Reel",
    objective: ["Reach", "Authority"], date: "2026-07-17", platform: "Instagram",
    status: "da-registrare", angle: "Mito",
    hook: "\"L'oro = bene rifugio\" è una mezza bugia.",
    cta: "La lettura del contesto settimanale la trovi nel gruppo gratuito — link in bio.",
    materials: ["Split screen grafico/volto", "Grafici DXY + XAUUSD affiancati"],
    accent: ["#8b5cf6", "#22d3ee"],
    script: "L'oro non guarda solo la paura. Guarda il dollaro e i tassi reali. Se il dollaro si rafforza, l'oro può scendere anche in piena crisi. Notizia = benzina, contesto = volante.",
    caption: "\"Compro oro perché c'è crisi\" è il modo più veloce per restare incastrato. L'oro reagisce alla paura nel breve, ma nel contesto pesano dollaro e tassi reali.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C2", title: "7 errori che ti bruciano il conto sull'oro", format: "Carosello",
    objective: ["Reach", "Save"], date: "2026-07-20", platform: "Instagram",
    status: "da-registrare", angle: "Errori",
    hook: "7 errori che ti stanno bruciando il conto sull'oro (il n°4 è il più comune).",
    cta: "Scrivi LINK nei commenti o clicca il LINK in bio.",
    materials: ["9 slide", "Evidenziazioni animate"],
    accent: ["#7c3aed", "#3ce0ff"],
    script: "1) Nessuno stop, 2) Aumentare size dopo la perdita, 3) Operare sulle news, 4) Spostare lo stop, 5) Chiudere presto i profitti, 6) Copiare senza capire, 7) Non tenere uno storico.",
    caption: "L'oro non brucia i conti. Li bruciano questi 7 errori, ripetuti ogni giorno. Rileggi la lista e sii onesto: quanti ne fai?",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R3", title: "Come leggo un setup su GOLD in 30 secondi", format: "Reel",
    objective: ["Authority", "Telegram"], date: "2026-07-22", platform: "Instagram",
    status: "da-registrare", angle: "Screen recording",
    hook: "3 cose prima di toccare l'oro.",
    cta: "Vuoi vedere questo metodo applicato live ogni giorno? Gruppo gratuito, link in bio.",
    materials: ["Screen recording piattaforma XAUUSD", "Voice over calmo"],
    accent: ["#8b5cf6", "#22d3ee"],
    script: "Prima di entrare sull'oro guardo solo 3 cose: 1) struttura (rompe o rimbalza?), 2) zona di interesse, 3) conferma. Non entro sulla speranza, entro quando il prezzo me lo dice.",
    caption: "Il mio setup sull'oro sta in 3 domande: struttura, zona, conferma. Non serve un grafico pieno di indicatori — serve un processo che ripeti sempre uguale.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C3", title: "3 bugie sul trading dell'oro", format: "Carosello",
    objective: ["Authority", "Engagement"], date: "2026-07-24", platform: "Instagram",
    status: "da-registrare", angle: "False credenze",
    hook: "3 bugie sull'oro che ti stanno costando soldi.",
    cta: "Scrivi LINK nei commenti o clicca il LINK in bio — gruppo gratuito.",
    materials: ["6 slide", "Grafica controcorrente"],
    accent: ["#7c3aed", "#3ce0ff"],
    script: "Bugia 1: l'oro sale sempre nel lungo. Bugia 2: servono tanti indicatori. Bugia 3: coi segnali giusti non serve capire nulla. Il denominatore comune? Cercano la scorciatoia.",
    caption: "Tre frasi che senti ovunque sull'oro e che ti stanno rallentando. Quale di queste 3 ci avevi creduto?",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R4", title: "La mia routine prima di New York", format: "Reel",
    objective: ["Trust", "Telegram"], date: "2026-07-27", platform: "Instagram",
    status: "da-registrare", angle: "Backstage / Routine",
    hook: "Cosa faccio nell'ora prima di New York.",
    cta: "La mia preparazione giornaliera la trovi nel gruppo gratuito — link in bio.",
    materials: ["B-roll lifestyle sobrio", "Caffè, scrivania, calendario economico"],
    accent: ["#8b5cf6", "#22d3ee"],
    script: "L'ora prima dell'apertura di New York decide la mia giornata: rileggo il piano, controllo le news ad alto impatto, definisco 2 scenari, chiudo il telefono. Nessuna emozione, solo esecuzione.",
    caption: "La costanza non è motivazione, è routine. Piano · News · Scenari · Focus. Poi eseguo. Niente magia.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C4", title: "Perché salti lo stop loss (psicologia)", format: "Carosello",
    objective: ["Trust", "Save"], date: "2026-07-29", platform: "Instagram",
    status: "da-registrare", angle: "Trading Psychology",
    hook: "Non salti lo stop per strategia. Lo salti per paura.",
    cta: "Scrivi LINK nei commenti o clicca il LINK in bio — gruppo gratuito.",
    materials: ["7 slide", "Tono confessionale"],
    accent: ["#7c3aed", "#3ce0ff"],
    script: "Lo stop loss è un'ammissione: 'mi sono sbagliato'. Avversione alla perdita + speranza 'torna su' = perdite grandi. La soluzione: lo stop si decide PRIMA di entrare, quando sei lucido.",
    caption: "Sposti lo stop 'solo stavolta' e poi il conto sanguina. Non è indisciplina, è psicologia. Salva questo post.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R5", title: "POV: sei in gain e non sai se chiudere", format: "Reel",
    objective: ["Engagement"], date: "2026-07-31", platform: "Instagram",
    status: "da-registrare", angle: "POV / Psicologia",
    hook: "POV: +30 pips sull'oro e il dito trema.",
    cta: "Come gestisco le uscite lo spiego nel gruppo gratuito — link in bio.",
    materials: ["Monitor posizione in profitto", "Primo piano occhi/dito"],
    accent: ["#8b5cf6", "#22d3ee"],
    script: "Sei in gain sull'oro e ora inizia il vero problema. Una voce dice chiudi, l'altra aspetta. Il target si decide prima di entrare, non mentre stai sudando.",
    caption: "Il momento più difficile non è entrare, è sapere quando uscire. Tu di solito chiudi troppo presto o troppo tardi?",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C5", title: "6 abitudini di chi tratta l'oro con costanza", format: "Carosello",
    objective: ["Authority", "Save"], date: "2026-08-03", platform: "Instagram",
    status: "da-registrare", angle: "Abitudini",
    hook: "Le 6 abitudini di chi tratta l'oro con costanza (nessuna riguarda l'analisi).",
    cta: "Scrivi LINK nei commenti o clicca il LINK in bio — gruppo gratuito.",
    materials: ["8 slide", "Modello aspirazionale realistico"],
    accent: ["#7c3aed", "#3ce0ff"],
    script: "1) Journaling, 2) Rischio fisso, 3) Orari selettivi, 4) Meno schermo, 5) Regole scritte, 6) Pazienza. La differenza tra chi resta e chi salta il conto non è l'analisi: sono le abitudini.",
    caption: "Journaling, rischio fisso, orari, meno schermo, regole scritte, pazienza. Quante ne hai già? Salva e inizia da una sola.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R6", title: "Da 10 trade al giorno a 2 a settimana", format: "Reel",
    objective: ["Authority", "Telegram"], date: "2026-08-05", platform: "Instagram",
    status: "da-registrare", angle: "Case study / Prima-Dopo",
    hook: "Facevo 10 trade al giorno. Era il problema.",
    cta: "Come seleziono i setup lo condivido nel gruppo gratuito — link in bio.",
    materials: ["Grafico affollato vs pulito", "Volto riflessivo"],
    accent: ["#8b5cf6", "#22d3ee"],
    script: "Facevo 10 trade al giorno sull'oro: era ansia, non impegno. Poi ho iniziato a operare solo sul MIO setup. Da 10 trade a 2-3 a settimana. Meno operazioni, più selezione, meno rumore.",
    caption: "Overtrading non è impegno, è ansia travestita. Il denaro non lo fa chi opera di più, ma chi aspetta il proprio setup.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "ADV", title: "Smetti di seguire i \"guru\" dell'oro", format: "Video Ads",
    objective: ["Telegram"], date: "2026-08-06", platform: "Meta Ads",
    status: "da-registrare", angle: "Adv 30-45s",
    hook: "Se segui i 'guru' con la macchina in copertina, ho una brutta notizia.",
    cta: "Se vuoi imparare un metodo invece di inseguire un sogno, entra dal link. È gratis.",
    materials: ["Talking head 9:16", "Sottotitoli obbligatori", "CTA ultimi 8s"],
    accent: ["#8b5cf6", "#22d3ee"],
    script: "Hook → Problema → Autorità → Soluzione → CTA. Io tratto solo l'oro, ogni giorno, con lo stesso processo. Ho aperto un gruppo Telegram gratuito dove condivido come leggo l'oro e gestisco il rischio.",
    caption: "Tratti l'oro ma perdi la pazienza prima dei profitti? Entra nel gruppo Telegram gratuito: metodo, gestione del rischio e analisi quotidiane su XAUUSD. Zero promesse, zero costi.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
];

const C6 = {
  id: "C6", title: "Sala segnali e copy: cosa è (e cosa NON è)", format: "Carosello",
  objective: ["Telegram"], date: "2026-08-07", platform: "Instagram",
  status: "da-registrare", angle: "FAQ funnel",
  hook: "\"Sala segnali\" e \"copy\": cosa sono davvero. Senza favole.",
  cta: "Inizia da qui, gratis e senza impegno. Scrivi LINK nei commenti o LINK in bio.",
  materials: ["7 slide", "Tono educativo, compliant"],
  accent: ["#7c3aed", "#3ce0ff"],
  script: "Non sono un pulsante magico. Sala segnali = analisi condivisa in tempo reale per imparare a vedere. Copy = replicare un'operatività capendo il rischio. Anche il metodo migliore ha operazioni in perdita.",
  caption: "Segnali e copy non sono bacchette magiche. Il punto di partenza giusto è il gruppo gratuito: guardi come ragioniamo, senza spendere nulla.",
  metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
};
CONTENT.push(C6);

/* ------------------------------------------------------------------ *
 *  SHOOTING PLANNER — materiale da registrare (checklist)            *
 * ------------------------------------------------------------------ */
const SHOOTING = [
  {
    category: "Talking head (volto in camera)", icon: "🎙️",
    items: [
      { id: "th1", label: "R1 — analisi giusta / problema eri tu (25-35s)", done: false },
      { id: "th2", label: "R2 — oro bene rifugio a metà (30-40s)", done: false },
      { id: "th3", label: "R4 — battute finali routine (parte a volto)", done: false },
      { id: "th4", label: "R5 — battute POV tensione (20-30s)", done: false },
      { id: "th5", label: "R6 — racconto 10 trade al giorno (30-40s)", done: false },
      { id: "th6", label: "ADV — script guru/metodo (35-45s)", done: false },
      { id: "th7", label: "3-4 hook parlati extra per A/B test", done: false },
    ],
  },
  {
    category: "Screen recording (XAUUSD)", icon: "🖥️",
    items: [
      { id: "sr1", label: "R3 — lettura setup: struttura, zona, conferma", done: false },
      { id: "sr2", label: "R1 — grafico con zona/entrata segnata (b-roll)", done: false },
      { id: "sr3", label: "R2 — DXY + XAUUSD affiancati con evidenziazioni", done: false },
      { id: "sr4", label: "R6 — grafico affollato vs pulito", done: false },
      { id: "sr5", label: "Registrazioni generiche scroll/analisi (b-roll)", done: false },
    ],
  },
  {
    category: "B-roll lifestyle sobrio", icon: "🎬",
    items: [
      { id: "br1", label: "Caffè versato / tazza sulla scrivania", done: false },
      { id: "br2", label: "Mani alla tastiera / dito sul mouse (primi piani)", done: false },
      { id: "br3", label: "Notebook + penna, appunti scritti a mano", done: false },
      { id: "br4", label: "Monitor multipli accesi (grafici, calendario economico)", done: false },
      { id: "br5", label: "Camminata verso la postazione", done: false },
      { id: "br6", label: "Persona seduta che osserva i grafici", done: false },
      { id: "br7", label: "Primo piano occhi / espressione concentrata", done: false },
      { id: "br8", label: "Dettagli postazione, luce naturale (no lusso)", done: false },
    ],
  },
  {
    category: "Voice over (audio pulito)", icon: "🔊",
    items: [
      { id: "vo1", label: "VO di R3 (setup in 30s)", done: false },
      { id: "vo2", label: "VO di R4 (routine)", done: false },
      { id: "vo3", label: "VO di scorta per storie/b-roll", done: false },
    ],
  },
  {
    category: "Materiale grafico (editor)", icon: "🎨",
    items: [
      { id: "gr1", label: "Template testo animato (hook, karaoke subtitles)", done: false },
      { id: "gr2", label: "6 set slide carosello (1080×1350, palette scura/oro)", done: false },
      { id: "gr3", label: "Lower third con @iipersian", done: false },
      { id: "gr4", label: "Endcard 'gruppo gratuito – link in bio'", done: false },
    ],
  },
];

/* ------------------------------------------------------------------ *
 *  COMPETITOR ANALYSIS — 9 competitor — seed                        *
 * ------------------------------------------------------------------ */
const COMPETITORS = [
  { id: "cmp1", handle: "@gold.trader.it", virality: 82, followers: "128k", frequency: "5 post/sett",
    types: ["Reel screen", "Carosello checklist"], pattern: "Hook-shock + numero nel titolo",
    hooks: ["Il 90% perde sull'oro per questo", "Analisi perfetta, conto vuoto"], cta: "Link in bio → canale gratuito",
    replicate: ["Format checklist salvabile", "Screen recording over-the-shoulder"], exclude: ["Screenshot di profitti (non compliant)", "Toni 'diventa ricco'"] },
  { id: "cmp2", handle: "@xau.mentor", virality: 74, followers: "94k", frequency: "4 post/sett",
    types: ["Talking head", "POV emotivi"], pattern: "Storytelling confessionale",
    hooks: ["Il giorno in cui ho bruciato il conto", "POV: sei in gain e tremi"], cta: "Commenta una parola → DM automatico",
    replicate: ["POV emotivi ad alto engagement", "Storie prima/dopo senza cifre"], exclude: ["DM automation aggressiva", "Promesse di rendimento"] },
  { id: "cmp3", handle: "@forex.discipline", virality: 68, followers: "76k", frequency: "3 post/sett",
    types: ["Carosello psicologia", "Quote"], pattern: "Trading psychology + citazioni",
    hooks: ["Perché sposti sempre lo stop", "La speranza non è una strategia"], cta: "Salva + link in bio",
    replicate: ["Angolo psicologico ad alta salvabilità", "Slide minimal testo grande"], exclude: ["Contenuti motivazionali vuoti"] },
  { id: "cmp4", handle: "@london.session", virality: 71, followers: "112k", frequency: "6 post/sett",
    types: ["Screen recording", "Live analysis"], pattern: "Autorità tecnica quotidiana",
    hooks: ["Cosa guardo prima di Londra", "3 domande prima di entrare"], cta: "Analisi live nel canale",
    replicate: ["Routine pre-sessione", "Cadenza alta costante"], exclude: ["Segnali espliciti (rischio compliance)"] },
  { id: "cmp5", handle: "@gold.mindset", virality: 63, followers: "58k", frequency: "3 post/sett",
    types: ["Reel motivazionali", "Carosello abitudini"], pattern: "Aspirazionale realistico",
    hooks: ["Le 6 abitudini di chi è costante", "Meno schermo, più risultati"], cta: "Link in bio → community",
    replicate: ["Format abitudini replicabili"], exclude: ["Lifestyle di lusso ostentato"] },
  { id: "cmp6", handle: "@xauusd.daily", virality: 79, followers: "141k", frequency: "7 post/sett",
    types: ["News reaction", "Screen"], pattern: "News ad alto impatto + reazione veloce",
    hooks: ["Questo dato USA muove l'oro", "L'oro reagisce così alle news"], cta: "Calendario news nel canale",
    replicate: ["Reaction rapide su news macro"], exclude: ["Clickbait su previsioni certe"] },
  { id: "cmp7", handle: "@trading.errors", virality: 66, followers: "83k", frequency: "4 post/sett",
    types: ["Carosello errori", "Reel educativi"], pattern: "Lista errori numerata",
    hooks: ["7 errori che ti bruciano il conto", "L'errore n°4 è il più comune"], cta: "Scrivi ERRORI nei commenti",
    replicate: ["Format 'X errori' salvabile e condivisibile"], exclude: ["Toni giudicanti verso il pubblico"] },
  { id: "cmp8", handle: "@gold.macro", virality: 61, followers: "49k", frequency: "3 post/sett",
    types: ["Carosello macro", "Educativi"], pattern: "Contesto macro (dollaro, tassi)",
    hooks: ["Perché l'oro sale col dollaro debole", "Notizia vs contesto"], cta: "Approfondimento nel canale",
    replicate: ["Spiegazioni macro semplificate"], exclude: ["Gergo eccessivo che perde il pubblico"] },
  { id: "cmp9", handle: "@signals.copy", virality: 58, followers: "67k", frequency: "5 post/sett",
    types: ["FAQ funnel", "Testimonianze"], pattern: "Educazione sul prodotto (segnali/copy)",
    hooks: ["Cosa NON sono i segnali", "Copy trading: la verità"], cta: "Entra nel gruppo gratuito",
    replicate: ["Contenuto che educa sul prodotto senza venderlo"], exclude: ["Testimonianze con importi", "Screenshot di guadagni"] },
];

/* ------------------------------------------------------------------ *
 *  ANALYTICS — profilo IG reale + Reel reali (05/07/2026)           *
 * ------------------------------------------------------------------ */
const IG_ANALYTICS = {
  profile: { followers: 27623, following: 1820, posts: 1221, verified: true },
  lastSync: "05/07/2026",
  // Contenuti realmente pubblicati (Reel + Caroselli) con metriche pubbliche reali.
  // La finestra "ultimo mese" (30gg dall'ultimo post) è calcolata a runtime.
  // views/plays sono null per i Caroselli (Instagram non li espone).
  published: [
    { id: "DZmRKxBgApP", type: "Carosello", title: "Carosello (15 giu)", tag: "lifestyle", date: "2026-06-15", views: null, plays: null, likes: 1017, comments: 25 },
    { id: "DZSk7XIgPV4", type: "Carosello", title: "Carosello (07 giu)", tag: "lifestyle", date: "2026-06-07", views: null, plays: null, likes: 271, comments: 1 },
    { id: "DZHa-AegHq5", type: "Carosello", title: "Carosello (03 giu)", tag: "lifestyle", date: "2026-06-03", views: null, plays: null, likes: 110, comments: 12 },
    { id: "DZDpovmg1f_", type: "Reel", title: "Health, business and fun", tag: "lifestyle", date: "2026-06-01", views: 2818, plays: 9171, likes: 108, comments: 1 },
    { id: "DY6v4WOgemI", type: "Reel", title: "Amazing city (dubai)", tag: "lifestyle", date: "2026-05-29", views: 1523, plays: 5804, likes: 82, comments: 2 },
    { id: "DYzQijSgyuQ", type: "Reel", title: "Tempo (dadlife)", tag: "lifestyle", date: "2026-05-26", views: 4475, plays: 14337, likes: 212, comments: 4 },
    { id: "DYg6At0gYG2", type: "Reel", title: "Solo analisi assieme, niente corsi", tag: "trading", date: "2026-05-19", views: 7277, plays: 18230, likes: 330, comments: 16 },
    { id: "DYefJFQAoZo", type: "Reel", title: "Il progetto più grande della mia vita (live)", tag: "trading", date: "2026-05-18", views: 6118, plays: 18027, likes: 296, comments: 24 },
    { id: "DYTx6CtApI5", type: "Reel", title: "Sto tornando! (commenta 'fx')", tag: "trading", date: "2026-05-14", views: 6436, plays: 20994, likes: 202, comments: 22 },
    { id: "DYHEdUEAWeK", type: "Reel", title: "Serata come ai vecchi tempi?", tag: "lifestyle", date: "2026-05-09", views: 8344, plays: 20263, likes: 368, comments: 15 },
    { id: "DWw3aJxgCFc", type: "Reel", title: "Una storia infinita", tag: "lifestyle", date: "2026-04-05", views: 11091, plays: 29449, likes: 276, comments: 5 },
    { id: "DWmbnS6AIcj", type: "Reel", title: "Quasi quasi", tag: "lifestyle", date: "2026-04-01", views: 6092, plays: 16162, likes: 238, comments: 11 },
    { id: "DVoLLkSCNwq", type: "Carosello", title: "Carosello (08 mar)", tag: "lifestyle", date: "2026-03-08", views: null, plays: null, likes: 1090, comments: 7 },
    { id: "DVQMLjgDbn-", type: "Reel", title: "Futuro cantante?", tag: "lifestyle", date: "2026-02-27", views: 15763, plays: 36245, likes: 1280, comments: 40 },
    { id: "DUz9W8JiGnf", type: "Reel", title: "Over Trading", tag: "trading", date: "2026-02-16", views: 9357, plays: 22500, likes: 312, comments: 6 },
    { id: "DUiIsooCHmQ", type: "Reel", title: "Non ti piacerà la mia visione", tag: "opinion", date: "2026-02-09", views: 11972, plays: 27391, likes: 722, comments: 36 },
  ],
};

/* ------------------------------------------------------------------ *
 *  TELEGRAM TRACKING — dato reale 2.551 (fornito). Storico N/D.      *
 * ------------------------------------------------------------------ */
const TELEGRAM = {
  current: 2551,
  link: "https://t.me/+EjGqKLKqfck5ZWI8",
  updatedAt: "aggiornato manualmente",
  historyAvailable: false,
  note:
    "Il numero reale di iscritti (2.551) è stato inserito manualmente: il conteggio di un gruppo con link d'invito privato (t.me/+…) non è leggibile via scraping. Per lo storico giorno-per-giorno e la correlazione con i Reel serve un bot amministratore nel gruppo (Telegram Bot API / MTProto) o l'aggiornamento manuale periodico.",
  // Metriche non tracciabili finché non c'è il bot:
  newDaily: null, newWeekly: null, newMonthly: null, growthPct: null,
  correlation: [], // si popola quando la campagna parte (13 Lug) + tracking attivo
};

/* ------------------------------------------------------------------ *
 *  REPORT — sintesi con dati reali dove disponibili                  *
 * ------------------------------------------------------------------ */
const REPORT_SUGGESTIONS = {
  bestReel: "Futuro cantante? (27/02) — 15.763 views · 1.280 like · ER 8,4%",
  worstReel: "Amazing city / Dubai (29/05) — 1.523 views · 82 like",
  igGrowth: "27.623 follower · account verificato · storico crescita N/D (richiede Meta API)",
  tgGrowth: "2.551 iscritti al gruppo (baseline reale di partenza)",
  conversion: "N/D — attivare tracking (bot Telegram o link UTM) per misurarla",
  agentTips: [
    "I Reel già a tema trading/forex (Over Trading, Solo analisi, Sto tornando 'fx') reggono in linea col lifestyle: il pubblico da 27,6k regge il pivot verso GOLD.",
    "\"Solo analisi assieme, niente corsi né da venderti\" (ER 4,8%) valida l'angolo compliant: niente vendita diretta → più fiducia. Da tenere come tono di tutti i contenuti.",
    "La CTA \"commenta 'fx' per l'invito\" (Reel 14/05) è già un funnel Telegram funzionante: standardizzarla in R1–R6.",
    "Engagement medio 4,8% su 27,6k follower = buona reach organica per lanciare la serie GOLD dal 13 Lug.",
  ],
  newIdeas: [
    "Reel 'over-the-shoulder' settimanale su un setup GOLD reale (compliant).",
    "Serie 'Notizia vs Contesto' sul macro (dollaro/tassi) per la Reach.",
    "Carosello 'journaling': template scaricabile → altissima salvabilità.",
  ],
};

/* Espone tutto per app.js */
window.PFX = {
  BRAND, STATUSES, OBJECTIVES, KPIS, MONTHLY_GOAL,
  CONTENT, SHOOTING, COMPETITORS, IG_ANALYTICS, TELEGRAM, REPORT_SUGGESTIONS,
};
