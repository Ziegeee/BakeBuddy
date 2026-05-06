<script lang="ts">
  import { page } from '$app/state';
  import { base } from '$app/paths';
  import { themeStore } from '$lib/stores/theme.svelte';
  import { Home, BookOpen, Heart, Plus, Menu, X, Sun, Moon } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';

  let mobileOpen = $state(false);

  const navItems = [
    { path: `${base}/`, label: 'Home', icon: Home },
    { path: `${base}/library`, label: 'Bibliothek', icon: BookOpen },
    { path: `${base}/favorites`, label: 'Favoriten', icon: Heart }
  ];

  function closeMobile() {
    mobileOpen = false;
  }

  let currentPath = $derived(page.url.pathname);
</script>

<!-- Sticky Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#1a1118]/80 border-b border-[#f3e8e0] dark:border-[#3d2b35]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a href="{base}/" class="flex items-center gap-2 group">
        <span class="text-2xl group-hover:scale-110 transition-transform duration-200">🧁</span>
        <span class="text-xl font-bold bg-gradient-to-r from-[#f06543] to-[#e8465c] bg-clip-text text-transparent" style="font-family: 'Playfair Display', serif;">
          Bake Buddy
        </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1">
        {#each navItems as item}
          {@const isActive = currentPath === item.path}
          <a
            href={item.path}
            class="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              {isActive ? 'text-[#f06543] dark:text-[#ffb4a2] bg-[#fff1ee] dark:bg-[#2d1f28]' : 'text-[#6b5545] dark:text-[#c4a898] hover:text-[#f06543] dark:hover:text-[#ffb4a2] hover:bg-[#fff1ee] dark:hover:bg-[#2d1f28]'}"
          >
            <item.icon size={18} />
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Right Side -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button
          onclick={() => themeStore.toggle()}
          class="p-2 rounded-xl hover:bg-[#fff1ee] dark:hover:bg-[#2d1f28] text-[#6b5545] dark:text-[#c4a898] transition-colors"
          aria-label="Theme umschalten"
        >
          {#if themeStore.isDark}
            <Moon size={20} />
          {:else}
            <Sun size={20} />
          {/if}
        </button>

        <!-- Add Recipe (Desktop) -->
        <a
          href="{base}/add"
          class="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#f06543] to-[#e8465c] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#f06543]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} />
          Rezept
        </a>

        <!-- Mobile Menu Button -->
        <button
          onclick={() => mobileOpen = !mobileOpen}
          class="md:hidden p-2 rounded-xl text-[#6b5545] dark:text-[#c4a898] hover:bg-[#fff1ee] dark:hover:bg-[#2d1f28]"
        >
          {#if mobileOpen}
            <X size={22} />
          {:else}
            <Menu size={22} />
          {/if}
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
{#if mobileOpen}
  <div
    class="fixed inset-x-0 top-16 z-40 bg-white/95 dark:bg-[#1a1118]/95 backdrop-blur-xl border-b border-[#f3e8e0] dark:border-[#3d2b35] md:hidden"
    transition:fly={{ y: -10, duration: 200 }}
  >
    <div class="px-4 py-3 space-y-1">
      {#each navItems as item}
        {@const isActive = currentPath === item.path}
        <a
          href={item.path}
          onclick={closeMobile}
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
            {isActive ? 'bg-[#fff1ee] dark:bg-[#2d1f28] text-[#f06543] dark:text-[#ffb4a2]' : 'text-[#6b5545] dark:text-[#c4a898]'}"
        >
          <item.icon size={20} />
          {item.label}
        </a>
      {/each}
      <a
        href="{base}/add"
        onclick={closeMobile}
        class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#f06543] to-[#e8465c] text-white rounded-xl text-sm font-semibold"
      >
        <Plus size={20} />
        Neues Rezept
      </a>
    </div>
  </div>
{/if}

<!-- Spacer -->
<div class="h-16"></div>
