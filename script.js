// 1. Inisialisasi Supabase (GANTI dengan URL dan key Anda)
const supabaseUrl = 'https://hdonylfjnpnacbrkrnxs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkb255bGZqbnBuYWNicmtybnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MDA4MDIsImV4cCI6MjA3MDQ3NjgwMn0.3wPIJl3Dpjz0z23wh-IKDZT-AzTveii3HcbsZJBafpk'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// 2. Fungsi untuk menyimpan data
async function saveImageData(title, description, imageUrl) {
    // Tambahkan user_id untuk keamanan
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
        .from('images')
        .insert([
            { 
                title: title, 
                description: description, 
                image_url: imageUrl,
                user_id: user.id  // Penting untuk RLS
            }
        ])
    
    if (error) {
        console.error('Error saving data:', error)
        return null
    } else {
        console.log('Data saved successfully:', data)
        return data
    }
}

// 3. Fungsi untuk membaca data
async function loadImages() {
    const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error loading data:', error)
        return []
    } else {
        return data
    }
}

// 4. Fungsi untuk menghapus data
async function deleteImage(id) {
    const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', id)
    
    if (error) {
        console.error('Error deleting data:', error)
        return false
    } else {
        console.log('Data deleted successfully')
        return true
    }
}

// 5. Fungsi untuk upload gambar ke Storage
async function uploadImage(file) {
    const fileExt = file.name.split('.').pop()
    const fileName = ${Math.random()}.${fileExt}
    
    const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file)
    
    if (error) {
        console.error('Error uploading image:', error)
        return null
    }
    
    const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)
    
    return publicUrl
}