import { createClient } from '@supabase/supabase-js'

// Ganti ini dengan data dari Supabase
const SUPABASE_URL = 'https://eodwiaerjvjijdmlvnfm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZHdpYWVyanZqaWpkbWx2bmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NzEyNzIsImV4cCI6MjA3MDU0NzI3Mn0.WG6AMJP0lG97rETmfcl8iD9Ghlrmjii3lQgam5hlZjE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// fungsi login
// Event listener tombol login
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

    // Cek ke tabel admin
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single(); // supaya hasilnya hanya satu

    if (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login!");
      return;
    }

    if (data) {
      // Jika username & password sesuai
      alert("Login berhasil!");
      window.location.href = "admin-add.html";
    } else {
      alert("Username atau password salah!");
    }
  });
});
