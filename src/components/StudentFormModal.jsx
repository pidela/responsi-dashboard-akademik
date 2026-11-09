import React from 'react';

export default function StudentFormModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  isEditing,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold text-dark">
              <i className={`bi ${isEditing ? 'bi-pencil-square text-warning' : 'bi-person-plus-fill text-primary'} me-2`}></i>
              {isEditing ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">NIM</label>
                <input
                  type="text"
                  className="form-control"
                  name="nim"
                  value={formData.nim}
                  onChange={onChange}
                  placeholder="Contoh: 210101001"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="Nama Mahasiswa"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Program Studi</label>
                <select
                  className="form-select"
                  name="prodi"
                  value={formData.prodi}
                  onChange={onChange}
                >
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Teknik Komputer">Teknik Komputer</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label fw-semibold text-secondary">IPK</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    className="form-control"
                    name="ipk"
                    value={formData.ipk}
                    onChange={onChange}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label fw-semibold text-secondary">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={onClose}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary px-4">
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}