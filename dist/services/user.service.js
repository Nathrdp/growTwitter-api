"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../database/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    async create(data) {
        const userExists = await prisma_1.default.user.findFirst({
            where: { OR: [{ email: data.email }, { username: data.username }] },
        });
        if (userExists) {
            throw new Error("Email ou username já cadastrado");
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_1.default.user.create({
            data: { ...data, password: hashedPassword },
        });
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async login(data) {
        const user = await prisma_1.default.user.findFirst({
            where: { OR: [{ email: data.login }, { username: data.login }] },
        });
        if (!user)
            throw new Error("Usuário não encontrado");
        const validPassword = await bcrypt_1.default.compare(data.password, user.password);
        if (!validPassword)
            throw new Error("Senha incorreta");
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async getById(id) {
        const user = await prisma_1.default.user.findUnique({
            where: { id },
            include: {
                tweets: true,
                followers: { include: { follower: true } },
                following: { include: { following: true } },
            },
        });
        if (!user)
            throw new Error("Usuário não encontrado");
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async follow(followerId, followingId) {
        if (followerId === followingId) {
            throw new Error("Usuário não pode seguir a si mesmo");
        }
        const alreadyFollowing = await prisma_1.default.follow.findUnique({
            where: { followerId_followingId: { followerId, followingId } },
        });
        if (alreadyFollowing)
            throw new Error("Já está seguindo este usuário");
        return await prisma_1.default.follow.create({
            data: { followerId, followingId },
        });
    }
    async unfollow(followerId, followingId) {
        const follow = await prisma_1.default.follow.findUnique({
            where: { followerId_followingId: { followerId, followingId } },
        });
        if (!follow)
            throw new Error("Não está seguindo este usuário");
        return await prisma_1.default.follow.delete({
            where: { followerId_followingId: { followerId, followingId } },
        });
    }
}
exports.UserService = UserService;
