import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, LayoutTemplate, Save, FileJson, Download, Upload, Trash2, Printer
} from 'lucide-react';
import { translations } from '../../data/translations';

export default function EditorHeader({
  cvData,
  onBackToLanding,
  onSettingsChange,
  onSaveDraft,
  onClearData,
  onExportJSON,
  onImportJSON,
  onPrint,
  lang,
  onLanguageChange
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

  const t = translations[lang].editorHeader;

  return (
    <header className="app-toolbar">
      {/* Sección izquierda: botón volver + logo */}
      <div className="toolbar-left">
        <button
          className="btn btn-ghost btn-icon btn-sm"
          onClick={onBackToLanding}
          aria-label={lang === 'es' ? 'Volver al inicio' : 'Back to home'}
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
          aria-label={lang === 'es' ? 'Volver al inicio' : 'Back to home'}
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
          <label htmlFor="toolbar-template">{t.template}</label>
          <select
            id="toolbar-template"
            value={cvData.settings.template || 'harvard'}
            onChange={(e) => onSettingsChange('template', e.target.value)}
          >
            <option value="harvard">{t.template_harvard}</option>
            <option value="academic">{t.template_academic}</option>
            <option value="modern">{t.template_modern}</option>
            <option value="minimalist">{t.template_minimalist}</option>
            <option value="executive">{t.template_executive}</option>
            <option value="tech">{t.template_tech}</option>
            <option value="visual">{t.template_visual}</option>
            <option value="functional">{t.template_functional}</option>
            <option value="compact">{t.template_compact}</option>
            <option value="elegant">{t.template_elegant}</option>
          </select>
        </div>

        <div className="toolbar-control">
          <label htmlFor="toolbar-font">{t.font}</label>
          <select
            id="toolbar-font"
            value={cvData.settings.font || 'font-default'}
            onChange={(e) => onSettingsChange('font', e.target.value)}
          >
            <option value="font-default">{t.font_default}</option>
            <option value="font-inter">{t.font_inter}</option>
            <option value="font-roboto">{t.font_roboto}</option>
            <option value="font-lora">{t.font_lora}</option>
            <option value="font-merriweather">{t.font_merriweather}</option>
            <option value="font-playfair">{t.font_playfair}</option>
            <option value="font-mono">{t.font_mono}</option>
          </select>
        </div>

        <div className="toolbar-control">
          <label htmlFor="toolbar-accent">{t.accent}</label>
          <input
            id="toolbar-accent"
            type="color"
            className="toolbar-color-input"
            value={cvData.settings.accentColor || '#0f766e'}
            onChange={(e) => onSettingsChange('accentColor', e.target.value)}
          />
        </div>

        <div className="toolbar-control">
          <label htmlFor="toolbar-spacing">{t.spacing}</label>
          <select
            id="toolbar-spacing"
            value={cvData.settings.spacing || 'space-normal'}
            onChange={(e) => onSettingsChange('spacing', e.target.value)}
          >
            <option value="space-compact">{t.spacing_compact}</option>
            <option value="space-normal">{t.spacing_normal}</option>
            <option value="space-generous">{t.spacing_generous}</option>
          </select>
        </div>
      </div>

      {/* Sección derecha: acciones */}
      <div className="toolbar-right">
        {/* Selector de idioma */}
        <button
          className="btn btn-secondary btn-sm btn-lang-switcher"
          onClick={() => onLanguageChange(lang === 'es' ? 'en' : 'es')}
          title={lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
          aria-label={lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
          style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>🌐</span>
          <span>{lang === 'es' ? 'ES' : 'EN'}</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onSaveDraft}
          title={t.saveDraft}
          aria-label={t.saveDraft}
        >
          <Save size={16} />
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={onClearData}
          title={t.clearData}
          aria-label={t.clearData}
        >
          <Trash2 size={16} />
          <span className="hide-mobile">{t.clearData}</span>
        </button>

        <div className="dropdown" ref={dropdownRef}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FileJson size={16} />
            <span>{t.dataBtn}</span>
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
              <Download size={14} /> {t.exportJson}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                fileImportRef.current.click();
                setDropdownOpen(false);
              }}
            >
              <Upload size={14} /> {t.importJson}
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
              <Trash2 size={14} /> {t.clearData}
            </button>
          </div>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onPrint}>
          <Printer size={16} />
          <span>{t.downloadPdf}</span>
        </button>
      </div>
    </header>
  );
}
