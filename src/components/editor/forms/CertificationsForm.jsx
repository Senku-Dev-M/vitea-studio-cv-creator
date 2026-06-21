import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Award } from 'lucide-react';

export default function CertificationsForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('certifications', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Certificaciones</h2>
        <p>Añade tus certificaciones y acreditaciones profesionales.</p>
      </div>

      {cvData.certifications.length === 0 ? (
        <div className="empty-state">
          <Award size={48} className="empty-state-icon" />
          <p className="empty-state-title">No hay elementos aún</p>
          <p className="empty-state-desc">Añade tu primera certificación para comenzar.</p>
        </div>
      ) : (
        cvData.certifications.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('certifications', index, -1)}
                disabled={index === 0}
                aria-label="Mover arriba"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('certifications', index, 1)}
                disabled={index === cvData.certifications.length - 1}
                aria-label="Mover abajo"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                className={`btn-item ${confirmingDelete === item.id ? 'confirming' : 'danger'}`}
                onClick={() => handleDelete(item.id)}
                aria-label={confirmingDelete === item.id ? 'Confirmar eliminación' : 'Eliminar'}
              >
                {confirmingDelete === item.id ? '¿Confirmar?' : <Trash2 size={14} />}
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`cert-title-${item.id}`}>Título</label>
                <input
                  id={`cert-title-${item.id}`}
                  type="text"
                  value={item.title}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'title', e.target.value)}
                  placeholder="Ej. AWS Solutions Architect"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`cert-issuer-${item.id}`}>Institución Emisora</label>
                <input
                  id={`cert-issuer-${item.id}`}
                  type="text"
                  value={item.issuer}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'issuer', e.target.value)}
                  placeholder="Ej. Amazon Web Services"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`cert-date-${item.id}`}>Fecha</label>
                <input
                  id={`cert-date-${item.id}`}
                  type="text"
                  value={item.date}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'date', e.target.value)}
                  placeholder="06/2024"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`cert-link-${item.id}`}>Enlace (opcional)</label>
                <input
                  id={`cert-link-${item.id}`}
                  type="url"
                  value={item.link}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'link', e.target.value)}
                  placeholder="https://credencial.ejemplo.com"
                />
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('certifications')}
      >
        <Plus size={16} /> Añadir Certificación
      </button>
    </div>
  );
}
