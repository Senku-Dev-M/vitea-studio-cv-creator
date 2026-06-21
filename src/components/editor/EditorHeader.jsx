import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, LayoutTemplate, Save, FileJson, Download, Upload, Trash2, Printer
} from 'lucide-react';

export default function EditorHeader({
  cvData,
  onBackToLanding,
  onSettingsChange,
  onSaveDraft,
  onClearData,
  onExportJSON,
  onImportJSON,
  onPrint
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileImportRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Cerrar dropdown con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header className="app-toolbar">
      {/* Sección izquierda: botón volver + logo */}
      <div className="toolbar-left">
        <button
          className="btn btn-ghost btn-icon btn-sm"
          onClick={onBackToLanding}
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={18} />
        </button>
        <div
          className="toolbar-logo"
          onClick={onBackToLanding}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onBackToLanding();
            }
          }}
          aria-label="Volver al inicio"
        >
          <div className="toolbar-logo-icon">
            <LayoutTemplate size={16} />
          </div>
          <span className="toolbar-logo-text">Vitae Studio</span>
        </div>
      </div>

      {/* Sección central: controles de diseño */}
      <div className="toolbar-center">
        <div className="toolbar-control">
          <label htmlFor="toolbar-template">Plantilla</label>
          <select
            id="toolbar-template"
            value={cvData.settings.template || 'harvard'}
            onChange={(e) => onSettingsChange('template', e.target.value)}
          >
            <option value="harvard">Harvard (Clásico Serif)</option>
            <option value="academic">Académico (Formal Lora)</option>
            <option value="modern">Moderno (Columna Lateral)</option>
            <option value="minimalist">Minimalista (Limpio Inter)</option>
            <option value="executive">Ejecutivo (Corporativo Roboto)</option>
            <option value="tech">Tecnológico (Dev Monospace)</option>
            <option value="visual">Visual (Creativo con Progreso)</option>
            <option value="functional">Funcional (Por Competencias)</option>
            <option value="compact">Compacto (Una Página)</option>
            <option value="elegant">Elegante (Playfair Serif)</option>
          </select>
        </div>

        <div className="toolbar-control">
          <label htmlFor="toolbar-font">Fuente</label>
          <select
            id="toolbar-font"
            value={cvData.settings.font || 'font-default'}
            onChange={(e) => onSettingsChange('font', e.target.value)}
          >
            <option value="font-default">Predeterminada</option>
            <option value="font-inter">Inter (Sans)</option>
            <option value="font-roboto">Roboto (Sans)</option>
            <option value="font-lora">Lora (Serif)</option>
            <option value="font-merriweather">Merriweather (Serif)</option>
            <option value="font-playfair">Playfair Display (Serif)</option>
            <option value="font-mono">JetBrains Mono</option>
          </select>
        </div>

        <div className="toolbar-control">
          <label htmlFor="toolbar-accent">Acento</label>
          <input
            id="toolbar-accent"
            type="color"
            className="toolbar-color-input"
            value={cvData.settings.accentColor || '#0f766e'}
            onChange={(e) => onSettingsChange('accentColor', e.target.value)}
          />
        </div>

        <div className="toolbar-control">
          <label htmlFor="toolbar-spacing">Espaciado</label>
          <select
            id="toolbar-spacing"
            value={cvData.settings.spacing || 'space-normal'}
            onChange={(e) => onSettingsChange('spacing', e.target.value)}
          >
            <option value="space-compact">Compacto</option>
            <option value="space-normal">Normal</option>
            <option value="space-generous">Amplio</option>
          </select>
        </div>
      </div>

      {/* Sección derecha: acciones */}
      <div className="toolbar-right">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onSaveDraft}
          title="Guardar borrador"
          aria-label="Guardar borrador"
        >
          <Save size={16} />
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={onClearData}
          title="Limpiar todos los datos"
          aria-label="Limpiar todos los datos"
        >
          <Trash2 size={16} />
          <span className="hide-mobile">Limpiar Datos</span>
        </button>

        <div className="dropdown" ref={dropdownRef}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FileJson size={16} />
            <span>Datos</span>
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`} role="menu">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onExportJSON();
                setDropdownOpen(false);
              }}
            >
              <Download size={14} /> Exportar JSON
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                fileImportRef.current.click();
                setDropdownOpen(false);
              }}
            >
              <Upload size={14} /> Importar JSON
            </button>
            <input
              type="file"
              ref={fileImportRef}
              accept=".json"
              className="sr-only"
              tabIndex={-1}
              onChange={(e) => {
                onImportJSON(e);
                setDropdownOpen(false);
              }}
            />
            <div className="divider" role="separator"></div>
            <button
              type="button"
              role="menuitem"
              className="danger"
              onClick={() => {
                onClearData();
                setDropdownOpen(false);
              }}
            >
              <Trash2 size={14} /> Limpiar Todo
            </button>
          </div>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onPrint}>
          <Printer size={16} />
          <span>Descargar PDF</span>
        </button>
      </div>
    </header>
  );
}
