import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Languages } from 'lucide-react';
import { translations } from '../../../data/translations';

export default function LanguagesForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, lang = 'es' }) {
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

  const t = translations[lang].forms.languages;
  const common = translations[lang].forms;
  const levels = t.levels;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      {cvData.languages.length === 0 ? (
        <div className="empty-state">
          <Languages size={48} className="empty-state-icon" />
          <p className="empty-state-title">{common.emptyStateTitle}</p>
          <p className="empty-state-desc">{t.emptyDesc}</p>
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
                aria-label={lang === 'es' ? "Mover arriba" : "Move up"}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('languages', index, 1)}
                disabled={index === cvData.languages.length - 1}
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`lang-name-${item.id}`}>{t.name}</label>
                <input
                  id={`lang-name-${item.id}`}
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => onUpdateValue('languages', item.id, 'name', e.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`lang-level-${item.id}`}>{t.level}</label>
                <select
                  id={`lang-level-${item.id}`}
                  value={item.level || ''}
                  onChange={(e) => onUpdateValue('languages', item.id, 'level', e.target.value)}
                >
                  <option value="">{t.levelPlaceholder}</option>
                  <option value="native">{levels.native}</option>
                  <option value="bilingual">{levels.bilingual}</option>
                  <option value="c2">{levels.c2}</option>
                  <option value="c1">{levels.c1}</option>
                  <option value="b2">{levels.b2}</option>
                  <option value="b1">{levels.b1}</option>
                  <option value="a2">{levels.a2}</option>
                  <option value="a1">{levels.a1}</option>
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
        <Plus size={16} /> {t.addBtn}
      </button>
    </div>
  );
}
