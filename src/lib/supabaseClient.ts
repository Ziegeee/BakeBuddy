import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

// Standardmäßige Fallback-URL, damit die App nicht crasht, falls die Umgebungsvariablen noch fehlen.
const supabaseUrl = env.PUBLIC_SUPABASE_URL || 'https://xyz123.supabase.co';
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || 'ey...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
