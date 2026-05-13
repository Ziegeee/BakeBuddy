<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { authStore } from '$lib/stores/auth.svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { Mail, Lock, LogIn, UserPlus } from 'lucide-svelte';

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let errorMsg = $state('');
  let isRegistering = $state(false);

  // Redirect to home if already logged in
  $effect(() => {
    if (authStore.user && !loading) {
      goto(`${base}/`);
    }
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!email || !password) return;

    loading = true;
    errorMsg = '';

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Depending on Supabase settings, email confirmation might be required
        errorMsg = 'Registrierung erfolgreich! (Bitte bestätige ggf. deine E-Mail)';
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        goto(`${base}/`);
      }
    } catch (err: any) {
      errorMsg = err.message || 'Ein Fehler ist aufgetreten.';
    } finally {
      loading = false;
    }
  }

  const inputClass = "w-full pl-11 pr-4 py-3 bg-white dark:bg-[#2a1f28] border border-[#f3e8e0] dark:border-[#3d2b35] rounded-xl text-sm text-[#2d1f15] dark:text-[#fff3e0] placeholder-[#b8a08e] dark:placeholder-[#8d7464] focus:outline-none focus:ring-2 focus:ring-[#f06543]/30 focus:border-[#f06543]/50 transition-all";
</script>

<svelte:head>
  <title>{isRegistering ? 'Registrieren' : 'Anmelden'} | Bake Buddy</title>
</svelte:head>

<div class="max-w-md mx-auto mt-12 bounce-in">
  <div class="bg-white/80 dark:bg-[#2a1f28]/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-[#f3e8e0]/60 dark:border-[#3d2b35]/60">
    <div class="text-center mb-8">
      <span class="text-4xl inline-block mb-4">🧁</span>
      <h1 class="text-2xl font-bold text-[#2d1f15] dark:text-[#fff3e0]">
        {isRegistering ? 'Willkommen bei Bake Buddy' : 'Willkommen zurück'}
      </h1>
      <p class="text-sm text-[#8d7464] dark:text-[#a08878] mt-2">
        {isRegistering ? 'Erstelle einen Account, um deine Rezepte zu speichern.' : 'Melde dich an, um auf deine Rezepte zuzugreifen.'}
      </p>
    </div>

    {#if errorMsg}
      <div class="mb-6 p-4 rounded-xl text-sm font-medium {errorMsg.includes('erfolgreich') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}">
        {errorMsg}
      </div>
    {/if}

    <form onsubmit={handleSubmit} class="space-y-5">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Mail size={18} class="text-[#b8a08e]" />
        </div>
        <input 
          type="email" 
          bind:value={email} 
          placeholder="E-Mail Adresse" 
          required 
          class={inputClass}
        />
      </div>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Lock size={18} class="text-[#b8a08e]" />
        </div>
        <input 
          type="password" 
          bind:value={password} 
          placeholder="Passwort" 
          required 
          minlength="6"
          class={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-gradient-to-r from-[#f06543] to-[#e8465c] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#f06543]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        {#if loading}
          <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Bitte warten...
        {:else if isRegistering}
          <UserPlus size={20} />
          Account erstellen
        {:else}
          <LogIn size={20} />
          Anmelden
        {/if}
      </button>
    </form>

    <div class="mt-6 text-center">
      <button 
        type="button"
        onclick={() => { isRegistering = !isRegistering; errorMsg = ''; }}
        class="text-sm text-[#8d7464] hover:text-[#f06543] transition-colors"
      >
        {isRegistering ? 'Du hast schon einen Account? Hier anmelden' : 'Noch kein Account? Hier registrieren'}
      </button>
    </div>
  </div>
</div>
