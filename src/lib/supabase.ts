import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rtrhiahpdxdryzqwirci.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cmhpYWhwZHhkcnl6cXdpcmNpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzM2MTc5MCwiZXhwIjoyMTAyOTM3NzkwfQ.XdXK4hwvDPkmP3YurL2qeHkvCOW2tFXE5VqZFmz3hLc";

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
