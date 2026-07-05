<#
  Persian FX — Telegram tracker bot
  --------------------------------------------------------------------------
  Legge il numero REALE di iscritti del gruppo Telegram via Bot API
  (getChatMemberCount) e aggiorna il file JSON che la dashboard consuma
  (persian-fx-dashboard/assets/data/telegram.json), accodando lo storico
  giorno-per-giorno per il grafico di crescita.

  PREREQUISITI (una tantum):
    1. Su Telegram apri @BotFather → /newbot → ottieni il TOKEN.
    2. Aggiungi il bot al gruppo e rendilo AMMINISTRATORE.
    3. Trova il chat id:  .\persian-tg-bot.ps1 -Discover
       (scrivi un messaggio nel gruppo, poi rilancia: stampa gli id disponibili)
    4. Copia config.example.json in config.json e inserisci token + chatId.

  USO:
    .\persian-tg-bot.ps1                 # legge config.json e aggiorna il JSON
    .\persian-tg-bot.ps1 -Discover       # elenca i chat id visti dal bot
    .\persian-tg-bot.ps1 -Token "123:ABC" -ChatId "-1001234567890"

  SCHEDULARE (aggiornamento giornaliero automatico):
    schtasks /Create /SC DAILY /ST 20:00 /TN "PersianFX-Telegram" ^
      /TR "powershell -NoProfile -File \"%CD%\persian-tg-bot.ps1\""
#>
param(
  [string]$Token,
  [string]$ChatId,
  [switch]$Discover,
  [string]$OutFile
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# --- Carica config.json se i parametri non sono passati ---------------------
$cfgPath = Join-Path $root "config.json"
if ((-not $Token -or -not $ChatId) -and (Test-Path $cfgPath)) {
  $cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
  if (-not $Token)  { $Token  = $cfg.token }
  if (-not $ChatId) { $ChatId = $cfg.chatId }
  if (-not $OutFile -and $cfg.outFile) { $OutFile = $cfg.outFile }
}
if (-not $OutFile) {
  $OutFile = Join-Path $root "..\persian-fx-dashboard\assets\data\telegram.json"
}
if (-not $Token) { Write-Error "Token mancante. Vedi README / config.json."; exit 1 }

$api = "https://api.telegram.org/bot$Token"

# --- Modalità Discover: elenca i chat id visti dal bot ----------------------
if ($Discover) {
  $r = Invoke-RestMethod -Uri "$api/getUpdates" -Method Get
  if (-not $r.ok) { Write-Error "getUpdates fallito"; exit 1 }
  if (-not $r.result -or $r.result.Count -eq 0) {
    Write-Host "Nessun update. Scrivi un messaggio nel gruppo (o ri-aggiungi il bot) e riprova."
    exit 0
  }
  Write-Host "Chat visibili dal bot:"
  $seen = @{}
  foreach ($u in $r.result) {
    $chat = $null
    if ($u.message)          { $chat = $u.message.chat }
    elseif ($u.my_chat_member){ $chat = $u.my_chat_member.chat }
    elseif ($u.channel_post) { $chat = $u.channel_post.chat }
    if ($chat -and -not $seen.ContainsKey($chat.id)) {
      $seen[$chat.id] = $true
      "{0,-16} {1,-12} {2}" -f $chat.id, $chat.type, $chat.title
    }
  }
  exit 0
}
if (-not $ChatId) { Write-Error "ChatId mancante. Lancia con -Discover per trovarlo."; exit 1 }

# --- Legge il numero reale di iscritti --------------------------------------
$countResp = Invoke-RestMethod -Uri "$api/getChatMemberCount?chat_id=$ChatId" -Method Get
if (-not $countResp.ok) { Write-Error "getChatMemberCount fallito: $($countResp.description)"; exit 1 }
$count = [int]$countResp.result

$title = $null
try {
  $chatResp = Invoke-RestMethod -Uri "$api/getChat?chat_id=$ChatId" -Method Get
  if ($chatResp.ok) { $title = $chatResp.result.title }
} catch {}

Write-Host "Iscritti attuali: $count $(if($title){"($title)"})"

# --- Aggiorna il JSON consumato dalla dashboard -----------------------------
$today = (Get-Date).ToString("yyyy-MM-dd")
$nowStr = (Get-Date).ToString("dd/MM/yyyy HH:mm")

$data = [ordered]@{ current = $count; title = $title; updatedAt = $nowStr; link = "https://t.me/+EjGqKLKqfck5ZWI8"; history = @(); correlation = @() }
if (Test-Path $OutFile) {
  try {
    $prev = Get-Content $OutFile -Raw | ConvertFrom-Json
    if ($prev.history) { $data.history = @($prev.history) }
    if ($prev.correlation) { $data.correlation = @($prev.correlation) }
  } catch {}
}

# una voce di storico per giorno (aggiorna quella di oggi se già presente)
$hist = [System.Collections.ArrayList]@()
$found = $false
foreach ($h in $data.history) {
  if ($h.date -eq $today) { [void]$hist.Add([ordered]@{ date = $today; count = $count }); $found = $true }
  else { [void]$hist.Add($h) }
}
if (-not $found) { [void]$hist.Add([ordered]@{ date = $today; count = $count }) }
$data.history = @($hist | Sort-Object { $_.date })

$dir = Split-Path -Parent $OutFile
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
$data | ConvertTo-Json -Depth 6 | Out-File -FilePath $OutFile -Encoding utf8
Write-Host "Aggiornato: $OutFile ($($data.history.Count) punti di storico)"
