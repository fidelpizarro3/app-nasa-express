import * as favoriteService from "../services/favorite.service.js";
import * as apodService from "../services/apod.service.js";

export const list = async (req, res) => {
  try {
    const favorites = await favoriteService.getByUser(req.user.id);
    res.json(favorites);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const add = async (req, res) => {
  try {
    const apodId = Number(req.params.id);
    if (Number.isNaN(apodId)) return res.status(400).json({ error: "ID inválido" });

    const apod = await apodService.getById(apodId);
    if (!apod) return res.status(404).json({ error: "El APOD no existe" });

    const already = await favoriteService.exists(req.user.id, apodId);
    if (already) return res.status(409).json({ error: "El favorito ya existe" });

    const favorite = await favoriteService.add(req.user.id, apodId);
    res.status(201).json(favorite);
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const remove = async (req, res) => {
  try {
    const apodId = Number(req.params.id);
    if (Number.isNaN(apodId)) return res.status(400).json({ error: "ID inválido" });

    const deleted = await favoriteService.remove(req.user.id, apodId);
    if (!deleted) return res.status(404).json({ error: "El favorito no existe para este usuario" });

    res.json({ message: "Favorito eliminado" });
  } catch {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
