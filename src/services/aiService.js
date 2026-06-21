/**
 * Servicio para integrar el optimizador de texto de IA usando OpenRouter
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Verifica si el servicio de IA está configurado (si existe la API Key)
 * @returns {boolean}
 */
export const isAIConfigured = () => {
  return !!import.meta.env.VITE_OPENROUTER_API_KEY;
};

/**
 * Llama a OpenRouter para mejorar y redactar profesionalmente un fragmento de texto del CV
 * 
 * @param {string} text - El texto original a mejorar
 * @param {string} fieldName - Nombre descriptivo del campo (ej. "Perfil Profesional", "Descripción de Experiencia", "Proyectos")
 * @param {object} [context] - Contexto adicional (ej. { role: "Líder Técnico", company: "Google" })
 * @returns {Promise<string>} - El texto mejorado
 */
export const improveText = async (text, fieldName, context = {}) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'openrouter/free';

  if (!apiKey) {
    throw new Error('API Key de OpenRouter no configurada. Por favor, añádela a tu archivo .env');
  }

  if (!text || text.trim() === '') {
    throw new Error('El texto a optimizar no puede estar vacío.');
  }

  // Construcción del contexto adicional para el prompt
  let contextInfo = '';
  if (context.role || context.company) {
    const roleStr = context.role ? `como ${context.role}` : '';
    const companyStr = context.company ? `en la empresa ${context.company}` : '';
    contextInfo = `Contexto del puesto: El usuario desempeñó responsabilidades ${roleStr} ${companyStr}.\n`;
  } else if (context.school || context.degree) {
    const degreeStr = context.degree ? `el título/grado de "${context.degree}"` : '';
    const schoolStr = context.school ? `en la institución "${context.school}"` : '';
    contextInfo = `Contexto educativo: Estudios relacionados con ${degreeStr} ${schoolStr}.\n`;
  } else if (context.projectName || context.stack) {
    const nameStr = context.projectName ? `llamado "${context.projectName}"` : '';
    const stackStr = context.stack ? `usando tecnologías como [${context.stack}]` : '';
    contextInfo = `Contexto del proyecto: Proyecto ${nameStr} desarrollado ${stackStr}.\n`;
  }

  const systemPrompt = `Actúas como un reclutador experto y consultor profesional de redacción de currículums (CV).
Tu tarea es reescribir, pulir y mejorar la redacción del texto proporcionado por el usuario para su CV.

El campo que estás optimizando es: "${fieldName}".
${contextInfo}
Requisitos estrictos para la optimización:
1. Retorna el texto redactado en el mismo idioma en que fue provisto (normalmente Español).
2. Corrige de forma impecable toda la ortografía, gramática, puntuación y redacción.
3. Emplea un tono corporativo, profesional, formal, convincente y de alto impacto.
4. Si es una descripción de puesto o tareas, usa verbos de acción fuertes al inicio de las viñetas (ej. "Lideré", "Desarrollé", "Optimicé", "Reduje", "Coordiné") y enfócalo hacia logros e impacto en el negocio.
5. Haz que sea conciso pero rico en vocabulario profesional. Evita la redundancia y rellenos innecesarios.
6. NO inventes hechos falsos, años de experiencia que no estén indicados, ni tecnologías o instituciones que no figuren en el texto original o el contexto provisto. Sí puedes reformular y expandir los conceptos implícitos para darles mayor altura y profesionalismo.
7. Retorna ÚNICAMENTE la versión reescrita y optimizada del texto. NO incluyas introducciones como "Aquí tienes tu texto", ni explicaciones, notas, saludos, despedidas o comillas. Solo el texto limpio final listo para ser copiado.`;

  const userPrompt = `Optimiza este texto para el currículum:\n\n"${text}"`;

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin || 'http://localhost:5173', // Opcional, para OpenRouter rankings
        'X-Title': 'Vitae Studio CV Creator', // Opcional, para OpenRouter rankings
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3, // Menos creativa y más profesional/consistente
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP error ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    let resultText = data.choices?.[0]?.message?.content || '';

    // Limpieza menor en caso de que el modelo decida añadir comillas al inicio y final
    resultText = resultText.trim();
    if (resultText.startsWith('"') && resultText.endsWith('"')) {
      resultText = resultText.substring(1, resultText.length - 1);
    }

    return resultText;
  } catch (error) {
    console.error('Error llamando a la API de OpenRouter:', error);
    throw new Error(error.message || 'Error de conexión con el servicio de IA.');
  }
};
