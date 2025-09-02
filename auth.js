import { createClient } from '@supabase/supabase-js'

// Ganti ini dengan data dari Supabase
const SUPABASE_URL = 'https://eodwiaerjvjijdmlvnfm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZHdpYWVyanZqaWpkbWx2bmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NzEyNzIsImV4cCI6MjA3MDU0NzI3Mn0.WG6AMJP0lG97rETmfcl8iD9Ghlrmjii3lQgam5hlZjE'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Username dan password wajib diisi!");
      return;
    }

    try {
      const { data, error } = await supabaseClient
        .from("admin")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error) {
        console.error(error);
        alert("Login gagal, coba lagi!");
        return;
      }

      if (data) {
        alert("Login berhasil!");
        window.location.href = "admin-add.html";
      } else {
        alert("Username atau password salah!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Terjadi error tak terduga.");
    }
  });
});
