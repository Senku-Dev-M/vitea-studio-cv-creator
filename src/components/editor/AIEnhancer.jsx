import { useState } from 'react';
import { Sparkles, Check, X, Loader2 } from 'lucide-react';
import { isAIConfigured, improveText } from '../../services/aiService';

export default function AIEnhancer({ value, onChange, fieldName, context = {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);

  // Si la API Key no está configurada, no mostramos el botón de IA
  if (!isAIConfigured()) {
    return null;
  }

  const handleOptimize = async () => {
    if (!value || value.trim() === '') {
      setError('Escribe algo de texto antes de optimizar.');
      setTimeout(() => setError(null), 4000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const improved = await improveText(value, fieldName, context);
      setSuggestion(improved);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al procesar la sugerencia.');
      setTimeout(() => setError(null), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (suggestion) {
      onChange(suggestion);
      setSuggestion(null);
    }
  };

  const handleDiscard = () => {
    setSuggestion(null);
  };

  return (
    <div className="ai-enhancer-container">
      {/* Botón principal para disparar la optimización */}
      {!suggestion && !isLoading && (
        <button
          type="button"
          className="btn-ai-trigger"
          onClick={handleOptimize}
          title={`Optimizar redacción de ${fieldName} con Inteligencia Artificial`}
        >
          <Sparkles size={14} className="ai-icon-sparkle" />
          <span>Optimizar con IA</span>
        </button>
      )}

      {/* Estado de carga */}
      {isLoading && (
        <div className="ai-loading-status">
          <Loader2 size={14} className="ai-spinner" />
          <span>Optimizando redacción con IA...</span>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="ai-error-status">
          <X size={14} className="error-close-icon" onClick={() => setError(null)} />
          <span>{error}</span>
        </div>
      )}

      {/* Caja de sugerencia generada por la IA */}
      {suggestion && (
        <div className="ai-suggestion-card">
          <div className="ai-suggestion-header">
            <div className="ai-header-title">
              <Sparkles size={14} className="ai-icon-sparkle" />
              <span>Sugerencia de la IA</span>
            </div>
            <span className="ai-header-tag">Recomendado</span>
          </div>
          
          <div className="ai-suggestion-body">
            {suggestion}
          </div>

          <div className="ai-suggestion-footer">
            <button
              type="button"
              className="btn-ai-action btn-ai-apply"
              onClick={handleApply}
            >
              <Check size={14} />
              <span>Aplicar cambios</span>
            </button>
            <button
              type="button"
              className="btn-ai-action btn-ai-discard"
              onClick={handleDiscard}
            >
              <X size={14} />
              <span>Descartar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
