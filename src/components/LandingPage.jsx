import { useState, useEffect } from 'react';
import {
  FileText,
  LayoutTemplate,
  Edit3,
  Download,
  Eye,
  Shield,
  FileCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import TextType from './TextType';

const templates = [
  { id: 'harvard', name: 'Harvard', desc: 'Diseño clásico serif, ideal para roles tradicionales.', category: 'Clásico' },
  { id: 'academic', name: 'Académico', desc: 'Formato formal para docentes e investigadores.', category: 'Formal' },
  { id: 'modern', name: 'Moderno', desc: 'Columna lateral con diseño contemporáneo.', category: 'Moderno' },
  { id: 'minimalist', name: 'Minimalista', desc: 'Limpio y centrado en el contenido.', category: 'Minimalista' },
  { id: 'executive', name: 'Ejecutivo', desc: 'Corporativo y profesional para directivos.', category: 'Corporativo' },
  { id: 'tech', name: 'Tecnológico', desc: 'Monospace y moderno para desarrolladores.', category: 'Tech' },
  { id: 'visual', name: 'Visual', desc: 'Diseño creativo con barras de progreso.', category: 'Creativo' },
  { id: 'functional', name: 'Funcional', desc: 'Organizado por competencias y habilidades.', category: 'Funcional' },
  { id: 'compact', name: 'Compacto', desc: 'Optimizado para condensar en una sola página.', category: 'Compacto' },
  { id: 'elegant', name: 'Elegante', desc: 'Serif refinado con detalles dorados.', category: 'Elegante' }
];

function MiniCv({ templateId, scale = 0.25 }) {
  const data = {
    personal: {
      name: "Alejandro Silva",
      title: "Desarrollador Full Stack Senior",
      email: "alejandro.silva@email.com",
      phone: "+56 9 1234 5678",
      location: "Santiago, Chile",
      website: "alejandrosilva.dev",
      summary: "Ingeniero de Software con más de 8 años de experiencia especializándose en React, Node.js y arquitectura cloud. Apasionado por crear interfaces intuitivas, código limpio y soluciones de alto rendimiento.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop"
    },
    experience: [
      {
        id: "exp-1",
        role: "Líder Técnico Frontend",
        company: "Tech Solutions",
        location: "Santiago",
        start: "2021",
        end: "Presente",
        desc: "Liderazgo de equipo frontend de 5 ingenieros. Migración de plataforma a Next.js y mejora de rendimiento web en un 35%."
      },
      {
        id: "exp-2",
        role: "Desarrollador Full Stack",
        company: "Innovación Digital",
        location: "Valparaíso",
        start: "2018",
        end: "2021",
        desc: "Desarrollo de API RESTful en Node.js and React. Integración de pagos y optimización de base de datos Postgres."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Ingeniería Civil Informática",
        school: "Universidad de Chile",
        field: "Computación",
        location: "Santiago",
        start: "2012",
        end: "2017",
        desc: "Graduado con distinción máxima. Especialidad en sistemas distribuidos."
      }
    ],
    skills: [
      { id: "sk-1", name: "React / Next.js", level: "5" },
      { id: "sk-2", name: "Node.js / Express", level: "5" },
      { id: "sk-3", name: "TypeScript / JS", level: "4" },
      { id: "sk-4", name: "REST APIs & SQL", level: "4" },
      { id: "sk-5", name: "AWS & Docker", level: "3" }
    ],
    languages: [
      { id: "ln-1", name: "Español", level: "Nativo" },
      { id: "ln-2", name: "Inglés", level: "Avanzado" }
    ],
    projects: [
      {
        id: "pr-1",
        name: "Dashboard Analytics",
        role: "Creador",
        stack: "React, D3.js, Postgres",
        desc: "Panel de analíticas SaaS que redujo latencia de reportes en un 40%."
      }
    ],
    certifications: [
      {
        id: "cer-1",
        title: "Solutions Architect Associate",
        issuer: "AWS",
        date: "2023"
      }
    ]
  };

  const showPhotoInTemplate = ["modern", "visual", "tech", "executive", "compact"].includes(templateId);
  const photoHTML = showPhotoInTemplate && (
    <div className="cv-photo-container">
      <img src={data.personal.photo} alt="Foto de perfil" />
    </div>
  );

  let contactItems = [
    <span key="em"><Mail size={12} /> {data.personal.email}</span>,
    <span key="ph"><Phone size={12} /> {data.personal.phone}</span>,
    <span key="lc"><MapPin size={12} /> {data.personal.location}</span>,
    <span key="wb"><Globe size={12} /> {data.personal.website}</span>
  ];

  const summarySection = (
    <section className="cv-section cv-summary-section">
      <h3 className="cv-section-title">Perfil Profesional</h3>
      <div className="cv-item-desc">{data.personal.summary}</div>
    </section>
  );

  const experienceSection = (
    <section className="cv-section cv-experience-section">
      <h3 className="cv-section-title">Experiencia Laboral</h3>
      <div className="cv-list">
        {data.experience.map(item => (
          <div key={item.id} className="cv-item">
            <div className="cv-item-title-row">
              <span className="cv-item-title">{item.role}</span>
              <span className="cv-item-date">{item.start} - {item.end}</span>
            </div>
            <div className="cv-item-subtitle-row">
              <span className="cv-item-subtitle">{item.company}</span>
              <span className="cv-item-location">{item.location}</span>
            </div>
            <div className="cv-item-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const educationSection = (
    <section className="cv-section cv-education-section">
      <h3 className="cv-section-title">Educación</h3>
      <div className="cv-list">
        {data.education.map(item => (
          <div key={item.id} className="cv-item">
            <div className="cv-item-title-row">
              <span className="cv-item-title">{item.degree}</span>
              <span className="cv-item-date">{item.start} - {item.end}</span>
            </div>
            <div className="cv-item-subtitle-row">
              <span className="cv-item-subtitle">{item.school} — {item.field}</span>
              <span className="cv-item-location">{item.location}</span>
            </div>
            <div className="cv-item-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const projectsSection = (
    <section className="cv-section cv-projects-section">
      <h3 className="cv-section-title">Proyectos</h3>
      <div className="cv-list">
        {data.projects.map(item => (
          <div key={item.id} className="cv-item">
            <div className="cv-item-title-row">
              <span className="cv-item-title">
                {item.name} <span className="cv-project-role">({item.role})</span>
              </span>
            </div>
            <div className="cv-item-desc">{item.desc}</div>
            <div className="cv-item-tags">
              {item.stack.split(",").map((t, idx) => (
                <span key={idx} className="cv-tag">{t.trim()}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const useBars = ["visual", "modern", "tech"].includes(templateId);
  const skillsSection = (
    <section className="cv-section cv-skills-section">
      <h3 className="cv-section-title">Habilidades</h3>
      {useBars ? (
        <div>
          {data.skills.map(item => (
            <div key={item.id} className="cv-skill-bar-item">
              <div className="cv-skill-bar-header">
                <span>{item.name}</span>
              </div>
              <div className="cv-skill-bar-track">
                <div className="cv-skill-bar-fill" style={{ width: `${parseInt(item.level) * 20}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cv-skills-container">
          {data.skills.map(item => (
            <span key={item.id} className="cv-skill-badge">{item.name}</span>
          ))}
        </div>
      )}
    </section>
  );

  const languagesSection = (
    <section className="cv-section cv-languages-section">
      <h3 className="cv-section-title">Idiomas</h3>
      <div className="cv-languages-container">
        {data.languages.map(item => (
          <div key={item.id} className="cv-lang-item">
            <span className="cv-lang-name">{item.name}</span>
            <span className="cv-lang-level">{item.level}</span>
          </div>
        ))}
      </div>
    </section>
  );

  const certificationsSection = (
    <section className="cv-section cv-certifications-section">
      <h3 className="cv-section-title">Certificaciones</h3>
      <div>
        {data.certifications.map(item => (
          <div key={item.id} className="cv-item cv-cert-item">
            <div className="cv-item-title-row">
              <span className="cv-cert-title">{item.title}</span>
              <span className="cv-cert-date">{item.date}</span>
            </div>
            <div className="cv-cert-issuer">{item.issuer}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const isTwoColumn = ["modern", "visual"].includes(templateId);

  return (
    <div
      className={`cv-page-a4 cv-template-${templateId} font-default space-compact`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: '794px',
        minHeight: '1122px',
        boxShadow: 'none',
        border: 'none',
        pointerEvents: 'none'
      }}
    >
      {isTwoColumn ? (
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
              <h1 className="cv-name">{data.personal.name}</h1>
              <h2 className="cv-title">{data.personal.title}</h2>
            </header>
            {summarySection}
            {experienceSection}
            {educationSection}
            {projectsSection}
          </div>
        </div>
      ) : (
        <>
          <header className="cv-header">
            <div className="cv-header-top">
              <div>
                <h1 className="cv-name">{data.personal.name}</h1>
                <h2 className="cv-title">{data.personal.title}</h2>
              </div>
              {photoHTML}
            </div>
            <div className="cv-contact-info">
              {contactItems}
            </div>
          </header>

          <div className="cv-grid-single">
            {templateId === "functional" ? (
              <>
                {summarySection}
                {skillsSection}
                {experienceSection}
                {educationSection}
                {projectsSection}
                {languagesSection}
                {certificationsSection}
              </>
            ) : templateId === "tech" ? (
              <>
                {summarySection}
                {skillsSection}
                {experienceSection}
                {educationSection}
                {projectsSection}
                {certificationsSection}
                {languagesSection}
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
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}


export default function LandingPage({ onStartCreator }) {
  const currentYear = new Date().getFullYear();
  const [activeTplIndex, setActiveTplIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  const Rx = isMobile ? 110 : (isTablet ? 220 : 340);
  const Ry = isMobile ? 30 : (isTablet ? 50 : 80);

  return (
    <div className="landing-page">
      <nav className="landing-nav" aria-label="Navegación principal">
        <a href="#" className="nav-brand" aria-label="Vitae Studio — Inicio">
          <div className="nav-brand-icon">
            <FileText size={18} aria-hidden="true" />
          </div>
          <span className="nav-brand-text">Vitae Studio</span>
        </a>

        <div className="nav-links">
          <a href="#templates">Plantillas</a>
          <a href="#features">Características</a>
          <button
            className="btn btn-primary"
            onClick={() => onStartCreator()}
            aria-label="Crear mi currículum"
          >
            Crear mi CV
          </button>
        </div>
      </nav>

      <main>
        <section className="landing-hero" aria-label="Sección principal">
          <div className="hero-content">
            <div className="hero-badge">
              <FileCheck size={16} aria-hidden="true" />
              PLANTILLAS COMPATIBLES CON ATS
            </div>

            <h1 className="hero-title">
              Crea un currículum profesional{" "}
              <TextType
                as="span"
                text={[
                  "optimizado para sistemas ATS",
                  "aprobado por reclutadores",
                  "con diseño estructurado"
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                pauseDuration={2000}
                showCursor
                cursorCharacter="|"
              />
            </h1>

            <p className="hero-subtitle">
              Editor en tiempo real con plantillas diseñadas bajo estándares de reclutamiento y estructuradas para superar filtros automáticos. Sin registro, sin publicidad y con privacidad total.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onStartCreator()}
                aria-label="Crear mi currículum"
              >
                Crear mi CV
              </button>
              <a
                href="#templates"
                className="btn btn-secondary btn-lg"
                aria-label="Ver plantillas disponibles"
              >
                Ver plantillas
              </a>
            </div>

            <p className="hero-trust">
              10 plantillas profesionales · 100% gratis · Sin registro · Datos 100% privados
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-cv-float">
              <MiniCv templateId="minimalist" scale={0.35} />
            </div>
          </div>
        </section>

        <section id="templates" className="landing-section templates-section" aria-label="Plantillas">
          <span className="section-label">PLANTILLAS</span>
          <h2 className="section-title">Diseños profesionales para cada estilo</h2>
          <p className="section-subtitle">
            Elige entre 10 plantillas probadas con sistemas ATS y aprobadas por reclutadores.
          </p>

          <div className="templates-carousel-container">
            <div className="templates-carousel">
              {templates.map((tpl, i) => {
                let diff = i - activeTplIndex;
                if (diff > 5) diff -= 10;
                if (diff < -5) diff += 10;
                const angle = diff * 36;
                const rad = (angle * Math.PI) / 180;
                
                const x = Rx * Math.sin(rad);
                const y = Ry * Math.cos(rad);
                
                const scale = 0.6 + 0.4 * (Math.cos(rad) + 1) / 2;
                const opacity = 0.3 + 0.7 * (Math.cos(rad) + 1) / 2;
                const zIndex = Math.round(10 + 20 * (Math.cos(rad) + 1) / 2);
                const isCenter = i === activeTplIndex;

                return (
                  <div
                    key={tpl.id}
                    className={`carousel-card ${isCenter ? 'active' : ''}`}
                    onClick={() => setActiveTplIndex(i)}
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                  >
                    <div className="template-card-preview">
                      <MiniCv templateId={tpl.id} scale={0.25} />
                    </div>
                    <div className="carousel-card-badge">{tpl.category}</div>
                  </div>
                );
              })}
            </div>

            <div className="carousel-controls">
              <button
                type="button"
                className="carousel-btn prev"
                onClick={() => setActiveTplIndex(prev => (prev === 0 ? 9 : prev - 1))}
                aria-label="Plantilla anterior"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="carousel-active-info">
                <h3 className="carousel-active-title">{templates[activeTplIndex].name}</h3>
                <p className="carousel-active-desc">{templates[activeTplIndex].desc}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => onStartCreator(templates[activeTplIndex].id)}
                >
                  Usar plantilla {templates[activeTplIndex].name}
                </button>
              </div>

              <button
                type="button"
                className="carousel-btn next"
                onClick={() => setActiveTplIndex(prev => (prev === 9 ? 0 : prev + 1))}
                aria-label="Plantilla siguiente"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        <section className="landing-section steps-section" aria-label="Cómo funciona">
          <span className="section-label">CÓMO FUNCIONA</span>
          <h2 className="section-title">Tu CV profesional en 3 pasos</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">
                <LayoutTemplate size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">Elige tu plantilla</h3>
              <p className="step-desc">
                Selecciona entre 10 diseños profesionales probados con sistemas ATS.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">
                <Edit3 size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">Completa tu información</h3>
              <p className="step-desc">
                Rellena tus datos con nuestro editor intuitivo con vista previa en tiempo real.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">
                <Download size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">Descarga tu CV</h3>
              <p className="step-desc">
                Exporta tu currículum como PDF listo para enviar con un solo clic.
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="landing-section" aria-label="Características">
          <span className="section-label">CARACTERÍSTICAS</span>
          <h2 className="section-title">Diseñado para el éxito profesional</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Eye size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">Vista previa en tiempo real</h3>
              <p className="feature-desc">
                Observa cada cambio reflejado instantáneamente en la vista previa de tu CV.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">Privacidad garantizada</h3>
              <p className="feature-desc">
                Tus datos personales se almacenan exclusivamente en tu navegador. No recopilamos información.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FileCheck size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">Compatible con ATS</h3>
              <p className="feature-desc">
                Plantillas optimizadas para pasar los filtros de los sistemas de seguimiento de candidatos.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">Rápido e intuitivo</h3>
              <p className="feature-desc">
                Genera un CV profesional y listo para descargar en menos de 10 minutos.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-brand">
          <FileText size={18} aria-hidden="true" />
          <span>Vitae Studio</span>
        </div>

        <div className="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Contacto</a>
        </div>

        <p className="footer-copy">
          © {currentYear} Vitae Studio. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
