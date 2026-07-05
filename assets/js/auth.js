/* ==========================================================================
   Persian FX — Gate password (protezione morbida lato client)
   --------------------------------------------------------------------------
   NB: su un sito statico è un deterrente, non un blocco reale (i file restano
   scaricabili da chi usa gli strumenti sviluppatore). Per protezione forte:
   Cloudflare Access. Per cambiare la password: calcola l'SHA-256 (hex) della
   nuova password e sostituisci AUTH_HASH qui sotto.
   Password temporanea attuale: "persian2026"
   ========================================================================== */
(function () {
  const AUTH_HASH = "a98afae8aea6cbca2a4792567bfcae5feae390d2294f37be091cab15affd591e";
  const KEY = "pfx-auth-v1";

  async function sha256hex(str) {
    if (!window.crypto || !crypto.subtle) throw new Error("no-subtle");
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function unlock() { document.documentElement.classList.remove("pfx-locked"); }

  document.addEventListener("DOMContentLoaded", function () {
    try { if (localStorage.getItem(KEY) === "1") unlock(); } catch (e) {}

    const form = document.getElementById("login-form");
    const pass = document.getElementById("login-pass");
    const err = document.getElementById("login-err");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      err.textContent = "";
      let ok = false;
      try {
        ok = (await sha256hex(pass.value)) === AUTH_HASH;
      } catch (ex) {
        err.textContent = "Apri il sito via https o localhost.";
        return;
      }
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
