export interface UserModel {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture?: string | null;
    createdAt: Date;
}