export const validateRegister = (body) => {
  const errors = {};

  if (!body || typeof body !== "object") {
    return { isValid: false, errors: { _global: "El cuerpo de la petición debe ser un objeto válido." } };
  }

  const { name, email, password } = body;

  if (name === undefined || name === null) {
    errors.name = "El nombre es requerido.";
  } else if (typeof name !== "string") {
    errors.name = "El nombre debe ser una cadena de texto.";
  } else if (name.trim() === "") {
    errors.name = "El nombre no puede estar vacío.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === undefined || email === null) {
    errors.email = "El email es requerido.";
  } else if (typeof email !== "string") {
    errors.email = "El email debe ser una cadena de texto.";
  } else if (!emailRegex.test(email)) {
    errors.email = "El email no tiene un formato válido.";
  }

  if (password === undefined || password === null) {
    errors.password = "La contraseña es requerida.";
  } else if (typeof password !== "string") {
    errors.password = "La contraseña debe ser una cadena de texto.";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLogin = (body) => {
  const errors = {};

  if (!body || typeof body !== "object") {
    return { isValid: false, errors: { _global: "El cuerpo de la petición debe ser un objeto válido." } };
  }

  const { email, password } = body;

  if (!email || (typeof email === "string" && email.trim() === "")) {
    errors.email = "El email es requerido.";
  }

  if (!password || (typeof password === "string" && password.trim() === "")) {
    errors.password = "La contraseña es requerida.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
