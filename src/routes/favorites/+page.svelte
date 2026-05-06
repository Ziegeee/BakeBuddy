<script lang="ts">
  import { base } from '$app/paths';
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
</script>

<svelte:head>
  <title>Favoriten – Bake Buddy</title>
</svelte:head>

<div class="py-8 space-y-6">
  <div>
    <h1 class="text-3xl font-bold text-[#2d1f15] dark:text-[#fff3e0] mb-2" style="font-family: 'Playfair Display', serif;">
      Deine Favoriten ❤️
    </h1>
    <p class="text-[#8d7464] dark:text-[#a08878]">Alle Rezepte, die du besonders gern hast.</p>
  </div>

  {#if recipeStore.favorites.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each recipeStore.favorites as recipe (recipe.id)}
        <RecipeCard {recipe} />
      {/each}
    </div>
  {:else}
    <EmptyState
      icon="💝"
      title="Noch keine Favoriten"
      description="Markiere Rezepte mit dem Herz-Symbol, um sie hier zu speichern."
    >
      {#snippet action()}
        <a
          href="{base}/library"
          class="px-6 py-3 bg-gradient-to-r from-[#f06543] to-[#e8465c] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#f06543]/25 transition-all"
        >
          Zur Bibliothek
        </a>
      {/snippet}
    </EmptyState>
  {/if}
</div>
