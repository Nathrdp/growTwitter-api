"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetController = void 0;
const tweet_service_1 = require("../services/tweet.service");
const tweetService = new tweet_service_1.TweetService();
class TweetController {
    async create(req, res) {
        try {
            const tweet = await tweetService.create(req.userId, req.body.content);
            res.status(201).json(tweet);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async reply(req, res) {
        try {
            const tweet = await tweetService.reply(req.userId, req.params["id"], req.body.content);
            res.status(201).json(tweet);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async feed(req, res) {
        try {
            const tweets = await tweetService.feed(req.userId);
            res.status(200).json(tweets);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async like(req, res) {
        try {
            const result = await tweetService.like(req.userId, req.params["id"]);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async unlike(req, res) {
        try {
            const result = await tweetService.unlike(req.userId, req.params["id"]);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.TweetController = TweetController;
