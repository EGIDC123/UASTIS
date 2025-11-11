const form = document.getElementById('jadwalForm');
const jadwalList = document.getElementById('jadwalList');

// Ambil data dari localStorage atau buat array baru
let jadwalArray = JSON.parse(localStorage.getItem('jadwal')) || [];
renderJadwal();

// Event tambah jadwal
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const client = document.getElementById('client').value.trim();
    const tanggal = document.getElementById('tanggal').value;
    const waktu = document.getElementById('waktu').value;
    const lokasi = document.getElementById('lokasi').value.trim();

    if (!client || !tanggal || !waktu || !lokasi) return;

    const jadwal = { client, tanggal, waktu, lokasi, selesai: false };
    jadwalArray.push(jadwal);

    localStorage.setItem('jadwal', JSON.stringify(jadwalArray));
    form.reset();
    renderJadwal();
});

// Render daftar jadwal
function renderJadwal() {
    jadwalList.innerHTML = '';
    jadwalArray.forEach((jadwal, index) => {
        const li = document.createElement('li');
        li.className = jadwal.selesai ? 'completed' : '';
        li.innerHTML = `
            <span>${jadwal.client} | ${jadwal.tanggal} ${jadwal.waktu} | ${jadwal.lokasi}</span>
            <div>
                <button class="edit-btn" onclick="editJadwal(${index})">Edit</button>
                <button onclick="tandaiSelesai(${index})">${jadwal.selesai ? 'Batal' : 'Selesai'}</button>
                <button onclick="hapusJadwal(${index})">Hapus</button>
            </div>
        `;
        jadwalList.appendChild(li);
    });
}

// Tandai selesai / batal
function tandaiSelesai(index) {
    jadwalArray[index].selesai = !jadwalArray[index].selesai;
    localStorage.setItem('jadwal', JSON.stringify(jadwalArray));
    renderJadwal();
}

// Hapus jadwal
function hapusJadwal(index) {
    jadwalArray.splice(index, 1);
    localStorage.setItem('jadwal', JSON.stringify(jadwalArray));
    renderJadwal();
}

// Edit jadwal
function editJadwal(index) {
    const jadwal = jadwalArray[index];
    document.getElementById('client').value = jadwal.client;
    document.getElementById('tanggal').value = jadwal.tanggal;
    document.getElementById('waktu').value = jadwal.waktu;
    document.getElementById('lokasi').value = jadwal.lokasi;

    // Hapus jadwal lama sebelum submit ulang
    hapusJadwal(index);
}
