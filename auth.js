import { createClient } from '@supabase/supabase-js'

// Ganti ini dengan data dari Supabase
const SUPABASE_URL = 'https://eodwiaerjvjijdmlvnfm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZHdpYWVyanZqaWpkbWx2bmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NzEyNzIsImV4cCI6MjA3MDU0NzI3Mn0.WG6AMJP0lG97rETmfcl8iD9Ghlrmjii3lQgam5hlZjE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// fungsi login
export async function login(username, password) {
  let { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  if (error) {
    return { error: error.message };
  }
  if (data.length > 0) {
    return { user: data[0] };
  } else {
    return { error: "Username atau password salah" };
  }
}

