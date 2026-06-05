import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "GET todos los apods" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `GET apod con id ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "POST crear apod" });
});

router.put("/:id", (req, res) => {
  res.json({ message: `PUT actualizar apod con id ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE apod con id ${req.params.id}` });
});

export default router;
