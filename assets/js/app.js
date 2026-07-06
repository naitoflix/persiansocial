/* ==========================================================================
   Persian FX — Social Activities · App (SPA vanilla, no build step)
   Router hash-based · stato persistente in localStorage · charts SVG
   ========================================================================== */
(function () {
  const D = window.PFX;
  const C = window.PFXCharts;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (id) => document.getElementById(id);
  const fmt = C.fmt;
  const num = (n) => n.toLocaleString("it-IT");

  /* -------------------------- Stato persistente ------------------------- */
  const LS_KEY = "pfx-state-v1";
  const state = loadState();

  function loadState() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) {}
    return {
      theme: saved.theme || "dark",
      contentStatus: saved.contentStatus || {},   // { id: statusKey }
      shooting: saved.shooting || {},              // { itemId: bool }
      report: saved.report || "settimanale",
    };
  }
  function save() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }

  function statusOf(id) {
    const base = D.CONTENT.find((c) => c.id === id);
    return state.contentStatus[id] || (base && base.status) || "da-registrare";
  }
  function statusMeta(key) { return D.STATUSES.find((s) => s.key === key) || D.STATUSES[0]; }
  function shootDone(itemId, fallback) {
    return itemId in state.shooting ? state.shooting[itemId] : fallback;
  }

  /* ---- Finestra "ultimo mese": ultimi 30gg dall'ultimo contenuto reale ---- */
  function monthlyStats() {
    const items = (D.IG_ANALYTICS.published || []).slice();
    const empty = { win: [], reels: [], carousels: [], count: 0, reels_n: 0, views: 0, plays: 0, likes: 0, comments: 0, engagement: 0, avgViews: 0, from: 0, to: 0 };
    if (!items.length) return empty;
    const t = (d) => Date.parse(d + "T00:00:00Z");
    const maxT = Math.max.apply(null, items.map((i) => t(i.date)));
    const fromT = maxT - 30 * 86400000;
    const win = items.filter((i) => t(i.date) >= fromT).sort((a, b) => t(a.date) - t(b.date));
    const reels = win.filter((i) => i.type === "Reel");
    const carousels = win.filter((i) => i.type === "Carosello");
    const views = reels.reduce((s, r) => s + (r.views || 0), 0);
    const plays = reels.reduce((s, r) => s + (r.plays || 0), 0);
    const likes = win.reduce((s, r) => s + (r.likes || 0), 0);
    const comments = win.reduce((s, r) => s + (r.comments || 0), 0);
    const engagement = reels.length
      ? reels.reduce((s, r) => s + ((r.likes + r.comments) / (r.views || 1)) * 100, 0) / reels.length
      : 0;
    return {
      win, reels, carousels, count: win.length, reels_n: reels.length,
      views, plays, likes, comments, engagement: +engagement.toFixed(1),
      avgViews: reels.length ? Math.round(views / reels.length) : 0, from: fromT, to: maxT,
    };
  }

  function resolveKpiValue(k, M) {
    if (!k.dyn) return k;
    const map = { count: M.count, reels: M.reels_n, views: M.views, plays: M.plays, likes: M.likes, comments: M.comments, engagement: M.engagement };
    return Object.assign({}, k, { value: map[k.dyn] });
  }

  function fmtRange(fromT, toT) {
    if (!toT) return "—";
    return new Date(fromT).toLocaleDateString("it-IT", { day: "2-digit", month: "short" }) +
      " – " + new Date(toT).toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" });
  }

  /* ------------------------------ Router -------------------------------- */
  const ROUTES = [
    { id: "dashboard", label: "Dashboard", ico: "◆", render: viewDashboard },
    { id: "calendario", label: "Calendario Editoriale", ico: "▦", render: viewCalendar },
    { id: "shooting", label: "Shooting Planner", ico: "🎥", render: viewShooting },
    { id: "library", label: "Content Library", ico: "▤", render: viewLibrary },
    { id: "competitor", label: "Competitor Analysis", ico: "⚔", render: viewCompetitors },
    { id: "analytics", label: "Analytics", ico: "📈", render: viewAnalytics },
    { id: "telegram", label: "Telegram Tracking", ico: "✈", render: viewTelegram },
    { id: "report", label: "Report", ico: "📄", render: viewReport },
  ];

  function currentRoute() {
    const h = location.hash.replace("#/", "") || "dashboard";
    return ROUTES.find((r) => r.id === h) || ROUTES[0];
  }

  function router() {
    const r = currentRoute();
    $("#pageTitle").textContent = r.label;
    $("#pageSub").textContent = "";
    document.querySelectorAll(".nav-item").forEach((n) =>
      n.classList.toggle("active", n.dataset.route === r.id)
    );
    const c = $("#content");
    c.innerHTML = `<div class="view">${r.render()}</div>`;
    if (r.afterRender) r.afterRender();
    bindViewEvents(r.id);
    closeSidebar();
    c.scrollTop = 0; window.scrollTo(0, 0);
  }

  /* ============================ VIEWS =================================== */

  /* -- Dashboard --------------------------------------------------------- */
  function kpiCard(k) {
    if (k.na) {
      return `<div class="kpi na">
        <div class="label">${k.label}</div>
        <div class="value" style="color:var(--text-mute);font-size:22px">N/D</div>
        <div class="delta flat" title="${k.note || ''}"><span>🔒</span> ${k.note || "non disponibile"}</div>
      </div>`;
    }
    const val = k.unit === "%" ? k.value.toFixed(1) + "%" : num(k.value);
    let deltaHtml;
    if (typeof k.delta === "number") {
      let cls = "flat", arrow = "→";
      if (k.delta > 0) { cls = "up"; arrow = "▲"; }
      else if (k.delta < 0) { cls = "down"; arrow = "▼"; }
      const deltaTxt = k.delta === 0 ? "stabile" : `${Math.abs(k.delta)}%`;
      deltaHtml = `<div class="delta ${cls}"><span>${arrow}</span> ${deltaTxt}</div>`;
    } else if (k.note) {
      deltaHtml = `<div class="delta flat">${k.note}</div>`;
    } else {
      deltaHtml = "";
    }
    return `<div class="kpi">
      <div class="label">${k.label}</div>
      <div class="value grad">${val}</div>
      ${deltaHtml}
    </div>`;
  }

  function viewDashboard() {
    const M = monthlyStats();
    const groups = {
      crescita: "Crescita",
      produzione: "Produzione",
      performance: "Performance (ultimo mese)",
      engagement: "Engagement (ultimo mese)",
      funnel: "Funnel → Telegram",
    };
    let kpiHtml = "";
    Object.keys(groups).forEach((g) => {
      const items = D.KPIS.filter((k) => k.group === g);
      if (!items.length) return;
      kpiHtml += `<div class="kpi-group-label">${groups[g]}</div>`;
      kpiHtml += items.map((k) => kpiCard(resolveKpiValue(k, M))).join("");
    });

    const goalPct = (D.MONTHLY_GOAL.current / D.MONTHLY_GOAL.target) * 100;
    const reelLabels = M.reels.map((r) => new Date(r.date).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" }));
    const hasReels = M.reels.length > 0;

    return `
      <div class="notice" style="margin-bottom:16px"><span class="ni">📅</span>
        <div>Statistiche <b>ultimo mese</b> · finestra <b>${fmtRange(M.from, M.to)}</b> (ultimi 30 giorni dall'ultimo contenuto pubblicato). Scorre in automatico quando escono nuovi contenuti.</div>
      </div>

      <div class="grid kpi-grid">${kpiHtml}</div>

      <div class="grid mt-lg cols-chart">
        <div class="card card-pad">
          <div class="chart-head">
            <div class="t">Views per Reel — ultimo mese</div>
            <div class="v">${D.BRAND.igHandle}</div>
          </div>
          ${hasReels
            ? `<div class="chart-wrap">${C.area(M.reels.map((r) => r.views || 0), { labels: reelLabels, colors: ["#22d3ee"], height: 210, zeroBase: true })}</div>
               <div class="legend"><span><i style="background:#22d3ee"></i>Visualizzazioni Reel — dato pubblico reale</span></div>`
            : `<div class="muted center" style="padding:46px 10px">Nessun Reel nell'ultimo mese.</div>`}
        </div>

        <div class="card goal-card">
          <div class="ring">${C.ring(goalPct, { label: "DEL TARGET", size: 148 })}</div>
          <div class="goal-meta">
            <div class="goal-big">${num(D.MONTHLY_GOAL.current)}<span class="muted" style="font-size:18px">/${num(D.MONTHLY_GOAL.target)}</span></div>
            <div class="goal-sub">${D.MONTHLY_GOAL.label}</div>
            <div class="goal-note">${D.MONTHLY_GOAL.sub}</div>
          </div>
        </div>
      </div>

      <div class="grid mt-lg cols-2">
        <div class="card card-pad">
          <div class="chart-head"><div class="t">Like per Reel — ultimo mese</div><div class="v">${D.BRAND.igHandle}</div></div>
          ${hasReels
            ? `<div class="chart-wrap">${C.bars(M.reels.map((r) => r.likes), { labels: reelLabels, color: "#7c3aed", color2: "#3ce0ff", height: 200 })}</div>`
            : `<div class="muted center" style="padding:46px 10px">Nessun Reel nell'ultimo mese.</div>`}
        </div>
        <div class="card card-pad">
          <div class="section-title"><span class="bar"></span>Stato produzione contenuti</div>
          ${productionBreakdown()}
        </div>
      </div>`;
  }

  function productionBreakdown() {
    const counts = {};
    D.STATUSES.forEach((s) => (counts[s.key] = 0));
    D.CONTENT.forEach((c) => (counts[statusOf(c.id)] = (counts[statusOf(c.id)] || 0) + 1));
    const total = D.CONTENT.length;
    return D.STATUSES.map((s) => {
      const n = counts[s.key] || 0;
      const pct = total ? (n / total) * 100 : 0;
      return `<div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px">
          <span style="color:var(--text-dim)"><span class="badge" style="background:${hexA(s.color, 0.14)};color:${s.color};border-color:${hexA(s.color, 0.4)}"><span class="d" style="background:${s.color}"></span>${s.label}</span></span>
          <b style="color:var(--text)">${n}</b>
        </div>
        <div class="progress-line"><i style="width:${pct}%;background:${s.color}"></i></div>
      </div>`;
    }).join("");
  }

  /* -- Calendar ---------------------------------------------------------- */
  let calMonth = 6, calYear = 2026; // Luglio 2026 (0-indexed month)

  function viewCalendar() {
    const monthName = new Date(calYear, calMonth, 1).toLocaleDateString("it-IT", { month: "long", year: "numeric" });
    const legend = D.STATUSES.map((s) =>
      `<span class="badge" style="background:${hexA(s.color, 0.12)};color:${s.color};border-color:${hexA(s.color, 0.35)}"><span class="d" style="background:${s.color}"></span>${s.label}</span>`
    ).join("");

    return `
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button class="btn btn-icon" data-cal="prev">‹</button>
          <button class="btn btn-icon" data-cal="next">›</button>
        </div>
        <div class="cal-month">${monthName}</div>
        <button class="btn" data-cal="today">Oggi</button>
        <div class="status-legend">${legend}</div>
      </div>
      <div class="card card-pad">${calendarGrid()}</div>`;
  }

  function calendarGrid() {
    const dow = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
    let head = dow.map((d) => `<div class="cal-dow">${d}</div>`).join("");

    const first = new Date(calYear, calMonth, 1);
    let startDay = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const prevDays = new Date(calYear, calMonth, 0).getDate();
    const today = new Date();

    const byDate = {};
    D.CONTENT.forEach((c) => {
      (byDate[c.date] = byDate[c.date] || []).push(c);
    });

    let cells = "";
    // leading
    for (let i = startDay - 1; i >= 0; i--) {
      cells += `<div class="cal-cell out"><div class="cal-date">${prevDays - i}</div></div>`;
    }
    // month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isToday = today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === d;
      const events = (byDate[dateStr] || []).map((c) => {
        const s = statusMeta(statusOf(c.id));
        return `<div class="cal-event" data-content="${c.id}" style="--st:${s.color}">
          <span class="ev-id">${c.id}</span>
          <span class="ev-t">${escapeH(c.title)}</span>
          <span class="ev-m">${c.format}</span>
        </div>`;
      }).join("");
      cells += `<div class="cal-cell${isToday ? " today" : ""}"><div class="cal-date">${d}</div>${events}</div>`;
    }
    // trailing
    const totalCells = startDay + daysInMonth;
    const trailing = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= trailing; i++) {
      cells += `<div class="cal-cell out"><div class="cal-date">${i}</div></div>`;
    }
    return `<div class="calendar">${head}${cells}</div>`;
  }

  /* -- Shooting Planner -------------------------------------------------- */
  function viewShooting() {
    let totalItems = 0, doneItems = 0;
    D.SHOOTING.forEach((g) => g.items.forEach((it) => {
      totalItems++; if (shootDone(it.id, it.done)) doneItems++;
    }));
    const pct = totalItems ? (doneItems / totalItems) * 100 : 0;

    const groups = D.SHOOTING.map((g) => {
      const done = g.items.filter((it) => shootDone(it.id, it.done)).length;
      const items = g.items.map((it) => {
        const dn = shootDone(it.id, it.done);
        return `<label class="check${dn ? " done" : ""}" data-shoot="${it.id}">
          <input type="checkbox" ${dn ? "checked" : ""}/>
          <span class="box">✓</span>
          <span class="txt">${escapeH(it.label)}</span>
        </label>`;
      }).join("");
      return `<div class="card card-pad shoot-group">
        <div class="shoot-head"><span class="ic">${g.icon}</span><span class="name">${g.category}</span>
          <span class="count">${done}/${g.items.length}</span></div>
        <div class="check-list">${items}</div>
      </div>`;
    }).join("");

    return `
      <div class="card card-pad" style="margin-bottom:18px">
        <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
          <div class="grow" style="min-width:220px">
            <div class="section-title" style="margin-bottom:8px"><span class="bar"></span>Avanzamento girato del mese</div>
            <div class="progress-line" style="height:12px"><i style="width:${pct}%"></i></div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-head);font-weight:700;font-size:30px" class="value grad">${doneItems}/${totalItems}</div>
            <div class="muted" style="font-size:12px">elementi completati</div>
          </div>
        </div>
      </div>
      <div class="notice" style="margin-bottom:18px"><span class="ni">💡</span>
        <div>Registra tutto in blocco in un'unica giornata, poi si monta nel mese. Spunta ogni elemento man mano che lo giri — lo stato viene salvato in automatico.</div>
      </div>
      <div class="grid cols-2" style="align-items:start">${groups}</div>`;
  }

  /* -- Content Library --------------------------------------------------- */
  let libFilter = "all";
  function viewLibrary() {
    const filters = [["all", "Tutti"]].concat(D.STATUSES.map((s) => [s.key, s.label]));
    const filterBtns = filters.map(([k, l]) =>
      `<button class="btn ${libFilter === k ? "" : ""}" data-libfilter="${k}" style="${libFilter === k ? "border-color:var(--border-hi);box-shadow:var(--glow)" : ""}">${l}</button>`
    ).join("");

    const items = D.CONTENT.filter((c) => libFilter === "all" || statusOf(c.id) === libFilter);
    const cards = items.map((c) => {
      const s = statusMeta(statusOf(c.id));
      const m = c.metrics;
      const hasMetrics = m.views > 0;
      return `<div class="card lib-card" data-content="${c.id}">
        <div class="lib-thumb" style="background:linear-gradient(135deg, ${c.accent[0]}, ${c.accent[1]})">
          <span class="badge badge-fmt fmt-tag" style="background:rgba(0,0,0,0.35);color:#fff;border-color:rgba(255,255,255,0.2)">${c.format}</span>
          <span class="st-tag badge" style="background:${hexA(s.color, 0.9)};color:#0a0714;border:none"><span class="d" style="background:#0a0714"></span>${s.label}</span>
          <span class="big-id">${c.id}</span>
        </div>
        <div class="lib-body">
          <div class="lib-t">${escapeH(c.title)}</div>
          <div class="lib-hook">"${escapeH(c.hook)}"</div>
          <div class="lib-metrics">
            ${hasMetrics
              ? `<span><b>${fmt(m.views)}</b> views</span><span><b>${fmt(m.saves)}</b> salv.</span><span><b>${m.engagement}%</b> eng.</span>`
              : `<span class="muted">Non ancora pubblicato</span>`}
          </div>
        </div>
      </div>`;
    }).join("");

    return `
      <div class="cal-toolbar">${filterBtns}<span class="muted" style="margin-left:auto;font-size:13px">${items.length} contenuti</span></div>
      <div class="grid lib-grid">${cards || '<div class="muted">Nessun contenuto con questo stato.</div>'}</div>`;
  }

  /* -- Competitor Analysis ----------------------------------------------- */
  function viewCompetitors() {
    const list = D.COMPETITORS.slice().sort((a, b) => b.virality - a.virality); // sempre per Virality
    const avg = Math.round(list.reduce((a, c) => a + c.virality, 0) / list.length);
    const top = list[0];
    const vColor = (v) => (v >= 75 ? "#22e39a" : v >= 55 ? "#22d3ee" : v >= 35 ? "#a78bfa" : "#fb7185");
    const roleColor = (r) => (/⚠️|NON COPIABILE|CONTROESEMPIO/i.test(r) ? "#fb7185" : /⭐|GOLD/.test(r) ? "#f0b23a" : "#8b5cf6");
    const bar = (l, val, col) =>
      `<div class="cscore"><span class="cscore-l">${l}</span><span class="cscore-track"><i style="width:${val}%;background:${col}"></i></span><b class="cscore-v">${val}</b></div>`;

    const cards = list.map((c, i) => {
      const rc = roleColor(c.role);
      return `<div class="card card-pad cmp-card">
        <div class="cmp-top">
          <div class="cmp-rank">#${i + 1}</div>
          <div class="grow" style="min-width:0">
            <div class="cmp-handle">${escapeH(c.handle)}${c.verified ? ' <span class="cmp-verif">✔︎</span>' : ""}<span class="cmp-lang">${c.lang}</span></div>
            <div class="cmp-sub">${c.followers} follower · ${escapeH(c.frequency)}</div>
          </div>
          <div class="vir-badge"><div class="n" style="color:${vColor(c.virality)}">${c.virality}</div><div class="l">Virality</div></div>
        </div>
        <div class="cmp-role" style="background:${hexA(rc, 0.14)};color:${rc};border-color:${hexA(rc, 0.4)}">${escapeH(c.role)}</div>
        <div class="cmp-scoregrid">
          ${bar("Virality", c.virality, "#8b5cf6")}
          ${bar("Conversion", c.conversion, "#22d3ee")}
          ${bar("Authority", c.authority, "#22e39a")}
        </div>
        <div class="cmp-note">${escapeH(c.note)}</div>
        <div class="cmp-row"><div class="k">Pattern</div><div class="v">${escapeH(c.pattern)}</div></div>
        <div class="cmp-row"><div class="k">Hook</div><div class="v">${c.hooks.map((h) => `"${escapeH(h)}"`).join(" · ")}</div></div>
        <div class="cmp-row"><div class="k">CTA</div><div class="v">${escapeH(c.cta)}</div></div>
        <div class="cmp-cols">
          <div class="col repl"><div class="k">✓ Da replicare</div><ul>${c.replicate.map((r) => `<li>${escapeH(r)}</li>`).join("")}</ul></div>
          <div class="col excl"><div class="k">✕ Da escludere</div><ul>${c.exclude.map((r) => `<li>${escapeH(r)}</li>`).join("")}</ul></div>
        </div>
      </div>`;
    }).join("");

    return `
      <div class="grid kpi-grid-3" style="margin-bottom:20px">
        <div class="kpi"><div class="label">Competitor analizzati</div><div class="value grad">${list.length}</div><div class="delta flat">dati reali</div></div>
        <div class="kpi"><div class="label">Virality media</div><div class="value grad">${avg}</div><div class="delta flat">/100</div></div>
        <div class="kpi"><div class="label">Più virale</div><div class="value grad" style="font-size:19px">${escapeH(top.handle)}</div><div class="delta up">▲ ${top.virality}</div></div>
      </div>
      <div class="notice" style="margin-bottom:18px"><span class="ni">🔎</span><div>Analisi reale (Apify · 142 reel) dei competitor di riferimento, <b>ordinati per Virality score</b>. Nessuno è GOLD-first in italiano per principianti → è lo spazio di Persian FX.</div></div>
      <div class="grid cmp-grid">${cards}</div>`;
  }

  /* -- Analytics --------------------------------------------------------- */
  function viewAnalytics() {
    const p = D.IG_ANALYTICS.profile;
    const M = monthlyStats();
    const metric = (l, v, sub) => `<div class="kpi"><div class="label">${l}</div><div class="value grad">${v}</div>${sub ? `<div class="delta flat">${sub}</div>` : ""}</div>`;
    const metricNA = (l) => `<div class="kpi na"><div class="label">${l}</div><div class="value" style="color:var(--text-mute);font-size:22px">N/D</div><div class="delta flat"><span>🔒</span> Meta API</div></div>`;

    const tagColor = { trading: "#22e39a", opinion: "#22d3ee", lifestyle: "#a78bfa" };
    const rows = M.win.slice().reverse().map((r) => {
      const tc = tagColor[r.tag] || "#a78bfa";
      const er = r.type === "Reel" && r.views ? (((r.likes + r.comments) / r.views) * 100).toFixed(1) + "%" : "—";
      return `<tr>
        <td class="row-title">${escapeH(r.title)}</td>
        <td><span class="badge badge-fmt">${r.type}</span></td>
        <td><span class="badge" style="background:${hexA(tc, 0.14)};color:${tc};border-color:${hexA(tc, 0.4)}">${r.tag}</span></td>
        <td>${new Date(r.date).toLocaleDateString("it-IT", { day: "2-digit", month: "short" })}</td>
        <td class="num">${r.views != null ? num(r.views) : "—"}</td>
        <td class="num">${r.plays != null ? num(r.plays) : "—"}</td>
        <td class="num">${num(r.likes)}</td><td class="num">${num(r.comments)}</td>
        <td class="num">${er}</td>
      </tr>`;
    }).join("");

    return `
      <div class="card card-pad" style="margin-bottom:18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div class="cmp-avatar" style="width:52px;height:52px;font-size:22px">📸</div>
        <div><div style="font-weight:600;font-size:16px">${D.BRAND.igHandle} ${p.verified ? '<span style="color:var(--cyan-2)">✔︎</span>' : ""} <span class="muted" style="font-weight:400;font-size:13px">· ${escapeH(D.BRAND.igFullName)}</span></div>
          <div class="muted" style="font-size:12.5px"><a href="${D.BRAND.igUrl}" target="_blank" style="color:var(--cyan-2)">${D.BRAND.igUrl}</a></div></div>
        <div class="pill" style="margin-left:auto"><span class="dot"></span>Sync: ${D.IG_ANALYTICS.lastSync}</div>
      </div>

      <div class="grid kpi-grid">
        <div class="kpi-group-label">Profilo (attuale · reale)</div>
        ${metric("Follower", num(p.followers))}
        ${metric("Profili seguiti", num(p.following))}
        ${metric("Post totali", num(p.posts))}
        ${metric("Account verificato", p.verified ? "Sì ✔︎" : "No")}
        <div class="kpi-group-label">Ultimo mese · ${fmtRange(M.from, M.to)} (reale)</div>
        ${metric("Contenuti pubblicati", num(M.count))}
        ${metric("di cui Reel", num(M.reels_n))}
        ${metric("Views Reel", fmt(M.views))}
        ${metric("Play Reel", fmt(M.plays))}
        ${metric("Views medie/Reel", num(M.avgViews))}
        ${metric("Like", num(M.likes))}
        ${metric("Commenti", num(M.comments))}
        ${metric("Engagement medio Reel", M.engagement + "%")}
        <div class="kpi-group-label">Insight privati (richiede Meta API)</div>
        ${metricNA("Reach")}
        ${metricNA("Impression")}
        ${metricNA("Salvataggi")}
        ${metricNA("Condivisioni")}
        ${metricNA("Visite al profilo")}
        ${metricNA("Click al link in bio")}
      </div>

      <div class="card card-pad mt-lg">
        <div class="section-title"><span class="bar"></span>Contenuti dell'ultimo mese — dati pubblici reali</div>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Titolo</th><th>Tipo</th><th>Tema</th><th>Data</th><th>Views</th><th>Play</th><th>Like</th><th>Commenti</th><th>Eng.</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="9" class="muted">Nessun contenuto nell\'ultimo mese.</td></tr>'}</tbody>
        </table></div>
        <div class="muted" style="font-size:12px;margin-top:10px">Finestra ultimi 30 giorni dall'ultimo post. Views/Play solo per i Reel (Instagram non li espone per i Caroselli). Reach, salvataggi, condivisioni e watch-time sono insight privati non scrapabili.</div>
      </div>

      <div class="notice warn mt-lg"><span class="ni">🔌</span>
        <div>Dati pubblici aggiornati al ${D.IG_ANALYTICS.lastSync}. Per gli <b>insight privati</b> (reach, impression, salvataggi, click al link in bio) serve collegare l'account a <b>Instagram Graph API</b> via login Meta (account Business/Creator).</div>
      </div>`;
  }

  /* -- Telegram Tracking ------------------------------------------------- */
  function viewTelegram() {
    const t = D.TELEGRAM;
    const hist = Array.isArray(t.history) ? t.history : [];
    const hasHistory = hist.length >= 2;
    const metric = (l, v, sub, cls) => `<div class="kpi"><div class="label">${l}</div><div class="value grad">${v}</div><div class="delta ${cls || "flat"}">${sub || ""}</div></div>`;
    const metricNA = (l) => `<div class="kpi na"><div class="label">${l}</div><div class="value" style="color:var(--text-mute);font-size:22px">N/D</div><div class="delta flat"><span>🔒</span> serve storico bot</div></div>`;

    // deltas calcolati dallo storico reale del bot, se disponibile
    function deltaSince(days) {
      if (!hasHistory) return null;
      const last = hist[hist.length - 1];
      const target = Date.parse(last.date) - days * 86400000;
      let ref = hist[0];
      for (const h of hist) { if (Date.parse(h.date) <= target) ref = h; }
      return last.count - ref.count;
    }
    const fmtD = (n) => (n == null ? null : (n >= 0 ? "+" : "") + num(n));
    const dDay = hasHistory ? hist[hist.length - 1].count - hist[hist.length - 2].count : null;
    const dWeek = deltaSince(7), dMonth = deltaSince(30);
    const cardOrNA = (l, v, sub) => v == null ? metricNA(l) : metric(l, fmtD(v), sub, v >= 0 ? "up" : "down");

    const corr = t.correlation.map((c) =>
      `<tr><td class="row-title">${escapeH(c.content)}</td>
        <td>${new Date(c.date).toLocaleDateString("it-IT", { day: "2-digit", month: "short" })}</td>
        <td class="num">+${c.joins}</td><td>${escapeH(c.note)}</td></tr>`
    ).join("");

    const andamento = hasHistory
      ? `<div class="chart-head"><div class="t">Andamento iscritti — dati reali bot</div><div class="v">${hist.length} rilevazioni</div></div>
         <div class="chart-wrap">${C.area(hist.map((h) => h.count), { labels: hist.map((h) => h.date.slice(5).replace("-", "/")), colors: ["#22d3ee"], height: 220 })}</div>`
      : `<div class="section-title"><span class="bar"></span>Andamento iscritti</div>
         <div class="center" style="padding:26px 10px 6px">
           <div style="font-family:var(--font-head);font-weight:700;font-size:46px" class="value grad">${num(t.current)}</div>
           <div class="muted" style="font-size:13px;margin-top:2px">iscritti reali · lo storico si popola quando gira il bot</div>
           <div class="notice" style="margin:18px auto 0;max-width:600px;text-align:left"><span class="ni">🤖</span><div>Avvia il <b>bot amministratore</b> (<code>telegram-bot/persian-tg-bot.ps1</code>) per popolare automaticamente questo grafico giorno-per-giorno. Istruzioni in <b>telegram-bot/README.md</b>.</div></div>
         </div>`;

    return `
      <div class="card card-pad" style="margin-bottom:18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div class="cmp-avatar" style="width:52px;height:52px;font-size:22px">✈️</div>
        <div><div style="font-weight:600;font-size:16px">${escapeH(t.title || D.BRAND.telegramLabel)}</div>
          <div class="muted" style="font-size:12.5px"><a href="${t.link}" target="_blank" style="color:var(--cyan-2)">${t.link}</a></div></div>
        <a class="btn" href="${t.link}" target="_blank" style="margin-left:auto">Apri gruppo ↗</a>
      </div>

      <div class="grid kpi-grid">
        ${metric("Iscritti attuali", num(t.current), t.updatedAt, "up")}
        ${cardOrNA("Nuovi oggi", dDay, t.updatedAt)}
        ${cardOrNA("Nuovi settimana", dWeek, "ultimi 7gg")}
        ${cardOrNA("Nuovi mese", dMonth, "ultimi 30gg")}
      </div>

      <div class="card card-pad mt-lg">${andamento}</div>

      <div class="card card-pad mt-lg">
        <div class="section-title"><span class="bar"></span>Correlazione contenuti → ingressi Telegram</div>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Contenuto</th><th>Data</th><th>Ingressi</th><th>Note</th></tr></thead>
          <tbody>${corr || '<tr><td colspan="4" class="muted">Si popola quando parte la produzione (dal 13 Lug) con il tracking attivo.</td></tr>'}</tbody>
        </table></div>
        <div class="muted" style="font-size:12px;margin-top:10px">Obiettivo: individuare quali contenuti generano il maggior numero di ingressi nel gruppo.</div>
      </div>

      <div class="notice warn mt-lg"><span class="ni">⚙️</span><div>${escapeH(t.note)}</div></div>`;
  }

  /* -- Report ------------------------------------------------------------ */
  function viewReport() {
    const s = D.REPORT_SUGGESTIONS;
    const period = state.report;
    const isW = period === "settimanale";
    const tab = (k, l) => `<button class="report-tab ${period === k ? "active" : ""}" data-report="${k}">${l}</button>`;

    return `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;flex-wrap:wrap">
        <div class="report-tabs">${tab("settimanale", "Settimanale")}${tab("mensile", "Mensile")}</div>
        <span class="muted" style="font-size:13px">Report ${isW ? "settimanale" : "mensile"} · ${D.BRAND.campaign}</span>
        <button class="btn" data-print style="margin-left:auto">🖨 Stampa / PDF</button>
      </div>

      <div class="rep-two">
        <div class="card card-pad">
          <div class="section-title"><span class="bar"></span>Sintesi ${isW ? "settimana" : "mese"}</div>
          <div class="stat-row"><span class="k">Miglior Reel</span><span class="v" style="max-width:60%;text-align:right">${escapeH(s.bestReel)}</span></div>
          <div class="stat-row"><span class="k">Reel da migliorare</span><span class="v" style="max-width:60%;text-align:right">${escapeH(s.worstReel)}</span></div>
          <div class="stat-row"><span class="k">Crescita Instagram</span><span class="v" style="max-width:60%;text-align:right">${escapeH(s.igGrowth)}</span></div>
          <div class="stat-row"><span class="k">Crescita Telegram</span><span class="v" style="max-width:60%;text-align:right">${escapeH(s.tgGrowth)}</span></div>
          <div class="stat-row"><span class="k">Conversione</span><span class="v" style="max-width:60%;text-align:right">${escapeH(s.conversion)}</span></div>
        </div>

        <div class="card card-pad">
          <div class="section-title"><span class="bar"></span>Suggerimenti Agent FX</div>
          <ul class="rep-list">${s.agentTips.map((t) => `<li><span class="mk">▹</span><span>${escapeH(t)}</span></li>`).join("")}</ul>
        </div>
      </div>

      <div class="card card-pad mt-lg">
        <div class="section-title"><span class="bar"></span>Nuove idee da testare</div>
        <ul class="rep-list">${s.newIdeas.map((t) => `<li><span class="mk">✦</span><span>${escapeH(t)}</span></li>`).join("")}</ul>
      </div>

      <div class="notice mt-lg"><span class="ni">🧠</span><div>Il report viene generato in automatico incrociando le metriche Instagram, gli ingressi Telegram e lo stato dei contenuti. Con i dati live, best/worst Reel e la conversione si aggiornano ad ogni sync.</div></div>`;
  }

  /* ========================= Modal contenuto =========================== */
  function openContentModal(id) {
    const c = D.CONTENT.find((x) => x.id === id);
    if (!c) return;
    const cur = statusOf(id);
    const m = c.metrics;
    const hasMetrics = m.views > 0;
    const options = D.STATUSES.map((s) => `<option value="${s.key}" ${s.key === cur ? "selected" : ""}>${s.label}</option>`).join("");

    const metricBox = (n, l) => `<div class="m-metric"><div class="n">${n}</div><div class="l">${l}</div></div>`;

    el("modalRoot").innerHTML = `
      <div class="modal-back open" id="modalBack">
        <div class="modal" role="dialog" aria-modal="true">
          <div class="modal-hero" style="background:linear-gradient(135deg, ${c.accent[0]}, ${c.accent[1]})">
            <button class="close" data-close>×</button>
            <div class="m-id">${c.id} · ${c.format.toUpperCase()}</div>
            <div class="m-title">${escapeH(c.title)}</div>
            <div class="modal-tags">
              ${c.objective.map((o) => `<span class="badge" style="background:rgba(0,0,0,0.3);color:#fff;border-color:rgba(255,255,255,0.2)">🎯 ${o}</span>`).join("")}
              <span class="badge" style="background:rgba(0,0,0,0.3);color:#fff;border-color:rgba(255,255,255,0.2)">📅 ${new Date(c.date).toLocaleDateString("it-IT", { day: "2-digit", month: "long" })}</span>
              <span class="badge" style="background:rgba(0,0,0,0.3);color:#fff;border-color:rgba(255,255,255,0.2)">📱 ${c.platform}</span>
            </div>
          </div>
          <div class="modal-body">
            <div class="m-field"><div class="k">Stato produzione</div>
              <select class="m-status-select" data-status-for="${c.id}">${options}</select></div>
            <div class="m-field"><div class="k">Hook</div><div class="v">"${escapeH(c.hook)}"</div></div>
            <div class="m-field"><div class="k">Angolo</div><div class="v">${escapeH(c.angle)}</div></div>
            <div class="m-field"><div class="k">Script</div><div class="v">${escapeH(c.script)}</div></div>
            <div class="m-field"><div class="k">Caption</div><div class="v">${escapeH(c.caption)}</div></div>
            <div class="m-field"><div class="k">CTA</div><div class="v">${escapeH(c.cta)}</div></div>
            <div class="m-field"><div class="k">Materiale necessario</div><div class="m-mats">${c.materials.map((mm) => `<span class="chip">${escapeH(mm)}</span>`).join("")}</div></div>
            ${hasMetrics ? `<div class="m-field"><div class="k">Metriche</div>
              <div class="m-grid">
                ${metricBox(fmt(m.views), "Views")}${metricBox(fmt(m.likes), "Like")}
                ${metricBox(fmt(m.comments), "Commenti")}${metricBox(fmt(m.shares), "Cond.")}
                ${metricBox(fmt(m.saves), "Salvataggi")}${metricBox(fmt(m.reach), "Reach")}
                ${metricBox(m.engagement + "%", "Engagement")}${metricBox(c.platform === "Meta Ads" ? "ADV" : c.format, "Formato")}
              </div></div>` : `<div class="notice"><span class="ni">⏳</span><div>Contenuto non ancora pubblicato — le metriche compariranno dopo la pubblicazione e il primo sync.</div></div>`}
          </div>
        </div>
      </div>`;

    const back = el("modalBack");
    back.addEventListener("click", (e) => { if (e.target === back || e.target.closest("[data-close]")) closeModal(); });
    $("[data-status-for]", back).addEventListener("change", (e) => {
      state.contentStatus[c.id] = e.target.value; save();
    });
    document.addEventListener("keydown", escClose);
  }
  function escClose(e) { if (e.key === "Escape") closeModal(); }
  function closeModal() {
    el("modalRoot").innerHTML = "";
    document.removeEventListener("keydown", escClose);
    // refresh current view (status may have changed)
    router();
  }

  /* ========================= Event binding ============================= */
  function bindViewEvents(routeId) {
    const c = el("content");

    // content cards / calendar events → modal
    c.querySelectorAll("[data-content]").forEach((n) =>
      n.addEventListener("click", () => openContentModal(n.dataset.content))
    );

    if (routeId === "calendario") {
      c.querySelectorAll("[data-cal]").forEach((b) => b.addEventListener("click", () => {
        const a = b.dataset.cal;
        if (a === "prev") { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } }
        else if (a === "next") { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } }
        else if (a === "today") { const d = new Date(); calMonth = d.getMonth(); calYear = d.getFullYear(); }
        rerender();
      }));
    }

    if (routeId === "shooting") {
      c.querySelectorAll("[data-shoot]").forEach((lbl) => lbl.addEventListener("click", (e) => {
        e.preventDefault();
        const id = lbl.dataset.shoot;
        const base = findShoot(id);
        const cur = shootDone(id, base ? base.done : false);
        state.shooting[id] = !cur; save(); rerender();
      }));
    }

    if (routeId === "library") {
      c.querySelectorAll("[data-libfilter]").forEach((b) => b.addEventListener("click", () => {
        libFilter = b.dataset.libfilter; rerender();
      }));
    }

    if (routeId === "report") {
      c.querySelectorAll("[data-report]").forEach((b) => b.addEventListener("click", () => {
        state.report = b.dataset.report; save(); rerender();
      }));
      const pb = c.querySelector("[data-print]");
      if (pb) pb.addEventListener("click", () => window.print());
    }
  }

  function findShoot(id) {
    for (const g of D.SHOOTING) for (const it of g.items) if (it.id === id) return it;
    return null;
  }

  function rerender() {
    const r = currentRoute();
    el("content").innerHTML = `<div class="view">${r.render()}</div>`;
    bindViewEvents(r.id);
  }

  /* ============================ Helpers ================================ */
  function escapeH(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }
  function hexA(hex, a) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ============================ Theme ================================= */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    $("#themeIcon").textContent = state.theme === "dark" ? "☀" : "☾";
  }
  function toggleTheme() { state.theme = state.theme === "dark" ? "light" : "dark"; save(); applyTheme(); }

  /* ============================ Sidebar =============================== */
  function openSidebar() { $("#sidebar").classList.add("open"); $("#backdrop").classList.add("open"); }
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#backdrop").classList.remove("open"); }

  /* ============================ Init ================================= */
  function buildNav() {
    $("#nav").innerHTML = ROUTES.map((r) =>
      `<button class="nav-item" data-route="${r.id}" onclick="location.hash='#/${r.id}'"><span class="ico">${r.ico}</span>${r.label}</button>`
    ).join("");
  }

  /* Carica i dati Telegram live scritti dal bot (assets/data/telegram.json).
     Funziona quando la dashboard è servita (server locale); se non c'è, usa i dati statici. */
  function loadLiveTelegram() {
    fetch("assets/data/telegram.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!j || typeof j.current !== "number") return;
        const t = D.TELEGRAM;
        t.current = j.current;
        if (j.updatedAt) t.updatedAt = j.updatedAt;
        if (j.title) t.title = j.title;
        if (j.link) t.link = j.link;
        if (Array.isArray(j.history)) t.history = j.history;
        if (Array.isArray(j.correlation) && j.correlation.length) t.correlation = j.correlation;
        const k = D.KPIS.find((x) => x.key === "tg_members");
        if (k) k.value = j.current;
        D.MONTHLY_GOAL.current = j.current;
        rerender();
      })
      .catch(() => {});
  }

  /* Glow violaceo che segue il cursore (solo desktop/mouse, trailing morbido) */
  function setupCursorGlow() {
    const mq = window.matchMedia;
    if (!mq || !mq("(hover: hover) and (pointer: fine)").matches) return;
    if (mq("(prefers-reduced-motion: reduce)").matches) return;
    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.appendChild(glow);
    let tx, ty, cx, cy, running = false, idle;
    function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      glow.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) translate(-50%, -50%)`;
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) {
        requestAnimationFrame(loop);
      } else {
        running = false; // fermo: nessun rAF finché il cursore non si muove di nuovo
      }
    }
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (cx === undefined) { cx = tx; cy = ty; }
      glow.classList.add("on", "moving");
      clearTimeout(idle);
      idle = setTimeout(() => glow.classList.remove("moving"), 140);
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.addEventListener("mouseleave", () => glow.classList.remove("on", "moving"));
  }

  function init() {
    applyTheme();
    setupCursorGlow();
    buildNav();
    $("#brandName").textContent = D.BRAND.name;
    $("#brandTag").textContent = D.BRAND.tagline;
    $("#themeToggle").addEventListener("click", toggleTheme);
    $("#menuBtn").addEventListener("click", openSidebar);
    $("#backdrop").addEventListener("click", closeSidebar);
    window.addEventListener("hashchange", router);
    router();
    loadLiveTelegram();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
