export type TweetType = "TWEET" | "REPLY";

export interface TweetModel {
    id: string;
    content: string;
    type: TweetType;
    userId: string;
    parentTweetId?: string | null;
    createdAt: Date;
}