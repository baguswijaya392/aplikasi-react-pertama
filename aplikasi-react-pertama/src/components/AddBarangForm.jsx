import { useState } from 'react';
import { emptyBarangForm, validateBarangForm } from './barangForm.js';

function AddBarangForm({ onSubmit, editingBarang, onCancelEdit, kategoriList }) {
  const [formData, setFormData] = useState(
    editingBarang
      ? {
          nama: editingBarang.nama,
          kategoriId: String(editingBarang.kategoriId),
          stok: String(editingBarang.stok),
        }
      : emptyBarangForm
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (errors.form) setErrors((prev) => ({ ...prev, form: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = validateBarangForm(formData);
    if (result.errors) {
      setErrors(result.errors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      await onSubmit(result.data);
      setFormData(emptyBarangForm);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="add-member-form">
      <h3 className="form-title">
        {editingBarang ? '✏️ Edit Data Barang' : '+ Tambah Data Barang'}
      </h3>

      <div className="barang-form-row">
        <div className="form-group">
          <label htmlFor="barang-nama">Nama Barang</label>
          <input
            id="barang-nama"
            name="nama"
            placeholder="Contoh: Laptop Belajar"
            value={formData.nama}
            onChange={handleChange}
            className={errors.nama ? 'input-error' : ''}
          />
          {errors.nama && <span className="error-text">⚠️ {errors.nama}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="barang-kategori">Kategori</label>
          <select
            id="barang-kategori"
            name="kategoriId"
            value={formData.kategoriId}
            onChange={handleChange}
            className={errors.kategoriId ? 'input-error' : ''}
          >
            <option value="">-- Pilih Kategori --</option>
            {kategoriList.map((kategori) => (
              <option key={kategori.id} value={String(kategori.id)}>
                {kategori.nama}
              </option>
            ))}
          </select>
          {errors.kategoriId && (
            <span className="error-text">⚠️ {errors.kategoriId}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="barang-stok">Jumlah / Stok</label>
          <input
            id="barang-stok"
            name="stok"
            type="number"
            min="0"
            step="1"
            placeholder="0"
            value={formData.stok}
            onChange={handleChange}
            className={errors.stok ? 'input-error' : ''}
          />
          {errors.stok && <span className="error-text">⚠️ {errors.stok}</span>}
        </div>

        <div className="form-group form-actions-inline">
          {editingBarang && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={submitting}
              className="btn-cancel"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn-submit"
          >
            {submitting
              ? 'Menyimpan...'
              : editingBarang
                ? 'Simpan Perubahan'
                : '+ Tambah Barang'}
          </button>
        </div>
      </div>

      {errors.form && (
        <p role="alert" className="error-text" style={{ marginTop: '10px' }}>
          ⚠️ {errors.form}
        </p>
      )}
    </form>
  );
}

export default AddBarangForm;
