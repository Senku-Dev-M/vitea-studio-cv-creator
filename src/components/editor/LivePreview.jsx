import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Globe, ZoomIn, ZoomOut, Maximize, ExternalLink } from 'lucide-react';

const formatDisplayUrl = (url) => {
  if (!url) return '';
  let clean = url.replace(/^(https?:\/\/)?(www\.)?/, '');
  if (clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  if (clean.length > 40) {
    return clean.substring(0, 37) + '...';
  }
  return clean;
};

export default function LivePreview({ cvData, zoomPercent, setZoomPercent }) {
  const [cvHeight, setCvHeight] = useState(1122);
  const cvRef = useRef(null);
  const canvasRef = useRef(null);

  // Observador dinámico de altura para la hoja A4
  useEffect(() => {
    if (!cvRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCvHeight(entry.target.scrollHeight || entry.contentRect.height);
      }
    });
    observer.observe(cvRef.current);
    return () => observer.disconnect();
  }, [cvData]);

  // Controles de zoom
  const handleZoomIn = () => setZoomPercent(prev => Math.min(prev + 5, 130));
  const handleZoomOut = () => setZoomPercent(prev => Math.max(prev - 5, 40));
  const handleZoomFit = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const containerWidth = canvas.clientWidth - 40;
      const docWidth = 794;
      setZoomPercent(Math.min(Math.floor((containerWidth / docWidth) * 100), 110));
    }
  };

  // Auto-ajustar zoom al montar
  useEffect(() => {
    handleZoomFit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper para dar formato HTML a los saltos de línea y viñetas
  const formatTextToHTML = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    let content = [];
    let listItems = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const cleanLine = trimmed.replace(/^[•\-*]\s*/, "");
        listItems.push(<li key={`li-${idx}`}>{cleanLine}</li>);
      } else {
        if (listItems.length > 0) {
          content.push(<ul key={`ul-${idx}`}>{listItems}</ul>);
          listItems = [];
        }
        if (trimmed.length > 0) {
          content.push(<p key={`p-${idx}`} className="cv-text-paragraph">{trimmed}</p>);
        }
      }
    });

    if (listItems.length > 0) {
      content.push(<ul key="ul-final">{listItems}</ul>);
    }

    return content;
  };

  // Renderizado de foto de perfil
  const template = cvData.settings.template || 'harvard';
  const showPhotoInTemplate = ["modern", "visual", "tech", "executive", "compact"].includes(template);
  const photoHTML = (cvData.personal.photo && showPhotoInTemplate) && (
    <div className="cv-photo-container">
      <img src={cvData.personal.photo} alt="Foto de perfil" />
    </div>
  );

  // Recopilar información de contacto
  let contactItems = [];
  if (cvData.personal.email) {
    contactItems.push(<span key="em"><Mail size={12} /> {cvData.personal.email}</span>);
  }
  if (cvData.personal.phone) {
    contactItems.push(<span key="ph"><Phone size={12} /> {cvData.personal.phone}</span>);
  }
  if (cvData.personal.location) {
    contactItems.push(<span key="lc"><MapPin size={12} /> {cvData.personal.location}</span>);
  }
  if (cvData.personal.website) {
    contactItems.push(<span key="wb"><Globe size={12} /> {cvData.personal.website}</span>);
  }
  if (cvData.personal.linkedin) {
    contactItems.push(
      <span key="li">
        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="cv-inline-icon">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
        {cvData.personal.linkedin}
      </span>
    );
  }
  if (cvData.personal.github) {
    contactItems.push(
      <span key="gh">
        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="cv-inline-icon">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        {cvData.personal.github}
      </span>
    );
  }

  // Secciones del CV
  const summarySection = cvData.personal.summary && (
    <section className="cv-section cv-summary-section">
      <h3 className="cv-section-title">Perfil Profesional</h3>
      <div className="cv-item-desc">{formatTextToHTML(cvData.personal.summary)}</div>
    </section>
  );

  const experienceSection = cvData.experience && cvData.experience.length > 0 && (
    <section className="cv-section cv-experience-section">
      <h3 className="cv-section-title">Experiencia Laboral</h3>
      <div className="cv-list">
        {cvData.experience.map(item => (item.company || item.role) && (
          <div key={item.id} className="cv-item">
            <div className="cv-item-title-row">
              <span className="cv-item-title">{item.role || "Cargo"}</span>
              <span className="cv-item-date">{item.start || ""} - {item.end || ""}</span>
            </div>
            <div className="cv-item-subtitle-row">
              <span className="cv-item-subtitle">{item.company || "Empresa"}</span>
              <span className="cv-item-location">{item.location || ""}</span>
            </div>
            {item.desc && <div className="cv-item-desc">{formatTextToHTML(item.desc)}</div>}
          </div>
        ))}
      </div>
    </section>
  );

  const educationSection = cvData.education && cvData.education.length > 0 && (
    <section className="cv-section cv-education-section">
      <h3 className="cv-section-title">Educación</h3>
      <div className="cv-list">
        {cvData.education.map(item => (item.school || item.degree) && (
          <div key={item.id} className="cv-item">
            <div className="cv-item-title-row">
              <span className="cv-item-title">{item.degree || "Título / Certificación"}</span>
              <span className="cv-item-date">{item.start || ""} - {item.end || ""}</span>
            </div>
            <div className="cv-item-subtitle-row">
              <span className="cv-item-subtitle">{item.school || "Institución"}{item.field ? ` — ${item.field}` : ""}</span>
              <span className="cv-item-location">{item.location || ""}</span>
            </div>
            {item.desc && <div className="cv-item-desc">{formatTextToHTML(item.desc)}</div>}
          </div>
        ))}
      </div>
    </section>
  );

  const projectsSection = cvData.projects && cvData.projects.length > 0 && (
    <section className="cv-section cv-projects-section">
      <h3 className="cv-section-title">Proyectos</h3>
      <div className="cv-list">
        {cvData.projects.map(item => item.name && (
          <div key={item.id} className="cv-item">
            <div className="cv-item-title-row">
              <span className="cv-item-title">
                {item.name} {item.role ? <span className="cv-project-role">({item.role})</span> : ""}
              </span>
              {item.link && (
                <span className="cv-item-date">
                  <a href={item.link} target="_blank" rel="noreferrer" className="cv-project-link">
                    {formatDisplayUrl(item.link)} <ExternalLink size={10} />
                  </a>
                </span>
              )}
            </div>
            {item.desc && <div className="cv-item-desc">{formatTextToHTML(item.desc)}</div>}
            {item.stack && (
              <div className="cv-item-tags">
                {item.stack.split(",").map((t, idx) => (
                  <span key={idx} className="cv-tag">{t.trim()}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const useBars = ["visual", "modern", "tech"].includes(template);
  const skillsSection = cvData.skills && cvData.skills.length > 0 && (
    <section className="cv-section cv-skills-section">
      <h3 className="cv-section-title">Habilidades</h3>
      {useBars ? (
        <div>
          {cvData.skills.map(item => item.name && (
            <div key={item.id} className="cv-skill-bar-item">
              <div className="cv-skill-bar-header">
                <span>{item.name}</span>
              </div>
              <div className="cv-skill-bar-track">
                <div className="cv-skill-bar-fill" style={{ width: `${parseInt(item.level || '3') * 20}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cv-skills-container">
          {cvData.skills.map(item => item.name && (
            <span key={item.id} className="cv-skill-badge">{item.name}</span>
          ))}
        </div>
      )}
    </section>
  );

  const languagesSection = cvData.languages && cvData.languages.length > 0 && (
    <section className="cv-section cv-languages-section">
      <h3 className="cv-section-title">Idiomas</h3>
      <div className="cv-languages-container">
        {cvData.languages.map(item => item.name && (
          <div key={item.id} className="cv-lang-item">
            <span className="cv-lang-name">{item.name}</span>
            <span className="cv-lang-level">{item.level || ""}</span>
          </div>
        ))}
      </div>
    </section>
  );

  const certificationsSection = cvData.certifications && cvData.certifications.length > 0 && (
    <section className="cv-section cv-certifications-section">
      <h3 className="cv-section-title">Certificaciones</h3>
      <div>
        {cvData.certifications.map(item => item.title && (
          <div key={item.id} className="cv-item cv-cert-item">
            <div className="cv-item-title-row">
              <span className="cv-cert-title">{item.title}</span>
              <span className="cv-cert-date">{item.date || ""}</span>
            </div>
            <div className="cv-cert-issuer">{item.issuer || ""}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const customSection = cvData.custom && cvData.custom.items && cvData.custom.items.length > 0 && (
    <section className="cv-section cv-custom-section">
      <h3 className="cv-section-title">{cvData.custom.title || "Otros Datos"}</h3>
      <div className="cv-list">
        {cvData.custom.items.map(item => item.title && (
          <div key={item.id} className="cv-item">
            <span className="cv-custom-item-title">{item.title}</span>
            {item.desc && <div className="cv-item-desc cv-custom-item-desc">{formatTextToHTML(item.desc)}</div>}
          </div>
        ))}
      </div>
    </section>
  );

  // Renderizado interno: 1 columna vs 2 columnas según plantilla
  const isTwoColumn = ["modern", "visual"].includes(template);
  const cvInnerLayout = isTwoColumn ? (
    <div className="cv-grid">
      <div className="cv-col-side">
        {photoHTML}
        <section className="cv-section cv-sidebar-contact">
          <h3 className="cv-section-title">Contacto</h3>
          <div className="cv-contact-info">
            {contactItems.map((item, idx) => <div key={idx}>{item}</div>)}
          </div>
        </section>
        {skillsSection}
        {languagesSection}
        {certificationsSection}
      </div>
      <div className="cv-col-main">
        <header className="cv-header-integrated">
          <h1 className="cv-name">{cvData.personal.name || "Nombre Completo"}</h1>
          <h2 className="cv-title">{cvData.personal.title || "Tu Profesión"}</h2>
        </header>
        {summarySection}
        {experienceSection}
        {educationSection}
        {projectsSection}
        {customSection}
      </div>
    </div>
  ) : (
    <>
      <header className="cv-header">
        <div className="cv-header-top">
          <div>
            <h1 className="cv-name">{cvData.personal.name || "Nombre Completo"}</h1>
            <h2 className="cv-title">{cvData.personal.title || "Tu Profesión / Especialidad"}</h2>
          </div>
          {photoHTML}
        </div>
        <div className="cv-contact-info">
          {contactItems}
        </div>
      </header>

      <div className="cv-grid-single">
        {template === "functional" ? (
          <>
            {summarySection}
            {skillsSection}
            {experienceSection}
            {educationSection}
            {projectsSection}
            {languagesSection}
            {certificationsSection}
            {customSection}
          </>
        ) : template === "tech" ? (
          <>
            {summarySection}
            {skillsSection}
            {experienceSection}
            {educationSection}
            {projectsSection}
            {certificationsSection}
            {languagesSection}
            {customSection}
          </>
        ) : (
          <>
            {summarySection}
            {experienceSection}
            {educationSection}
            {projectsSection}
            <div className="cv-grid cv-grid-two-col">
              <div className="cv-col-left-sec">
                {skillsSection}
                {languagesSection}
              </div>
              <div className="cv-col-right-sec">
                {certificationsSection}
                {customSection}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <section className="preview-panel" aria-label="Previsualización del CV">
      <div className="preview-canvas" ref={canvasRef}>
        <div
          className="preview-scale-wrapper"
          style={{
            transform: `scale(${zoomPercent / 100})`,
            height: `${cvHeight * (zoomPercent / 100)}px`,
            width: `${794 * (zoomPercent / 100)}px`
          }}
        >
          <div
            id="cv-preview"
            ref={cvRef}
            className={`cv-page-a4 cv-template-${template} ${cvData.settings.font || 'font-default'} ${cvData.settings.spacing || 'space-normal'}`}
            style={{ '--cv-accent': cvData.settings.accentColor || '#0f766e' }}
          >
            {cvInnerLayout}
          </div>
        </div>
      </div>

      <div className="preview-zoom-bar" role="toolbar" aria-label="Controles de zoom">
        <button onClick={handleZoomOut} aria-label="Disminuir zoom">
          <ZoomOut size={16} />
        </button>
        <span className="zoom-value">{zoomPercent}%</span>
        <button onClick={handleZoomIn} aria-label="Aumentar zoom">
          <ZoomIn size={16} />
        </button>
        <button onClick={handleZoomFit} aria-label="Ajustar al ancho">
          <Maximize size={16} />
        </button>
      </div>
    </section>
  );
}
