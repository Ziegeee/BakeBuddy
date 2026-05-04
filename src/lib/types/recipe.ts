export type Difficulty = 'Einfach' | 'Mittel' | 'Fortgeschritten';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  bakingTime: number;
  difficulty: Difficulty;
  category: string;
  image?: string;
  isFavorite: boolean;
  createdAt: string;
}

export const DEFAULT_CATEGORIES: string[] = [
  'Cookies','Kuchen','Muffins','Torten','Brot','Brownies','Cupcakes','Gebäck','Sonstiges'
];

export const DIFFICULTIES: Difficulty[] = ['Einfach','Mittel','Fortgeschritten'];

export const CATEGORY_EMOJIS: Record<string, string> = {
  Cookies:'🍪', Kuchen:'🎂', Muffins:'🧁', Torten:'🍰', Brot:'🍞',
  Brownies:'🍫', Cupcakes:'🧁', Gebäck:'🥐', Sonstiges:'🍴'
};

export const CATEGORY_COLORS: Record<string, [string, string]> = {
  Cookies:  ['#fbbf24','#f59e0b'],
  Kuchen:   ['#f9a8d4','#f472b6'],
  Muffins:  ['#c4b5fd','#a78bfa'],
  Torten:   ['#fda4af','#fb7185'],
  Brot:     ['#fcd34d','#fbbf24'],
  Brownies: ['#d97706','#92400e'],
  Cupcakes: ['#f0abfc','#e879f9'],
  Gebäck:   ['#fdba74','#fb923c'],
  Sonstiges:['#6ee7b7','#34d399']
};

/** Fallback colors for custom categories */
const CUSTOM_COLORS: [string, string][] = [
  ['#fb923c','#ea580c'], ['#38bdf8','#0284c7'], ['#a3e635','#65a30d'],
  ['#e879f9','#c026d3'], ['#f87171','#dc2626'], ['#2dd4bf','#0d9488'],
];

export function getCategoryEmoji(cat: string): string {
  return CATEGORY_EMOJIS[cat] ?? '✨';
}

export function getCategoryColors(cat: string): [string, string] {
  if (CATEGORY_COLORS[cat]) return CATEGORY_COLORS[cat];
  // Deterministic color based on name hash
  let hash = 0;
  for (let i = 0; i < cat.length; i++) hash = ((hash << 5) - hash + cat.charCodeAt(i)) | 0;
  return CUSTOM_COLORS[Math.abs(hash) % CUSTOM_COLORS.length];
}
