import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Brain } from 'lucide-react';

export default function SkillsForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('skills', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Habilidades</h2>
        <p>Añade tus competencias técnicas e interpersonales.</p>
      </div>

      {cvData.skills.length === 0 ? (
        <div className="empty-state">
          <Brain size={48} className="empty-state-icon" />
          <p className="empty-state-title">No hay elementos aún</p>
          <p className="empty-state-desc">Añade tu primera habilidad para comenzar.</p>
        </div>
      ) : (
        cvData.skills.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('skills', index, -1)}
                disabled={index === 0}
                aria-label="Mover arriba"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('skills', index, 1)}
                disabled={index === cvData.skills.length - 1}
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
                <label htmlFor={`skill-name-${item.id}`}>Habilidad</label>
                <input
                  id={`skill-name-${item.id}`}
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdateValue('skills', item.id, 'name', e.target.value)}
                  placeholder="React"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`skill-category-${item.id}`}>Categoría</label>
                <input
                  id={`skill-category-${item.id}`}
                  type="text"
                  value={item.category}
                  onChange={(e) => onUpdateValue('skills', item.id, 'category', e.target.value)}
                  placeholder="Frontend"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`skill-level-${item.id}`}>
                Nivel: <span className="skill-level-value">{item.level}/5</span>
              </label>
              <input
                id={`skill-level-${item.id}`}
                type="range"
                className="range-slider"
                min={1}
                max={5}
                step={1}
                value={item.level}
                onChange={(e) => onUpdateValue('skills', item.id, 'level', parseInt(e.target.value, 10))}
                aria-label={`Nivel de habilidad: ${item.level} de 5`}
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('skills')}
      >
        <Plus size={16} /> Añadir Habilidad
      </button>
    </div>
  );
}
