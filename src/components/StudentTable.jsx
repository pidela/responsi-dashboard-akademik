import React from 'react';

export default function StudentTable({ students, onEdit, onDelete, tableRef }) {
  return (
    <div className="card border-0 shadow-sm rounded-3 bg-white p-3">
      <div ref={tableRef}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>NIM</th>
              <th>Nama Mahasiswa</th>
              <th>Program Studi</th>
              <th>IPK</th>
              <th>Status</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="fw-semibold text-secondary">{student.nim}</td>
                  <td className="fw-medium">{student.name}</td>
                  <td>{student.prodi}</td>
                  <td>
                    <span
                      className={`fw-bold ${
                        student.ipk >= 3.5
                          ? 'text-success'
                          : student.ipk >= 3.0
                          ? 'text-primary'
                          : 'text-danger'
                      }`}
                    >
                      {student.ipk.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        student.status === 'Aktif'
                          ? 'bg-success-subtle text-success border border-success'
                          : student.status === 'Cuti'
                          ? 'bg-warning-subtle text-warning border border-warning'
                          : 'bg-danger-subtle text-danger border border-danger'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center"
                        onClick={() => onEdit(student)}
                        title="Edit Data"
                      >
                        <i className="bi bi-pencil-square me-1"></i> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger d-inline-flex align-items-center"
                        onClick={() => onDelete(student.id, student.name)}
                        title="Hapus Data"
                      >
                        <i className="bi bi-trash me-1"></i> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  Data mahasiswa tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}