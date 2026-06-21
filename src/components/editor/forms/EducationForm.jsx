import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, GraduationCap } from 'lucide-react';

export default function EducationForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('education', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Educación</h2>
        <p>Añade tus títulos universitarios y certificaciones académicas.</p>
      </div>

      {cvData.education.length === 0 ? (
        <div className="empty-state">
          <GraduationCap size={48} className="empty-state-icon" />
          <p className="empty-state-title">No hay elementos aún</p>
          <p className="empty-state-desc">Añade tu primera formación académica para comenzar.</p>
        </div>
      ) : (
        cvData.education.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('education', index, -1)}
                disabled={index === 0}
                aria-label="Mover arriba"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('education', index, 1)}
                disabled={index === cvData.education.length - 1}
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
                <label htmlFor={`edu-institution-${item.id}`}>Institución</label>
                <input
                  id={`edu-institution-${item.id}`}
                  type="text"
                  value={item.institution}
                  onChange={(e) => onUpdateValue('education', item.id, 'institution', e.target.value)}
                  placeholder="Ej. Universidad de Chile"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`edu-degree-${item.id}`}>Título Obtenido</label>
                <input
                  id={`edu-degree-${item.id}`}
                  type="text"
                  value={item.degree}
                  onChange={(e) => onUpdateValue('education', item.id, 'degree', e.target.value)}
                  placeholder="Ej. Ingeniería"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`edu-field-${item.id}`}>Campo de Estudio</label>
                <input
                  id={`edu-field-${item.id}`}
                  type="text"
                  value={item.field}
                  onChange={(e) => onUpdateValue('education', item.id, 'field', e.target.value)}
                  placeholder="Ej. Tecnologías de la Información"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`edu-location-${item.id}`}>Ubicación</label>
                <input
                  id={`edu-location-${item.id}`}
                  type="text"
                  value={item.location}
                  onChange={(e) => onUpdateValue('education', item.id, 'location', e.target.value)}
                  placeholder="Santiago, Chile"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`edu-startDate-${item.id}`}>Fecha de Inicio</label>
                <input
                  id={`edu-startDate-${item.id}`}
                  type="text"
                  value={item.startDate}
                  onChange={(e) => onUpdateValue('education', item.id, 'startDate', e.target.value)}
                  placeholder="03/2018"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`edu-endDate-${item.id}`}>Fecha de Fin</label>
                <input
                  id={`edu-endDate-${item.id}`}
                  type="text"
                  value={item.endDate}
                  onChange={(e) => onUpdateValue('education', item.id, 'endDate', e.target.value)}
                  placeholder="12/2022"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`edu-description-${item.id}`}>Descripción adicional</label>
              <textarea
                id={`edu-description-${item.id}`}
                rows={2}
                value={item.description}
                onChange={(e) => onUpdateValue('education', item.id, 'description', e.target.value)}
                placeholder="Logros académicos, actividades extracurriculares relevantes..."
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('education')}
      >
        <Plus size={16} /> Añadir Educación
      </button>
    </div>
  );
}
