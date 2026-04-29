import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

// Rotas públicas
router.post("/", userController.create);
router.post("/login", userController.login);

// Rotas protegidas
router.get("/:id", authMiddleware, userController.getById);
router.post("/:id/follow", authMiddleware, userController.follow);
router.delete("/:id/follow", authMiddleware, userController.unfollow);

export default router;