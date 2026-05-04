import { sampleRecipes } from '$lib/data/sampleRecipes';
import type { Recipe, Difficulty } from '$lib/types/recipe';
import { DEFAULT_CATEGORIES } from '$lib/types/recipe';
import { browser } from '$app/environment';

function loadRecipes(): Recipe[] {
  if (!browser) return sampleRecipes;
  try {
    const stored = localStorage.getItem('bakebuddy-recipes');
    return stored ? JSON.parse(stored) : sampleRecipes;
  } catch {
    return sampleRecipes;
  }
}

class RecipeStore {
  recipes = $state<Recipe[]>(loadRecipes());

  /** All categories: defaults + any custom ones from recipes */
  get allCategories(): string[] {
    const fromRecipes = new Set(this.recipes.map(r => r.category));
    const all = new Set([...DEFAULT_CATEGORIES, ...fromRecipes]);
    return [...all];
  }

  get favorites(): Recipe[] {
    return this.recipes.filter(r => r.isFavorite);
  }

  get recentRecipes(): Recipe[] {
    return [...this.recipes]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }

  save() {
    if (browser) {
      localStorage.setItem('bakebuddy-recipes', JSON.stringify(this.recipes));
    }
  }

  addRecipe(data: Omit<Recipe, 'id' | 'createdAt' | 'isFavorite'>) {
    const recipe: Recipe = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
      isFavorite: false
    };
    this.recipes = [recipe, ...this.recipes];
    this.save();
    return recipe;
  }

  updateRecipe(id: string, updates: Partial<Recipe>) {
    this.recipes = this.recipes.map(r => r.id === id ? { ...r, ...updates } : r);
    this.save();
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.save();
  }

  toggleFavorite(id: string) {
    this.recipes = this.recipes.map(r =>
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    );
    this.save();
  }

  getRecipe(id: string): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  getFiltered(search: string, category: string, sort: string): Recipe[] {
    let filtered = [...this.recipes];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }

    if (category !== 'Alle') {
      filtered = filtered.filter(r => r.category === category);
    }

    const diffOrder: Record<Difficulty, number> = { Einfach: 0, Mittel: 1, Fortgeschritten: 2 };

    switch (sort) {
      case 'time-asc':  filtered.sort((a, b) => a.bakingTime - b.bakingTime); break;
      case 'time-desc': filtered.sort((a, b) => b.bakingTime - a.bakingTime); break;
      case 'difficulty': filtered.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]); break;
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }

  getRandomRecipe(): Recipe | null {
    if (this.recipes.length === 0) return null;
    return this.recipes[Math.floor(Math.random() * this.recipes.length)];
  }
}

export const recipeStore = new RecipeStore();
