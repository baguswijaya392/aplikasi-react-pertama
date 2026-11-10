
# Mini Project - Kartu Profil Interaktif

## Deskripsi Project

Mini Project Kartu Profil Interaktif merupakan aplikasi sederhana
berbasis React JS yang dibuat untuk menerapkan konsep React
Component, State Management, Event Handling, dan Modularisasi.

Aplikasi ini memungkinkan pengguna untuk memasukkan profesi
atau pekerjaan serta menambahkan jumlah likes melalui tombol
interaktif.

## Tujuan Project

1. Memahami penggunaan React Component.
2. Memahami penggunaan useState untuk mengelola state.
3. Memahami penggunaan onChange pada input.
4. Memahami penggunaan onClick pada button.
5. Memahami konsep modularisasi komponen React.

## Fitur Aplikasi

- Menampilkan kartu profil interaktif.
- Input profesi atau pekerjaan pengguna.
- Menampilkan profesi yang dimasukkan secara langsung.
- Tombol Like untuk menambahkan jumlah likes.
- Menampilkan jumlah likes secara dinamis.

## Teknologi yang Digunakan

- React JS
- JavaScript (JSX)
- CSS
- Vite

## Struktur Project

src/
├── components/
│   ├── Counter.jsx
│   ├── GreetingForm.jsx
│   └── ProfileCard.jsx
├── App.jsx
├── App.css
└── main.jsx

README.md

## Konsep React yang Digunakan

### 1. Component

Menggunakan komponen ProfileCard.jsx yang dipanggil
di dalam App.jsx.

### 2. useState

Digunakan untuk menyimpan dan memperbarui data profesi
serta jumlah likes.

### 3. onChange

Digunakan untuk menangani perubahan nilai pada input
profesi atau pekerjaan.

### 4. onClick

Digunakan untuk menjalankan fungsi penambahan jumlah likes
ketika tombol Like ditekan.

### 5. Modularisasi

Memisahkan komponen ProfileCard ke dalam folder components
agar kode lebih terstruktur dan mudah dikelola.

## Cara Menjalankan Project

1. Pastikan Node.js sudah terinstal.
2. Buka terminal pada folder project.
3. Jalankan perintah berikut:

   npm install

4. Jalankan aplikasi menggunakan perintah:

   npm run dev

5. Buka alamat localhost yang muncul pada terminal
   menggunakan browser.

## Kesimpulan

Melalui Mini Project ini, pengguna dapat memahami dasar
pengembangan aplikasi menggunakan React JS, khususnya
penggunaan Component, useState, onChange, onClick,
dan Modularisasi.
