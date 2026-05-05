import prisma from "../database/prisma";

export class TweetService {
    async create(userId: string, content: string) {
        return await prisma.tweet.create({
            data: { content, userId, type: "TWEET" },
        });
    }

    async reply(userId: string, parentTweetId: string, content: string) {
        const parentTweet = await prisma.tweet.findUnique({
            where: { id: parentTweetId },
        });

        if (!parentTweet) throw new Error("Tweet não encontrado");

        return await prisma.tweet.create({
            data: { content, userId, type: "REPLY", parentTweetId },
        });
    }

    async feed(userId: string) {
        const following = await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true },
        });

        const followingIds = following.map((f: { followingId: string }) => f.followingId);

        return await prisma.tweet.findMany({
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

    async like(userId: string, tweetId: string) {
        const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });
        if (!tweet) throw new Error("Tweet não encontrado");

        const alreadyLiked = await prisma.like.findUnique({
            where: { userId_tweetId: { userId, tweetId } },
        });

        if (alreadyLiked) throw new Error("Tweet já curtido");

        return await prisma.like.create({ data: { userId, tweetId } });
    }

    async unlike(userId: string, tweetId: string) {
        const like = await prisma.like.findUnique({
            where: { userId_tweetId: { userId, tweetId } },
        });

        if (!like) throw new Error("Like não encontrado");

        return await prisma.like.delete({
            where: { userId_tweetId: { userId, tweetId } },
        });
    }
}