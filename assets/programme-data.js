// Programme des épreuves — Kuala Lumpur 2030 (fictif)
// Jour 1 = jeudi 25 juillet 2030, jour 12 = lundi 5 août 2030.
// Les noms de sport correspondent à ceux de sites-data.js.

window.CEREMONIES = {
  1: "Opening ceremony",
  12: "Closing ceremony",
};

window.TEMPS_FORTS = [
  "The Games open with a ceremony at the National Stadium at 8 pm. Hockey and lawn bowls get under way in the morning.",
  "The first medals of the Games go to the triathletes, who dive into Putrajaya Lake at 7 am. Swimming and track cycling begin.",
  "A Saturday packed with action: rugby sevens at the Merdeka Stadium, judo at MITEC and the triathlon mixed relay.",
  "Rugby sevens finals under the lights of the Merdeka Stadium, and the last day of track cycling in Nilai.",
  "Athletics begins at the National Stadium, with the 100 m finals on the first evening.",
  "The badminton mixed team final at Axiata Arena, the 3x3 basketball finals on Merdeka Square and the last night of artistic gymnastics.",
  "The last night in the pool at the National Aquatic Centre. Sepak takraw makes its Games debut at Titiwangsa.",
  "Diving begins, and wrestling hands out its first medals at MITEC.",
  "The cycling time trial through the streets of Putrajaya, and rhythmic gymnastics in Shah Alam.",
  "A Saturday of finals: women's hockey, beach volleyball, boxing and the first sepak takraw final in Games history.",
  "The men's hockey final, the last boxing finals and the cycling road race around Putrajaya.",
  "The marathon leaves Merdeka Square at 6 am. Badminton and netball crown their champions before the closing ceremony at 8 pm.",
];

window.PROGRAMME = [
  { sport: "3x3 basketball", jours: [2, 3, 4, 5, 6], finales: [6] },
  { sport: "Athletics", jours: [5, 6, 7, 8, 9, 10, 11, 12], finales: [5, 6, 7, 8, 9, 10, 11, 12] },
  { sport: "Badminton", jours: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], finales: [6, 12] },
  { sport: "Beach volleyball", jours: [2, 3, 4, 5, 6, 7, 8, 9, 10], finales: [10] },
  { sport: "Boxing", jours: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11], finales: [10, 11] },
  { sport: "Cycling", jours: [2, 3, 4, 9, 11], finales: [2, 3, 4, 9, 11] },
  { sport: "Diving", jours: [8, 9, 10, 11], finales: [8, 9, 10, 11] },
  { sport: "Gymnastics", jours: [2, 3, 4, 5, 6, 9, 10, 11], finales: [3, 5, 6, 10, 11] },
  { sport: "Hockey", jours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], finales: [10, 11] },
  { sport: "Judo", jours: [2, 3, 4], finales: [2, 3, 4] },
  { sport: "Lawn bowls", jours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], finales: [5, 7, 9, 10] },
  { sport: "Netball", jours: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], finales: [12] },
  { sport: "Rugby sevens", jours: [2, 3, 4], finales: [4] },
  { sport: "Sepak takraw", jours: [7, 8, 9, 10], finales: [10], demo: true },
  { sport: "Shooting", jours: [4, 5, 6, 7, 8, 9], finales: [4, 5, 6, 7, 8, 9] },
  { sport: "Squash", jours: [2, 3, 4, 5, 6, 7, 8, 9], finales: [6, 9] },
  { sport: "Swimming", jours: [2, 3, 4, 5, 6, 7], finales: [2, 3, 4, 5, 6, 7] },
  { sport: "Table tennis", jours: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11], finales: [6, 10, 11] },
  { sport: "Triathlon", jours: [2, 3], finales: [2, 3] },
  { sport: "Weightlifting", jours: [2, 3, 4, 5, 6, 7], finales: [2, 3, 4, 5, 6, 7] },
  { sport: "Wrestling", jours: [8, 9, 10], finales: [8, 9, 10] },
];
