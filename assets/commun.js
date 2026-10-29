// En-tête et pied de page communs à toutes les pages
(function () {
  const page = document.body.dataset.page;
  const liens = [
    { id: "accueil", href: "index.html", texte: "Home" },
    { id: "sites", href: "sites.html", texte: "Venues" },
    { id: "programme", href: "schedule.html", texte: "Schedule" },
    { id: "hebergement", href: "accommodation.html", texte: "Accommodation" },
    { id: "restauration", href: "food.html", texte: "Food" },
    { id: "infos", href: "visitor-info.html", texte: "Visitor info" },
  ];

  const nav = liens
    .map((l) =>
      l.href
        ? `<a href="${l.href}"${l.id === page ? ' aria-current="page"' : ""}>${l.texte}</a>`
        : `<span aria-disabled="true">${l.texte}<small>soon</small></span>`
    )
    .join("");

  document.getElementById("entete").innerHTML = `
    <div class="conteneur">
      <a class="marque" href="index.html">
        <img src="assets/embleme.svg" alt="" width="34" height="34">
        <span>KL 2030</span>
      </a>
      <nav class="nav" aria-label="Main navigation">${nav}</nav>
    </div>`;

  document.getElementById("pied").innerHTML = `
    <div class="bande-rebung inverse" aria-hidden="true"></div>
    <div class="conteneur">
      <p><strong>Kuala Lumpur 2030</strong>, the centenary Commonwealth Games, 25 July to 5 August 2030.</p>
      <p>A fictional site made as an example, unaffiliated with any sports organisation.<br>
      The real 2030 Commonwealth Games will be held in Ahmedabad, India.</p>
    </div>`;
})();
