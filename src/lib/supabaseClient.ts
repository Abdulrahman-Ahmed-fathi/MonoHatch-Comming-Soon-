import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const missingSupabaseEnv = !supabaseUrl || !supabasePublishableKey;

if (missingSupabaseEnv) {
  console.error(
    "Supabase environment variables are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your deployment environment.",
  );
}

export const supabase = missingSupabaseEnv
  ? null
  : createClient(supabaseUrl, supabasePublishableKey);

export const ensureSupabase = () => {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  return supabase;
};
