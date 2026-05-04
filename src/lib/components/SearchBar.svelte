<script lang="ts">
  import { Search, X } from 'lucide-svelte';

  let { value = $bindable(''), placeholder = 'Rezepte durchsuchen...' }: { value: string; placeholder?: string } = $props();
</script>

<div class="relative">
  <div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#b8a08e] dark:text-[#8d7464]">
    <Search size={18} />
  </div>
  <input
    type="text"
    bind:value
    {placeholder}
    class="w-full pl-11 pr-10 py-3 bg-white dark:bg-[#2a1f28] border border-[#f3e8e0] dark:border-[#3d2b35] rounded-xl text-sm text-[#2d1f15] dark:text-[#fff3e0] placeholder-[#b8a08e] dark:placeholder-[#8d7464] focus:outline-none focus:ring-2 focus:ring-[#f06543]/30 focus:border-[#f06543]/50 transition-all"
  />
  {#if value}
    <button
      onclick={() => value = ''}
      class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[#f3e8e0] dark:hover:bg-[#3d2b35] text-[#b8a08e] transition-colors"
    >
      <X size={16} />
    </button>
  {/if}
</div>
