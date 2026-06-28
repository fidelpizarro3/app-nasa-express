import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userService from "../services/user.service.js";
import { validateRegister, validateLogin } from "../validations/auth.validation.js";

export const register = async (req, res) => {
  try {
    const { isValid, errors } = validateRegister(req.body);
    if (!isValid) {
      return res.status(400).json({ error: "Datos inválidos", details: errors });
    }

    const { name, email, password } = req.body;

    const existing = await userService.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { isValid, errors } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json({ error: "Datos inválidos", details: errors });
    }

    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const logout = (_req, res) => {
  res.json({ message: "Sesión cerrada correctamente" });
};

export const me = async (req, res) => {
  try {
    const user = await userService.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
