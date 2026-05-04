<script lang="ts">
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import FilterBar from '$lib/components/FilterBar.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import type { Category } from '$lib/types/recipe';

  let search = $state('');
  let selectedCategory: Category | 'Alle' = $state('Alle');
  let sortBy = $state('newest');

  let filteredRecipes = $derived(recipeStore.getFiltered(search, selectedCategory, sortBy));
</script>

<svelte:head>
  <title>Bibliothek – Bake Buddy</title>
</svelte:head>

<div class="py-8 space-y-6">
  <div>
    <h1 class="text-3xl font-bold text-[#2d1f15] dark:text-[#fff3e0] mb-2" style="font-family: 'Playfair Display', serif;">
      Rezeptbibliothek
    </h1>
    <p class="text-[#8d7464] dark:text-[#a08878]">Durchsuche alle deine gespeicherten Backrezepte.</p>
  </div>

  <!-- Search -->
  <SearchBar bind:value={search} />

  <!-- Filters -->
  <FilterBar bind:selectedCategory bind:sortBy />

  <!-- Recipe Grid -->
  {#if filteredRecipes.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredRecipes as recipe (recipe.id)}
        <RecipeCard {recipe} />
      {/each}
    </div>
  {:else}
    <EmptyState
      icon="🔍"
      title="Keine Rezepte gefunden"
      description="Versuche einen anderen Suchbegriff oder Filter."
    />
  {/if}
</div>
