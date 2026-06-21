import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, FolderGit } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';
import { translations } from '../../../data/translations';

export default function ProjectsForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue, lang = 'es' }) {
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDelete = (id) => {
    if (confirmingDelete === id) {
      onDeleteItem('projects', id);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(id);
      setTimeout(() => setConfirmingDelete(null), 3000);
    }
  };

  const t = translations[lang].forms.projects;
  const common = translations[lang].forms;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      {cvData.projects.length === 0 ? (
        <div className="empty-state">
          <FolderGit size={48} className="empty-state-icon" />
          <p className="empty-state-title">{common.emptyStateTitle}</p>
          <p className="empty-state-desc">{t.emptyDesc}</p>
        </div>
      ) : (
        cvData.projects.map((item, index) => (
          <div key={item.id} className="form-item-card">
            <div className="form-item-toolbar">
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('projects', index, -1)}
                disabled={index === 0}
                aria-label={lang === 'es' ? "Mover arriba" : "Move up"}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('projects', index, 1)}
                disabled={index === cvData.projects.length - 1}
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
                <label htmlFor={`proj-name-${item.id}`}>{t.name}</label>
                <input
                  id={`proj-name-${item.id}`}
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => onUpdateValue('projects', item.id, 'name', e.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`proj-role-${item.id}`}>{t.role}</label>
                <input
                  id={`proj-role-${item.id}`}
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => onUpdateValue('projects', item.id, 'role', e.target.value)}
                  placeholder={t.rolePlaceholder}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`proj-link-${item.id}`}>{t.link}</label>
              <input
                id={`proj-link-${item.id}`}
                type="url"
                value={item.link || ''}
                onChange={(e) => onUpdateValue('projects', item.id, 'link', e.target.value)}
                placeholder={t.linkPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`proj-technologies-${item.id}`}>{t.technologies}</label>
              <input
                id={`proj-technologies-${item.id}`}
                type="text"
                value={item.stack || ''}
                onChange={(e) => onUpdateValue('projects', item.id, 'stack', e.target.value)}
                placeholder={t.technologiesPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`proj-description-${item.id}`}>{t.description}</label>
              <textarea
                id={`proj-description-${item.id}`}
                rows={2}
                value={item.desc || ''}
                onChange={(e) => onUpdateValue('projects', item.id, 'desc', e.target.value)}
                placeholder={t.descriptionPlaceholder}
              />
              <AIEnhancer
                value={item.desc}
                onChange={(val) => onUpdateValue('projects', item.id, 'desc', val)}
                fieldName={t.description}
                context={{ projectName: item.name, stack: item.stack }}
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={() => onAddItem('projects')}
      >
        <Plus size={16} /> {t.addBtn}
      </button>
    </div>
  );
}
