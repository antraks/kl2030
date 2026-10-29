// Page d'accueil : compte à rebours, sports, pôles
(function () {
  const ouverture = new Date("2030-07-25T20:00:00+08:00");
  const compte = document.getElementById("compte");

  function pluriel(n, mot) {
    return `${n.toLocaleString("en-GB")} ${mot}${n !== 1 ? "s" : ""}`;
  }

  function majCompte() {
    const reste = ouverture - new Date();
    if (reste <= 0) {
      compte.textContent = "The Games have begun.";
      return;
    }
    const j = Math.floor(reste / 86400000);
    const h = Math.floor((reste % 86400000) / 3600000);
    const m = Math.floor((reste % 3600000) / 60000);
    compte.textContent = `Opening in ${pluriel(j, "day")}, ${pluriel(h, "hour")} and ${pluriel(m, "minute")}.`;
  }
  majCompte();
  setInterval(majCompte, 30000);

  // Liste des sports, tirée des sites
  const sports = [...new Set(SITES.flatMap((s) => s.sports))]
    .sort((a, b) => a.localeCompare(b, "en"));
  document.getElementById("sports").innerHTML = sports
    .map((sport) => {
      const demo = sport === "Sepak takraw";
      const lien = `sites.html?sport=${encodeURIComponent(sport)}`;
      return demo
        ? `<li class="demo"><a href="${lien}">${sport}<small>demonstration</small></a></li>`
        : `<li><a href="${lien}">${sport}</a></li>`;
    })
    .join("");

  document.getElementById("nb-sites").textContent = SITES.length;

  // Pôles
  const textes = {
    "bukit-jalil": "The sports park in the south of the city: five venues within a few minutes' walk of each other, around the National Stadium.",
    "centre": "At the foot of the Petronas Towers and on Independence Square: urban sports and convention halls.",
    "grand-kl": "Bukit Kiara, Shah Alam, Subang, Putrajaya and Nilai: the specialist venues, linked by free shuttles.",
  };
  document.getElementById("poles").innerHTML = Object.entries(POLES)
    .map(([id, pole]) => {
      const n = SITES.filter((s) => s.pole === id).length;
      return `
        <div class="pole" style="--couleur-pole:${pole.couleur}">
          <h3>${pole.nom}</h3>
          <p class="pole-nombre">${pluriel(n, "venue")}</p>
          <p>${textes[id]}</p>
          <a href="sites.html?pole=${id}">See the ${pole.nom} venues</a>
        </div>`;
    })
    .join("");
})();
