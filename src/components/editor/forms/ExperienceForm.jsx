import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Briefcase } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';

export default function ExperienceForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('experience', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Experiencia Laboral</h2>
        <p>Añade tus puestos anteriores, responsabilidades y logros clave.</p>
      </div>

      {cvData.experience.length === 0 ? (
        <div className="empty-state">
          <Briefcase size={48} className="empty-state-icon" />
          <p className="empty-state-title">No hay elementos aún</p>
          <p className="empty-state-desc">Añade tu primera experiencia laboral para comenzar.</p>
        </div>
      ) : (
        cvData.experience.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('experience', index, -1)}
                disabled={index === 0}
                aria-label="Mover arriba"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('experience', index, 1)}
                disabled={index === cvData.experience.length - 1}
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
                <label htmlFor={`exp-company-${item.id}`}>Empresa</label>
                <input
                  id={`exp-company-${item.id}`}
                  type="text"
                  value={item.company}
                  onChange={(e) => onUpdateValue('experience', item.id, 'company', e.target.value)}
                  placeholder="Ej. Google"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`exp-position-${item.id}`}>Puesto</label>
                <input
                  id={`exp-position-${item.id}`}
                  type="text"
                  value={item.position}
                  onChange={(e) => onUpdateValue('experience', item.id, 'position', e.target.value)}
                  placeholder="Ej. Senior Developer"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`exp-startDate-${item.id}`}>Fecha de Inicio</label>
                <input
                  id={`exp-startDate-${item.id}`}
                  type="text"
                  value={item.startDate}
                  onChange={(e) => onUpdateValue('experience', item.id, 'startDate', e.target.value)}
                  placeholder="01/2020"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`exp-endDate-${item.id}`}>Fecha de Fin</label>
                <input
                  id={`exp-endDate-${item.id}`}
                  type="text"
                  value={item.endDate}
                  onChange={(e) => onUpdateValue('experience', item.id, 'endDate', e.target.value)}
                  placeholder="Presente"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`exp-location-${item.id}`}>Ubicación</label>
              <input
                id={`exp-location-${item.id}`}
                type="text"
                value={item.location}
                onChange={(e) => onUpdateValue('experience', item.id, 'location', e.target.value)}
                placeholder="California (Remoto)"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`exp-description-${item.id}`}>Logros y Responsabilidades</label>
              <textarea
                id={`exp-description-${item.id}`}
                rows={3}
                value={item.description}
                onChange={(e) => onUpdateValue('experience', item.id, 'description', e.target.value)}
                placeholder="• Describe tus logros principales usando viñetas para mayor claridad..."
              />
              <AIEnhancer
                value={item.description}
                onChange={(val) => onUpdateValue('experience', item.id, 'description', val)}
                fieldName="Logros y Responsabilidades de Experiencia"
                context={{ role: item.position, company: item.company }}
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('experience')}
      >
        <Plus size={16} /> Añadir Experiencia
      </button>
    </div>
  );
}
