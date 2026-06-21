import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, GraduationCap } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';
import { translations } from '../../../data/translations';

export default function EducationForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, lang = 'es' }) {
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

  const t = translations[lang].forms.education;
  const common = translations[lang].forms;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      {cvData.education.length === 0 ? (
        <div className="empty-state">
          <GraduationCap size={48} className="empty-state-icon" />
          <p className="empty-state-title">{common.emptyStateTitle}</p>
          <p className="empty-state-desc">{t.emptyDesc}</p>
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
                aria-label={lang === 'es' ? "Mover arriba" : "Move up"}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('education', index, 1)}
                disabled={index === cvData.education.length - 1}
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
                <label htmlFor={`edu-school-${item.id}`}>{t.institution}</label>
                <input
                  id={`edu-school-${item.id}`}
                  type="text"
                  value={item.school || ''}
                  onChange={(e) => onUpdateValue('education', item.id, 'school', e.target.value)}
                  placeholder={t.institutionPlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`edu-degree-${item.id}`}>{t.degree}</label>
                <input
                  id={`edu-degree-${item.id}`}
                  type="text"
                  value={item.degree || ''}
                  onChange={(e) => onUpdateValue('education', item.id, 'degree', e.target.value)}
                  placeholder={t.degreePlaceholder}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`edu-field-${item.id}`}>{t.field}</label>
                <input
                  id={`edu-field-${item.id}`}
                  type="text"
                  value={item.field || ''}
                  onChange={(e) => onUpdateValue('education', item.id, 'field', e.target.value)}
                  placeholder={t.fieldPlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`edu-location-${item.id}`}>{t.location}</label>
                <input
                  id={`edu-location-${item.id}`}
                  type="text"
                  value={item.location || ''}
                  onChange={(e) => onUpdateValue('education', item.id, 'location', e.target.value)}
                  placeholder={t.locationPlaceholder}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`edu-startDate-${item.id}`}>{t.startDate}</label>
                <input
                  id={`edu-startDate-${item.id}`}
                  type="text"
                  value={item.start || ''}
                  onChange={(e) => onUpdateValue('education', item.id, 'start', e.target.value)}
                  placeholder={t.startDatePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`edu-endDate-${item.id}`}>{t.endDate}</label>
                <input
                  id={`edu-endDate-${item.id}`}
                  type="text"
                  value={item.end || ''}
                  onChange={(e) => onUpdateValue('education', item.id, 'end', e.target.value)}
                  placeholder={t.endDatePlaceholder}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`edu-description-${item.id}`}>{t.description}</label>
              <textarea
                id={`edu-description-${item.id}`}
                rows={2}
                value={item.desc || ''}
                onChange={(e) => onUpdateValue('education', item.id, 'desc', e.target.value)}
                placeholder={t.descriptionPlaceholder}
              />
              <AIEnhancer
                value={item.desc}
                onChange={(val) => onUpdateValue('education', item.id, 'desc', val)}
                fieldName={t.description}
                context={{ degree: item.degree, school: item.school }}
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
        <Plus size={16} /> {t.addBtn}
      </button>
    </div>
  );
}
