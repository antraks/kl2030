// En-tête et pied de page communs à toutes les pages
(function () {
  const page = document.body.dataset.page;
  const liens = [
    { id: "accueil", href: "index.html", texte: "Accueil" },
    { id: "sites", href: "sites.html", texte: "Sites" },
    { id: "programme", texte: "Programme" },
    { id: "hebergement", texte: "Hébergement" },
    { id: "restauration", texte: "Restauration" },
    { id: "infos", texte: "Infos pratiques" },
  ];

  const nav = liens
    .map((l) =>
      l.href
        ? `<a href="${l.href}"${l.id === page ? ' aria-current="page"' : ""}>${l.texte}</a>`
        : `<span aria-disabled="true">${l.texte}<small>bientôt</small></span>`
    )
    .join("");

  document.getElementById("entete").innerHTML = `
    <div class="conteneur">
      <a class="marque" href="index.html">
        <img src="assets/embleme.svg" alt="" width="34" height="34">
        <span>KL 2030</span>
      </a>
      <nav class="nav" aria-label="Navigation principale">${nav}</nav>
    </div>`;

  document.getElementById("pied").innerHTML = `
    <div class="bande-rebung inverse" aria-hidden="true"></div>
    <div class="conteneur">
      <p><strong>Kuala Lumpur 2030</strong>, Jeux du Commonwealth du centenaire, du 25 juillet au 5 août 2030.</p>
      <p>Site fictif réalisé à titre d'exemple, sans lien avec aucune organisation sportive.<br>
      Les vrais Jeux du Commonwealth 2030 se tiendront à Ahmedabad, en Inde.</p>
    </div>`;
})();
