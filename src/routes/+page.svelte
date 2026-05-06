<script lang="ts">
  import { base } from '$app/paths';
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import RandomizerCard from '$lib/components/RandomizerCard.svelte';
  import { ArrowRight, Sparkles } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Bake Buddy – Home</title>
</svelte:head>

<div class="py-8 sm:py-12 space-y-12">
  <!-- Hero Section -->
  <section class="text-center space-y-4">
    <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#fff1ee] dark:bg-[#2d1f28] rounded-full text-sm font-medium text-[#f06543] dark:text-[#ffb4a2] mb-2">
      <Sparkles size={16} />
      Dein persönlicher Back-Assistent
    </div>
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2d1f15] dark:text-[#fff3e0] leading-tight" style="font-family: 'Playfair Display', serif;">
      Was backen wir<br/>
      <span class="bg-gradient-to-r from-[#f06543] to-[#e8465c] bg-clip-text text-transparent">heute?</span>
    </h1>
    <p class="text-lg text-[#8d7464] dark:text-[#a08878] max-w-lg mx-auto">
      Speichere deine Lieblingsrezepte, entdecke neue Ideen und lass dich vom Zufall überraschen.
    </p>
  </section>

  <!-- Randomizer Section -->
  <section>
    <RandomizerCard />
  </section>

  <!-- Recent Recipes -->
  {#if recipeStore.recentRecipes.length > 0}
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-[#2d1f15] dark:text-[#fff3e0]" style="font-family: 'Playfair Display', serif;">
          Zuletzt hinzugefügt
        </h2>
        <a href="{base}/library" class="flex items-center gap-1 text-sm font-semibold text-[#f06543] hover:text-[#d94e2e] transition-colors">
          Alle ansehen
          <ArrowRight size={16} />
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each recipeStore.recentRecipes as recipe (recipe.id)}
          <RecipeCard {recipe} />
        {/each}
      </div>
    </section>
  {/if}

  <!-- Quick Stats -->
  <section class="grid grid-cols-2 sm:grid-cols-4 gap-4">
    <div class="bg-white dark:bg-[#2a1f28] rounded-2xl p-5 text-center border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60">
      <div class="text-3xl font-bold text-[#f06543]">{recipeStore.recipes.length}</div>
      <div class="text-sm text-[#8d7464] dark:text-[#a08878] mt-1">Rezepte</div>
    </div>
    <div class="bg-white dark:bg-[#2a1f28] rounded-2xl p-5 text-center border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60">
      <div class="text-3xl font-bold text-[#e8465c]">{recipeStore.favorites.length}</div>
      <div class="text-sm text-[#8d7464] dark:text-[#a08878] mt-1">Favoriten</div>
    </div>
    <div class="bg-white dark:bg-[#2a1f28] rounded-2xl p-5 text-center border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60">
      <div class="text-3xl font-bold text-[#a78bfa]">{new Set(recipeStore.recipes.map(r => r.category)).size}</div>
      <div class="text-sm text-[#8d7464] dark:text-[#a08878] mt-1">Kategorien</div>
    </div>
    <div class="bg-white dark:bg-[#2a1f28] rounded-2xl p-5 text-center border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60">
      <div class="text-3xl font-bold text-[#34d399]">{recipeStore.recipes.filter(r => r.difficulty === 'Einfach').length}</div>
      <div class="text-sm text-[#8d7464] dark:text-[#a08878] mt-1">Einfache</div>
    </div>
  </section>
</div>
