// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uqgmcuxalddvvxupamzb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ21jdXhhbGRkdnZ4dXBhbXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDYyOTMsImV4cCI6MjA2NTQ4MjI5M30.BqHDvu0UicK4bIrrlh9fXD7t7nmr-dbiwGWuZ3Mrr_A";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);