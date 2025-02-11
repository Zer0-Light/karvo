
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and anon key
export const supabase = createClient(
  'https://your-project-url.supabase.co',
  'your-anon-key'
);
