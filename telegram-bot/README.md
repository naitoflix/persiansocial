# Persian FX — Bot Telegram (iscritti reali)

Bot amministratore che legge il **numero reale di iscritti** del gruppo Telegram
via Bot API e aggiorna il file che la dashboard consuma
(`persian-fx-dashboard/assets/data/telegram.json`), costruendo lo **storico
giorno-per-giorno** per il grafico di crescita.

> Perché serve un bot: un link d'invito privato (`t.me/+…`) **non** espone il
> conteggio iscritti. Con il bot admin nel gruppo, l'endpoint `getChatMemberCount`
> restituisce il numero reale in ogni momento.

## Setup (una tantum, ~3 minuti)

**1. Crea il bot**
Su Telegram apri **@BotFather** → `/newbot` → scegli nome e username →
ti dà un **TOKEN** tipo `8123456789:AAH...`.

**2. Aggiungi il bot al gruppo come amministratore**
Gruppo → *Aggiungi membri* → cerca il tuo bot → poi *Amministratori* →
aggiungilo come admin (bastano permessi di lettura).

**3. Trova il `chatId`**
Scrivi un messaggio qualsiasi nel gruppo, poi da questa cartella:
```powershell
.\persian-tg-bot.ps1 -Discover
```
Stampa gli id visibili (il gruppo è un numero negativo tipo `-1001234567890`).

**4. Configura**
Copia `config.example.json` in `config.json` e inserisci `token` e `chatId`.
```powershell
Copy-Item config.example.json config.json   # poi modifica config.json
```

## Uso

```powershell
.\persian-tg-bot.ps1
```
Legge gli iscritti reali e aggiorna `assets/data/telegram.json`
(accodando un punto di storico per la data odierna).

La dashboard, quando è servita dal server locale, legge quel file all'avvio:
il **numero iscritti** e il **grafico di crescita** si aggiornano da soli.

## Aggiornamento automatico (giornaliero)

Registra un'attività pianificata di Windows (esegue ogni giorno alle 20:00):
```powershell
$dir = (Get-Location).Path
schtasks /Create /SC DAILY /ST 20:00 /TN "PersianFX-Telegram" `
  /TR "powershell -NoProfile -File `"$dir\persian-tg-bot.ps1`""
```
Più giorni accumulati = grafico di crescita più ricco e delta *nuovi
oggi / settimana / mese* calcolati automaticamente.

## Cosa scrive nel JSON

```json
{
  "current": 2551,
  "title": "Nome gruppo",
  "updatedAt": "06/07/2026 20:00",
  "link": "https://t.me/+EjGqKLKqfck5ZWI8",
  "history": [ { "date": "2026-07-06", "count": 2551 } ],
  "correlation": []
}
```

## Note & limiti
- `getChatMemberCount` dà il **totale** iscritti, non chi è entrato da uno
  specifico Reel. Per la **correlazione contenuto → ingressi** servirebbero
  link d'invito dedicati per contenuto (uno per Reel) e `getChatInviteLink` /
  eventi `chat_member`: se ti serve, lo aggiungo.
- Il token è un segreto: `config.json` va tenuto privato (non committarlo).
- Richiede solo PowerShell (già presente su Windows). Nessun Node/Python.
