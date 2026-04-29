export interface CreateTweetDTO {
    content: string;
}

export interface TweetResponseDTO {
    id: string;
    content: string;
    type: string;
    userId: string;
    parentTweetId?: string | null;
    createdAt: Date;
}
