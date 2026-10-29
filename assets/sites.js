// Page des sites : filtres, fiches et carte
(function () {
  const params = new URLSearchParams(location.search);
  const etat = {
    pole: POLES[params.get("pole")] ? params.get("pole") : "tous",
    sport: params.get("sport") || "",
  };

  const liste = document.getElementById("liste-sites");
  const selectSport = document.getElementById("filtre-sport");
  const zonePoles = document.getElementById("filtre-poles");
  const resultat = document.getElementById("resultat");

  // ---------- Filtres ----------

  const boutonsPoles = [["tous", { nom: "Tous" }], ...Object.entries(POLES)];
  zonePoles.innerHTML = boutonsPoles
    .map(([id, p]) =>
      `<button type="button" class="puce" data-pole="${id}" style="--couleur-pole:${p.couleur || "transparent"}">${p.nom}</button>`)
    .join("");

  const sports = [...new Set(SITES.flatMap((s) => s.sports))].sort((a, b) => a.localeCompare(b, "fr"));
  selectSport.insertAdjacentHTML("beforeend", sports.map((s) => `<option value="${s}">${s}</option>`).join(""));
  if (!sports.includes(etat.sport)) etat.sport = "";
  selectSport.value = etat.sport;

  zonePoles.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-pole]");
    if (!b) return;
    etat.pole = b.dataset.pole;
    appliquer(true);
  });
  selectSport.addEventListener("change", () => {
    etat.sport = selectSport.value;
    appliquer(true);
  });

  // ---------- Fiches ----------

  function stands(s) {
    const liens = (window.STANDS || []).filter((st) => st.site === s.id)
      .map((st) => `<a href="restauration.html#stand-${st.id}">${st.nom}</a>`);
    return liens.length ? `<dt>Manger</dt><dd>${liens.join(", ")}</dd>` : "";
  }

  liste.innerHTML = SITES.map((s) => `
    <li class="fiche" id="site-${s.id}" style="--couleur-pole:${POLES[s.pole].couleur}">
      <h3>${s.nom}</h3>
      <p class="fiche-local" lang="ms">${s.local}</p>
      <ul class="fiche-sports">${s.sports.map((sp) => `<li>${sp}</li>`).join("")}</ul>
      <p>${s.description}</p>
      <dl>
        <dt>Épreuves</dt><dd>${s.programme}</dd>
        <dt>Capacité</dt><dd>${s.capacite}</dd>
        <dt>Accès</dt><dd>${s.acces}</dd>
        <dt>Pôle</dt><dd>${POLES[s.pole].nom}</dd>
        ${stands(s)}
      </dl>
      <button type="button" class="voir-carte" data-id="${s.id}">Voir sur la carte</button>
    </li>`).join("") + `<li class="vide" id="vide" hidden>Aucun site ne correspond à ces filtres. Choisissez un autre pôle ou « Tous les sports ».</li>`;

  // ---------- Carte ----------

  const carte = L.map("carte", { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(carte);

  const reperes = {};
  SITES.forEach((s) => {
    const icone = L.divIcon({
      className: "",
      html: `<div class="repere" style="--couleur-pole:${POLES[s.pole].couleur}"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    const m = L.marker(s.coords, { icon: icone, title: s.nom, alt: s.nom });
    m.bindPopup(`<strong>${s.nom}</strong>${s.sports.join(", ")}<br><button type="button" data-fiche="${s.id}">Lire la fiche</button>`);
    reperes[s.id] = m;
  });

  carte.on("popupopen", (e) => {
    const b = e.popup.getElement().querySelector("button[data-fiche]");
    if (b) b.addEventListener("click", () => surligner(b.dataset.fiche, true));
  });

  liste.addEventListener("click", (e) => {
    const b = e.target.closest(".voir-carte");
    if (!b) return;
    const s = SITES.find((x) => x.id === b.dataset.id);
    if (window.matchMedia("(max-width: 900px)").matches) {
      document.getElementById("carte").scrollIntoView({ behavior: "smooth", block: "center" });
    }
    carte.flyTo(s.coords, 15, { duration: 0.8 });
    reperes[s.id].openPopup();
    surligner(s.id, false);
  });

  function surligner(id, defiler) {
    document.querySelectorAll(".fiche.actif").forEach((f) => f.classList.remove("actif"));
    const fiche = document.getElementById(`site-${id}`);
    fiche.classList.add("actif");
    if (defiler) fiche.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Application des filtres ----------

  function appliquer(majUrl) {
    zonePoles.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.pole === etat.pole)));

    const visibles = SITES.filter((s) =>
      (etat.pole === "tous" || s.pole === etat.pole) &&
      (!etat.sport || s.sports.includes(etat.sport)));

    SITES.forEach((s) => {
      const visible = visibles.includes(s);
      document.getElementById(`site-${s.id}`).hidden = !visible;
      if (visible) reperes[s.id].addTo(carte);
      else reperes[s.id].remove();
    });
    document.getElementById("vide").hidden = visibles.length > 0;
    resultat.textContent = visibles.length > 1 ? `${visibles.length} sites affichés` : `${visibles.length} site affiché`;

    if (visibles.length === 1) carte.setView(visibles[0].coords, 14);
    else if (visibles.length > 1) carte.fitBounds(visibles.map((s) => s.coords), { padding: [30, 30] });
    else carte.setView([3.1, 101.68], 10);

    if (majUrl) {
      const p = new URLSearchParams();
      if (etat.pole !== "tous") p.set("pole", etat.pole);
      if (etat.sport) p.set("sport", etat.sport);
      history.replaceState(null, "", p.toString() ? `?${p}` : location.pathname);
    }
  }

  appliquer(false);
})();
