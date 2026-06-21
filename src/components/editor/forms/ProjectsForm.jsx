import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, FolderGit } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';

export default function ProjectsForm({ cvData, onAddItem, onDeleteItem, onMoveItem, onUpdateValue }) {
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

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Proyectos</h2>
        <p>Muestra tus proyectos más relevantes y su impacto.</p>
      </div>

      {cvData.projects.length === 0 ? (
        <div className="empty-state">
          <FolderGit size={48} className="empty-state-icon" />
          <p className="empty-state-title">No hay elementos aún</p>
          <p className="empty-state-desc">Añade tu primer proyecto para comenzar.</p>
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
                aria-label="Mover arriba"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className="btn-item"
                onClick={() => onMoveItem('projects', index, 1)}
                disabled={index === cvData.projects.length - 1}
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
                <label htmlFor={`proj-name-${item.id}`}>Nombre del Proyecto</label>
                <input
                  id={`proj-name-${item.id}`}
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdateValue('projects', item.id, 'name', e.target.value)}
                  placeholder="Ej. Sistema de Gestión"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`proj-role-${item.id}`}>Rol</label>
                <input
                  id={`proj-role-${item.id}`}
                  type="text"
                  value={item.role}
                  onChange={(e) => onUpdateValue('projects', item.id, 'role', e.target.value)}
                  placeholder="Ej. Líder Técnico"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`proj-link-${item.id}`}>Enlace</label>
              <input
                id={`proj-link-${item.id}`}
                type="url"
                value={item.link}
                onChange={(e) => onUpdateValue('projects', item.id, 'link', e.target.value)}
                placeholder="https://github.com/usuario/proyecto"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`proj-technologies-${item.id}`}>Tecnologías</label>
              <input
                id={`proj-technologies-${item.id}`}
                type="text"
                value={item.stack || ''}
                onChange={(e) => onUpdateValue('projects', item.id, 'stack', e.target.value)}
                placeholder="React, Node.js, Redis"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`proj-description-${item.id}`}>Descripción</label>
              <textarea
                id={`proj-description-${item.id}`}
                rows={2}
                value={item.desc || ''}
                onChange={(e) => onUpdateValue('projects', item.id, 'desc', e.target.value)}
                placeholder="Describe el proyecto, su propósito y tu contribución..."
              />
              <AIEnhancer
                value={item.desc}
                onChange={(val) => onUpdateValue('projects', item.id, 'desc', val)}
                fieldName="Descripción de Proyecto"
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
        <Plus size={16} /> Añadir Proyecto
      </button>
    </div>
  );
}
