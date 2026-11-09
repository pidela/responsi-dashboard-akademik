import React, { useState, useEffect, useMemo, useRef } from 'react';
import StudentTable from './components/StudentTable.jsx';
import StudentFormModal from './components/StudentFormModal.jsx';
import './App.css';

const INITIAL_STUDENTS = [
  { id: 1, nim: '210101001', name: 'Ahmad Dahlan', prodi: 'Teknik Informatika', ipk: 3.85, status: 'Aktif' },
  { id: 2, nim: '210101002', name: 'Siti Nurhaliza', prodi: 'Sistem Informasi', ipk: 3.65, status: 'Aktif' },
  { id: 3, nim: '210101003', name: 'Budi Santoso', prodi: 'Teknik Komputer', ipk: 2.95, status: 'Cuti' },
  { id: 4, nim: '210101004', name: 'Dewi Lestari', prodi: 'Teknik Informatika', ipk: 3.90, status: 'Aktif' },
  { id: 5, nim: '210101005', name: 'Eko Prasetyo', prodi: 'Data Science', ipk: 3.10, status: 'Non-Aktif' },
];

export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProdi, setSelectedProdi] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [sortBy, setSortBy] = useState('nim');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    nim: '',
    name: '',
    prodi: 'Teknik Informatika',
    ipk: '',
    status: 'Aktif',
  });

  const toastRef = useRef(null);
  const tableRef = useRef(null);

  // Menampilkan Toast menggunakan Bootstrap JS / Fallback jQuery
  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastRef.current) {
      if (window.bootstrap && window.bootstrap.Toast) {
        const bsToast = window.bootstrap.Toast.getOrCreateInstance(toastRef.current);
        bsToast.show();
      } else if (window.$) {
        window.$(toastRef.current)
          .stop(true, true)
          .fadeIn(300)
          .delay(2500)
          .fadeOut(400);
      }
    }
  };

  useEffect(() => {
    if (window.$ && tableRef.current) {
      window.$(tableRef.current).hide().fadeIn(400);
    }
  }, [searchTerm, selectedProdi, selectedStatus, sortBy]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({ ...student });
    } else {
      setEditingStudent(null);
      setFormData({
        nim: '',
        name: '',
        prodi: 'Teknik Informatika',
        ipk: '',
        status: 'Aktif',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!formData.nim || !formData.name || formData.ipk === '') {
      alert('Mohon isi semua field!');
      return;
    }

    const numericIPK = parseFloat(formData.ipk);
    if (isNaN(numericIPK) || numericIPK < 0 || numericIPK > 4.0) {
      alert('IPK harus berupa angka antara 0.00 hingga 4.00');
      return;
    }

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((item) =>
          item.id === editingStudent.id ? { ...formData, ipk: numericIPK } : item
        )
      );
      showToast(`Data Mahasiswa ${formData.name} berhasil diperbarui!`);
    } else {
      const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
      setStudents((prev) => [
        ...prev,
        { ...formData, id: newId, ipk: numericIPK },
      ]);
      showToast(`Mahasiswa ${formData.name} berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data "${name}"?`)) {
      setStudents((prev) => prev.filter((item) => item.id !== id));
      showToast(`Data ${name} telah dihapus.`);
    }
  };

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.nim.includes(searchTerm);
        const matchesProdi =
          selectedProdi === 'Semua' || s.prodi === selectedProdi;
        const matchesStatus =
          selectedStatus === 'Semua' || s.status === selectedStatus;
        return matchesSearch && matchesProdi && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'ipk-desc') return b.ipk - a.ipk;
        if (sortBy === 'ipk-asc') return a.ipk - b.ipk;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.nim.localeCompare(b.nim);
      });
  }, [students, searchTerm, selectedProdi, selectedStatus, sortBy]);

  const averageIPK = useMemo(() => {
    if (students.length === 0) return '0.00';
    const total = students.reduce((sum, item) => sum + item.ipk, 0);
    return (total / students.length).toFixed(2);
  }, [students]);

  return (
    <div className="d-flex bg-light min-vh-100">
      <aside className="sidebar p-3 d-none d-md-block">
        <div className="d-flex align-items-center mb-4 px-2">
          <i className="bi bi-mortarboard-fill fs-3 text-primary me-2"></i>
          <span className="fw-bold fs-5 text-white">AkademikHub</span>
        </div>
        <hr className="border-secondary mb-4" />
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a href="#dashboard" className="nav-link active">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard Admin
            </a>
          </li>
          <li className="nav-item">
            <a href="#mahasiswa" className="nav-link">
              <i className="bi bi-people-fill me-2"></i> Data Mahasiswa
            </a>
          </li>
          <li className="nav-item">
            <a href="#akademik" className="nav-link">
              <i className="bi bi-journal-bookmark-fill me-2"></i> Rekap Akademik
            </a>
          </li>
        </ul>
      </aside>

      <main className="flex-grow-1 p-4">
        <header className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-3 shadow-sm">
          <div>
            <h4 className="m-0 fw-bold text-dark">Dashboard Data Mahasiswa</h4>
            <small className="text-muted">Kelola data akademik dan mahasiswa secara interaktif</small>
          </div>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleOpenModal()}>
            <i className="bi bi-plus-lg"></i> Tambah Mahasiswa
          </button>
        </header>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card card-custom p-3 bg-white border-0 shadow-sm">
              <div className="d-flex align-items-center">
                <div className="p-3 bg-primary bg-opacity-10 rounded-3 me-3 text-primary">
                  <i className="bi bi-people fs-3"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Mahasiswa</h6>
                  <h3 className="fw-bold m-0">{students.length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card card-custom p-3 bg-white border-0 shadow-sm">
              <div className="d-flex align-items-center">
                <div className="p-3 bg-success bg-opacity-10 rounded-3 me-3 text-success">
                  <i className="bi bi-check-circle fs-3"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Mahasiswa Aktif</h6>
                  <h3 className="fw-bold m-0">{students.filter(s => s.status === 'Aktif').length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card card-custom p-3 bg-white border-0 shadow-sm">
              <div className="d-flex align-items-center">
                <div className="p-3 bg-warning bg-opacity-10 rounded-3 me-3 text-warning">
                  <i className="bi bi-award fs-3"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">IPK Rata-Rata</h6>
                  <h3 className="fw-bold m-0">{averageIPK}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-custom p-3 mb-4 bg-white border-0 shadow-sm">
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Cari NIM atau Nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select bg-light"
                value={selectedProdi}
                onChange={(e) => setSelectedProdi(e.target.value)}
              >
                <option value="Semua">Semua Program Studi</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Teknik Komputer">Teknik Komputer</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select bg-light"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
                <option value="Non-Aktif">Non-Aktif</option>
              </select>
            </div>
            <div className="col-12 col-md-2">
              <select
                className="form-select bg-light"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="nim">Urutkan: NIM</option>
                <option value="name">Urutkan: Nama</option>
                <option value="ipk-desc">IPK Tertinggi</option>
                <option value="ipk-asc">IPK Terendah</option>
              </select>
            </div>
          </div>
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          tableRef={tableRef}
        />
      </main>

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmitForm}
        isEditing={!!editingStudent}
      />

      {/* Bootstrap Toast Component */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
        <div ref={toastRef} className="toast align-items-center text-white bg-dark border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              <i className="bi bi-info-circle-fill text-info me-2"></i>
              {toastMessage}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div>
  );
}