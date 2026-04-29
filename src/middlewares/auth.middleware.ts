import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    // Verifica se esta enviando no formato correto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
    }

    const token = authHeader.split(" ")[1];

    // Verifica se o token é válido
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
        };
        // Injeta o userId no request
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: "Token inválido" });
    }
}