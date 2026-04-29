import { Response } from "express";
import { TweetService } from "../services/tweet.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const tweetService = new TweetService();

export class TweetController {
    async create(req: AuthRequest, res: Response): Promise<void> {
        try {
            const tweet = await tweetService.create(req.userId!, req.body.content);
            res.status(201).json(tweet);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async reply(req: AuthRequest, res: Response): Promise<void> {
        try {
            const tweet = await tweetService.reply(
                req.userId!,
                req.params["id"] as string,
                req.body.content
            );
            res.status(201).json(tweet);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async feed(req: AuthRequest, res: Response): Promise<void> {
        try {
            const tweets = await tweetService.feed(req.userId!);
            res.status(200).json(tweets);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async like(req: AuthRequest, res: Response): Promise<void> {
        try {
            const result = await tweetService.like(req.userId!, req.params["id"] as string);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async unlike(req: AuthRequest, res: Response): Promise<void> {
        try {
            const result = await tweetService.unlike(req.userId!, req.params["id"] as string);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}