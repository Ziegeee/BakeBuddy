<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import FloatingAddButton from '$lib/components/FloatingAddButton.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <title>Bake Buddy – Dein Backrezept-Manager</title>
</svelte:head>

<div class="min-h-screen bg-[#FFF9F0] dark:bg-[#1a1118] transition-colors duration-300">
  <Navbar />
  <main class="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
    <div class="page-enter">
      {@render children()}
    </div>
  </main>
  <FloatingAddButton />
</div>
