import * as apodService from "../services/apod.service.js";
import { validateApod } from "../validations/apod.validation.js";

export const getAll = async (req, res) => {
  try {
    const { page, limit, title } = req.query;
    const apods = await apodService.getAll(page, limit, title);
    res.json(apods);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const apod = await apodService.getById(id);
    if (!apod) return res.status(404).json({ error: "Recurso no encontrado" });
    res.json(apod);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const create = async (req, res) => {
  try {
    const { isValid, errors } = validateApod(req.body);
    if (!isValid) {
      const details = Object.entries(errors).map(([field, message]) => ({
        field,
        message
      }));
      return res.status(400).json({ error: "Datos inválidos", details });
    }

    const apod = await apodService.create(req.body);
    res.status(201).json(apod);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const { isValid, errors } = validateApod(req.body);
    if (!isValid) {
      const details = Object.entries(errors).map(([field, message]) => ({
        field,
        message
      }));
      return res.status(400).json({ error: "Datos inválidos", details });
    }

    const apod = await apodService.update(id, req.body);
    if (!apod) return res.status(404).json({ error: "Recurso no encontrado" });
    res.json(apod);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const apod = await apodService.remove(id);
    if (!apod) return res.status(404).json({ error: "Recurso no encontrado" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
