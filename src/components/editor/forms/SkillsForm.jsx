import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Brain } from 'lucide-react';
import { translations } from '../../../data/translations';

export default function SkillsForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, lang = 'es' }) {
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

  const t = translations[lang].forms.skills;
  const common = translations[lang].forms;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      {cvData.skills.length === 0 ? (
        <div className="empty-state">
          <Brain size={48} className="empty-state-icon" />
          <p className="empty-state-title">{common.emptyStateTitle}</p>
          <p className="empty-state-desc">{t.emptyDesc}</p>
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
                aria-label={lang === 'es' ? "Mover arriba" : "Move up"}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('skills', index, 1)}
                disabled={index === cvData.skills.length - 1}
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
                <label htmlFor={`skill-name-${item.id}`}>{t.name}</label>
                <input
                  id={`skill-name-${item.id}`}
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => onUpdateValue('skills', item.id, 'name', e.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`skill-category-${item.id}`}>{t.category}</label>
                <input
                  id={`skill-category-${item.id}`}
                  type="text"
                  value={item.category || ''}
                  onChange={(e) => onUpdateValue('skills', item.id, 'category', e.target.value)}
                  placeholder={t.categoryPlaceholder}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`skill-level-${item.id}`}>
                {t.level}: <span className="skill-level-value">{item.level}/5</span>
              </label>
              <input
                id={`skill-level-${item.id}`}
                type="range"
                className="range-slider"
                min={1}
                max={5}
                step={1}
                value={item.level || 3}
                onChange={(e) => onUpdateValue('skills', item.id, 'level', parseInt(e.target.value, 10))}
                aria-label={lang === 'es' ? `Nivel de habilidad: ${item.level} de 5` : `Skill level: ${item.level} out of 5`}
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
        <Plus size={16} /> {t.addBtn}
      </button>
    </div>
  );
}
