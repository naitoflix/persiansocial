/* ==========================================================================
   Persian FX — Social Activities · Data
   --------------------------------------------------------------------------
   DATI REALI @iipersian (aggiornati 2026-07-05) + Telegram (2.551,
   dato fornito). Le metriche "insight" private (reach, impression, salvataggi,
   condivisioni, visite profilo, click bio, follower persi) NON sono scrapabili:
   richiedono le Instagram Graph API (account Business/Creator collegato via
   login Meta) → marcate na:true. Collaborazione continuativa · Mese 1 (produzione dal 20 Lug).
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
 *  CONTENT — piano contenuti GOLD · Mese 1 (produzione dal 20 Lug) *
 *  Non ancora prodotto → tutti "da-registrare", metriche a 0.        *
 * ------------------------------------------------------------------ */
const CONTENT = [
  {
    id: "R1", title: "Analisi giusta, conto in rosso", format: "Reel",
    objective: ["Authority", "Telegram"], date: "2026-07-20", platform: "Instagram",
    status: "da-registrare", angle: "Errore / Psicologia", focus: "Conversione",
    hook: "Analisi giusta. Conto in rosso.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#8b5cf6", "#22d3ee"],
    shots: [
      { kind: "talking", label: "Talking head — il problema non era l'analisi (25-35s)", script: "HOOK (0-3s, dritto in camera, nessun preambolo): «Analisi giusta. Conto in rosso. Ti è mai successo?» — PROBLEMA (3-12s): «Avevi ragione sull'oro: livello giusto, trend giusto. E hai perso lo stesso, perché sei entrato tardi, per paura di perderti il movimento.» — INSIGHT (12-23s): «Il problema non è l'analisi. È che non avevi un piano d'uscita SCRITTO prima di entrare: dove entri, dove esci in perdita, dove esci in profitto — deciso a mente lucida.» — CTA (23-30s): «Vuoi il mio schema d'uscita in 3 righe? Commenta FX qui sotto e ti arriva in DM il link del gruppo gratuito, dove lo trovi. Nessuna promessa di guadagno, solo metodo.» — RIPRESA: primo piano, sguardo in camera, sottotitoli obbligatori." },
      { kind: "screen", label: "Screen XAUUSD — zona ed entrata segnate (inserto)", script: "B-roll dello schermo: grafico XAUUSD con la zona d'ingresso e i 3 livelli (entrata / stop / target) segnati a mano. Da sovrapporre alla frase 'livello giusto'. Nessun audio, 5-8s." },
    ],
    caption: "L'oro non ti fa perdere. Te lo fa perdere il piano che non hai scritto. Prima di ogni entrata su XAUUSD segna 3 cose: dove entri, dove esci in perdita, dove esci in profitto. Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C1", title: "5 controlli prima di entrare su GOLD", format: "Carosello",
    objective: ["Save", "Telegram"], date: "2026-07-22", platform: "Instagram",
    status: "da-registrare", angle: "Checklist", focus: "Conversione",
    hook: "Prima di premere BUY o SELL sull'oro, leggi questo.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#7c3aed", "#3ce0ff"],
    shots: [
      { kind: "graphic", label: "Carosello 7 slide (1080×1350, palette scura/oro)", script: "7 slide, palette scura/oro sobria, un concetto per slide, testo grande e salvabile. 1) COVER: «Prima di premere BUY o SELL sull'oro, leggi questo». 2) STRUTTURA: il prezzo rompe o rimbalza? 3) ZONA: sei su un livello che conta o nel mezzo? 4) NEWS: c'è un evento ad alto impatto nelle prossime ore? 5) RISCHIO: quanto perdo se ho torto (deciso prima)? 6) PIANO D'USCITA: dove chiudo in perdita e in profitto? 7) ENDCARD: «Cinque sì = puoi valutare. Un solo no = stai fermo. Commenta FX e ti arriva il link del gruppo gratuito in DM.»" },
    ],
    caption: "Salva questa checklist e rileggila prima di ogni entrata su XAUUSD. Cinque domande: struttura, zona, news, rischio, piano d'uscita. Commenta FX e ti mando in DM il link del gruppo (dentro la versione stampabile).",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R2", title: "\"L'oro sale con la paura\" — mezza verità", format: "Reel",
    objective: ["Reach", "Authority"], date: "2026-07-24", platform: "Instagram",
    status: "da-registrare", angle: "Mito", focus: "Reach",
    hook: "\"L'oro = bene rifugio\" è una mezza bugia.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#8b5cf6", "#22d3ee"],
    shots: [
      { kind: "talking", label: "Talking head — l'oro guarda il dollaro (30-40s)", script: "HOOK (0-3s, tono da 'ti stanno mentendo'): «'L'oro è un bene rifugio' è una mezza bugia. E oggi ti spiego perché.» — CORPO (3-14s): «L'oro non guarda solo la paura. Guarda il dollaro e i tassi reali. Se il dollaro si rafforza, l'oro può scendere anche in piena crisi.» — INSIGHT (14-24s): «La notizia è benzina, il contesto è il volante.» — SHARE (24-28s): «Manda questo a chi compra oro solo 'perché c'è crisi'.» — CTA (28-34s): «La lettura del contesto settimanale la mando nel gruppo: commenta FX e ti arriva il link in DM.» — RIPRESA: split screen volto + grafico." },
      { kind: "screen", label: "Screen DXY + XAUUSD affiancati con evidenziazioni", script: "DXY e XAUUSD affiancati (split o due finestre): evidenzia con freccia/riquadro il momento in cui il dollaro sale e l'oro scende. È la prova visiva di 'l'oro guarda il dollaro'. 6-8s." },
    ],
    caption: "\"Compro oro perché c'è crisi\" è il modo più veloce per restare incastrato. L'oro reagisce alla paura nel breve, ma nel contesto pesano dollaro e tassi reali. Manda questo a chi ci crede ancora. Commenta FX per la lettura settimanale (link in DM).",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C2", title: "7 errori che ti bruciano il conto sull'oro", format: "Carosello",
    objective: ["Reach", "Save"], date: "2026-07-27", platform: "Instagram",
    status: "da-registrare", angle: "Errori", focus: "Reach",
    hook: "7 errori che ti stanno bruciando il conto sull'oro (il n°4 è il più comune).",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#7c3aed", "#3ce0ff"],
    shots: [
      { kind: "graphic", label: "Carosello 9 slide con evidenziazioni animate", script: "9 slide, palette scura/oro, evidenziazioni animate. 1) COVER: «7 errori che ti stanno bruciando il conto sull'oro (il n°4 è il più comune)». 2) Nessuno stop. 3) Aumentare la size dopo la perdita. 4) Operare sulle news [evidenzia: il più comune]. 5) Spostare lo stop. 6) Chiudere presto i profitti. 7) Copiare senza capire. 8) Non tenere uno storico. 9) ENDCARD: «Quanti ne fai? Salva e commenta FX: ti arriva il link del gruppo gratuito in DM.»" },
    ],
    caption: "L'oro non brucia i conti. Li bruciano questi 7 errori, ripetuti ogni giorno. Rileggi la lista e sii onesto: quanti ne fai? Tagga chi ne fa almeno 3. Commenta FX per il link del gruppo (in DM).",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R3", title: "Come leggo un setup su GOLD in 30 secondi", format: "Reel",
    objective: ["Authority", "Telegram"], date: "2026-07-29", platform: "Instagram",
    status: "da-registrare", angle: "Screen recording", focus: "Conversione",
    hook: "3 cose prima di toccare l'oro.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#8b5cf6", "#22d3ee"],
    shots: [
      { kind: "screen", label: "Screen recording XAUUSD — setup in 3 passi (30s)", script: "Screen recording pulito della piattaforma su XAUUSD, ~30s. Mostra il setup in 3 passi, evidenziando a schermo: 1) struttura (rompe o rimbalza?), 2) zona di interesse, 3) conferma d'ingresso. Solo prezzo/struttura/zona, niente indicatori inutili." },
      { kind: "vo", label: "Voice over calmo (sopra lo screen)", script: "«Prima di entrare sull'oro guardo solo 3 cose: uno, la struttura — rompe o rimbalza? Due, la zona di interesse. Tre, la conferma. Non entro sulla speranza, entro quando il prezzo me lo dice. Vuoi vedere questo metodo applicato live ogni giorno? Commenta FX e ti arriva in DM il link del gruppo gratuito.» Tono calmo, nessuna enfasi da vendita." },
    ],
    caption: "Il mio setup sull'oro sta in 3 domande: struttura, zona, conferma. Non serve un grafico pieno di indicatori — serve un processo che ripeti sempre uguale. Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C3", title: "3 bugie sul trading dell'oro", format: "Carosello",
    objective: ["Authority", "Engagement"], date: "2026-07-31", platform: "Instagram",
    status: "da-registrare", angle: "False credenze", focus: "Reach",
    hook: "3 bugie sull'oro che ti stanno costando soldi.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#7c3aed", "#3ce0ff"],
    shots: [
      { kind: "graphic", label: "Carosello 6 slide (grafica controcorrente)", script: "6 slide, grafica controcorrente. 1) COVER: «3 bugie sull'oro che ti stanno costando soldi». 2) BUGIA 1: l'oro sale sempre nel lungo. 3) BUGIA 2: servono tanti indicatori. 4) BUGIA 3: coi segnali giusti non serve capire nulla. 5) Il denominatore comune: cercano la scorciatoia. 6) ENDCARD: «A quale ci avevi creduto? Scrivilo nei commenti. Commenta FX per il link del gruppo gratuito in DM.»" },
    ],
    caption: "Tre frasi che senti ovunque sull'oro e che ti stanno rallentando. Quale di queste 3 ci avevi creduto? Scrivilo nei commenti — e commenta FX per il link del gruppo (in DM).",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R4", title: "La mia routine prima di New York", format: "Reel",
    objective: ["Trust", "Telegram"], date: "2026-08-03", platform: "Instagram",
    status: "da-registrare", angle: "Backstage / Routine", focus: "Conversione",
    hook: "Cosa faccio nell'ora prima di New York.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#8b5cf6", "#22d3ee"],
    shots: [
      { kind: "broll", label: "B-roll routine pre-New York (12-15s montabili)", script: "B-roll lifestyle sobrio della routine pre-New York: caffè versato, scrivania, calendario economico aperto, mani che sistemano la postazione. Luce naturale, movimenti lenti, niente lusso." },
      { kind: "vo", label: "Voice over routine (sopra il b-roll)", script: "«L'ora prima dell'apertura di New York decide la mia giornata: rileggo il piano, controllo le news ad alto impatto, definisco due scenari, chiudo il telefono. Nessuna emozione, solo esecuzione.» Tono calmo." },
      { kind: "talking", label: "Chiusura a volto (5-8s)", script: "«La costanza non è motivazione, è routine: piano, news, scenari, focus. Poi eseguo. La mia checklist pre-apertura la mando nel gruppo: commenta FX e ti arriva in DM il link gratuito.»" },
    ],
    caption: "La costanza non è motivazione, è routine. Piano · News · Scenari · Focus. Poi eseguo. Niente magia. Commenta FX e ti arriva il link del gruppo gratuito in DM (dentro la mia checklist pre-apertura).",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C4", title: "Perché salti lo stop loss (psicologia)", format: "Carosello",
    objective: ["Trust", "Save"], date: "2026-08-05", platform: "Instagram",
    status: "da-registrare", angle: "Trading Psychology", focus: "Conversione",
    hook: "Non salti lo stop per strategia. Lo salti per paura.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#7c3aed", "#3ce0ff"],
    shots: [
      { kind: "graphic", label: "Carosello 7 slide (tono confessionale)", script: "7 slide, tono confessionale. 1) COVER: «Non salti lo stop per strategia. Lo salti per paura.». 2) Lo stop loss è un'ammissione: 'mi sono sbagliato'. 3) Avversione alla perdita. 4) La speranza del 'torna su'. 5) Risultato: perdite piccole che diventano grandi. 6) La soluzione: lo stop si decide PRIMA di entrare, quando sei lucido. 7) ENDCARD: «Salva questo. Commenta FX e ti arriva il link del gruppo gratuito in DM.»" },
    ],
    caption: "Sposti lo stop 'solo stavolta' e poi il conto sanguina. Non è indisciplina, è psicologia. Salva questo post. Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R5", title: "POV: sei in gain e non sai se chiudere", format: "Reel",
    objective: ["Engagement"], date: "2026-08-07", platform: "Instagram",
    status: "da-registrare", angle: "POV / Psicologia", focus: "Reach",
    hook: "POV: +30 pips sull'oro e il dito trema.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#8b5cf6", "#22d3ee"],
    shots: [
      { kind: "talking", label: "Talking head POV — quando uscire (20-30s)", script: "HOOK/POV (0-3s, primo piano, tono teso): «+30 pips sull'oro e il dito trema.» — CORPO (3-15s): «Sei in gain e ora inizia il vero problema: una voce dice chiudi, l'altra aspetta.» — INSIGHT (15-22s): «Il momento più difficile non è entrare, è sapere quando uscire. Il target si decide PRIMA di entrare, non mentre sudi.» — ENGAGEMENT (22-27s): «Tu chiudi troppo presto o troppo tardi? Dimmelo nei commenti.» — CTA (27-32s): «Il mio metodo di uscita è nel gruppo: commenta FX per il link in DM.»" },
      { kind: "screen", label: "Screen monitor — posizione in profitto (inserto)", script: "Screen del monitor con una posizione XAUUSD in profitto (il P/L che sale): inserto sotto '+30 pips'. NIENTE cifre in euro a schermo, solo pips/percentuale. 4-6s." },
    ],
    caption: "Il momento più difficile non è entrare, è sapere quando uscire. Tu di solito chiudi troppo presto o troppo tardi? Scrivilo nei commenti. Commenta FX per il mio metodo di gestione (link in DM).",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C5", title: "6 abitudini di chi tratta l'oro con costanza", format: "Carosello",
    objective: ["Authority", "Save"], date: "2026-08-10", platform: "Instagram",
    status: "da-registrare", angle: "Abitudini", focus: "Reach",
    hook: "Le 6 abitudini di chi tratta l'oro con costanza (nessuna riguarda l'analisi).",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#7c3aed", "#3ce0ff"],
    shots: [
      { kind: "graphic", label: "Carosello 8 slide (aspirazionale realistico)", script: "8 slide, modello aspirazionale ma realistico. 1) COVER: «Le 6 abitudini di chi tratta l'oro con costanza (nessuna riguarda l'analisi)». 2) Journaling. 3) Rischio fisso. 4) Orari selettivi. 5) Meno schermo. 6) Regole scritte. 7) Pazienza. 8) ENDCARD: «Quante ne hai già? Inizia da una. Commenta FX per il link del gruppo gratuito in DM.»" },
    ],
    caption: "Journaling, rischio fisso, orari, meno schermo, regole scritte, pazienza. Quante ne hai già? Salva e inizia da una sola. Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "R6", title: "Da 10 trade al giorno a 2 a settimana", format: "Reel",
    objective: ["Authority", "Telegram"], date: "2026-08-12", platform: "Instagram",
    status: "da-registrare", angle: "Case study / Prima-Dopo", focus: "Reach",
    hook: "Facevo 10 trade al giorno. Era il problema.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#8b5cf6", "#22d3ee"],
    shots: [
      { kind: "talking", label: "Talking head — da overtrading a selezione (30-40s)", script: "HOOK (0-3s, tono riflessivo): «Facevo 10 trade al giorno sull'oro. Era il problema.» — CORPO (3-16s): «Non era impegno, era ansia travestita. Poi ho iniziato a operare solo sul MIO setup: da 10 trade al giorno a 2-3 a settimana.» — INSIGHT (16-24s): «Meno operazioni, più selezione, meno rumore. Il denaro non lo fa chi opera di più, ma chi aspetta il proprio setup.» — SHARE (24-28s): «Tagga un amico che fa 10 trade al giorno.» — CTA (28-33s): «I miei criteri di selezione sono nel gruppo: commenta FX per il link in DM.»" },
      { kind: "screen", label: "Screen — grafico affollato vs pulito (prima/dopo)", script: "Due screen a confronto: prima un grafico pieno di indicatori e operazioni (il caos dei 10 trade), poi lo stesso grafico pulito con un solo setup segnato. Stacco netto per il 'prima/dopo'." },
    ],
    caption: "Overtrading non è impegno, è ansia travestita. Il denaro non lo fa chi opera di più, ma chi aspetta il proprio setup. Tagga chi fa 10 trade al giorno. Commenta FX per i miei criteri (link in DM).",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "ADV", title: "Dai videogiochi al trading dell'oro — la mia storia", format: "Video Ads",
    objective: ["Telegram"], date: "2026-08-13", platform: "Meta Ads",
    status: "da-registrare", angle: "Storia personale / Origin", focus: "Conversione",
    hook: "Mi dicevano che coi videogiochi non avrei combinato niente.",
    cta: "Entra nel gruppo gratuito dal link.",
    accent: ["#8b5cf6", "#22d3ee"],
    shots: [
      { kind: "talking", label: "Talking head 9:16 — storia gaming → oro (40-50s)", script: "Talking head 9:16, tono personale e autentico, sottotitoli obbligatori. HOOK (0-4s): «Mi dicevano che coi videogiochi non avrei combinato niente nella vita. Oggi quelle ore sono la cosa più utile che ho fatto.» — STORIA (4-22s): «Ho passato anni davanti a uno schermo: partite, sconfitte, riprovare. Senza accorgermene stavo imparando a leggere schemi, a restare freddo sotto pressione, a studiare i miei errori invece di arrendermi.» — SVOLTA (22-38s): «Poi ho scoperto il trading sull'oro — ed erano le STESSE identiche cose: pattern, disciplina, gestire l'emozione, rivedere le 'partite'. Ci ho messo lo stesso impegno del gaming.» — PAYOFF compliant (38-46s): «Non ti dirò che sono diventato ricco. Ti dico che per la prima volta quelle ore hanno un senso, e mi sta dando soddisfazioni vere.» — CTA ultimi 8s (46-54s): «Ho aperto un gruppo Telegram gratuito dove condivido come leggo l'oro, senza promesse. Entra dal link, è gratis.»" },
      { kind: "broll", label: "B-roll prima/dopo — setup gaming → setup trading", script: "Montaggio 'prima/dopo': setup gaming (controller, cuffie, luci RGB, eventuali clip/foto di gioco) che sfuma nel setup di trading attuale (grafici XAUUSD, calendario economico, scrivania sobria). Stesso ragazzo, stesso schermo, obiettivo diverso — sostiene la narrazione 'stesse skill, nuovo campo'." },
      { kind: "graphic", label: "Sottotitoli su tutto + endcard CTA + disclaimer", script: "Sottotitoli su tutto il video (obbligatori per l'ADV Meta) + endcard negli ultimi 8s: «Gruppo Telegram gratuito → link», freccia. Disclaimer piccolo ma leggibile: «Il trading comporta rischi. Contenuto informativo, non consulenza finanziaria. Nessun rendimento garantito.»" },
    ],
    caption: "Da ragazzino mi dicevano che coi videogiochi non avrei fatto niente. Quelle ore mi hanno insegnato a leggere schemi, restare lucido e studiare gli errori — le stesse cose che oggi uso sull'oro. Non prometto guadagni: condivido un metodo, e mi sta dando soddisfazioni vere. Entra nel gruppo Telegram gratuito dal link.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
  {
    id: "C6", title: "Sala segnali e copy: cosa è (e cosa NON è)", format: "Carosello",
    objective: ["Telegram"], date: "2026-08-14", platform: "Instagram",
    status: "da-registrare", angle: "FAQ funnel", focus: "Conversione",
    hook: "\"Sala segnali\" e \"copy\": cosa sono davvero. Senza favole.",
    cta: "Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    accent: ["#7c3aed", "#3ce0ff"],
    shots: [
      { kind: "graphic", label: "Carosello 7 slide (educativo, compliant)", script: "7 slide, tono educativo e compliant (FAQ funnel). 1) COVER: «'Sala segnali' e 'copy': cosa sono davvero. Senza favole.» 2) Non sono un pulsante magico. 3) Sala segnali = analisi condivisa in tempo reale per imparare a vedere. 4) Copy = replicare un'operatività capendo il rischio. 5) Anche il metodo migliore ha operazioni in perdita. 6) Il punto di partenza giusto è il gruppo gratuito. 7) ENDCARD: «Inizia da qui, gratis e senza impegno. Commenta FX e ti arriva il link in DM.»" },
    ],
    caption: "Segnali e copy non sono bacchette magiche. Il punto di partenza giusto è il gruppo gratuito: guardi come ragioniamo, senza spendere nulla. Commenta FX e ti arriva il link del gruppo gratuito in DM.",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, reach: 0, engagement: 0 },
  },
];

/* ------------------------------------------------------------------ *
 *  PRODUCTION_GENERIC — riprese/asset RIUTILIZZABILI, non legati a un *
 *  singolo contenuto. Lo Shooting Planner unisce questi agli shot dei *
 *  contenuti (CONTENT.shots), che restano la fonte di verità.         *
 * ------------------------------------------------------------------ */
const PRODUCTION_GENERIC = [
  { kind: "broll", label: "Caffè versato / tazza sulla scrivania", script: "Dettaglio ravvicinato, luce naturale, movimento lento. 3-5s. Estetica sobria, niente lusso ostentato." },
  { kind: "broll", label: "Mani alla tastiera / dito sul mouse (primi piani)", script: "Primi piani delle mani, gesti calmi e decisi (nessuna fretta). 3-5s. Inserto sotto le battute sul metodo." },
  { kind: "broll", label: "Notebook + penna, appunti scritti a mano", script: "Inquadratura dall'alto di appunti scritti a mano — es. 'entrata / stop / target'. 3-5s. Rinforza il tema del piano scritto." },
  { kind: "broll", label: "Monitor multipli accesi (grafici, calendario economico)", script: "Carrellata lenta o messa a fuoco che entra sui monitor con grafici e calendario economico. 3-5s. Trasmette metodo, non frenesia." },
  { kind: "broll", label: "Camminata verso la postazione", script: "Figura di spalle, passo tranquillo verso la scrivania. 3-5s. Apertura/stacco per i Reel routine (R4)." },
  { kind: "broll", label: "Persona seduta che osserva i grafici", script: "Profilo o tre quarti, sguardo concentrato sui grafici, nessuna reazione eccessiva. 3-5s." },
  { kind: "broll", label: "Primo piano occhi / espressione concentrata", script: "Primissimo piano su occhi/espressione per i momenti di tensione (es. R5 'il dito trema'). 2-3s." },
  { kind: "broll", label: "Dettagli postazione, luce naturale (no lusso)", script: "Dettagli sobri della postazione (tazza, mouse, quaderno) in luce naturale. 3-5s. Coerenza estetica su tutti i Reel." },
  { kind: "screen", label: "Registrazioni generiche scroll/analisi (b-roll)", script: "20-30s di materiale neutro sulla piattaforma (movimento del prezzo, apertura grafico, zoom lento su una zona) da usare come riempitivo sotto le voci parlate. Movimenti lenti, nessun numero di profitto a schermo." },
  { kind: "vo", label: "VO di scorta per storie/b-roll", script: "Registra 20-30s di voice over neutro di scorta: 2-3 frasi brevi sul metodo/rischio, senza numeri né promesse (es. «Sull'oro non serve prevedere, serve reagire con un piano.»). Tappabuchi audio per storie e b-roll." },
  { kind: "talking", label: "3-4 hook parlati extra per A/B test", script: "Registra 3-4 hook secchi da 3-5s guardando dritto in camera, primo secondo senza preamboli: 1) «Prima di premere BUY sull'oro, guarda questo.» 2) «Il 90% perde sull'oro per un solo motivo.» 3) «Non è l'analisi a bruciarti il conto.» 4) «Ti hanno mentito sull'oro come bene rifugio.» Tono diretto, nessuna musica." },
  { kind: "graphic", label: "Template testo animato (hook, sottotitoli)", script: "Template per hook e sottotitoli: font pulito, palette scura/oro, comparsa parola-per-parola. Deve reggere l'hook a schermo nei primi 1-2s e i sottotitoli sull'intero Reel (obbligatori per l'ADV)." },
  { kind: "graphic", label: "Lower third con @iipersian", script: "Lower third discreto in basso con handle @iipersian, coerente col brand, da sovrapporre ai talking head senza coprire i sottotitoli." },
  { kind: "graphic", label: "Endcard 'gruppo gratuito – link in bio'", script: "Endcard finale da 2-3s con CTA 'gruppo gratuito – link in bio' e freccia verso la bio. Uguale su tutti i Reel per riconoscibilità del funnel." },
];

/* ------------------------------------------------------------------ *
 *  COMPETITOR ANALYSIS — 12 competitor reali (Apify, lug 2026)      *
 * ------------------------------------------------------------------ */
const COMPETITORS = [
  { id: "cmp1", handle: "@casper_smc", role: "REACH", virality: 88, conversion: 25, authority: 40, followers: "573k", verified: true, frequency: "a raffica", lang: "EN",
    types: ["Reel mindset 8-14s", "Testo + audio trending (no voce)"], pattern: "One-liner d'identità a schermo, estetica premium",
    hooks: ["Discipline over motivation", "Future me is proud"], cta: "Quasi assente (reach pura)",
    replicate: ["Reel mindset ultra-corti come motore top-of-funnel"], exclude: ["Assenza totale di CTA/funnel"], note: "132k+ plays su reel da 12s. Motore di reach, non converte." },
  { id: "cmp2", handle: "@scotttaylorfx", role: "REACH", virality: 85, conversion: 62, authority: 70, followers: "210k", verified: true, frequency: ">1/giorno", lang: "EN",
    types: ["Motivazionale corto 5-13s", "Educativo / listicle"], pattern: "Motivazione (reach) + educazione + meccaniche di engagement",
    hooks: ["Fastest way to 10k months", "They don't tell you these 5 things"], cta: "Comment-to-DM + save-bait + follow",
    replicate: ["Comment-to-DM → 'Commenta ORO'", "Save-bait", "Listicle '5 cose che non ti dicono'"], exclude: ["Claim di reddito ('10k months')"], note: "Miglior modello ibrido reach+educazione." },
  { id: "cmp3", handle: "@xauusd.alantrader", role: "GOLD · AUTHORITY", mark: "star", virality: 62, conversion: 70, authority: 88, followers: "1.6k", verified: true, frequency: "quotidiana", lang: "EN",
    types: ["Market Outlook 28s (screen grafico)"], pattern: "Contesto → Bias → Zone → Invalidazione → Insight",
    hooks: ["Will Gold rebound before the next sell-off?", "Gold faces a pullback after liquidity sweep"], cta: "Comment ROOM → Research Room",
    replicate: ["Template 'Market Outlook 28s'", "Compliance: 'osserva la reazione, non prevedere'", "Comment-to-DM"], exclude: ["Caption troppo tecniche per principianti", "Inglese, nessun volto"], note: "ROLE MODEL GOLD: i suoi reel oro fanno ×5-10 la reach dei suoi forex. La specializzazione paga." },
  { id: "cmp4", handle: "@huss.trades", role: "AUTHORITY", virality: 78, conversion: 60, authority: 82, followers: "38.5k", verified: true, frequency: "ogni 1-2 gg", lang: "EN",
    types: ["Breakdown concetti 20-40s (screen + voce)"], pattern: "Hook curiosità → valore rapido e denso → personalità anti-guru",
    hooks: ["[concetto] explained in 30 seconds", "Is this the best trading concept?"], cta: "Follow for more free (anti-guru)",
    replicate: ["Format '[concetto] spiegato in 30 secondi'", "Mossa anti-guru 'non vendo corsi'"], exclude: ["Percentuali di win-rate (85%)", "Gergo troppo tecnico"], note: "Miglior teacher + fiducia via anti-guru." },
  { id: "cmp5", handle: "@coin.wise.inv", role: "AUTHORITY / FUNNEL", virality: 70, conversion: 85, authority: 55, followers: "64k", verified: false, frequency: "quasi giornaliera", lang: "EN",
    types: ["Breakdown vocale rapido", "Lifestyle estetico"], pattern: "Valore rapido / vibe → CTA Telegram FISSA su ogni post",
    hooks: ["Timeframe → struttura → liquidità → entrata → target → follow"], cta: "Join my Telegram — su OGNI post",
    replicate: ["CTA Telegram su ogni singolo post (funnel disciplinato)", "Breakdown setup rapido"], exclude: ["Caption identica clonata (uccide reach/SEO)"], note: "Il modello di funnel Telegram più disciplinato del gruppo." },
  { id: "cmp6", handle: "@moneymaxtrades", role: "CONVERSION · NON COPIABILE", mark: "warn", virality: 90, conversion: 75, authority: 50, followers: "16.7k", verified: true, frequency: "quasi giornaliera", lang: "EN",
    types: ["Flex payout brevi 7-33s", "Screen"], pattern: "Numero-shock + loss-transparency + codice copy trading",
    hooks: ["+$44.000 in un giorno", "Preso -$17.800 ma ancora +40k sul mese"], cta: "Follow LIVE + codice copy trading",
    replicate: ["SOLO la struttura dell'hook numerico e la loss-transparency, riformulate su rischio/metodo"], exclude: ["Ogni cifra di profitto, il framing 'flex' = 0 compliance per noi e Meta"], note: "Il più virale del gruppo, ma tutta la reach nasce da flex di profitti: intoccabile nel contenuto." },
  { id: "cmp7", handle: "@goldtradingguild", role: "GOLD · AUTHORITY", virality: 55, conversion: 40, authority: 65, followers: "11.5k", verified: false, frequency: "incostante", lang: "EN",
    types: ["Lezioni con esempi numerici 56-69s"], pattern: "Didattica anti-guru ('Random guy trading gold. No courses')",
    hooks: ["Break-even vs chiusura parziale: stesso trade, $0 vs $250"], cta: "Debole / assente",
    replicate: ["Confronto numerico 'stesso trade, 2 approcci'", "Posizionamento anti-guru"], exclude: ["Reel troppo lunghi", "Output incostante, funnel assente"], note: "Buona pedagogia, ma non converte." },
  { id: "cmp8", handle: "@cesco.fx", role: "TONO · AUTHORITY", country: "IT", virality: 30, conversion: 55, authority: 80, followers: "12k", verified: false, frequency: "ogni 1-2 gg", lang: "IT",
    types: ["Long-form SMC 60-176s"], pattern: "Hook-domanda → spiegazione lunga sul grafico → CTA soft compliant",
    hooks: ["Prendi stop e poi il trade riparte? Attento a questa conformazione", "La regola NR.1 in questo mondo"], cta: "Seguimi / link in bio + percorso gratuito",
    replicate: ["Profondità didattica in italiano", "CTA compliant ('vivere sereni')", "Hook-domanda"], exclude: ["Durata 100-176s (killer di reach)", "Hook poco scroll-stopping"], note: "Unico italiano serio: da comprimere in short-form. È il nostro peer più vicino." },
  { id: "cmp9", handle: "@ripstrades", role: "REACH / FUNNEL", virality: 35, conversion: 50, authority: 45, followers: "70k", verified: true, frequency: "giornaliera", lang: "EN",
    types: ["Vlog poker + trading (NQ)"], pattern: "Free value + community, ma diluito dal poker",
    hooks: ["My Daily NQ Levels are FREE", "Stop copying other traders"], cta: "Follow to learn stocks & futures",
    replicate: ["'I livelli sull'oro di oggi, gratis'", "Community come edge"], exclude: ["Crossover poker (diluizione off-niche)"], note: "70k follower ma reach bassa: il poker disperde il focus." },
  { id: "cmp10", handle: "@goldpipssignal", role: "GOLD · CONTROESEMPIO", mark: "warn", virality: 15, conversion: 35, authority: 30, followers: "1k", verified: true, frequency: "alta", lang: "EN",
    types: ["Clip AI 5s", "Post generici"], pattern: "Contenuti AI generici + hashtag-stuffing + off-topic",
    hooks: ["What is Forex?", "12 Market Truths"], cta: "Comment GOLD + link in bio",
    replicate: ["Nulla — è un modello di ciò che NON fare"], exclude: ["Clip 5s AI + hashtag spam = 11-200 plays nonostante verificato"], note: "Verificato + 1k follower ma reach morta: genericità + spam = zero." },
  { id: "cmp11", handle: "@goldtraderminko_", role: "CONTROESEMPIO · vanity metrics", mark: "warn", virality: 12, conversion: 20, authority: 15, followers: "42k", verified: true, frequency: "quotidiana", lang: "EN",
    types: ["Promo bot 8-17s"], pattern: "Caption identica 'GTM EA robot' su ogni singolo post",
    hooks: ["Try our automated trading system"], cta: "Link in bio (vendita bot)",
    replicate: ["Nulla"], exclude: ["42k follower ma ~3 like e ~600 plays a post = audience comprata, engagement morto"], note: "Lezione: il numero di follower non è qualità. Grande vetrina, pubblico inesistente." },
  { id: "cmp12", handle: "@xauusdm1", role: "CONTROESEMPIO · funnel debole", mark: "warn", virality: 18, conversion: 30, authority: 25, followers: "7k", verified: false, frequency: "quotidiana", lang: "ES",
    types: ["Copy trade + gimmick lotteria 'XAULOT'"], pattern: "Sorteo/pozo + hashtag copy/telegram",
    hooks: ["XAULOT, el pozo está en 63 $GRAM"], cta: "Copy trade + Telegram",
    replicate: ["Nulla (il funnel copy+Telegram è on-model ma non performa)"], exclude: ["Reach debole (51-1.009 plays)", "Gimmick lotteria"], note: "Funnel giusto sulla carta, esecuzione e reach deboli." },
  { id: "cmp13", handle: "@lorenzocorradofx", role: "AUTHORITY · Futures/SMC", virality: 44, conversion: 55, authority: 74, followers: "87.5k", verified: true, frequency: "quotidiana (live NY)", lang: "EN",
    types: ["Educativo SMC 41-67s", "COT / smart money"], pattern: "Concetti istituzionali (COT data, smart money, key levels, demand zone) su screen",
    hooks: ["Institutions don't trade the way you've been taught (COT data)", "Most traders enter too early — watch this"], cta: "FREE LTA E-Book (link in bio) + Live Day Trading NY",
    replicate: ["Angolo 'smart money/istituzionale' che dà autorevolezza", "Lead magnet gratuito (e-book) come funnel"], exclude: ["Reel 41-67s + gergo COT/istituzionale: barriera per principianti, reach schiacciata su 87k follower"], note: "87,5k follower ma reach modesta (best 14k views): tecnico-avanzato e reel lunghi. Autorevole, non virale." },
  { id: "cmp14", handle: "@jorge_torresfx", role: "MINDSET · GOLD-adjacent", country: "MX", virality: 28, conversion: 48, authority: 55, followers: "5.2k", verified: false, frequency: "quotidiana", lang: "ES",
    types: ["XAUUSD 3M short-form", "Psicologia / storytelling"], pattern: "XAUUSD short-form (19-25s) + mindset motivazionale, tono compliant ('no prometemos ganancias')",
    hooks: ["Nadie te habla de esto cuando empiezas (psicologia)", "XAU/USD: tu trabajo no es adivinar, es adaptarte"], cta: "Mentoría Método M35 (compliant)",
    replicate: ["Mix XAUUSD short-form + mindset emotivo (alta identificazione)", "Tono compliant 'insegniamo il processo, non promettiamo guadagni'"], exclude: ["Account piccolo (5k) e spagnolo: reach bassa", "Qualche reel lungo (61s) che affossa la reach"], note: "Piccolo (5k) ma on-model: XAUUSD short-form + psicologia, in modo compliant. Buon esempio di TONO, non di reach." },
  { id: "cmp15", handle: "@gold_trader_su", role: "GOLD · REACH", mark: "star", virality: 92, conversion: 55, authority: 45, followers: "76.8k", verified: true, frequency: "a raffica", lang: "EN",
    types: ["Mindset/relatable 9-16s", "One-liner-domanda + audio trending"], pattern: "One-liner relatable a schermo (scuola, scelte, vita) + #xauusd → reach virale, funnel Telegram in bio",
    hooks: ["Teacher was wrong?", "Plan A or Plan B, which one you will choose?"], cta: "Link in bio (Telegram) + comment-to-DM via admin",
    replicate: ["Reel mindset ultra-corti (9-16s) taggati #xauusd come motore di reach top-of-funnel", "One-liner-domanda a schermo che ferma lo scroll ('Plan A o Plan B?')", "Bio compliant 'free analysis for beginners · precision over hype' + funnel Telegram"], exclude: ["Contenuto generico non-GOLD (mindset universale): reach altissima ma poco qualificata sul metodo oro", "Caption spoglie (#instagood #instagram): pubblico ampio ma non targettizzato XAUUSD"], note: "Scoperta Apify (13 Lug): reach machine GOLD-adjacent (76,8k, verificato). Reel 9-16s da 400k-877k plays, uno con 66k like. Da rubare la MECCANICA di reach del mindset ultra-corto taggato XAUUSD, non il contenuto generico. Funnel Telegram in bio (analisi gratis per principianti)." },
  { id: "cmp16", handle: "@persaxu", role: "GOLD · AUTHORITY", mark: "star", country: "CO", virality: 84, conversion: 68, authority: 76, followers: "14.1k", verified: false, frequency: "incostante (pivot su tool)", lang: "EN",
    types: ["Educativo ICT/SMC 20-57s (sessioni, liquidità)", "Promo tool algoritmico (liqu.app)"], pattern: "UN concetto ICT/SMC su GOLD in short-form (NY session, liquidità, ritracciamento London) → reach virale + comment-to-DM 'Commenta Gold'",
    hooks: ["Pay close attention to this (NY PM session & liquidità)", "Comment 'Gold' to get The Blueprint"], cta: "Comment-to-DM ('Commenta Gold/Profits') → Blueprint (corso a pagamento)",
    replicate: ["Educativo GOLD short-form su UN concetto tecnico (sessioni, liquidità, London retrace) reso semplice", "Comment-to-DM 'Commenta ORO' come motore di conversione", "Reach virale (200k-536k) con oro tecnico ma accessibile"], exclude: ["Vendita di un 'Blueprint'/corso: noi siamo anti-guru con funnel Telegram GRATUITO", "Claim hype 'tool 100% accuracy' e '$1M secrets' = non compliant", "Pivot recente sulla promo del proprio tool (liqu.app): reach crollata a poche centinaia di plays"], note: "Scoperta Apify (13 Lug): vero educatore GOLD/XAUUSD (14,1k, CO). Reel 20-57s su ICT/liquidità/sessioni NY da 213k-536k plays (uno 18,6k like): prova che l'oro tecnico spiegato semplice in short-form sfonda, col comment-to-DM. Prendere il format educativo+funnel, lasciare corso a pagamento e claim hype." },
  { id: "cmp17", handle: "@snipexau", role: "CONVERSION · NON COPIABILE", mark: "warn", country: "UK", virality: 30, conversion: 72, authority: 35, followers: "39.9k", verified: true, frequency: "quasi giornaliera", lang: "EN",
    types: ["Reel funnel 15-40s (comment-to-DM)", "Short-form 'trade with me'"], pattern: "Comment-to-DM 'Comment LIVE' su OGNI post → community / 1:1 live trading; hook 'trade with me daily'",
    hooks: ["Do these 5 things (Comment 'live' to trade live with me)", "What if it actually worked?"], cta: "Comment-to-DM 'Comment LIVE' → community / 1:1 (Telegram in bio)",
    replicate: ["Comment-to-DM disciplinato su OGNI post ('Commenta ORO') come motore di conversione", "I reel con VALORE ('Do these 5 things') fanno ×3 la reach dei reel di sola-CTA: mettere sempre un contenuto, non solo l'invito"], exclude: ["Claim di reddito in bio ('How I made 150,000+ last month') = zero compliance per noi e Meta, come moneymax", "Caption CTA identiche clonate su ogni post: uccidono reach/SEO", "Reach debolissima nonostante 39,9k verificato (reel 2k-15k plays): il follower-count verificato non è reach"], note: "Tracciato su richiesta (Apify 13 Lug): 39,9k, verificato, XAU-branded. Funnel comment-to-DM ultra-disciplinato ('Comment LIVE') ma bio con claim di reddito ('150k last month') = NON copiabile. Reach modesta (best 15k plays). Prendere SOLO la meccanica del comment-to-DM e il fatto che i reel con valore battono quelli di pura CTA." },
  { id: "cmp18", handle: "@callisto_fxtrades", role: "FOREX · FUNNEL", mark: "warn", virality: 45, conversion: 76, authority: 65, followers: "115k", verified: true, frequency: "quotidiana", lang: "EN",
    types: ["Reel educativi/relatable 14-45s", "Hook super-condivisibili ('Send this to...')"], pattern: "Educazione forex/XAUUSD short-form + hook condivisibile → funnel a community GRATUITA (121k) + 'Follow for value'; sistema multi-account con @madebynickolas/@madebyleonard",
    hooks: ["SEND THIS TO YOUR FRIEND WHO REFUSES TO SL", "Follow for more value"], cta: "Join FREE community (121k, Telegram) + Follow for value",
    replicate: ["Hook condivisibile 'Manda questo a un amico che...' come leva di share/reach", "Funnel a community GRATUITA come asset centrale (121k iscritti)", "Sistema multi-account: brand-madre + profili personali mindset che alimentano lo stesso funnel"], exclude: ["Claim di reddito in bio ('Turned $100k into $7M trading LIVE') = non compliant per noi e Meta", "Social proof gonfiato ('13.000 testimonials')", "Reach modesta per la size (reel 5-7k plays su 115k): il numero non è engagement"], note: "Tracciato su richiesta (Apify 13 Lug): 115k, verificato, Education forex/XAUUSD. Grande macchina di funnel a community gratuita con hook condivisibili; bio con claim di reddito → NON copiabile nel framing. Da rubare l'hook 'send this to a friend' e il funnel a community, non il flex. NB: l'handle richiesto 'callistofx_trades' non esiste, quello reale è callisto_fxtrades." },
  { id: "cmp19", handle: "@madebynickolas", role: "MINDSET · personal brand", mark: "warn", virality: 18, conversion: 55, authority: 40, followers: "2.4k", verified: true, frequency: "quotidiana", lang: "EN",
    types: ["Carosello mindset/story", "Personal brand dietro il brand-madre"], pattern: "Mindset/storytelling personale ('$100k→$7M journey', 'try fail win', 'X errori') → umanizza il brand e spinge la stessa community gratuita di @callisto_fxtrades",
    hooks: ["10 mistakes that keep you poor in trading", "How to actually win in trading"], cta: "Join FREE community (Telegram) + Follow the journey",
    replicate: ["Profilo personale 'mindset & vita' che umanizza il brand-madre e converte sullo stesso funnel", "Carosello 'X errori/lezioni' salvabile (save-bait) con CTA 'save & reread after your next loss'"], exclude: ["Claim di reddito '$100k → $7M' in bio (non compliant)", "Engagement debole (3-55 like su 2,4k verificato): personal brand ancora piccolo"], note: "Tracciato su richiesta (Apify 13 Lug): Nick (2,4k, verificato), 1 dei 2 founder di @callisto_fxtrades. Caroselli motivazionali/storytelling che umanizzano il brand. La lezione è il SISTEMA multi-account (brand-madre + personal brand sullo stesso funnel), non i numeri (piccoli)." },
  { id: "cmp20", handle: "@dovy.fx", role: "METALLI · REACH", virality: 80, conversion: 60, authority: 58, followers: "303k", verified: true, frequency: "quotidiana", lang: "EN",
    types: ["Carosello lifestyle aspirazionale", "Reel strategia occasionale (comment-to-DM)"], pattern: "Lifestyle aspirazionale (jet, Dubai, 'life of a hybrid trader') come motore di reach → comment-to-DM 'Comment CVD' / DM 'READY' verso tool AI (hybridtrader.ai)",
    hooks: ["Comment 'CVD' to learn full strategy", "I guess I know something you don't"], cta: "Comment-to-DM 'CVD' / DM 'READY' → hybridtrader.ai (tool AI)",
    replicate: ["Lifestyle come leva di reach — nel nostro caso SOBRIO, non flex: la vita dietro i mercati umanizza e attira", "Comment-to-DM su una keyword ('Commenta ORO') verso il funnel", "Un post lifestyle può fare ×10-40 la reach di un post tecnico: alternare valore e vita"], exclude: ["Flex aspirazionale spinto (jet privati, 'double or nothing'): fuori dal nostro tono compliant/sobrio", "Funnel a tool AI a pagamento invece che a community gratuita", "Non è GOLD-specifico (indici & metalli, per lo più lifestyle)"], note: "Tracciato su richiesta (Apify 13 Lug; l'handle reale è dovy.fx, non 'dovyfx'): 303k, verificato, indici & metalli (gold-adjacent). Reach enorme trainata dal LIFESTYLE (un carosello 547k like) più reel-strategia col comment-to-DM. Rubare: il lifestyle come amplificatore di reach (ma sobrio) e il comment-to-DM; lasciare il flex e il funnel-tool." },
  { id: "cmp21", handle: "@dovy.fxtrading", role: "FLEX/LIFESTYLE · NON COPIABILE", mark: "warn", virality: 25, conversion: 50, authority: 35, followers: "46.9k", verified: false, frequency: "dormante (post fermi al 2023)", lang: "EN",
    types: ["Flex/lifestyle 2023 (soldi, orologi, viaggi)", "Reel corti forex/stock options"], pattern: "Flex aspirazionale (stack of money, orologio da $80k, Barcellona) + income claim '7-figure' → link in bio a stock options/corso; account DORMANTE",
    hooks: ["Is this how rich dudes on IG take pictures?", "Need advice? Here. No more time for excuses"], cta: "Link in bio (dovyfx.com) → stock options / corso",
    replicate: ["Nulla di diretto: è il 'prima' flex di Dovy. Utile come CONTRASTO col profilo maturo @dovy.fx (303k), che ha spostato la reach su lifestyle sobrio + strategia"], exclude: ["Income claim '7-figure portfolio' + flex (orologio da $80k, stack of money) = zero compliance", "Account dormante (post fermi al 2023): non è più un modello attivo", "Funnel a stock options/corso invece che a community gratuita"], note: "Tracciato su richiesta (Apify 13 Lug): account SECONDARIO e DORMANTE di Dovydas Pinskus (46,9k, non verificato, ultimi post 2023). Flex/lifestyle + income claim '7-figure' + stock options → NON copiabile. Il suo profilo attuale e attivo è @dovy.fx (303k). Vale come controesempio del 'prima' flex vs il 'dopo' più maturo." },
  { id: "cmp22", handle: "@daytradergoldsister", role: "GOLD · NON COPIABILE", mark: "warn", country: "HK", virality: 18, conversion: 55, authority: 30, followers: "3k", verified: false, frequency: "incostante", lang: "ZH",
    types: ["Flex risultati + promo broker (Vantage)", "Post statici in cantonese"], pattern: "Day trading oro (HK) con flex risultati ('15 su 16, +15k$') + affiliate broker Vantage (codice referral, deposito 40k HKD) + funnel 'Free VIP Group' Telegram",
    hooks: ["'Quanto è forte la strategia della Gold Sister?' (cantonese)", "'Oggi 15 su 16, +15.195$' (flex risultati)"], cta: "Free VIP Group (Telegram) previo apri-conto broker con referral",
    replicate: ["Nulla di diretto: il funnel a community gratuita è on-model, ma qui è solo un veicolo per l'affiliazione broker e il flex"], exclude: ["Flex risultati ('+15.195$', 'capitale raddoppiato') = income claim non compliant per noi e Meta", "Affiliate broker (Vantage, codice referral, deposito 40k HKD): conflitto d'interesse, off-model", "Reach/engagement bassissimi (0-40 like su 3k): il funnel spinto non genera community reale"], note: "Tracciato su richiesta (Apify 13 Lug): day trader oro di Hong Kong (3k, cantonese). GOLD-focused ma modello NON copiabile: flex risultati + affiliate broker Vantage + VIP group, engagement morto. Conferma che flex+affiliate non è la strada; noi restiamo educativi/compliant col funnel Telegram gratuito." },
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
  // Metriche non tracciabili finché non c'è il bot:
  newDaily: null, newWeekly: null, newMonthly: null, growthPct: null,
  correlation: [], // si popola quando la campagna parte (20 Lug) + tracking attivo
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
    "Engagement medio 4,8% su 27,6k follower = buona reach organica per lanciare la serie GOLD dal 20 Lug.",
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
  CONTENT, PRODUCTION_GENERIC, COMPETITORS, IG_ANALYTICS, TELEGRAM, REPORT_SUGGESTIONS,
};
