<script lang="ts">
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import { getCategoryEmoji } from '$lib/types/recipe';

  let { selectedCategory = $bindable('Alle'), sortBy = $bindable('newest') }: { selectedCategory: string; sortBy: string } = $props();

  let allCategories = $derived(['Alle', ...recipeStore.allCategories]);
</script>

<div class="space-y-4">
  <!-- Categories -->
  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {#each allCategories as cat}
      <button
        onclick={() => selectedCategory = cat}
        class="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
          {selectedCategory === cat
            ? 'bg-[#f06543] text-white shadow-md shadow-[#f06543]/20'
            : 'bg-white dark:bg-[#2a1f28] text-[#6b5545] dark:text-[#c4a898] border border-[#f3e8e0] dark:border-[#3d2b35] hover:border-[#f06543]/30 hover:text-[#f06543]'}"
      >
        {#if cat !== 'Alle'}
          <span>{getCategoryEmoji(cat)}</span>
        {/if}
        {cat}
      </button>
    {/each}
  </div>

  <!-- Sort -->
  <select
    bind:value={sortBy}
    class="px-4 py-2.5 bg-white dark:bg-[#2a1f28] border border-[#f3e8e0] dark:border-[#3d2b35] rounded-xl text-sm text-[#6b5545] dark:text-[#c4a898] focus:outline-none focus:ring-2 focus:ring-[#f06543]/30 cursor-pointer"
  >
    <option value="newest">Neueste zuerst</option>
    <option value="name">Name (A–Z)</option>
    <option value="time-asc">Backzeit (kurz → lang)</option>
    <option value="time-desc">Backzeit (lang → kurz)</option>
    <option value="difficulty">Schwierigkeit</option>
  </select>
</div>
