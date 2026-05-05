"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
class UserController {
    async create(req, res) {
        try {
            const user = await userService.create(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async login(req, res) {
        try {
            const result = await userService.login(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    async getById(req, res) {
        try {
            const user = await userService.getById(req.params["id"]);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async follow(req, res) {
        try {
            const result = await userService.follow(req.userId, req.params["id"]);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async unfollow(req, res) {
        try {
            const result = await userService.unfollow(req.userId, req.params["id"]);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.UserController = UserController;
