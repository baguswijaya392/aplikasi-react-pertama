import { useEffect, useState } from 'react';
import AddBarangForm from './AddBarangForm';
import {
  createBarang,
  deleteBarang,
  listBarang,
  listKategori,
  updateBarang,
} from '../api/barang';

function BarangDirectory() {
  const [barang, setBarang] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(null); // { type: 'success' | 'error', message }

  // 1. Ambil data barang dan kategori sekali saat komponen tampil.
  useEffect(() => {
    let cancelled = false;

    Promise.all([listBarang(), listKategori()])
      .then(([barangData, kategoriData]) => {
        if (cancelled) return;
        setBarang(barangData);
        setKategoriList(kategoriData);
        setError('');
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Notifikasi sukses/gagal hilang otomatis setelah 4 detik.
  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const showNotice = (type, message) => setNotice({ type, message });

  const replaceBarang = (updated) => {
    setBarang((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  // 2. Create & Update
  const handleSubmit = async (payload) => {
    try {
      if (editId !== null) {
        const updated = await updateBarang(editId, payload);
        replaceBarang(updated);
        setEditId(null);
        showNotice('success', `Barang "${updated.nama}" berhasil diperbarui.`);
      } else {
        const created = await createBarang(payload);
        setBarang((prev) => [...prev, created]);
        showNotice('success', `Barang "${created.nama}" berhasil ditambahkan.`);
      }
      setError('');
    } catch (err) {
      showNotice('error', `Gagal menyimpan: ${err.message}`);
      throw err;
    }
  };

  // 3. Delete dengan dialog konfirmasi
  const handleDelete = async (item) => {
    if (!window.confirm(`Yakin ingin menghapus barang "${item.nama}"?`)) return;

    try {
      await deleteBarang(item.id);
      setBarang((prev) => prev.filter((row) => row.id !== item.id));
      if (editId === item.id) setEditId(null);
      showNotice('success', `Barang "${item.nama}" berhasil dihapus.`);
    } catch (err) {
      showNotice('error', `Gagal menghapus: ${err.message}`);
    }
  };

  const editingBarang =
    editId !== null ? barang.find((item) => item.id === editId) || null : null;

  const totalStok = barang.reduce((sum, item) => sum + item.stok, 0);

  return (
    <div className="directory-container" style={{ paddingTop: '10px' }}>
      {/* Toast Notice */}
      {notice && (
        <div
          role={notice.type === 'error' ? 'alert' : 'status'}
          className={`toast-notice ${notice.type}`}
        >
          <span aria-hidden="true">{notice.type === 'success' ? '✅' : '⚠️'}</span>
          <span style={{ flex: 1, textAlign: 'left' }}>{notice.message}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Tutup notifikasi"
            className="toast-close"
          >
            ×
          </button>
        </div>
      )}

      {/* Header Halaman */}
      <h2 className="directory-title">📦 Data Barang & Kategori</h2>

      {/* Statistik Ringkas */}
      <div className="stats-bar">
        <div className="stat-box">
          <div className="stat-num">{barang.length}</div>
          <div className="stat-label">Jenis Barang</div>
        </div>
        <div className="stat-box">
          <div className="stat-num online">{totalStok}</div>
          <div className="stat-label">Total Stok</div>
        </div>
        <div className="stat-box">
          <div className="stat-num offline">{kategoriList.length}</div>
          <div className="stat-label">Kategori</div>
        </div>
      </div>

      {/* Pesan Error */}
      {error && (
        <div className="error-banner" style={{ marginBottom: '25px' }}>
          <h5 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>⚠️ Terjadi Kesalahan</h5>
          <p style={{ margin: 0 }}>{error}</p>
          {!loading && barang.length === 0 && (
            <p style={{ fontSize: '13px', marginTop: '10px', color: '#cbd5e1' }}>
              Pastikan server database Express berjalan: buka terminal dan jalankan <code style={{ color: '#38bdf8' }}>npm run server</code>.
            </p>
          )}
        </div>
      )}

      {/* Form Tambah / Edit */}
      <AddBarangForm
        key={editId ?? 'new'}
        onSubmit={handleSubmit}
        editingBarang={editingBarang}
        onCancelEdit={() => setEditId(null)}
        kategoriList={kategoriList}
      />

      {/* Tabel Data Barang */}
      {loading ? (
        <div className="spinner-box">
          <div className="css-spinner"></div>
          <p>Memuat data barang dari server...</p>
        </div>
      ) : (
        <div className="barang-table-wrapper">
          <table className="barang-table">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Kategori</th>
                <th style={{ textAlign: 'right' }}>Stok</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barang.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#c084fc', fontWeight: '600' }}>
                    {error
                      ? 'Data barang tidak dapat dimuat. Pastikan server backend MySQL berjalan.'
                      : 'Belum ada data barang. Silakan tambahkan barang pertama melalui form di atas.'}
                  </td>
                </tr>
              ) : (
                barang.map((item) => (
                  <tr
                    key={item.id}
                    className={editId === item.id ? 'row-editing' : ''}
                  >
                    <td>
                      <span className="barang-name">{item.nama}</span>
                    </td>
                    <td>
                      <span className="badge-kategori">{item.kategori}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`stok-badge ${item.stok === 0 ? 'habis' : ''}`}>
                        {item.stok === 0 ? 'Habis (0)' : item.stok}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          onClick={() => setEditId(item.id)}
                          className="btn-table-edit"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="btn-table-delete"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BarangDirectory;
