import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Briefcase } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';
import { translations } from '../../../data/translations';

export default function ExperienceForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, lang = 'es' }) {
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

  const t = translations[lang].forms.experience;
  const common = translations[lang].forms;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      {cvData.experience.length === 0 ? (
        <div className="empty-state">
          <Briefcase size={48} className="empty-state-icon" />
          <p className="empty-state-title">{common.emptyStateTitle}</p>
          <p className="empty-state-desc">{t.emptyDesc}</p>
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
                aria-label={lang === 'es' ? "Mover arriba" : "Move up"}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('experience', index, 1)}
                disabled={index === cvData.experience.length - 1}
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
                <label htmlFor={`exp-company-${item.id}`}>{t.company}</label>
                <input
                  id={`exp-company-${item.id}`}
                  type="text"
                  value={item.company || ''}
                  onChange={(e) => onUpdateValue('experience', item.id, 'company', e.target.value)}
                  placeholder={t.companyPlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`exp-position-${item.id}`}>{t.position}</label>
                <input
                  id={`exp-position-${item.id}`}
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => onUpdateValue('experience', item.id, 'role', e.target.value)}
                  placeholder={t.positionPlaceholder}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`exp-startDate-${item.id}`}>{t.startDate}</label>
                <input
                  id={`exp-startDate-${item.id}`}
                  type="text"
                  value={item.start || ''}
                  onChange={(e) => onUpdateValue('experience', item.id, 'start', e.target.value)}
                  placeholder={t.startDatePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`exp-endDate-${item.id}`}>{t.endDate}</label>
                <input
                  id={`exp-endDate-${item.id}`}
                  type="text"
                  value={item.end || ''}
                  onChange={(e) => onUpdateValue('experience', item.id, 'end', e.target.value)}
                  placeholder={t.endDatePlaceholder}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`exp-location-${item.id}`}>{t.location}</label>
              <input
                id={`exp-location-${item.id}`}
                type="text"
                value={item.location || ''}
                onChange={(e) => onUpdateValue('experience', item.id, 'location', e.target.value)}
                placeholder={t.locationPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`exp-description-${item.id}`}>{t.description}</label>
              <textarea
                id={`exp-description-${item.id}`}
                rows={3}
                value={item.desc || ''}
                onChange={(e) => onUpdateValue('experience', item.id, 'desc', e.target.value)}
                placeholder={t.descriptionPlaceholder}
              />
              <AIEnhancer
                value={item.desc}
                onChange={(val) => onUpdateValue('experience', item.id, 'desc', val)}
                fieldName={t.description}
                context={{ role: item.role, company: item.company }}
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
        <Plus size={16} /> {t.addBtn}
      </button>
    </div>
  );
}
