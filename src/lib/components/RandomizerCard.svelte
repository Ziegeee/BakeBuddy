<script lang="ts">
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import { getCategoryEmoji, getCategoryColors } from '$lib/types/recipe';
  import type { Recipe } from '$lib/types/recipe';
  import { Clock, ChefHat, Shuffle, Sparkles } from 'lucide-svelte';

  let isSpinning = $state(false);
  let revealedRecipe = $state<Recipe | null>(null);
  let showCard = $state(false);

  function startRandomize() {
    showCard = false;
    isSpinning = true;
    revealedRecipe = null;

    // Simulate spinning delay
    setTimeout(() => {
      const recipe = recipeStore.getRandomRecipe();
      revealedRecipe = recipe;
      isSpinning = false;

      setTimeout(() => {
        showCard = true;
      }, 100);
    }, 1500);
  }

  let colors = $derived(revealedRecipe ? getCategoryColors(revealedRecipe.category) : ['#f06543', '#e8465c'] as [string, string]);
</script>

<div class="flex flex-col items-center">
  <!-- Randomize Button -->
  <button
    onclick={startRandomize}
    disabled={isSpinning || recipeStore.recipes.length === 0}
    class="group relative px-8 py-4 bg-gradient-to-r from-[#f06543] to-[#e8465c] text-white rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-[#f06543]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
  >
    {#if isSpinning}
      <div class="spin-slow">
        <Sparkles size={24} />
      </div>
      <span>Suche das perfekte Rezept...</span>
    {:else}
      <Shuffle size={24} class="group-hover:rotate-180 transition-transform duration-500" />
      <span>Ich weiß nicht, was ich backen soll!</span>
    {/if}

    <!-- Decorative glow -->
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f06543] to-[#e8465c] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
  </button>

  <!-- Revealed Recipe Card -->
  {#if showCard && revealedRecipe}
    <div class="mt-8 w-full max-w-md card-flip-in">
      <a href="/recipe/{revealedRecipe.id}" class="block group">
        <div class="bg-white dark:bg-[#2a1f28] rounded-3xl overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/20 border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60 card-hover">
          <!-- Image -->
          <div class="relative h-56 overflow-hidden">
            {#if revealedRecipe.image}
              <img src={revealedRecipe.image} alt={revealedRecipe.name} class="w-full h-full object-cover" />
            {:else}
              <div
                class="w-full h-full flex items-center justify-center"
                style="background: linear-gradient(135deg, {colors[0]}, {colors[1]});"
              >
                <span class="text-8xl opacity-80">{getCategoryEmoji(revealedRecipe.category)}</span>
              </div>
            {/if}
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <span class="inline-flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-[#2a1f28]/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#6b5545] dark:text-[#c4a898] mb-2">
                {getCategoryEmoji(revealedRecipe.category)} {revealedRecipe.category}
              </span>
              <h3 class="text-2xl font-bold text-white drop-shadow-md" style="font-family: 'Playfair Display', serif;">
                {revealedRecipe.name}
              </h3>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <p class="text-sm text-[#8d7464] dark:text-[#a08878] mb-4">{revealedRecipe.description}</p>
            <div class="flex items-center gap-4 text-sm text-[#b8a08e] dark:text-[#8d7464]">
              <span class="flex items-center gap-1.5">
                <Clock size={16} />
                {revealedRecipe.bakingTime} Min.
              </span>
              <span class="flex items-center gap-1.5">
                <ChefHat size={16} />
                {revealedRecipe.difficulty}
              </span>
            </div>
            <div class="mt-4 text-center">
              <span class="text-sm font-semibold text-[#f06543] group-hover:underline">Rezept ansehen →</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  {/if}
</div>
