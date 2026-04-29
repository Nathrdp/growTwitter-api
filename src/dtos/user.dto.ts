export interface CreateUserDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
}

export interface LoginDTO {
    login: string;
    password: string;
}

// Retorno do usuário sem a senha
export interface UserResponseDTO {
    id: string;
    name: string;
    username: string;
    email: string;
    profilePicture?: string | null;
    createdAt: Date;
}