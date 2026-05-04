<script lang="ts">
  import RecipeForm from '$lib/components/RecipeForm.svelte';
  import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Neues Rezept – Bake Buddy</title>
</svelte:head>

<div class="py-8 space-y-6">
  <div>
    <a href="/" class="inline-flex items-center gap-1.5 text-sm text-[#8d7464] dark:text-[#a08878] hover:text-[#f06543] dark:hover:text-[#ffb4a2] transition-colors mb-4">
      <ArrowLeft size={16} />
      Zurück
    </a>
    <h1 class="text-3xl font-bold text-[#2d1f15] dark:text-[#fff3e0]" style="font-family: 'Playfair Display', serif;">
      Neues Rezept hinzufügen 🧑‍🍳
    </h1>
    <p class="text-[#8d7464] dark:text-[#a08878] mt-2">Teile dein Lieblingsrezept mit Bake Buddy.</p>
  </div>

  <RecipeForm />
</div>
