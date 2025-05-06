import { createClient } from '@supabase/supabase-js';

// 🔑 Replace these with your actual Supabase project values
const supabaseUrl = 'https://bcqwscocmzplipxtafkb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjcXdzY29jbXpwbGlweHRhZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDkxNzIsImV4cCI6MjA2MjEyNTE3Mn0._KiHGnc9XhI6dvvyK6CVwTdyMdKjig5GDaaSbD3bpmk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
