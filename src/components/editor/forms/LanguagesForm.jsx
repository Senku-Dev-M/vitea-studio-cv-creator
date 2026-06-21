import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Languages } from 'lucide-react';

export default function LanguagesForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('languages', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Idiomas</h2>
        <p>Añade los idiomas que dominas y tu nivel de competencia.</p>
      </div>

      {cvData.languages.length === 0 ? (
        <div className="empty-state">
          <Languages size={48} className="empty-state-icon" />
          <p className="empty-state-title">No hay elementos aún</p>
          <p className="empty-state-desc">Añade tu primer idioma para comenzar.</p>
        </div>
      ) : (
        cvData.languages.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('languages', index, -1)}
                disabled={index === 0}
                aria-label="Mover arriba"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('languages', index, 1)}
                disabled={index === cvData.languages.length - 1}
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
                <label htmlFor={`lang-name-${item.id}`}>Idioma</label>
                <input
                  id={`lang-name-${item.id}`}
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => onUpdateValue('languages', item.id, 'name', e.target.value)}
                  placeholder="Español"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`lang-level-${item.id}`}>Nivel</label>
                <select
                  id={`lang-level-${item.id}`}
                  value={item.level || ''}
                  onChange={(e) => onUpdateValue('languages', item.id, 'level', e.target.value)}
                >
                  <option value="">Selecciona un nivel...</option>
                  <option value="Nativo">Nativo</option>
                  <option value="Bilingüe">Bilingüe</option>
                  <option value="Avanzado (C2)">Avanzado (C2)</option>
                  <option value="Avanzado (C1)">Avanzado (C1)</option>
                  <option value="Intermedio Alto (B2)">Intermedio Alto (B2)</option>
                  <option value="Intermedio (B1)">Intermedio (B1)</option>
                  <option value="Básico (A2)">Básico (A2)</option>
                  <option value="Básico (A1)">Básico (A1)</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('languages')}
      >
        <Plus size={16} /> Añadir Idioma
      </button>
    </div>
  );
}
