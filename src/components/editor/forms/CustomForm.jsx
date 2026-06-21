import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, FileText } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';

export default function CustomForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, onCustomTitleChange }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('custom', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  const items = cvData.custom.items || [];

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Sección Personalizada</h2>
        <p>Crea una sección adicional con la información que necesites.</p>
      </div>

      <div className="form-group">
        <label htmlFor="custom-section-title">Título de la Sección</label>
        <input
          id="custom-section-title"
          type="text"
          value={cvData.custom.title || ''}
          onChange={(e) => onCustomTitleChange(e.target.value)}
          placeholder="Ej. Intereses, Premios, Voluntariado"
        />
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} className="empty-state-icon" />
          <p className="empty-state-title">No hay elementos aún</p>
          <p className="empty-state-desc">Añade tu primera entrada para comenzar.</p>
        </div>
      ) : (
        items.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('custom', index, -1)}
                disabled={index === 0}
                aria-label="Mover arriba"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('custom', index, 1)}
                disabled={index === items.length - 1}
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

            <div className="form-group">
              <label htmlFor={`custom-title-${item.id}`}>Título</label>
              <input
                id={`custom-title-${item.id}`}
                type="text"
                value={item.title}
                onChange={(e) => onUpdateValue('custom', item.id, 'title', e.target.value)}
                placeholder="Ej. Voluntario en..."
              />
            </div>

            <div className="form-group">
              <label htmlFor={`custom-description-${item.id}`}>Descripción</label>
              <textarea
                id={`custom-description-${item.id}`}
                rows={2}
                value={item.desc || ''}
                onChange={(e) => onUpdateValue('custom', item.id, 'desc', e.target.value)}
                placeholder="Describe esta entrada..."
              />
              <AIEnhancer
                value={item.desc}
                onChange={(val) => onUpdateValue('custom', item.id, 'desc', val)}
                fieldName={cvData.custom.title || "Entrada Personalizada"}
                context={{ title: item.title }}
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('custom')}
      >
        <Plus size={16} /> Añadir Elemento
      </button>
    </div>
  );
}
