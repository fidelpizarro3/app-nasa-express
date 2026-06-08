import * as apodService from "../services/apod.service.js";

export const getAll = async (_req, res) => {
  try {
    const apods = await apodService.getAll();
    res.json(apods);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getById = async (req, res) => {
  try {
    const apod = await apodService.getById(Number(req.params.id));
    if (!apod) return res.status(404).json({ error: "Recurso no encontrado" });
    res.json(apod);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const create = async (req, res) => {
  try {
    const apod = await apodService.create(req.body);
    res.status(201).json(apod);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const update = async (req, res) => {
  try {
    const apod = await apodService.update(Number(req.params.id), req.body);
    if (!apod) return res.status(404).json({ error: "Recurso no encontrado" });
    res.json(apod);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const remove = async (req, res) => {
  try {
    const apod = await apodService.remove(Number(req.params.id));
    if (!apod) return res.status(404).json({ error: "Recurso no encontrado" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
