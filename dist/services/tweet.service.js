"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetService = void 0;
const prisma_1 = __importDefault(require("../database/prisma"));
class TweetService {
    async create(userId, content) {
        return await prisma_1.default.tweet.create({
            data: { content, userId, type: "TWEET" },
        });
    }
    async reply(userId, parentTweetId, content) {
        const parentTweet = await prisma_1.default.tweet.findUnique({
            where: { id: parentTweetId },
        });
        if (!parentTweet)
            throw new Error("Tweet não encontrado");
        return await prisma_1.default.tweet.create({
            data: { content, userId, type: "REPLY", parentTweetId },
        });
    }
    async feed(userId) {
        const following = await prisma_1.default.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true },
        });
        const followingIds = following.map((f) => f.followingId);
        return await prisma_1.default.tweet.findMany({
            where: {
                userId: { in: [userId, ...followingIds] },
                type: "TWEET",
            },
            include: {
                user: { select: { id: true, name: true, username: true, profilePicture: true } },
                likes: true,
                replies: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async like(userId, tweetId) {
        const tweet = await prisma_1.default.tweet.findUnique({ where: { id: tweetId } });
        if (!tweet)
            throw new Error("Tweet não encontrado");
        const alreadyLiked = await prisma_1.default.like.findUnique({
            where: { userId_tweetId: { userId, tweetId } },
        });
        if (alreadyLiked)
            throw new Error("Tweet já curtido");
        return await prisma_1.default.like.create({ data: { userId, tweetId } });
    }
    async unlike(userId, tweetId) {
        const like = await prisma_1.default.like.findUnique({
            where: { userId_tweetId: { userId, tweetId } },
        });
        if (!like)
            throw new Error("Like não encontrado");
        return await prisma_1.default.like.delete({
            where: { userId_tweetId: { userId, tweetId } },
        });
    }
}
exports.TweetService = TweetService;
