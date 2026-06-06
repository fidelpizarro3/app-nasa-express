/**
 * Valida manualmente los campos obligatorios de un APOD (title, date, explanation, url).
 * @param {Object} body - El cuerpo de la petición a validar.
 * @returns {{isValid: boolean, errors: Object}}
 */
export const validateApod = (body) => {
  const errors = {};

  if (!body || typeof body !== "object") {
    return {
      isValid: false,
      errors: { _global: "El cuerpo de la petición debe ser un objeto válido." }
    };
  }

  const { title, date, explanation, url } = body;

  // 1. Validar 'title' (Requerido, string, no vacío)
  if (title === undefined || title === null) {
    errors.title = "El título es requerido.";
  } else if (typeof title !== "string") {
    errors.title = "El título debe ser una cadena de texto.";
  } else if (title.trim() === "") {
    errors.title = "El título no puede estar vacío.";
  }

  // 2. Validar 'date' (Requerido, formato YYYY-MM-DD y fecha real)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (date === undefined || date === null) {
    errors.date = "La fecha es requerida.";
  } else if (typeof date !== "string") {
    errors.date = "La fecha debe ser una cadena de texto.";
  } else if (!dateRegex.test(date)) {
    errors.date = "La fecha debe tener el formato YYYY-MM-DD.";
  } else {
    // Validar si es una fecha del calendario real
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
      errors.date = "La fecha no corresponde a un día válido del calendario.";
    }
  }

  // 3. Validar 'explanation' (Requerido, string, no vacío)
  if (explanation === undefined || explanation === null) {
    errors.explanation = "La explicación es requerida.";
  } else if (typeof explanation !== "string") {
    errors.explanation = "La explicación debe ser una cadena de texto.";
  } else if (explanation.trim() === "") {
    errors.explanation = "La explicación no puede estar vacía.";
  }

  // 4. Validar 'url' (Requerido, string, formato de URL válido)
  if (url === undefined || url === null) {
    errors.url = "La URL es requerida.";
  } else if (typeof url !== "string") {
    errors.url = "La URL debe ser una cadena de texto.";
  } else {
    try {
      new URL(url);
    } catch {
      errors.url = "La URL proporcionada no tiene un formato válido.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
