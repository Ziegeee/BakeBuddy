import { sampleRecipes } from '$lib/data/sampleRecipes';
import type { Recipe, Difficulty } from '$lib/types/recipe';
import { DEFAULT_CATEGORIES } from '$lib/types/recipe';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabaseClient';
import { authStore } from '$lib/stores/auth.svelte';

function loadLocalRecipes(): Recipe[] {
  if (!browser) return sampleRecipes;
  try {
    const stored = localStorage.getItem('bakebuddy-recipes');
    return stored ? JSON.parse(stored) : sampleRecipes;
  } catch {
    return sampleRecipes;
  }
}

class RecipeStore {
  recipes = $state<Recipe[]>(loadLocalRecipes());

  constructor() {
    if (browser) {
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          this.fetchCloudRecipes(session.user.id);
        } else {
          this.recipes = loadLocalRecipes();
        }
      });
    }
  }

  async fetchCloudRecipes(userId: string) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', userId)
      .order('createdAt', { ascending: false });
      
    if (!error && data) {
      this.recipes = data as Recipe[];
    }
  }

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

  saveLocal() {
    if (browser && !authStore.user) {
      localStorage.setItem('bakebuddy-recipes', JSON.stringify(this.recipes));
    }
  }

  async addRecipe(data: Omit<Recipe, 'id' | 'createdAt' | 'isFavorite'>) {
    const recipe: Recipe = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
      isFavorite: false
    };
    
    this.recipes = [recipe, ...this.recipes];
    
    if (authStore.user) {
      await supabase.from('recipes').insert({ ...recipe, user_id: authStore.user.id });
    } else {
      this.saveLocal();
    }
    return recipe;
  }

  async updateRecipe(id: string, updates: Partial<Recipe>) {
    this.recipes = this.recipes.map(r => r.id === id ? { ...r, ...updates } : r);
    
    if (authStore.user) {
      await supabase.from('recipes').update(updates).eq('id', id).eq('user_id', authStore.user.id);
    } else {
      this.saveLocal();
    }
  }

  async deleteRecipe(id: string) {
    this.recipes = this.recipes.filter(r => r.id !== id);
    
    if (authStore.user) {
      await supabase.from('recipes').delete().eq('id', id).eq('user_id', authStore.user.id);
    } else {
      this.saveLocal();
    }
  }

  async toggleFavorite(id: string) {
    const recipe = this.recipes.find(r => r.id === id);
    if (!recipe) return;
    const newStatus = !recipe.isFavorite;
    
    this.recipes = this.recipes.map(r =>
      r.id === id ? { ...r, isFavorite: newStatus } : r
    );
    
    if (authStore.user) {
      await supabase.from('recipes').update({ isFavorite: newStatus }).eq('id', id).eq('user_id', authStore.user.id);
    } else {
      this.saveLocal();
    }
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
