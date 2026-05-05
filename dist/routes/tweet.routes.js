"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweet_controller_1 = require("../controllers/tweet.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const tweetController = new tweet_controller_1.TweetController();
// Todas protegidas
router.post("/", auth_middleware_1.authMiddleware, tweetController.create);
router.post("/:id/reply", auth_middleware_1.authMiddleware, tweetController.reply);
router.get("/feed", auth_middleware_1.authMiddleware, tweetController.feed);
router.post("/:id/like", auth_middleware_1.authMiddleware, tweetController.like);
router.delete("/:id/like", auth_middleware_1.authMiddleware, tweetController.unlike);
exports.default = router;
