// 1. Inisialisasi Supabase (GANTI dengan URL dan key Anda)
const supabaseUrl = 'https://hdonylfjnpnacbrkrnxs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkb255bGZqbnBuYWNicmtybnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MDA4MDIsImV4cCI6MjA3MDQ3NjgwMn0.3wPIJl3Dpjz0z23wh-IKDZT-AzTveii3HcbsZJBafpk'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)


// --- 1. Fungsi untuk mengunggah gambar ke Storage ---
/**
 * Mengunggah file gambar ke Supabase Storage.
 * Menggunakan nama bucket yang benar: 'art-images'.
 * @param {File} file Objek File yang akan diunggah.
 * @returns {Promise<string|null>} URL publik gambar yang diunggah atau null jika gagal.
 */
async function uploadImage(file) {
    const bucketName = 'art-images';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);
    
    if (uploadError) {
        console.error('Error saat mengunggah gambar:', uploadError);
        return null;
    }
    
    const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);
    
    if (!publicUrl) {
      console.error('Error saat mendapatkan URL publik.');
      return null;
    }

    return publicUrl;
}

// --- 2. Fungsi untuk menyimpan data ke tabel 'images' ---
async function saveImageData(title, description, imageUrl) {
    const { data: { user } } = await supabase.auth.getUser();

    // Menggunakan nama tabel yang benar: 'images'
    const { data, error } = await supabase
        .from('images')
        .insert([
            { 
                title: title, 
                description: description, 
                image_url: imageUrl,
                user_id: user.id
            }
        ]);

    if (error) {
        console.error('Error saat menyimpan data:', error);
        return null;
    } else {
        console.log('Data berhasil disimpan:', data);
        return data;
    }
}

// --- 3. Fungsi untuk membaca data dari tabel 'images' ---
async function loadImages() {
    // Menggunakan nama tabel yang benar: 'images'
    const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error saat memuat data:', error);
        return [];
    } else {
        return data;
    }
}

// --- 4. Fungsi untuk menghapus data dari tabel 'images' ---
async function deleteImage(id) {
    // Menggunakan nama tabel yang benar: 'images'
    const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error saat menghapus data:', error);
        return false;
    } else {
        console.log('Data berhasil dihapus');
        return true;
    }
}