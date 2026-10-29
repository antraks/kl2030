// Page programme : vue par jour et grille des épreuves
(function () {
  const NB_JOURS = TEMPS_FORTS.length;
  const debut = new Date("2030-07-25T12:00:00+08:00");
  const jours = Array.from({ length: NB_JOURS }, (_, i) => new Date(debut.getTime() + i * 86400000));

  function date(d, options) {
    return d.toLocaleDateString("en-GB", { timeZone: "Asia/Kuala_Lumpur", ...options });
  }

  const sports = [...PROGRAMME].sort((a, b) => a.sport.localeCompare(b.sport, "en"));
  const lienSport = (p) => `sites.html?sport=${encodeURIComponent(p.sport)}`;
  const lieux = (p) => SITES.filter((s) => s.sports.includes(p.sport)).map((s) => s.nom).join(", ");

  // Jour affiché : celui de l'URL, sinon aujourd'hui pendant les Jeux, sinon le premier
  const jourIso = { year: "numeric", month: "2-digit", day: "2-digit" };
  const aujourdhui = jours.findIndex((d) => date(d, jourIso) === date(new Date(), jourIso)) + 1;
  const demande = Number(new URLSearchParams(location.search).get("day"));
  let jour = demande >= 1 && demande <= NB_JOURS ? demande : aujourdhui || 1;

  const choix = document.getElementById("choix-jours");
  const vue = document.getElementById("vue-jour");
  const grille = document.getElementById("grille");

  // ---------- Choix du jour ----------

  choix.innerHTML = jours.map((d, i) => `
    <button type="button" class="jour-bouton" data-jour="${i + 1}">
      <span>${date(d, { weekday: "short" })}</span>
      <strong>${date(d, { day: "numeric" })}</strong>
      <span>${date(d, { month: "short" })}</span>
    </button>`).join("");

  // ---------- Grille ----------

  const mois = [];
  jours.forEach((d) => {
    const nom = date(d, { month: "long" });
    if (mois.length && mois[mois.length - 1].nom === nom) mois[mois.length - 1].n++;
    else mois.push({ nom, n: 1 });
  });

  function cellules(classe) {
    return jours.map((_, i) => {
      const c = classe(i + 1);
      return c ? `<td data-jour="${i + 1}" class="${c[0]}"><span class="sr-only">${c[1]}</span></td>` : `<td data-jour="${i + 1}"></td>`;
    }).join("");
  }

  grille.innerHTML = `
    <thead>
      <tr class="mois"><td></td>${mois.map((m) => `<th scope="colgroup" colspan="${m.n}">${m.nom}</th>`).join("")}</tr>
      <tr>
        <th scope="col"><span class="sr-only">Sport</span></th>
        ${jours.map((d, i) => `
          <th scope="col" data-jour="${i + 1}">
            <button type="button" data-jour="${i + 1}" aria-label="${date(d, { weekday: "long", day: "numeric", month: "long" })}">
              ${date(d, { weekday: "short" })}<strong>${date(d, { day: "numeric" })}</strong>
            </button>
          </th>`).join("")}
      </tr>
    </thead>
    <tbody>
      <tr class="ligne-ceremonies">
        <th scope="row">Ceremonies</th>
        ${cellules((j) => CEREMONIES[j] && ["pastille-ceremonie", CEREMONIES[j]])}
      </tr>
      ${sports.map((p) => `
        <tr>
          <th scope="row"><a href="${lienSport(p)}">${p.sport}</a>${p.demo ? "<small>demonstration</small>" : ""}</th>
          ${cellules((j) => (p.finales.includes(j) ? ["pastille-finale", "Finals"] : p.jours.includes(j) && ["pastille-seance", "Competition"]))}
        </tr>`).join("")}
    </tbody>`;

  // ---------- Vue du jour ----------

  function afficher() {
    document.querySelectorAll("[data-jour]").forEach((el) => {
      const choisi = Number(el.dataset.jour) === jour;
      if (el.tagName === "BUTTON") el.setAttribute("aria-pressed", String(choisi));
      else el.classList.toggle("choisi", choisi);
    });

    const auProgramme = sports.filter((p) => p.jours.includes(jour));
    const nbFinales = auProgramme.filter((p) => p.finales.includes(jour)).length;
    const lignes = auProgramme.map((p) => {
      const finale = p.finales.includes(jour);
      return `
        <li${finale ? ' class="jour-finale"' : ""}>
          <a href="${lienSport(p)}">${p.sport}</a>
          <span>${lieux(p)}</span>
          ${finale ? "<em>Finals</em>" : ""}
        </li>`;
    });
    if (CEREMONIES[jour]) {
      lignes.unshift(`
        <li class="jour-ceremonie">
          <strong>${CEREMONIES[jour]}</strong>
          <span>Bukit Jalil National Stadium, 8 pm</span>
        </li>`);
    }

    vue.innerHTML = `
      <div>
        <p class="jour-date">${date(jours[jour - 1], { weekday: "long", day: "numeric", month: "long" })}</p>
        <p class="jour-numero">Day ${jour} of ${NB_JOURS}</p>
        <p class="jour-fort">${TEMPS_FORTS[jour - 1]}</p>
        <p class="jour-compte">${auProgramme.length} sports, ${nbFinales ? `${nbFinales} with finals` : "no finals"}</p>
      </div>
      <ul class="jour-sports">${lignes.join("")}</ul>`;
  }

  function choisir(j, defiler) {
    jour = j;
    afficher();
    history.replaceState(null, "", `?day=${jour}`);
    if (defiler) document.getElementById("jour").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  choix.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-jour]");
    if (b) choisir(Number(b.dataset.jour), false);
  });
  grille.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-jour]");
    if (b) choisir(Number(b.dataset.jour), true);
  });

  afficher();
})();
