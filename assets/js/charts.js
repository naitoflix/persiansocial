/* ==========================================================================
   Persian FX — Chart helpers (SVG puro, nessuna dipendenza)
   Espone: PFXCharts.line / area / bars / ring
   ========================================================================== */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const uid = () => "g" + Math.random().toString(36).slice(2, 8);

  function fmt(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
    return String(Math.round(n));
  }

  /* Line / area chart with optional second series -------------------------- */
  function area(data, opts = {}) {
    const W = 640, H = opts.height || 200, pad = { t: 14, r: 12, b: 26, l: 34 };
    const series = Array.isArray(data[0]) ? data : [data];
    const colors = opts.colors || ["#8b5cf6", "#22d3ee"];
    const labels = opts.labels || [];
    const all = series.flat();
    const max = Math.max(...all) * 1.08 || 1;
    const min = opts.zeroBase ? 0 : Math.min(...all) * 0.92;
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const x = (i, len) => pad.l + (iw * i) / (len - 1 || 1);
    const y = (v) => pad.t + ih - (ih * (v - min)) / (max - min || 1);

    let defs = "", paths = "", dots = "";
    series.forEach((s, si) => {
      const id = uid();
      const line = s.map((v, i) => `${i ? "L" : "M"}${x(i, s.length).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
      const fill = `${line} L${x(s.length - 1, s.length).toFixed(1)},${pad.t + ih} L${pad.l},${pad.t + ih} Z`;
      defs += `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${colors[si]}" stop-opacity="0.34"/>
        <stop offset="100%" stop-color="${colors[si]}" stop-opacity="0"/></linearGradient>`;
      paths += `<path d="${fill}" fill="url(#${id})"/><path d="${line}" fill="none" stroke="${colors[si]}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      const li = s.length - 1;
      dots += `<circle cx="${x(li, s.length).toFixed(1)}" cy="${y(s[li]).toFixed(1)}" r="4" fill="${colors[si]}" stroke="#0c0b1a" stroke-width="2"/>`;
    });

    // gridlines + y labels
    let grid = "";
    for (let g = 0; g <= 3; g++) {
      const gy = pad.t + (ih * g) / 3;
      const val = max - ((max - min) * g) / 3;
      grid += `<line x1="${pad.l}" y1="${gy}" x2="${W - pad.r}" y2="${gy}" stroke="currentColor" stroke-opacity="0.08"/>`;
      grid += `<text x="${pad.l - 6}" y="${gy + 3.5}" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.4">${fmt(val)}</text>`;
    }
    // x labels
    let xl = "";
    const step = Math.ceil(labels.length / 8);
    labels.forEach((lb, i) => {
      if (i % step === 0 || i === labels.length - 1) {
        xl += `<text x="${x(i, labels.length).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.4">${lb}</text>`;
      }
    });

    return `<svg viewBox="0 0 ${W} ${H}" role="img" style="color:var(--text)"><defs>${defs}</defs>${grid}${paths}${dots}${xl}</svg>`;
  }

  /* Bar chart -------------------------------------------------------------- */
  function bars(data, opts = {}) {
    const W = 640, H = opts.height || 200, pad = { t: 14, r: 12, b: 28, l: 34 };
    const labels = opts.labels || data.map((_, i) => i + 1);
    const color = opts.color || "#8b5cf6", color2 = opts.color2 || "#22d3ee";
    const max = Math.max(...data) * 1.1 || 1;
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const bw = (iw / data.length) * 0.6;
    const gap = (iw / data.length) * 0.4;
    const gid = uid();

    let grid = "";
    for (let g = 0; g <= 3; g++) {
      const gy = pad.t + (ih * g) / 3;
      grid += `<line x1="${pad.l}" y1="${gy}" x2="${W - pad.r}" y2="${gy}" stroke="currentColor" stroke-opacity="0.08"/>`;
      grid += `<text x="${pad.l - 6}" y="${gy + 3.5}" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.4">${fmt(max - (max * g) / 3)}</text>`;
    }
    let rects = "";
    data.forEach((v, i) => {
      const bh = (ih * v) / max;
      const bx = pad.l + gap / 2 + i * (bw + gap);
      const by = pad.t + ih - bh;
      rects += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="4" fill="url(#${gid})"/>`;
      rects += `<text x="${(bx + bw / 2).toFixed(1)}" y="${H - 9}" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.45">${labels[i]}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" style="color:var(--text)"><defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color2}"/><stop offset="100%" stop-color="${color}"/></linearGradient>
      </defs>${grid}${rects}</svg>`;
  }

  /* Progress ring ---------------------------------------------------------- */
  function ring(pct, opts = {}) {
    const size = opts.size || 130, sw = opts.stroke || 12, r = (size - sw) / 2, c = size / 2;
    const circ = 2 * Math.PI * r;
    const off = circ * (1 - Math.min(pct, 100) / 100);
    const gid = uid();
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>
      <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="currentColor" stroke-opacity="0.12" stroke-width="${sw}"/>
      <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="url(#${gid})" stroke-width="${sw}"
        stroke-linecap="round" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"
        transform="rotate(-90 ${c} ${c})" style="transition:stroke-dashoffset .6s ease"/>
      <text x="${c}" y="${c - 2}" text-anchor="middle" font-family="Bahnschrift,Segoe UI,sans-serif" font-weight="700" font-size="26" fill="currentColor">${Math.round(pct)}%</text>
      <text x="${c}" y="${c + 18}" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.5" letter-spacing="1">${opts.label || ""}</text>
    </svg>`;
  }

  window.PFXCharts = { area, line: area, bars, ring, fmt };
})();
