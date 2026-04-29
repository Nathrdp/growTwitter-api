import prisma from "../database/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    async create(data: {
        name: string;
        username: string;
        email: string;
        password: string;
        profilePicture?: string;
    }) {
        const userExists = await prisma.user.findFirst({
            where: { OR: [{ email: data.email }, { username: data.username }] },
        });

        if (userExists) {
            throw new Error("Email ou username já cadastrado");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: { ...data, password: hashedPassword },
        });

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(data: { login: string; password: string }) {
        const user = await prisma.user.findFirst({
            where: { OR: [{ email: data.login }, { username: data.login }] },
        });

        if (!user) throw new Error("Usuário não encontrado");

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) throw new Error("Senha incorreta");

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    async getById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                tweets: true,
                followers: { include: { follower: true } },
                following: { include: { following: true } },
            },
        });

        if (!user) throw new Error("Usuário não encontrado");

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async follow(followerId: string, followingId: string) {
        if (followerId === followingId) {
            throw new Error("Usuário não pode seguir a si mesmo");
        }

        const alreadyFollowing = await prisma.follow.findUnique({
            where: { followerId_followingId: { followerId, followingId } },
        });

        if (alreadyFollowing) throw new Error("Já está seguindo este usuário");

        return await prisma.follow.create({
            data: { followerId, followingId },
        });
    }

    async unfollow(followerId: string, followingId: string) {
        const follow = await prisma.follow.findUnique({
            where: { followerId_followingId: { followerId, followingId } },
        });

        if (!follow) throw new Error("Não está seguindo este usuário");

        return await prisma.follow.delete({
            where: { followerId_followingId: { followerId, followingId } },
        });
    }
}