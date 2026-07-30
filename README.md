# Portofolio

Website portofolio statis — React + Vite + Tailwind CSS, tanpa backend.

## Struktur folder

```
src/
  components/
    Navbar.jsx           navigasi atas; muncul (fade in) setelah Intro selesai
    Intro.jsx            sequence 3 tahap: teks "Welcome, User" (scroll-locked) -> tombol "check me" -> mata
    Eye.jsx               mata tunggal berbentuk almond (bukan lingkaran), posisi float, ngikutin kursor
    CursorSpotlight.jsx    lingkaran invert-warna yang nempel di kursor, aktif hanya saat mata terbuka
    Hero.jsx               statement utama + tombol CTA
    Projects.jsx            grid kartu project (datanya di data/projects.js)
    About.jsx                profil singkat + daftar skill
    Contact.jsx               link email dan sosial media
    Footer.jsx                 footer sederhana
  hooks/
    useGazeTracking.js          logic pupil-tracking + blink acak + idle-sleep 15 detik
  data/
    projects.js                  daftar project — edit di sini untuk update konten
  App.jsx                         menyusun semua section, atur kapan navbar muncul
  main.jsx                         entry point React
  index.css                         Tailwind + reset dasar
tailwind.config.js                  token warna, font, animasi (termasuk "float")
```

## Cara kerja intro (Welcome -> mata)

1. **Tahap "welcome"** — teks "Welcome, User" tampil layar penuh dengan animasi staggered. Scroll dikunci (`overflow: hidden` di `<body>`) selama tahap ini via `useEffect` di `Intro.jsx`. Otomatis pindah ke tahap berikutnya setelah 2.4 detik (`WELCOME_HOLD_MS`).
2. **Tahap "button"** — teks welcome hilang, muncul tombol `check me` saja. Navbar masih belum tampil.
3. **Tahap "awake"** — begitu tombol diklik, mata (bentuk almond, dibuat dari SVG `<path>`, bukan `border-radius`) muncul dengan animasi float halus. Navbar fade-in di saat yang sama (lewat callback `onAwake` ke `App.jsx`).

**Perilaku mata** (di `useGazeTracking.js`):
- Pupil mengikuti arah kursor, posisi dibatasi (clamped) supaya tidak keluar dari bentuk almond.
- **Kedip acak** setiap 3-6 detik (durasi kedip ~320ms) — interval acak dipilih supaya kesannya organik, bukan mekanis.
- **Tidur otomatis** — kalau kursor tidak bergerak selama 15 detik, mata menutup dan tetap tertutup sampai kursor bergerak lagi.
- **Efek invert warna** (`CursorSpotlight.jsx`) nempel di posisi kursor dan **aktif hanya saat mata terbuka** — mati sesaat saat kedip, dan mati total saat mata tidur.

> Catatan browser: efek invert pakai `backdrop-filter`, yang didukung baik di Chrome/Edge/Safari versi baru tapi kurang stabil di Firefox versi lama — cek lagi kalau target audiens kamu banyak pakai Firefox.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build untuk produksi

```bash
npm run build
```

## Catatan teknis

- Tidak ada backend — form kontak diganti dengan link `mailto:` dan link sosial media langsung, sesuai untuk hosting statis.
- Animasi menghormati `prefers-reduced-motion` — kalau user mengaktifkan pengaturan itu di OS-nya, animasi otomatis dimatikan.
- `useGazeTracking.js` pakai `getBoundingClientRect` tiap gerakan mouse untuk menghitung posisi mata secara akurat meskipun elemen berpindah (misal karena resize).
- **`src/hooks/useGazeTracking.js`** — ubah `BLINK_MIN_MS`, `BLINK_MAX_MS`, atau `IDLE_SLEEP_MS` kalau mau timing kedip/tidur yang beda.
# portofolio
