import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const tweetController = new TweetController();

// Todas protegidas
router.post("/", authMiddleware, tweetController.create);
router.post("/:id/reply", authMiddleware, tweetController.reply);
router.get("/feed", authMiddleware, tweetController.feed);
router.post("/:id/like", authMiddleware, tweetController.like);
router.delete("/:id/like", authMiddleware, tweetController.unlike);

export default router;