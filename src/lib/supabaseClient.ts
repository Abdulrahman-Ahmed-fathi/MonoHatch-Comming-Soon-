import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabasePublishableKey);

export const getSupabaseClient = () => {
  if (!hasSupabaseConfig) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, supabasePublishableKey);
};
