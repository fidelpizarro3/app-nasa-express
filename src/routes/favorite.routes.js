import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import * as favoriteController from "../controllers/favorite.controller.js";

const router = Router();

router.use(verifyToken);

router.get("/", favoriteController.list);
router.post("/:id", favoriteController.add);
router.delete("/:id", favoriteController.remove);

export default router;
