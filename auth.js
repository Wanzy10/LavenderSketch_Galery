// Jangan ada "import ..." di atas!

// Ganti dengan URL & anon key project kamu
const supabaseUrl = 'https://hdonylfjnpnacbrkrnxs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkb255bGZqbnBuYWNicmtybnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MDA4MDIsImV4cCI6MjA3MDQ3NjgwMn0.3wPIJl3Dpjz0z23wh-IKDZT-AzTveii3HcbsZJBafpk'

// Buat client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Input:", username, password);

    const { data, error } = await supabaseClient
      .from("admin")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      alert("Terjadi error saat login!");
      return;
    }

    if (data) {
      alert("Login berhasil!");
      window.location.href = "admin-add.html";
    } else {
      alert("Username atau password salah!");
    }
  });
});