import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dqrtwgzprtlfxeqfutdr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxcnR3Z3pwcnRsZnhlcWZ1dGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3OTg3MjAsImV4cCI6MjA1MTM3NDcyMH0.mf2yl5Syvd-h3YpirUezinLIPZOfssCgqFp54dVVG-w";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
