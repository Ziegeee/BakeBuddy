<script lang="ts">
  import type { Snippet } from 'svelte';

  let { icon, title, description, action }: {
    icon: string;
    title: string;
    description: string;
    action?: Snippet;
  } = $props();
</script>

<div class="flex flex-col items-center justify-center py-20 px-6 text-center page-enter">
  <div class="text-6xl mb-4">{icon}</div>
  <h3 class="text-xl font-bold text-[#2d1f15] dark:text-[#fff3e0] mb-2">{title}</h3>
  <p class="text-[#8d7464] dark:text-[#a08878] max-w-sm mb-6">{description}</p>
  {#if action}
    {@render action()}
  {/if}
</div>
