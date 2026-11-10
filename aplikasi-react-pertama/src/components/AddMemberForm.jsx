import { useState } from 'react';
import { z } from 'zod';

// 1. Skema Validasi Zod (Termasuk Tugas Tambahan: Bio)
const memberSchema = z.object({
  name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  role: z.string().min(1, 'Wajib memilih salah satu peran tim'),
  bio: z.string().min(10, 'Bio minimal 10 karakter').max(80, 'Bio maksimal 80 karakter')
});

export default function AddMemberForm({ onAddMember }) {
  // 2. State untuk Form dan Error
  const [formData, setFormData] = useState({ name: '', email: '', role: '', bio: '' });
  const [errors, setErrors] = useState({});

  // 3. Handler saat mengetik
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Hapus pesan error saat user mulai mengetik ulang
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 4. Handler saat Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman reload

    // Validasi data menggunakan Zod
    const result = memberSchema.safeParse(formData);

    if (!result.success) {
      // Jika gagal, petakan error ke state
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return; // Hentikan proses
    }

    // Jika sukses, kirim data bersih ke induk
    onAddMember(result.data);
    
    // Reset form
    setFormData({ name: '', email: '', role: '', bio: '' });
    setErrors({});
  };

  return (
    <form className="add-member-form" onSubmit={handleSubmit}>
      <h3 className="form-title">+ Tambah Anggota Tim</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            type="text"
            name="name"
            placeholder="Contoh: Elder"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">⚠️ {errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Elder1234@.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">⚠️ {errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Posisi / Peran</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? 'input-error' : ''}
          >
            <option value="">-- Pilih Posisi --</option>
            <option value="Frontend Dev">Frontend Dev</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Jungler">Jungler</option>
            <option value="Roam">Roam</option>
          </select>
          {errors.role && <span className="error-text">⚠️ {errors.role}</span>}
        </div>

        <div className="form-group">
          <label>Bio Singkat</label>
          <input
            type="text"
            name="bio"
            placeholder="Contoh: Passionate in React & UI"
            value={formData.bio}
            onChange={handleChange}
            className={errors.bio ? 'input-error' : ''}
          />
          {errors.bio && <span className="error-text">⚠️ {errors.bio}</span>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn-submit">+ Tambah</button>
        </div>
      </div>
    </form>
  );
}