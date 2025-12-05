export interface Usuario {
    id?: number;
    username: string;
    nombre: string;
    password?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    username: string;
    nombre: string;
}

export interface RegisterRequest {
    username: string;
    nombre: string;
    password: string;
    confirmPassword?: string;
}