// Page d'accueil : compte à rebours, sports, pôles
(function () {
  const ouverture = new Date("2030-07-25T20:00:00+08:00");
  const compte = document.getElementById("compte");

  function pluriel(n, mot) {
    return `${n.toLocaleString("fr-FR")} ${mot}${n > 1 ? "s" : ""}`;
  }

  function majCompte() {
    const reste = ouverture - new Date();
    if (reste <= 0) {
      compte.textContent = "Les Jeux ont commencé.";
      return;
    }
    const j = Math.floor(reste / 86400000);
    const h = Math.floor((reste % 86400000) / 3600000);
    const m = Math.floor((reste % 3600000) / 60000);
    compte.textContent = `Ouverture dans ${pluriel(j, "jour")}, ${pluriel(h, "heure")} et ${pluriel(m, "minute")}.`;
  }
  majCompte();
  setInterval(majCompte, 30000);

  // Liste des sports, tirée des sites
  const sports = [...new Set(SITES.flatMap((s) => s.sports))]
    .sort((a, b) => a.localeCompare(b, "fr"));
  document.getElementById("sports").innerHTML = sports
    .map((sport) => {
      const demo = sport === "Sepak takraw";
      const lien = `sites.html?sport=${encodeURIComponent(sport)}`;
      return demo
        ? `<li class="demo"><a href="${lien}">${sport}<small>démonstration</small></a></li>`
        : `<li><a href="${lien}">${sport}</a></li>`;
    })
    .join("");

  document.getElementById("nb-sites").textContent = SITES.length;

  // Pôles
  const textes = {
    "bukit-jalil": "Le parc sportif du sud de la ville : cinq sites à quelques minutes à pied les uns des autres, autour du stade national.",
    "centre": "Au pied des tours Petronas et sur la place de l'Indépendance, les sports urbains et les salles de congrès.",
    "grand-kl": "Bukit Kiara, Shah Alam, Subang, Putrajaya et Nilai : les sites spécialisés, reliés par des navettes gratuites.",
  };
  document.getElementById("poles").innerHTML = Object.entries(POLES)
    .map(([id, pole]) => {
      const n = SITES.filter((s) => s.pole === id).length;
      return `
        <div class="pole" style="--couleur-pole:${pole.couleur}">
          <h3>${pole.nom}</h3>
          <p class="pole-nombre">${pluriel(n, "site")}</p>
          <p>${textes[id]}</p>
          <a href="sites.html?pole=${id}">Voir les sites de ${pole.nom}</a>
        </div>`;
    })
    .join("");
})();
