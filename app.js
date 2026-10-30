(() => {
  const PLACES = window.PLACES;
  const GUIDE = window.GUIDE;
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  PLACES.forEach((p, i) => { p.num = i + 1; p.isPick = Boolean(p.rec); });

  // ---------- Hours (always in Manila time) ----------
  function manilaNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((x) => x.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, mins: Number(get("hour")) * 60 + Number(get("minute")) };
  }
  const toMins = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  function fmtTime(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return m ? `${h12}:${String(m).padStart(2, "0")} ${ampm}` : `${h12} ${ampm}`;
  }
  const fmtRange = (r) => (r ? r.split("-").map(fmtTime).join(" – ") : "Closed");

  function status(p) {
    const { day, mins } = manilaNow();
    const today = p.hours[day];
    if (today) {
      const [o, c] = today.split("-").map(toMins);
      if (mins >= o && mins < c) return { open: true, text: `Open · closes ${fmtTime(today.split("-")[1])}` };
      if (mins < o) return { open: false, text: `Closed · opens ${fmtTime(today.split("-")[0])}` };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (p.hours[d]) {
        const when = i === 1 ? "tomorrow" : DAYS[d].slice(0, 3);
        return { open: false, text: `Closed · opens ${when} ${fmtTime(p.hours[d].split("-")[0])}` };
      }
    }
    return { open: false, text: "Closed" };
  }

  // ---------- Filters ----------
  const OPEN_NOW = "Open now";
  const OPEN_LATE = "Open late";
  const LATE_CUTOFF = toMins("22:00"); // closes at 10 PM or later on any day it's open
  const isOpenLate = (p) => p.hours.some((r) => r && toMins(r.split("-")[1]) >= LATE_CUTOFF);
  const allTags = [OPEN_NOW, OPEN_LATE];
  const active = new Set();

  const chips = $("#chips");
  chips.innerHTML = allTags
    .map((t) => `<button class="chip" type="button" aria-pressed="false" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join("");
  chips.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    const t = btn.dataset.tag;
    active.has(t) ? active.delete(t) : active.add(t);
    btn.setAttribute("aria-pressed", active.has(t));
    applyFilters();
  });

  const matches = (p) =>
    [...active].every((t) => (t === OPEN_NOW ? status(p).open : isOpenLate(p)));

  // ---------- Map ----------
  const map = L.map("leaflet", {
    scrollWheelZoom: false,
    // On phones a one-finger swipe should scroll the page, not get stuck panning the map;
    // pinch (two fingers) still zooms and moves it
    dragging: !L.Browser.mobile,
    zoomSnap: 0.25,
    minZoom: 13,
    maxZoom: 18,
    maxBounds: [[14.585, 121.05], [14.70, 121.16]],
    maxBoundsViscosity: 0.8,
  });
  // Esri Light Gray Canvas: a deliberately simplified base map (no shops, few labels)
  const esri = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas";
  L.tileLayer(`${esri}/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`, {
    attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
    maxNativeZoom: 16,
  }).addTo(map);
  L.tileLayer(`${esri}/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}`, {
    maxNativeZoom: 16,
    className: "map-labels",
  }).addTo(map);
  map.fitBounds(L.latLngBounds(PLACES.map((p) => [p.lat, p.lng])), { padding: [24, 24], paddingTopLeft: [24, 48] });
  map.on("focus", () => map.scrollWheelZoom.enable());
  map.on("blur", () => map.scrollWheelZoom.disable());

  const markers = new Map();
  PLACES.forEach((p, i) => {
    // Spots in the same building would stack; nudge later ones sideways so every pin stays clickable
    const clashes = PLACES.slice(0, i).filter((q) => Math.hypot(q.lat - p.lat, q.lng - p.lng) < 0.0012).length;
    const icon = L.divIcon({
      className: "",
      html: `<div class="pin"><span>${p.num}</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [17 - clashes * 30, 34],
      tooltipAnchor: [0, -36],
    });
    const m = L.marker([p.lat, p.lng], { icon, title: p.name, keyboard: true, riseOnHover: true })
      .addTo(map)
      .bindTooltip(p.name, { direction: "top", className: "pin-tip" })
      .on("click", () => onPinClick(p));
    markers.set(p.id, m);
  });

  // If other pins crowd the one tapped (common on phones), zoom in on that group first
  const CROWD_PX = 28;
  function onPinClick(p) {
    const here = map.latLngToContainerPoint([p.lat, p.lng]);
    const crowd = PLACES.filter((q) => map.latLngToContainerPoint([q.lat, q.lng]).distanceTo(here) < CROWD_PX);
    if (crowd.length > 1 && map.getZoom() < 16) {
      map.flyToBounds(crowd.map((q) => [q.lat, q.lng]), { padding: [70, 70], maxZoom: 16, duration: 0.6 });
    } else {
      openDetail(p);
    }
  }

  const legend = $("#legend");
  legend.innerHTML = PLACES.map(
    (p) => `<li data-id="${p.id}">
        <button type="button"><span class="num">${p.num}</span>
          <span>${esc(p.name)}<small>${esc(p.area)}</small></span></button></li>`
  ).join("");
  legend.addEventListener("click", (e) => {
    const li = e.target.closest("li[data-id]");
    if (li) openDetail(PLACES.find((p) => p.id === li.dataset.id));
  });
  legend.addEventListener("mouseover", (e) => {
    const li = e.target.closest("li[data-id]");
    markers.forEach((m, id) => m.getElement()?.firstElementChild.classList.toggle("is-active", li?.dataset.id === id));
  });
  legend.addEventListener("mouseleave", () =>
    markers.forEach((m) => m.getElement()?.firstElementChild.classList.remove("is-active"))
  );

  // ---------- Cards ----------
  const thumb = (f) => `images/thumbs/${f}`;
  const full = (f) => `images/${f}`;

  function cardHTML(p) {
    const s = status(p);
    const cover = p.photos?.[0];
    return `<button class="card" type="button" data-id="${p.id}">
      <div class="card-img${cover ? "" : " no-photo"}">
        ${cover
          ? `<img src="${thumb(cover.file)}" alt="${esc(cover.alt)}" loading="lazy">`
          : `<div class="placeholder" aria-hidden="true">${esc(p.name[0])}</div>`}
        <span class="card-num">${p.num}</span>
      </div>
      <div class="card-body">
        <h3>${esc(p.name)}</h3>
        <div class="area">${esc(p.area)}</div>
        ${p.rec ? `<div class="pick"><b>Dax's pick:</b> ${esc(p.rec.split(" — ")[0].split(" (")[0].replace(/\.$/, ""))}</div>` : ""}
        <span class="status ${s.open ? "open" : "closed"}">${esc(s.text)}</span>
      </div>
    </button>`;
  }

  const grid = $("#grid");
  function renderCards() {
    const shown = PLACES.filter(matches);
    grid.innerHTML = shown.map(cardHTML).join("");
    $("#empty").hidden = shown.length > 0;
    $("#count").textContent = `${shown.length} of ${PLACES.length} spots`;
  }
  grid.addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c) openDetail(PLACES.find((p) => p.id === c.dataset.id));
  });

  function applyFilters() {
    renderCards();
    PLACES.forEach((p) => {
      const on = matches(p);
      markers.get(p.id).getElement()?.firstElementChild.classList.toggle("is-dim", !on);
      legend.querySelector(`li[data-id="${p.id}"]`).classList.toggle("is-dim", !on);
    });
  }

  // ---------- Detail dialog ----------
  const dialog = $("#detail");
  const body = $("#d-body");
  const icons = {
    ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  };

  function openDetail(p) {
    if (!p) return;
    const { day } = manilaNow();
    const s = status(p);
    const photos = p.photos || [];
    const mapsUrl = `https://www.google.com/maps?ftid=${p.mapsFtid}`;
    const embedUrl = p.mapsEmbed;
    // Show the week starting Monday
    const order = [1, 2, 3, 4, 5, 6, 0];

    body.innerHTML = `
      ${photos.length ? `<div class="gallery">
        <div class="slides">${photos.map((ph, i) => `<img src="${full(ph.file)}" alt="${esc(ph.alt)}" ${i ? 'loading="lazy"' : ""}>`).join("")}</div>
        ${photos.length > 1 ? `<button class="slide-btn prev" aria-label="Previous photo">&#8249;</button>
          <button class="slide-btn next" aria-label="Next photo">&#8250;</button>
          <div class="dots">${photos.map((_, i) => `<span class="${i ? "" : "on"}"></span>`).join("")}</div>` : ""}
      </div>` : ""}
      <div class="d-content">
        <div>
          <h2 id="d-name">${esc(p.name)}</h2>
          <div class="addr">${esc(p.address)}</div>
        </div>
        <p class="desc">${esc(p.description)}</p>
        ${p.rec ? `<div class="rec"><h3>Dax's recommendation</h3><p>${esc(p.rec)}</p></div>` : ""}
        ${p.note ? `<div class="note">${esc(p.note)}</div>` : ""}
        <div class="actions">
          <a class="btn btn-primary" href="${esc(p.instagram)}" target="_blank" rel="noopener">${icons.ig} Instagram</a>
          <a class="btn" href="${esc(mapsUrl)}" target="_blank" rel="noopener">${icons.pin} Google Maps</a>
        </div>
        <div>
          <h3 class="d-sub">Opening hours <span class="status ${s.open ? "open" : "closed"}" style="text-transform:none;letter-spacing:0;margin-left:6px">${esc(s.text)}</span></h3>
          <table class="hours">${order
            .map((d) => `<tr class="${d === day ? "today" : ""}"><td>${DAYS[d]}</td><td>${fmtRange(p.hours[d])}</td></tr>`)
            .join("")}</table>
        </div>
        <details class="embed">
          <summary>Show on Google Maps</summary>
          <iframe title="Map of ${esc(p.name)}" data-src="${esc(embedUrl)}" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </details>
      </div>`;

    const embed = body.querySelector("details.embed");
    embed.addEventListener("toggle", () => {
      const f = embed.querySelector("iframe");
      if (embed.open && !f.src) f.src = f.dataset.src;
    });

    const slides = body.querySelector(".slides");
    if (slides && photos.length > 1) {
      const dots = [...body.querySelectorAll(".dots span")];
      const go = (dir) => slides.scrollBy({ left: dir * slides.clientWidth, behavior: "smooth" });
      body.querySelector(".prev").onclick = () => go(-1);
      body.querySelector(".next").onclick = () => go(1);
      slides.addEventListener("scroll", () => {
        const i = Math.round(slides.scrollLeft / slides.clientWidth);
        dots.forEach((d, j) => d.classList.toggle("on", i === j));
      }, { passive: true });
    }

    markers.forEach((m, id) => m.getElement()?.firstElementChild.classList.toggle("is-active", id === p.id));
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    // Push a history entry so the phone's Back button closes the popup instead of leaving the site
    if (location.hash !== `#${p.id}`) {
      history.pushState({ detail: true }, "", `#${p.id}`);
    }
  }

  function closeDetail() {
    dialog.close();
  }
  dialog.addEventListener("close", () => {
    markers.forEach((m) => m.getElement()?.firstElementChild.classList.remove("is-active"));
    if (history.state?.detail) history.back();
    else history.replaceState(null, "", location.pathname + location.search);
  });
  $("#d-close").addEventListener("click", closeDetail);
  dialog.addEventListener("click", (e) => { if (e.target === dialog) closeDetail(); });

  // ---------- Endnote + footer ----------
  const rb = $("#recommend-btn");
  if (GUIDE.recommendFormUrl) {
    rb.href = GUIDE.recommendFormUrl;
  } else {
    rb.textContent = "Recommendation form coming soon";
    rb.setAttribute("aria-disabled", "true");
    rb.removeAttribute("href");
  }
  $("#footnote").textContent =
    `Opening hours are from Google Maps and the shops' own posts, checked ${GUIDE.hoursCheckedOn}. ` +
    `They can change on holidays — check each shop's Instagram before you go.`;

  // ---------- Init ----------
  applyFilters();
  const openFromHash = () => {
    const p = PLACES.find((q) => `#${q.id}` === location.hash);
    if (p) openDetail(p);
    else if (dialog.open) dialog.close();
  };
  window.addEventListener("popstate", openFromHash);
  openFromHash();
})();
