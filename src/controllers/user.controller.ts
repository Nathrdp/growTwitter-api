import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const userService = new UserService();

export class UserController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.create(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const result = await userService.login(req.body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async getById(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = await userService.getById(req.params["id"] as string);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    async follow(req: AuthRequest, res: Response): Promise<void> {
        try {
            const result = await userService.follow(req.userId!, req.params["id"] as string);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async unfollow(req: AuthRequest, res: Response): Promise<void> {
        try {
            const result = await userService.unfollow(req.userId!, req.params["id"] as string);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}