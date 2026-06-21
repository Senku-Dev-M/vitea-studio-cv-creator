import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, FileText } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';
import { translations } from '../../../data/translations';

export default function CustomForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, onCustomTitleChange, lang = 'es' }) {
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
  const t = translations[lang].forms.custom;
  const common = translations[lang].forms;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      <div className="form-group">
        <label htmlFor="custom-section-title">{t.sectionTitleLabel}</label>
        <input
          id="custom-section-title"
          type="text"
          value={cvData.custom.title || ''}
          onChange={(e) => onCustomTitleChange(e.target.value)}
          placeholder={t.sectionTitlePlaceholder}
        />
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} className="empty-state-icon" />
          <p className="empty-state-title">{common.emptyStateTitle}</p>
          <p className="empty-state-desc">{t.emptyDesc}</p>
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
                aria-label={lang === 'es' ? "Mover arriba" : "Move up"}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('custom', index, 1)}
                disabled={index === items.length - 1}
                aria-label={lang === 'es' ? "Mover abajo" : "Move down"}
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                className={`btn-item ${confirmingDelete === item.id ? 'confirming' : 'danger'}`}
                onClick={() => handleDelete(item.id)}
                aria-label={confirmingDelete === item.id ? (lang === 'es' ? 'Confirmar eliminación' : 'Confirm delete') : (lang === 'es' ? 'Eliminar' : 'Delete')}
              >
                {confirmingDelete === item.id ? common.confirmDelete : <Trash2 size={14} />}
              </button>
            </div>

            <div className="form-group">
              <label htmlFor={`custom-title-${item.id}`}>{t.itemTitle}</label>
              <input
                id={`custom-title-${item.id}`}
                type="text"
                value={item.title || ''}
                onChange={(e) => onUpdateValue('custom', item.id, 'title', e.target.value)}
                placeholder={t.itemTitlePlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`custom-description-${item.id}`}>{t.description}</label>
              <textarea
                id={`custom-description-${item.id}`}
                rows={2}
                value={item.desc || ''}
                onChange={(e) => onUpdateValue('custom', item.id, 'desc', e.target.value)}
                placeholder={t.descriptionPlaceholder}
              />
              <AIEnhancer
                value={item.desc}
                onChange={(val) => onUpdateValue('custom', item.id, 'desc', val)}
                fieldName={cvData.custom.title || (lang === 'es' ? "Entrada Personalizada" : "Custom Entry")}
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
        <Plus size={16} /> {t.addBtn}
      </button>
    </div>
  );
}
