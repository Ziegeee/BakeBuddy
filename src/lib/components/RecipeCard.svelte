<script lang="ts">
  import type { Recipe } from '$lib/types/recipe';
  import { getCategoryEmoji, getCategoryColors } from '$lib/types/recipe';
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import { Clock, ChefHat, Heart } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  let { recipe }: { recipe: Recipe } = $props();

  const colors = $derived(getCategoryColors(recipe.category));

  function handleFavorite(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    recipeStore.toggleFavorite(recipe.id);
  }
</script>

<a href="/recipe/{recipe.id}" class="block group" transition:fade={{ duration: 250 }}>
  <div class="card-hover relative bg-white dark:bg-[#2a1f28] rounded-2xl overflow-hidden shadow-sm border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60">
    <!-- Image / Gradient Placeholder -->
    <div class="relative h-48 overflow-hidden">
      {#if recipe.image}
        <img
          src={recipe.image}
          alt={recipe.name}
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      {:else}
        <div
          class="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
          style="background: linear-gradient(135deg, {colors[0]}, {colors[1]});"
        >
          <span class="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
            {getCategoryEmoji(recipe.category)}
          </span>
        </div>
      {/if}
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      <!-- Favorite Button -->
      <button
        onclick={handleFavorite}
        class="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200
          {recipe.isFavorite
            ? 'bg-[#e8465c]/90 text-white shadow-lg shadow-[#e8465c]/30'
            : 'bg-white/80 dark:bg-[#2a1f28]/80 text-[#8d7464] hover:text-[#e8465c] hover:bg-white'}"
        aria-label={recipe.isFavorite ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
      >
        <Heart size={18} fill={recipe.isFavorite ? 'currentColor' : 'none'} />
      </button>

      <!-- Category Badge -->
      <div class="absolute bottom-3 left-3">
        <span class="inline-flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-[#2a1f28]/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#6b5545] dark:text-[#c4a898]">
          {getCategoryEmoji(recipe.category)} {recipe.category}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-lg font-bold text-[#2d1f15] dark:text-[#fff3e0] mb-1 line-clamp-1 group-hover:text-[#f06543] dark:group-hover:text-[#ffb4a2] transition-colors">
        {recipe.name}
      </h3>
      <p class="text-sm text-[#8d7464] dark:text-[#a08878] line-clamp-2 mb-3">
        {recipe.description}
      </p>
      <div class="flex items-center gap-4 text-xs text-[#b8a08e] dark:text-[#8d7464]">
        <span class="flex items-center gap-1">
          <Clock size={14} />
          {recipe.bakingTime} Min.
        </span>
        <span class="flex items-center gap-1">
          <ChefHat size={14} />
          {recipe.difficulty}
        </span>
      </div>
    </div>
  </div>
</a>
