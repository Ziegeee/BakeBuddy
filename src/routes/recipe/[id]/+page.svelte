<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import { getCategoryEmoji, getCategoryColors } from '$lib/types/recipe';
  import { ArrowLeft, Clock, ChefHat, Heart, Trash2, Users } from 'lucide-svelte';

  let recipeId = $derived(page.params.id);
  let recipe = $derived(recipeStore.getRecipe(recipeId));
  let colors = $derived(recipe ? getCategoryColors(recipe.category) : ['#f06543', '#e8465c'] as [string, string]);

  function handleDelete() {
    if (recipe && confirm('Möchtest du dieses Rezept wirklich löschen?')) {
      recipeStore.deleteRecipe(recipe.id);
      goto(`${base}/library`);
    }
  }

  function handleFavorite() {
    if (recipe) {
      recipeStore.toggleFavorite(recipe.id);
    }
  }

  function getDifficultyColor(diff: string) {
    switch (diff) {
      case 'Einfach': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Mittel': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Fortgeschritten': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default: return '';
    }
  }
</script>

<svelte:head>
  <title>{recipe?.name ?? 'Rezept'} – Bake Buddy</title>
</svelte:head>

{#if recipe}
  <div class="py-8 space-y-8">
    <!-- Back nav -->
    <div class="flex items-center justify-between">
      <a href="{base}/library" class="inline-flex items-center gap-1.5 text-sm text-[#8d7464] dark:text-[#a08878] hover:text-[#f06543] dark:hover:text-[#ffb4a2] transition-colors">
        <ArrowLeft size={16} />
        Zurück zur Bibliothek
      </a>
      <div class="flex items-center gap-2">
        <button
          onclick={handleFavorite}
          class="p-2.5 rounded-xl transition-all duration-200 {recipe.isFavorite ? 'bg-[#e8465c] text-white shadow-md shadow-[#e8465c]/30' : 'bg-white dark:bg-[#2a1f28] text-[#8d7464] hover:text-[#e8465c] border border-[#f3e8e0] dark:border-[#3d2b35]'}"
          aria-label="Favorit"
        >
          <Heart size={20} fill={recipe.isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button
          onclick={handleDelete}
          class="p-2.5 rounded-xl bg-white dark:bg-[#2a1f28] text-[#8d7464] hover:text-red-500 border border-[#f3e8e0] dark:border-[#3d2b35] hover:border-red-200 dark:hover:border-red-900/30 transition-all"
          aria-label="Löschen"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>

    <!-- Hero Image -->
    <div class="relative rounded-3xl overflow-hidden shadow-xl">
      {#if recipe.image}
        <img src={recipe.image} alt={recipe.name} class="w-full h-64 sm:h-80 object-cover" />
      {:else}
        <div
          class="w-full h-64 sm:h-80 flex items-center justify-center"
          style="background: linear-gradient(135deg, {colors[0]}, {colors[1]});"
        >
          <span class="text-9xl opacity-70">{getCategoryEmoji(recipe.category)}</span>
        </div>
      {/if}
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      <div class="absolute bottom-6 left-6 right-6">
        <span class="inline-flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-[#2a1f28]/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#6b5545] dark:text-[#c4a898] mb-3">
          {getCategoryEmoji(recipe.category)} {recipe.category}
        </span>
        <h1 class="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg" style="font-family: 'Playfair Display', serif;">
          {recipe.name}
        </h1>
      </div>
    </div>

    <!-- Meta -->
    <div class="flex flex-wrap gap-3">
      <div class="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2a1f28] rounded-xl border border-[#f3e8e0] dark:border-[#3d2b35]">
        <Clock size={18} class="text-[#f06543]" />
        <span class="text-sm font-medium text-[#4a3728] dark:text-[#d4c4b5]">{recipe.bakingTime} Minuten</span>
      </div>
      <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl {getDifficultyColor(recipe.difficulty)}">
        <ChefHat size={18} />
        <span class="text-sm font-medium">{recipe.difficulty}</span>
      </div>
      <div class="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2a1f28] rounded-xl border border-[#f3e8e0] dark:border-[#3d2b35]">
        <Users size={18} class="text-[#a78bfa]" />
        <span class="text-sm font-medium text-[#4a3728] dark:text-[#d4c4b5]">{recipe.ingredients.length} Zutaten</span>
      </div>
    </div>

    <!-- Description -->
    {#if recipe.description}
      <p class="text-[#6b5545] dark:text-[#c4a898] text-lg leading-relaxed">{recipe.description}</p>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Ingredients -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-[#2a1f28] rounded-2xl p-6 border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60 sticky top-24">
          <h2 class="text-xl font-bold text-[#2d1f15] dark:text-[#fff3e0] mb-4" style="font-family: 'Playfair Display', serif;">
            🧾 Zutaten
          </h2>
          <ul class="space-y-3">
            {#each recipe.ingredients as ingredient, i}
              <li class="flex items-start gap-3 group">
                <div class="w-5 h-5 mt-0.5 rounded-md border-2 border-[#f06543]/30 group-hover:border-[#f06543] transition-colors flex-shrink-0 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-sm bg-[#f06543] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span class="text-[#4a3728] dark:text-[#d4c4b5] text-sm">{ingredient}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Steps -->
      <div class="lg:col-span-3">
        <h2 class="text-xl font-bold text-[#2d1f15] dark:text-[#fff3e0] mb-4" style="font-family: 'Playfair Display', serif;">
          📝 Zubereitung
        </h2>
        <div class="space-y-4">
          {#each recipe.steps as step, i}
            <div class="flex gap-4 group">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#f06543] to-[#e8465c] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[#f06543]/20">
                {i + 1}
              </div>
              <div class="flex-1 bg-white dark:bg-[#2a1f28] rounded-xl p-4 border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60 group-hover:border-[#f06543]/30 transition-colors">
                <p class="text-sm text-[#4a3728] dark:text-[#d4c4b5] leading-relaxed">{step}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="py-20 text-center">
    <div class="text-6xl mb-4">😕</div>
    <h2 class="text-xl font-bold text-[#2d1f15] dark:text-[#fff3e0] mb-2">Rezept nicht gefunden</h2>
    <p class="text-[#8d7464] dark:text-[#a08878] mb-6">Dieses Rezept existiert leider nicht.</p>
    <a href="{base}/library" class="px-6 py-3 bg-gradient-to-r from-[#f06543] to-[#e8465c] text-white rounded-xl text-sm font-semibold">Zur Bibliothek</a>
  </div>
{/if}
