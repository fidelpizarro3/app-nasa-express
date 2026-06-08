import { Router } from "express";
import * as apodController from "../controllers/apod.controller.js";

const router = Router();

router.get("/", apodController.getAll);
router.get("/:id", apodController.getById);
router.post("/", apodController.create);
router.put("/:id", apodController.update);
router.delete("/:id", apodController.remove);

export default router;
