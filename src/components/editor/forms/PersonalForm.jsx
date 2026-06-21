import { useRef } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import AIEnhancer from '../AIEnhancer';
import { translations } from '../../../data/translations';

export default function PersonalForm({ cvData, onPersonalChange, lang = 'es' }) {
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

  const t = translations[lang].forms.personal;

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-name">{t.fullName}</label>
          <input
            id="personal-name"
            type="text"
            value={cvData.personal.name}
            onChange={(e) => onPersonalChange('name', e.target.value)}
            placeholder={t.fullNamePlaceholder}
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-title">{t.jobTitle}</label>
          <input
            id="personal-title"
            type="text"
            value={cvData.personal.title}
            onChange={(e) => onPersonalChange('title', e.target.value)}
            placeholder={t.jobTitlePlaceholder}
          />
          <AIEnhancer
            value={cvData.personal.title}
            onChange={(val) => onPersonalChange('title', val)}
            fieldName={t.jobTitle}
            context={{ name: cvData.personal.name }}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-email">{t.email}</label>
          <input
            id="personal-email"
            type="email"
            value={cvData.personal.email}
            onChange={(e) => onPersonalChange('email', e.target.value)}
            placeholder={t.emailPlaceholder}
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-phone">{t.phone}</label>
          <input
            id="personal-phone"
            type="tel"
            value={cvData.personal.phone}
            onChange={(e) => onPersonalChange('phone', e.target.value)}
            placeholder={t.phonePlaceholder}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-location">{t.location}</label>
          <input
            id="personal-location"
            type="text"
            value={cvData.personal.location}
            onChange={(e) => onPersonalChange('location', e.target.value)}
            placeholder={t.locationPlaceholder}
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-website">{t.website}</label>
          <input
            id="personal-website"
            type="url"
            value={cvData.personal.website}
            onChange={(e) => onPersonalChange('website', e.target.value)}
            placeholder={t.websitePlaceholder}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personal-linkedin">{t.linkedin}</label>
          <input
            id="personal-linkedin"
            type="text"
            value={cvData.personal.linkedin}
            onChange={(e) => onPersonalChange('linkedin', e.target.value)}
            placeholder={t.linkedinPlaceholder}
          />
        </div>
        <div className="form-group">
          <label htmlFor="personal-github">{t.github}</label>
          <input
            id="personal-github"
            type="text"
            value={cvData.personal.github}
            onChange={(e) => onPersonalChange('github', e.target.value)}
            placeholder={t.githubPlaceholder}
          />
        </div>
      </div>

      <div className="form-group">
        <label>{t.photo}</label>
        <div className="photo-upload">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            hidden
            aria-label={t.photoUpload}
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
              aria-label={t.photoUpload}
            >
              <ImageIcon size={24} />
              <span>{t.photoUpload}</span>
            </button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="personal-summary">{t.summary}</label>
        <textarea
          id="personal-summary"
          rows={4}
          value={cvData.personal.summary}
          onChange={(e) => onPersonalChange('summary', e.target.value)}
          placeholder={t.summaryPlaceholder}
        />
        <AIEnhancer
          value={cvData.personal.summary}
          onChange={(val) => onPersonalChange('summary', val)}
          fieldName={t.summary}
          context={{ role: cvData.personal.title }}
        />
      </div>
    </div>
  );
}
