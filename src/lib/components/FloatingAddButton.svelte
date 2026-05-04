<script lang="ts">
  import { Plus } from 'lucide-svelte';
  import { page } from '$app/state';

  let visible = $derived(page.url.pathname !== '/add');
</script>

{#if visible}
  <div class="fixed bottom-6 right-6 z-40 md:hidden bounce-in">
    <a
      href="/add"
      class="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#f06543] to-[#e8465c] text-white rounded-2xl shadow-lg shadow-[#f06543]/30 hover:shadow-xl transition-all duration-200 active:scale-95"
    >
      <Plus size={26} />
    </a>
  </div>
{/if}
