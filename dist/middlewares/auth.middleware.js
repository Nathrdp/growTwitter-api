"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    // Verifica se esta enviando no formato correto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
    }
    const token = authHeader.split(" ")[1];
    // Verifica se o token é válido
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Injeta o userId no request
        req.userId = decoded.userId;
        next();
    }
    catch {
        res.status(401).json({ message: "Token inválido" });
    }
}
