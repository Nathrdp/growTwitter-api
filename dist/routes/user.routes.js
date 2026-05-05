"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Rotas públicas
router.post("/", userController.create);
router.post("/login", userController.login);
// Rotas protegidas
router.get("/:id", auth_middleware_1.authMiddleware, userController.getById);
router.post("/:id/follow", auth_middleware_1.authMiddleware, userController.follow);
router.delete("/:id/follow", auth_middleware_1.authMiddleware, userController.unfollow);
exports.default = router;
