// Page restauration : stands officiels et filtres
(function () {
  const etat = { pole: "tous", regime: "", sansArachides: false };

  const liste = document.getElementById("liste-stands");
  const zonePoles = document.getElementById("filtre-poles");
  const selectRegime = document.getElementById("filtre-regime");
  const caseArachides = document.getElementById("filtre-arachides");
  const resultat = document.getElementById("resultat");
  const sites = Object.fromEntries(SITES.map((s) => [s.id, s]));

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
  selectRegime.addEventListener("change", () => {
    etat.regime = selectRegime.value;
    appliquer();
  });
  caseArachides.addEventListener("change", () => {
    etat.sansArachides = caseArachides.checked;
    appliquer();
  });

  // ---------- Fiches ----------

  function badges(st) {
    const b = [];
    if (st.regimes.includes("vegan")) b.push(`<li class="badge-vert">Vegan options</li>`);
    else if (st.regimes.includes("vegetarien")) b.push(`<li class="badge-vert">Vegetarian options</li>`);
    if (st.piquant) b.push(`<li class="badge-rouge">Spicy</li>`);
    if (st.arachides) b.push(`<li class="badge-or">Peanuts</li>`);
    return b.length ? `<ul class="badges">${b.join("")}</ul>` : "";
  }

  liste.innerHTML = STANDS.map((st) => {
    const site = sites[st.site];
    return `
      <li class="stand" id="stand-${st.id}" style="--couleur-pole:${POLES[site.pole].couleur}">
        <h3>${st.nom}</h3>
        <p class="stand-lieu"><a href="sites.html#site-${site.id}">${site.nom}</a> · ${st.emplacement}</p>
        <p>${st.plats}</p>
        <p class="stand-prix">${st.prix}</p>
        ${badges(st)}
      </li>`;
  }).join("") + `<li class="vide" id="vide" hidden>No stall matches these filters. Choose another hub or “All stalls”.</li>`;

  // ---------- Application des filtres ----------

  function appliquer() {
    zonePoles.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.pole === etat.pole)));

    const visibles = STANDS.filter((st) =>
      (etat.pole === "tous" || sites[st.site].pole === etat.pole) &&
      (!etat.regime || st.regimes.includes(etat.regime)) &&
      (!etat.sansArachides || !st.arachides));

    STANDS.forEach((st) => {
      document.getElementById(`stand-${st.id}`).hidden = !visibles.includes(st);
    });
    document.getElementById("vide").hidden = visibles.length > 0;
    resultat.textContent = visibles.length !== 1 ? `${visibles.length} stalls shown` : `${visibles.length} stall shown`;
  }

  appliquer();
})();
