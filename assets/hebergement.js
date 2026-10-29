// Page hébergement : quartiers, filtres et carte
(function () {
  const etat = { pole: "tous", budget: "" };

  const liste = document.getElementById("liste-quartiers");
  const zonePoles = document.getElementById("filtre-poles");
  const selectBudget = document.getElementById("filtre-budget");
  const resultat = document.getElementById("resultat");

  // Un quartier entre dans une gamme de prix si sa fourchette la recoupe
  const budgets = {
    petit: (q) => q.prixMin < 200,
    moyen: (q) => q.prixMin <= 500 && q.prixMax >= 200,
    luxe: (q) => q.prixMax > 500,
  };

  function rm(n) {
    return n.toLocaleString("en-GB");
  }

  // ---------- Filtres ----------

  const boutonsPoles = [["tous", { nom: "All" }], ...Object.entries(POLES)];
  zonePoles.innerHTML = boutonsPoles
    .map(([id, p]) =>
      `<button type="button" class="puce" data-pole="${id}" style="--couleur-pole:${p.couleur || "transparent"}">${p.nom}</button>`)
    .join("");

  zonePoles.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-pole]");
    if (!b) return;
    etat.pole = b.dataset.pole;
    appliquer();
  });
  selectBudget.addEventListener("change", () => {
    etat.budget = selectBudget.value;
    appliquer();
  });

  // ---------- Fiches ----------

  liste.innerHTML = QUARTIERS.map((q) => `
    <li class="fiche" id="quartier-${q.id}" style="--couleur-pole:${POLES[q.poles[0]].couleur}">
      <h3>${q.nom}</h3>
      <p class="fiche-local">${q.accroche}</p>
      <ul class="fiche-sports">${q.poles.map((p) => `<li>Near ${POLES[p].nom}</li>`).join("")}</ul>
      <p>${q.description}</p>
      <dl>
        <dt>Per night</dt><dd>RM ${rm(q.prixMin)}–${rm(q.prixMax)}</dd>
        <dt>Station</dt><dd>${q.station}</dd>
        <dt>Best for</dt><dd>${q.ideal}</dd>
        ${q.trajets.map(([lieu, duree]) => `<dt>${lieu}</dt><dd>${duree}</dd>`).join("")}
      </dl>
      <button type="button" class="voir-carte" data-id="${q.id}">Show on map</button>
    </li>`).join("") + `<li class="vide" id="vide" hidden>No neighbourhood matches these filters. Choose another hub or “Any budget”.</li>`;

  // ---------- Carte ----------

  const carte = L.map("carte", { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(carte);

  // Les sites de compétition, en repères discrets
  SITES.forEach((s) => {
    const icone = L.divIcon({
      className: "",
      html: `<div class="repere-site" style="--couleur-pole:${POLES[s.pole].couleur}"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
    L.marker(s.coords, { icon: icone, title: s.nom, alt: s.nom, keyboard: false })
      .bindPopup(`<strong>${s.nom}</strong>${s.sports.join(", ")}`)
      .addTo(carte);
  });

  const reperes = {};
  QUARTIERS.forEach((q) => {
    const icone = L.divIcon({
      className: "",
      html: `<div class="repere-quartier"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    const m = L.marker(q.coords, { icon: icone, title: q.nom, alt: q.nom, zIndexOffset: 1000 });
    m.bindPopup(`<strong>${q.nom}</strong>${q.accroche}<br><button type="button" data-fiche="${q.id}">Read more</button>`);
    reperes[q.id] = m;
  });

  carte.on("popupopen", (e) => {
    const b = e.popup.getElement().querySelector("button[data-fiche]");
    if (b) b.addEventListener("click", () => surligner(b.dataset.fiche, true));
  });

  liste.addEventListener("click", (e) => {
    const b = e.target.closest(".voir-carte");
    if (!b) return;
    const q = QUARTIERS.find((x) => x.id === b.dataset.id);
    if (window.matchMedia("(max-width: 900px)").matches) {
      document.getElementById("carte").scrollIntoView({ behavior: "smooth", block: "center" });
    }
    carte.flyTo(q.coords, 14, { duration: 0.8 });
    reperes[q.id].openPopup();
    surligner(q.id, false);
  });

  function surligner(id, defiler) {
    document.querySelectorAll(".fiche.actif").forEach((f) => f.classList.remove("actif"));
    const fiche = document.getElementById(`quartier-${id}`);
    fiche.classList.add("actif");
    if (defiler) fiche.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Application des filtres ----------

  function appliquer() {
    zonePoles.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.pole === etat.pole)));

    const visibles = QUARTIERS.filter((q) =>
      (etat.pole === "tous" || q.poles.includes(etat.pole)) &&
      (!etat.budget || budgets[etat.budget](q)));

    QUARTIERS.forEach((q) => {
      const visible = visibles.includes(q);
      document.getElementById(`quartier-${q.id}`).hidden = !visible;
      if (visible) reperes[q.id].addTo(carte);
      else reperes[q.id].remove();
    });
    document.getElementById("vide").hidden = visibles.length > 0;
    resultat.textContent = visibles.length !== 1 ? `${visibles.length} neighbourhoods shown` : `${visibles.length} neighbourhood shown`;

    if (visibles.length === 1) carte.setView(visibles[0].coords, 13);
    else if (visibles.length > 1) carte.fitBounds(visibles.map((q) => q.coords), { padding: [40, 40] });
    else carte.setView([3.1, 101.68], 10);
  }

  appliquer();
})();
