<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { recipeStore } from '$lib/stores/recipes.svelte';
  import { DIFFICULTIES, getCategoryEmoji } from '$lib/types/recipe';
  import type { Difficulty } from '$lib/types/recipe';
  import { Upload, Plus, Minus, ChefHat } from 'lucide-svelte';

  let name = $state('');
  let description = $state('');
  let ingredients = $state(['']);
  let steps = $state(['']);
  let bakingTime = $state(30);
  let difficulty: Difficulty = $state('Einfach');
  let category = $state('Kuchen');
  let customCategory = $state('');
  let showCustomInput = $state(false);
  let image = $state('');

  let allCategories = $derived(recipeStore.allCategories);

  function addIngredient() { ingredients = [...ingredients, '']; }
  function removeIngredient(i: number) { ingredients = ingredients.filter((_, idx) => idx !== i); }
  function addStep() { steps = [...steps, '']; }
  function removeStep(i: number) { steps = steps.filter((_, idx) => idx !== i); }

  function handleImageUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { image = reader.result as string; };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const cleanIngredients = ingredients.filter(i => i.trim());
    const cleanSteps = steps.filter(s => s.trim());
    if (!name.trim() || cleanIngredients.length === 0 || cleanSteps.length === 0) return;

    const finalCategory = showCustomInput ? customCategory.trim() : category;
    if (!finalCategory) return;

    recipeStore.addRecipe({
      name: name.trim(),
      description: description.trim(),
      ingredients: cleanIngredients,
      steps: cleanSteps,
      bakingTime,
      difficulty,
      category: finalCategory,
      image: image || undefined
    });

    goto(`${base}/library`);
  }

  const inputClass = 'w-full px-4 py-3 bg-white dark:bg-[#2a1f28] border border-[#f3e8e0] dark:border-[#3d2b35] rounded-xl text-sm text-[#2d1f15] dark:text-[#fff3e0] placeholder-[#b8a08e] dark:placeholder-[#8d7464] focus:outline-none focus:ring-2 focus:ring-[#f06543]/30 focus:border-[#f06543]/50 transition-all';
</script>

<form onsubmit={handleSubmit} class="space-y-6 max-w-2xl mx-auto">
  <!-- Name -->
  <div>
    <label for="recipe-name" class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Rezeptname *</label>
    <input id="recipe-name" type="text" bind:value={name} placeholder="z.B. Schokoladen-Cookies" class={inputClass} required />
  </div>

  <!-- Description -->
  <div>
    <label for="recipe-desc" class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Beschreibung</label>
    <textarea id="recipe-desc" bind:value={description} placeholder="Eine kurze Beschreibung deines Rezepts..." rows="3" class={inputClass}></textarea>
  </div>

  <!-- Image Upload -->
  <div>
    <label class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Bild (optional)</label>
    {#if image}
      <div class="relative rounded-xl overflow-hidden mb-2">
        <img src={image} alt="Vorschau" class="w-full h-48 object-cover rounded-xl" />
        <button type="button" onclick={() => image = ''} class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600">✕</button>
      </div>
    {:else}
      <label class="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#f3e8e0] dark:border-[#3d2b35] rounded-xl cursor-pointer hover:border-[#f06543]/50 hover:bg-[#fff1ee]/50 dark:hover:bg-[#2d1f28]/50 transition-all">
        <Upload size={24} class="text-[#b8a08e] mb-2" />
        <span class="text-sm text-[#b8a08e]">Bild hochladen</span>
        <input type="file" accept="image/*" class="hidden" onchange={handleImageUpload} />
      </label>
    {/if}
  </div>

  <!-- Category & Difficulty -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label for="recipe-cat" class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Kategorie</label>
      {#if showCustomInput}
        <!-- Custom category input -->
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={customCategory}
            placeholder="Neue Kategorie eingeben..."
            class={inputClass}
            required
          />
          <button
            type="button"
            onclick={() => { showCustomInput = false; customCategory = ''; }}
            class="px-3 py-2 rounded-xl border border-[#f3e8e0] dark:border-[#3d2b35] text-[#8d7464] hover:bg-[#fff1ee] dark:hover:bg-[#2d1f28] transition-colors text-sm whitespace-nowrap"
          >
            Abbrechen
          </button>
        </div>
      {:else}
        <!-- Select existing + add new button -->
        <div class="flex gap-2">
          <select id="recipe-cat" bind:value={category} class={inputClass}>
            {#each allCategories as cat}
              <option value={cat}>{getCategoryEmoji(cat)} {cat}</option>
            {/each}
          </select>
          <button
            type="button"
            onclick={() => showCustomInput = true}
            class="px-3 py-2 rounded-xl border border-dashed border-[#f06543]/40 text-[#f06543] hover:bg-[#fff1ee] dark:hover:bg-[#2d1f28] transition-colors text-sm whitespace-nowrap flex items-center gap-1"
            title="Neue Kategorie erstellen"
          >
            <Plus size={16} />
            Neu
          </button>
        </div>
      {/if}
    </div>
    <div>
      <label for="recipe-diff" class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Schwierigkeit</label>
      <select id="recipe-diff" bind:value={difficulty} class={inputClass}>
        {#each DIFFICULTIES as diff}
          <option value={diff}>{diff}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Baking Time -->
  <div>
    <label for="recipe-time" class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Backzeit (Minuten)</label>
    <input id="recipe-time" type="number" bind:value={bakingTime} min="1" max="600" class={inputClass} />
  </div>

  <!-- Ingredients -->
  <div>
    <label class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Zutaten *</label>
    <div class="space-y-2">
      {#each ingredients as _, i}
        <div class="flex gap-2">
          <input type="text" bind:value={ingredients[i]} placeholder="z.B. 200g Mehl" class={inputClass} />
          {#if ingredients.length > 1}
            <button type="button" onclick={() => removeIngredient(i)} class="p-3 rounded-xl border border-red-200 dark:border-red-900/30 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <Minus size={16} />
            </button>
          {/if}
        </div>
      {/each}
    </div>
    <button type="button" onclick={addIngredient} class="mt-2 flex items-center gap-1.5 px-3 py-2 text-sm text-[#f06543] hover:bg-[#fff1ee] dark:hover:bg-[#2d1f28] rounded-lg transition-colors font-medium">
      <Plus size={16} /> Zutat hinzufügen
    </button>
  </div>

  <!-- Steps -->
  <div>
    <label class="block text-sm font-semibold text-[#4a3728] dark:text-[#d4c4b5] mb-2">Schritte *</label>
    <div class="space-y-2">
      {#each steps as _, i}
        <div class="flex gap-2">
          <span class="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-[#fff1ee] dark:bg-[#2d1f28] text-[#f06543] text-sm font-bold mt-1">{i + 1}</span>
          <textarea bind:value={steps[i]} placeholder="Beschreibe diesen Schritt..." rows="2" class={inputClass}></textarea>
          {#if steps.length > 1}
            <button type="button" onclick={() => removeStep(i)} class="p-3 rounded-xl border border-red-200 dark:border-red-900/30 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1">
              <Minus size={16} />
            </button>
          {/if}
        </div>
      {/each}
    </div>
    <button type="button" onclick={addStep} class="mt-2 flex items-center gap-1.5 px-3 py-2 text-sm text-[#f06543] hover:bg-[#fff1ee] dark:hover:bg-[#2d1f28] rounded-lg transition-colors font-medium">
      <Plus size={16} /> Schritt hinzufügen
    </button>
  </div>

  <!-- Submit -->
  <button
    type="submit"
    class="w-full py-4 bg-gradient-to-r from-[#f06543] to-[#e8465c] text-white rounded-xl text-base font-bold hover:shadow-lg hover:shadow-[#f06543]/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
  >
    <ChefHat size={20} />
    Rezept speichern
  </button>
</form>
