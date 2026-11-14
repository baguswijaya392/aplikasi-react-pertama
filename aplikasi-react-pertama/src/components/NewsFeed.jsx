import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

export default function NewsFeed() {
  // 1. Tiga Pilar State Pengendali UI
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. State untuk Sumber Berita (Tahap 1 Tugas Mandiri)
  const [source, setSource] = useState('kompas');

  // 3. Fungsi Fetch Data
  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Tahap 2 Tugas Mandiri: Dinamisasi URL
      const url = `https://api.siputzx.my.id/api/berita/${source}`;
      const res = await fetch(url);
      
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      
      const json = await res.json();
      
      // Tahap 3 Tugas Mandiri: Normalisasi Data Adapter
      // Karena format CNN dan Kompas berbeda, kita seragamkan di sini
      const cleanData = (json.data || []).map((item) => ({
        ...item,
        image: item.image || item.image_thumbnail || item.image_full || null,
        date: item.date || item.time || 'Tanggal tidak tersedia',
        category: item.category || (source === 'cnn' ? 'CNN' : 'Kompas'),
      }));

      setNews(cleanData);
    } catch (err) {
      setError(err.message || 'Gagal mengambil berita terkini.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Lifecycle useEffect (Tahap 4 Tugas Mandiri: Reaktivitas sumber)
  useEffect(() => {
    fetchNews();
  }, [source]); // Akan re-fetch otomatis saat tombol Kompas/CNN diklik

  return (
    <div className="news-container">
      {/* Toolbar Atas */}
      <div className="news-toolbar">
        <div>
          <h2>Berita Terkini {source === 'kompas' ? 'Kompas' : 'CNN'}</h2>
          <p>Menampilkan {news.length} artikel dari API Siputzx</p>
        </div>
        
        <div className="toolbar-actions">
          {/* Tombol Switch Sumber Berita */}
          <div className="source-switcher">
            <button 
              className={`source-btn ${source === 'kompas' ? 'active' : ''}`}
              onClick={() => setSource('kompas')}
            >
              Kompas
            </button>
            <button 
              className={`source-btn cnn ${source === 'cnn' ? 'active' : ''}`}
              onClick={() => setSource('cnn')}
            >
              CNN
            </button>
          </div>

          <button 
            className="btn-refresh" 
            onClick={fetchNews} 
            disabled={isLoading}
          >
            {isLoading ? '⏳ Memuat...' : '🔄 Segarkan'}
          </button>
        </div>
      </div>

      {/* State 1: Loading */}
      {isLoading && (
        <div className="spinner-box">
          <div className="css-spinner"></div>
          <p>Mengunduh berita terbaru...</p>
        </div>
      )}

      {/* State 2: Error */}
      {error && !isLoading && (
        <div className="error-banner">
          <h5>Terjadi Kesalahan Jaringan</h5>
          <p>{error}</p>
          <button onClick={fetchNews}>Coba Lagi</button>
        </div>
      )}

      {/* State 3: Success Grid */}
      {!isLoading && !error && (
        <div className="news-grid">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}