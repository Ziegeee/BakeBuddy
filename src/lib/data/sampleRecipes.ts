import type { Recipe } from '$lib/types/recipe';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Schokoladen-Chip Cookies',
    description: 'Knusprig außen, weich innen – der Klassiker unter den Cookies mit extra viel Schokolade.',
    ingredients: ['225g Butter (weich)','150g Zucker','150g brauner Zucker','2 Eier','1 TL Vanilleextrakt','350g Mehl','1 TL Backpulver','1 TL Salz','300g Schokoladenstückchen'],
    steps: ['Ofen auf 190°C vorheizen.','Butter und Zucker cremig rühren.','Eier und Vanille unterrühren.','Mehl, Backpulver und Salz vermischen und unterheben.','Schokoladenstückchen unterheben.','Teigkugeln auf ein Backblech setzen.','10–12 Minuten goldbraun backen.','Auf dem Blech 5 Minuten abkühlen lassen.'],
    bakingTime: 12, difficulty: 'Einfach', category: 'Cookies', isFavorite: true, createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Saftiger Zitronenkuchen',
    description: 'Ein herrlich frischer Zitronenkuchen mit zartem Zuckerguss – perfekt für den Nachmittagskaffee.',
    ingredients: ['250g Mehl','200g Zucker','4 Eier','200g Butter','1 Päckchen Backpulver','3 Zitronen (Saft & Abrieb)','100g Puderzucker','1 Prise Salz'],
    steps: ['Ofen auf 175°C vorheizen und Kastenform einfetten.','Butter und Zucker schaumig schlagen.','Eier einzeln unterrühren.','Zitronenabrieb und Saft von 2 Zitronen einrühren.','Mehl und Backpulver unterheben.','50 Minuten backen (Stäbchenprobe).','Puderzucker mit restlichem Zitronensaft verrühren.','Den warmen Kuchen mit dem Guss überziehen.'],
    bakingTime: 50, difficulty: 'Einfach', category: 'Kuchen', isFavorite: false, createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Blaubeer-Muffins',
    description: 'Fluffige Muffins mit saftigen Blaubeeren und einem Hauch von Zimt – ideal zum Frühstück.',
    ingredients: ['280g Mehl','150g Zucker','2 TL Backpulver','½ TL Zimt','80ml Pflanzenöl','240ml Milch','2 Eier','200g Blaubeeren','1 TL Vanilleextrakt'],
    steps: ['Ofen auf 190°C vorheizen, Muffinform vorbereiten.','Trockene Zutaten in einer Schüssel vermischen.','Öl, Milch, Eier und Vanille verquirlen.','Nasse Zutaten zu den trockenen geben, kurz verrühren.','Blaubeeren vorsichtig unterheben.','Teig in die Förmchen füllen.','20–25 Minuten goldbraun backen.'],
    bakingTime: 25, difficulty: 'Einfach', category: 'Muffins', isFavorite: true, createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Red Velvet Torte',
    description: 'Eine elegante Red Velvet Torte mit cremigem Frischkäse-Frosting – ein echter Hingucker.',
    ingredients: ['300g Mehl','300g Zucker','2 EL Kakaopulver','1 TL Backpulver','1 TL Natron','2 Eier','240ml Buttermilch','240ml Pflanzenöl','Rote Lebensmittelfarbe','500g Frischkäse','100g Butter','300g Puderzucker'],
    steps: ['Ofen auf 175°C vorheizen, zwei Springformen einfetten.','Mehl, Zucker, Kakao, Backpulver und Natron mischen.','Eier, Buttermilch, Öl und Lebensmittelfarbe verrühren.','Trockene Zutaten unterheben.','Teig auf die Formen verteilen, 30 Min. backen.','Auskühlen lassen.','Frischkäse, Butter und Puderzucker zum Frosting verarbeiten.','Torte schichten und einstreichen.'],
    bakingTime: 30, difficulty: 'Fortgeschritten', category: 'Torten', isFavorite: false, createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Zimtschnecken',
    description: 'Weiche, fluffige Zimtschnecken mit süßer Glasur – wie frisch aus der schwedischen Bäckerei.',
    ingredients: ['500g Mehl','80g Zucker','1 Päckchen Trockenhefe','250ml warme Milch','80g Butter (geschmolzen)','1 Ei','100g brauner Zucker','2 EL Zimt','60g weiche Butter','150g Puderzucker','2 EL Milch'],
    steps: ['Hefe in warmer Milch auflösen, 5 Min. ruhen lassen.','Mehl, Zucker, Ei und geschmolzene Butter zu einem Teig verarbeiten.','1 Stunde gehen lassen.','Teig ausrollen, mit weicher Butter bestreichen.','Braunen Zucker und Zimt darüber streuen.','Aufrollen und in 12 Scheiben schneiden.','In eine gefettete Form setzen, 30 Min. gehen lassen.','25 Minuten bei 180°C backen.','Mit Puderzucker-Glasur beträufeln.'],
    bakingTime: 25, difficulty: 'Mittel', category: 'Gebäck', isFavorite: true, createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Bananenbrot',
    description: 'Saftiges Bananenbrot mit Walnüssen – die perfekte Verwertung für reife Bananen.',
    ingredients: ['3 reife Bananen','75g Butter (geschmolzen)','150g Zucker','1 Ei','1 TL Vanilleextrakt','1 TL Backpulver','200g Mehl','60g Walnüsse (gehackt)'],
    steps: ['Ofen auf 175°C vorheizen.','Bananen zerdrücken.','Geschmolzene Butter unterrühren.','Zucker, Ei und Vanille unterrühren.','Backpulver und Mehl unterheben.','Walnüsse unterheben.','In eine gefettete Kastenform füllen.','55–60 Minuten backen.'],
    bakingTime: 60, difficulty: 'Einfach', category: 'Brot', isFavorite: false, createdAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Schokoladen-Brownies',
    description: 'Intensiv schokoladige Brownies – fudgy in der Mitte und leicht knusprig am Rand.',
    ingredients: ['200g Zartbitterschokolade','150g Butter','200g Zucker','3 Eier','1 TL Vanilleextrakt','100g Mehl','30g Kakaopulver','½ TL Salz'],
    steps: ['Ofen auf 175°C vorheizen.','Schokolade und Butter im Wasserbad schmelzen.','Zucker, Eier und Vanille einrühren.','Mehl, Kakao und Salz unterheben.','In eine ausgelegte Backform gießen.','25 Minuten backen (nicht überbacken!).','Komplett auskühlen lassen und schneiden.'],
    bakingTime: 25, difficulty: 'Einfach', category: 'Brownies', isFavorite: false, createdAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Vanille-Cupcakes',
    description: 'Zarte Vanille-Cupcakes mit Buttercreme-Topping – hübsch und unglaublich lecker.',
    ingredients: ['200g Mehl','150g Zucker','1½ TL Backpulver','120g Butter (weich)','2 Eier','120ml Milch','2 TL Vanilleextrakt','200g Butter (Frosting)','400g Puderzucker','Lebensmittelfarbe (optional)'],
    steps: ['Ofen auf 175°C vorheizen.','Mehl, Zucker und Backpulver mischen.','Weiche Butter hinzufügen und verrühren.','Eier, Milch und Vanille unterrühren.','In Cupcake-Förmchen füllen (⅔ voll).','18–20 Minuten backen.','Butter cremig rühren, Puderzucker einarbeiten.','Cupcakes nach dem Auskühlen dekorieren.'],
    bakingTime: 20, difficulty: 'Mittel', category: 'Cupcakes', isFavorite: false, createdAt: new Date().toISOString()
  }
];
