import { useRef } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';

export default function PersonalForm({ cvData, onPersonalChange }) {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onPersonalChange('photo', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onPersonalChange('photo', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Información Personal</h2>
        <p>Completa tus datos de contacto e información básica.</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-name">Nombre Completo</label>
          <input
            id="personal-name"
            type="text"
            value={cvData.personal.name}
            onChange={(e) => onPersonalChange('name', e.target.value)}
            placeholder="Ej. Rodrigo Morales"
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-title">Título Profesional</label>
          <input
            id="personal-title"
            type="text"
            value={cvData.personal.title}
            onChange={(e) => onPersonalChange('title', e.target.value)}
            placeholder="Ej. Desarrollador Full-Stack"
          />
          <AIEnhancer
            value={cvData.personal.title}
            onChange={(val) => onPersonalChange('title', val)}
            fieldName="Título Profesional"
            context={{ name: cvData.personal.name }}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-email">Correo Electrónico</label>
          <input
            id="personal-email"
            type="email"
            value={cvData.personal.email}
            onChange={(e) => onPersonalChange('email', e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-phone">Teléfono</label>
          <input
            id="personal-phone"
            type="tel"
            value={cvData.personal.phone}
            onChange={(e) => onPersonalChange('phone', e.target.value)}
            placeholder="+56 9 1234 5678"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-location">Ubicación</label>
          <input
            id="personal-location"
            type="text"
            value={cvData.personal.location}
            onChange={(e) => onPersonalChange('location', e.target.value)}
            placeholder="Santiago, Chile"
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-website">Sitio Web</label>
          <input
            id="personal-website"
            type="url"
            value={cvData.personal.website}
            onChange={(e) => onPersonalChange('website', e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-linkedin">LinkedIn</label>
          <input
            id="personal-linkedin"
            type="text"
            value={cvData.personal.linkedin}
            onChange={(e) => onPersonalChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-github">GitHub</label>
          <input
            id="personal-github"
            type="text"
            value={cvData.personal.github}
            onChange={(e) => onPersonalChange('github', e.target.value)}
            placeholder="github.com/usuario"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Foto de Perfil</label>
        <div className="photo-upload">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            hidden
            aria-label="Subir foto de perfil"
          />
          {cvData.personal.photo ? (
            <div className="photo-preview">
              <img src={cvData.personal.photo} alt="Foto de perfil" />
              <button
                type="button"
                className="photo-remove"
                onClick={handleRemovePhoto}
                aria-label="Eliminar foto"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="photo-upload-trigger"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Seleccionar foto de perfil"
            >
              <ImageIcon size={24} />
              <span>Subir Foto</span>
            </button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="personal-summary">Resumen Profesional</label>
        <textarea
          id="personal-summary"
          rows={4}
          value={cvData.personal.summary}
          onChange={(e) => onPersonalChange('summary', e.target.value)}
          placeholder="Describe tu experiencia y objetivos profesionales..."
        />
        <AIEnhancer
          value={cvData.personal.summary}
          onChange={(val) => onPersonalChange('summary', val)}
          fieldName="Resumen Profesional"
          context={{ role: cvData.personal.title }}
        />
      </div>
    </div>
  );
}
