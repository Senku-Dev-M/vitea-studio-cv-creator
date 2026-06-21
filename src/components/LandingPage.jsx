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

import { translations } from '../data/translations';

function MiniCv({ templateId, scale = 0.25, lang = 'es' }) {
  const data = {
    personal: {
      name: "Alejandro Silva",
      title: lang === 'es' ? "Desarrollador Full Stack Senior" : "Senior Full Stack Developer",
      email: "alejandro.silva@email.com",
      phone: "+56 9 1234 5678",
      location: "Santiago, Chile",
      website: "alejandrosilva.dev",
      summary: lang === 'es'
        ? "Ingeniero de Software con más de 8 años de experiencia especializándose en React, Node.js y arquitectura cloud. Apasionado por crear interfaces intuitivas, código limpio y soluciones de alto rendimiento."
        : "Software Engineer with over 8 years of experience specializing in React, Node.js, and cloud architecture. Passionate about creating intuitive interfaces, clean code, and high-performance solutions.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop"
    },
    experience: [
      {
        id: "exp-1",
        role: lang === 'es' ? "Líder Técnico Frontend" : "Frontend Technical Lead",
        company: "Tech Solutions",
        location: "Santiago",
        start: "2021",
        end: lang === 'es' ? "Presente" : "Present",
        desc: lang === 'es'
          ? "Liderazgo de equipo frontend de 5 ingenieros. Migración de plataforma a Next.js y mejora de rendimiento web en un 35%."
          : "Led a frontend team of 5 engineers. Migrated platform to Next.js and improved web performance by 35%."
      },
      {
        id: "exp-2",
        role: lang === 'es' ? "Desarrollador Full Stack" : "Full Stack Developer",
        company: "Innovación Digital",
        location: "Valparaíso",
        start: "2018",
        end: "2021",
        desc: lang === 'es'
          ? "Desarrollo de API RESTful en Node.js y React. Integración de pagos y optimización de base de datos Postgres."
          : "Developed RESTful APIs in Node.js and React. Integrated payments and optimized PostgreSQL databases."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: lang === 'es' ? "Ingeniería Civil Informática" : "B.S. in Computer Science",
        school: "Universidad de Chile",
        field: lang === 'es' ? "Computación" : "Computing",
        location: "Santiago",
        start: "2012",
        end: "2017",
        desc: lang === 'es'
          ? "Graduado con distinción máxima. Especialidad en sistemas distribuidos."
          : "Graduated with highest honors. Specialized in distributed systems."
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
      { id: "ln-1", name: lang === 'es' ? "Español" : "Spanish", level: lang === 'es' ? "Nativo" : "Native" },
      { id: "ln-2", name: lang === 'es' ? "Inglés" : "English", level: lang === 'es' ? "Avanzado" : "Advanced" }
    ],
    projects: [
      {
        id: "pr-1",
        name: "Dashboard Analytics",
        role: lang === 'es' ? "Creador" : "Creator",
        stack: "React, D3.js, Postgres",
        desc: lang === 'es'
          ? "Panel de analíticas SaaS que redujo latencia de reportes en un 40%."
          : "SaaS analytics dashboard that reduced report latency by 40%."
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
      <h3 className="cv-section-title">{translations[lang].cvSections.profile}</h3>
      <div className="cv-item-desc">{data.personal.summary}</div>
    </section>
  );

  const experienceSection = (
    <section className="cv-section cv-experience-section">
      <h3 className="cv-section-title">{translations[lang].cvSections.experience}</h3>
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
      <h3 className="cv-section-title">{translations[lang].cvSections.education}</h3>
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
      <h3 className="cv-section-title">{translations[lang].cvSections.projects}</h3>
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
      <h3 className="cv-section-title">{translations[lang].cvSections.skills}</h3>
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
      <h3 className="cv-section-title">{translations[lang].cvSections.languages}</h3>
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
      <h3 className="cv-section-title">{translations[lang].cvSections.certifications}</h3>
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
              <h3 className="cv-section-title">{translations[lang].cvSections.contact}</h3>
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


export default function LandingPage({ onStartCreator, lang = 'es', onLanguageChange }) {
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

  const t = translations[lang].landingPage;

  // Dictionary for translating templates array
  const templateTranslations = {
    es: {
      harvard: { name: 'Harvard', desc: 'Diseño clásico serif, ideal para roles tradicionales.', category: 'Clásico' },
      academic: { name: 'Académico', desc: 'Formato formal para docentes e investigadores.', category: 'Formal' },
      modern: { name: 'Moderno', desc: 'Columna lateral con diseño contemporáneo.', category: 'Moderno' },
      minimalist: { name: 'Minimalista', desc: 'Limpio y centrado en el contenido.', category: 'Minimalista' },
      executive: { name: 'Ejecutivo', desc: 'Corporativo y profesional para directivos.', category: 'Corporativo' },
      tech: { name: 'Tecnológico', desc: 'Monospace y moderno para desarrolladores.', category: 'Tech' },
      visual: { name: 'Visual', desc: 'Diseño creativo con barras de progreso.', category: 'Creativo' },
      functional: { name: 'Funcional', desc: 'Organizado por competencias y habilidades.', category: 'Funcional' },
      compact: { name: 'Compacto', desc: 'Optimizado para condensar en una sola página.', category: 'Compacto' },
      elegant: { name: 'Elegante', desc: 'Serif refinado con detalles dorados.', category: 'Elegante' }
    },
    en: {
      harvard: { name: 'Harvard', desc: 'Classic serif design, ideal for traditional roles.', category: 'Classic' },
      academic: { name: 'Academic', desc: 'Formal format for teachers and researchers.', category: 'Formal' },
      modern: { name: 'Modern', desc: 'Sidebar layout with contemporary design.', category: 'Modern' },
      minimalist: { name: 'Minimalist', desc: 'Clean and content-focused.', category: 'Minimalist' },
      executive: { name: 'Executive', desc: 'Corporate and professional for executives.', category: 'Corporate' },
      tech: { name: 'Tech', desc: 'Monospace and modern for developers.', category: 'Tech' },
      visual: { name: 'Visual', desc: 'Creative design with progress bars.', category: 'Creative' },
      functional: { name: 'Functional', desc: 'Organized by competencies and skills.', category: 'Functional' },
      compact: { name: 'Compact', desc: 'Optimized to condense into a single page.', category: 'Compact' },
      elegant: { name: 'Elegant', desc: 'Refined serif with gold details.', category: 'Elegant' }
    }
  };

  const translatedTemplates = templates.map(tpl => ({
    ...tpl,
    name: templateTranslations[lang][tpl.id].name,
    desc: templateTranslations[lang][tpl.id].desc,
    category: templateTranslations[lang][tpl.id].category
  }));

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
          <a href="#templates">{t.navTemplates}</a>
          <a href="#features">{t.navFeatures}</a>
          <button
            onClick={() => onLanguageChange(lang === 'es' ? 'en' : 'es')}
            className="btn btn-ghost btn-sm btn-lang-switcher"
            aria-label="Cambiar idioma"
            style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>🌐</span>
            <span>{lang === 'es' ? 'ES' : 'EN'}</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onStartCreator()}
            aria-label={t.ctaStart}
          >
            {t.ctaStart}
          </button>
        </div>
      </nav>

      <main>
        <section className="landing-hero" aria-label="Sección principal">
          <div className="hero-content">
            <div className="hero-badge">
              <FileCheck size={16} aria-hidden="true" />
              {t.heroBadge}
            </div>

            <h1 className="hero-title">
              {t.heroTitlePrefix}{" "}
              <TextType
                as="span"
                text={t.heroAnimText}
                typingSpeed={60}
                deletingSpeed={40}
                pauseDuration={2000}
                showCursor
                cursorCharacter="|"
              />
            </h1>

            <p className="hero-subtitle">
              {t.heroSubtitle}
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onStartCreator()}
                aria-label={t.ctaStart}
              >
                {t.ctaStart}
              </button>
              <a
                href="#templates"
                className="btn btn-secondary btn-lg"
                aria-label={t.learnMore}
              >
                {t.learnMore}
              </a>
            </div>

            <p className="hero-trust">
              {t.heroTrust}
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-cv-float">
              <MiniCv templateId="minimalist" scale={0.35} lang={lang} />
            </div>
          </div>
        </section>

        <section id="templates" className="landing-section templates-section" aria-label={t.navTemplates}>
          <span className="section-label">{t.secTemplatesLabel}</span>
          <h2 className="section-title">{t.secTemplatesTitle}</h2>
          <p className="section-subtitle">
            {t.secTemplatesSubtitle}
          </p>

          <div className="templates-carousel-container">
            <div className="templates-carousel">
              {translatedTemplates.map((tpl, i) => {
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
                      <MiniCv templateId={tpl.id} scale={0.25} lang={lang} />
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
                <h3 className="carousel-active-title">{translatedTemplates[activeTplIndex].name}</h3>
                <p className="carousel-active-desc">{translatedTemplates[activeTplIndex].desc}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => onStartCreator(translatedTemplates[activeTplIndex].id)}
                >
                  {t.useTemplateBtn} {translatedTemplates[activeTplIndex].name}
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

        <section className="landing-section steps-section" aria-label={t.secStepsLabel}>
          <span className="section-label">{t.secStepsLabel}</span>
          <h2 className="section-title">{t.secStepsTitle}</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">
                <LayoutTemplate size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">{t.step1Title}</h3>
              <p className="step-desc">
                {t.step1Desc}
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">
                <Edit3 size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">{t.step2Title}</h3>
              <p className="step-desc">
                {t.step2Desc}
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">
                <Download size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">{t.step3Title}</h3>
              <p className="step-desc">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="landing-section" aria-label={t.secFeaturesLabel}>
          <span className="section-label">{t.secFeaturesLabel}</span>
          <h2 className="section-title">{t.secFeaturesTitle}</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Eye size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">{t.feat1Title}</h3>
              <p className="feature-desc">
                {t.feat1Desc}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">{t.feat2Title}</h3>
              <p className="feature-desc">
                {t.feat2Desc}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FileCheck size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">{t.feat3Title}</h3>
              <p className="feature-desc">
                {t.feat3Desc}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={24} aria-hidden="true" />
              </div>
              <h3 className="feature-title">{t.feat4Title}</h3>
              <p className="feature-desc">
                {t.feat4Desc}
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
          <a href="#">{t.footerPrivacy}</a>
          <a href="#">{t.footerTerms}</a>
          <a href="#">{t.footerContact}</a>
        </div>

        <p className="footer-copy">
          © {currentYear} Vitae Studio. {t.footerCopy}
        </p>
      </footer>
    </div>
  );
}
