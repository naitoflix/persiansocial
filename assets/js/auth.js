/* ==========================================================================
   Persian FX — Gate password (protezione morbida lato client)
   --------------------------------------------------------------------------
   SHA-256 in JS puro: funziona sia in HTTPS sia in HTTP (non dipende da
   crypto.subtle, che è disponibile solo in contesti sicuri).
   Per cambiare la password: calcola l'SHA-256 (hex) della nuova password e
   sostituisci AUTH_HASH. Password temporanea attuale: "persian2026".
   ========================================================================== */
(function () {
  const AUTH_HASH = "a98afae8aea6cbca2a4792567bfcae5feae390d2294f37be091cab15affd591e";
  const KEY = "pfx-auth-v1";

  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  function utf8Bytes(str) {
    const out = [];
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
      else if (c >= 0xd800 && c < 0xdc00) {
        const c2 = str.charCodeAt(++i);
        const cp = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
        out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
      } else out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
    return out;
  }

  function sha256hex(str) {
    const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const data = utf8Bytes(str);
    const bitLen = data.length * 8;
    const p = data.slice();
    p.push(0x80);
    while (p.length % 64 !== 56) p.push(0);
    p.push(0, 0, 0, 0, (bitLen >>> 24) & 0xff, (bitLen >>> 16) & 0xff, (bitLen >>> 8) & 0xff, bitLen & 0xff);

    const rotr = (x, n) => (x >>> n) | (x << (32 - n));
    const w = new Array(64);
    for (let off = 0; off < p.length; off += 64) {
      for (let i = 0; i < 16; i++) w[i] = (p[off + i * 4] << 24) | (p[off + i * 4 + 1] << 16) | (p[off + i * 4 + 2] << 8) | p[off + i * 4 + 3];
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K[i] + w[i]) | 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    let hex = "";
    for (let i = 0; i < 8; i++) hex += ("00000000" + (H[i] >>> 0).toString(16)).slice(-8);
    return hex;
  }

  function unlock() { document.documentElement.classList.remove("pfx-locked"); }

  document.addEventListener("DOMContentLoaded", function () {
    try { if (localStorage.getItem(KEY) === "1") unlock(); } catch (e) {}

    const form = document.getElementById("login-form");
    const pass = document.getElementById("login-pass");
    const err = document.getElementById("login-err");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.textContent = "";
      let ok = false;
      try { ok = sha256hex(pass.value) === AUTH_HASH; } catch (ex) { ok = false; }
      if (ok) {
        try { localStorage.setItem(KEY, "1"); } catch (e) {}
        unlock();
        pass.value = "";
      } else {
        err.textContent = "Password errata";
        pass.value = "";
        pass.focus();
      }
    });

    if (document.documentElement.classList.contains("pfx-locked")) {
      setTimeout(function () { if (pass) pass.focus(); }, 60);
    }
  });
})();
