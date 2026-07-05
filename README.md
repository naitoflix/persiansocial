# Persian FX — Social Activities · Dashboard

Centro operativo del progetto editoriale **GOLD (XAUUSD)** di Persian FX.
Web app statica, self-contained, tema **Dark** di default con switch **Light/Dark**
(in alto a destra). Palette **viola + cyano** con accenti **verde trading**.

## Come aprirla

**Opzione 1 — doppio click**
Apri `index.html` direttamente nel browser. Funziona anche offline: nessuna dipendenza esterna.

**Opzione 2 — server locale (consigliato)**
Dal pannello *Launch* di Claude Code è già configurato il server `persian-fx`
(vedi `.claude/launch.json`). In alternativa, da PowerShell:

```powershell
powershell -NoProfile -File persian-fx-dashboard/serve.ps1 -Port 5177
# poi apri http://localhost:5177/
```

## Sezioni

| Sezione | Cosa mostra |
|---|---|
| **Dashboard** | KPI Instagram + funnel Telegram, obiettivo mensile, grafici crescita/reach, stato produzione |
| **Calendario Editoriale** | Vista mensile con card contenuto e stato (6 stati del flusso) |
| **Shooting Planner** | Checklist del girato del mese, raggruppata, con avanzamento |
| **Content Library** | Archivio contenuti: hook, script, caption, CTA, stato, metriche |
| **Competitor Analysis** | 9 competitor: virality, pattern, hook, CTA, idee da replicare/escludere |
| **Analytics** | Metriche profilo IG + dettaglio per Reel |
| **Telegram Tracking** | Crescita gruppo gratuito + correlazione contenuti → ingressi |
| **Report** | Report settimanale/mensile + suggerimenti Agent FX + idee da testare |

## Stati del flusso di produzione

`Da Registrare → In Montaggio → Da Revisionare → Programmato → Pubblicato → Da Analizzare`

Lo stato di ogni contenuto è modificabile (click sulla card → select nel modale) e viene
**salvato in automatico** nel browser (`localStorage`), come le spunte dello Shooting Planner
e la preferenza tema.

## Struttura del progetto

```
persian-fx-dashboard/
├─ index.html              # shell dell'app
├─ assets/
│  ├─ css/styles.css       # tema, palette, layout, responsive
│  └─ js/
│     ├─ data.js           # DATI (seed dal Piano Editoriale) — modificare qui
│     ├─ charts.js         # grafici SVG (nessuna libreria)
│     └─ app.js            # router, viste, persistenza, modale
├─ serve.ps1               # server statico locale (PowerShell)
└─ .claude/launch.json     # config preview
```

## Collegare i dati reali

Tutte le metriche in `assets/js/data.js` sono **seed** derivati dal Piano Editoriale.
La struttura è già pronta a ricevere dati live — basta sovrascrivere gli oggetti:

- **Instagram** (`KPIS`, `IG_ANALYTICS`, `SERIES`): popolabili via **Apify Instagram Scraper**
  sul profilo [`@iipersian`](https://www.instagram.com/iipersian/). Lettura periodica → aggiornamento ad ogni sync.
- **Competitor** (`COMPETITORS`): teardown dei 9 competitor via Apify (Virality/Pattern/Hook ricalcolati sui dati reali).
- **Telegram** (`TELEGRAM`): il numero di ingressi **non** è ricavabile da un semplice link d'invito.
  Servono un **bot amministratore** nel gruppo (Bot API / MTProto) per leggere gli eventi di ingresso,
  oppure l'aggiornamento manuale del dato.

## Compliance

Nessuna promessa di guadagno, nessuna cifra di profitto, nessun lusso ostentato.
Ogni contenuto ha finalità informativa/educativa (disclaimer di rischio presente in dashboard).
