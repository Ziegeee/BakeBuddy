import { supabase } from '$lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

export function createAuthStore() {
  let user: User | null = $state(null);
  let loading = $state(true);

  // Initialize Auth state
  supabase.auth.getSession().then(({ data: { session } }) => {
    user = session?.user ?? null;
    loading = false;
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    user = session?.user ?? null;
  });

  return {
    get user() { return user; },
    get loading() { return loading; },
    
    async logout() {
      await supabase.auth.signOut();
    }
  };
}

export const authStore = createAuthStore();
