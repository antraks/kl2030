# Kuala Lumpur 2030 — Jeux du Commonwealth (site fictif)

Site de présentation fictif des Jeux du Commonwealth du centenaire à Kuala Lumpur, du 25 juillet au 5 août 2030. Aucun lien avec une organisation sportive réelle.

Site statique (HTML, CSS, JavaScript), sans étape de build, prévu pour GitHub Pages.

## Pages

- `index.html` : accueil, compte à rebours, histoire, sports, pôles, mascotte
- `sites.html` : les 16 sites de compétition, avec carte et filtres
- `food.html` : se restaurer pendant les Jeux, stands officiels filtrables, villages gourmands, plats à goûter, adresses en ville
- `accommodation.html` : où loger, dix quartiers filtrables par pôle et budget avec carte, types d'hébergement, arrivée depuis l'aéroport
- `visitor-info.html` : infos pratiques, entrée en Malaisie, météo et santé, règles des sites, accessibilité, transports, FAQ

Le contenu du site est en anglais (britannique). Le code et ses commentaires restent en français.

Les données des sites sont dans `assets/sites-data.js`, celles des stands dans `assets/restauration-data.js`, celles des quartiers dans `assets/hebergement-data.js`.

## Voir le site en local

```
python3 -m http.server 8765
```

puis ouvrir http://127.0.0.1:8765
