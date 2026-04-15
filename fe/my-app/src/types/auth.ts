export interface LoginValues {
    accountName: string;
    password: string;
}

export interface RegisterValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string;
    gender?: string;
    agreement: boolean;
}

export interface AuthResponse {
    token: string;
    isAdmin: boolean;
}

export interface AuthError {
    message: string;
    code?: string;
}
