import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Award } from 'lucide-react';
import { translations } from '../../../data/translations';

export default function CertificationsForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, lang = 'es' }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('certifications', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  const t = translations[lang].forms.certifications;
  const common = translations[lang].forms;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      {cvData.certifications.length === 0 ? (
        <div className="empty-state">
          <Award size={48} className="empty-state-icon" />
          <p className="empty-state-title">{common.emptyStateTitle}</p>
          <p className="empty-state-desc">{t.emptyDesc}</p>
        </div>
      ) : (
        cvData.certifications.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('certifications', index, -1)}
                disabled={index === 0}
                aria-label={lang === 'es' ? "Mover arriba" : "Move up"}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('certifications', index, 1)}
                disabled={index === cvData.certifications.length - 1}
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
                <label htmlFor={`cert-title-${item.id}`}>{t.name}</label>
                <input
                  id={`cert-title-${item.id}`}
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'title', e.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`cert-issuer-${item.id}`}>{t.issuer}</label>
                <input
                  id={`cert-issuer-${item.id}`}
                  type="text"
                  value={item.issuer || ''}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'issuer', e.target.value)}
                  placeholder={t.issuerPlaceholder}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`cert-date-${item.id}`}>{t.date}</label>
                <input
                  id={`cert-date-${item.id}`}
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'date', e.target.value)}
                  placeholder={t.datePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`cert-link-${item.id}`}>{t.link}</label>
                <input
                  id={`cert-link-${item.id}`}
                  type="url"
                  value={item.link || ''}
                  onChange={(e) => onUpdateValue('certifications', item.id, 'link', e.target.value)}
                  placeholder={t.linkPlaceholder}
                />
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('certifications')}
      >
        <Plus size={16} /> {t.addBtn}
      </button>
    </div>
  );
}
