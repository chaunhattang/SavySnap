export interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role?: string;
    avatarUrl?: string;
    totalPayment: number;
    savingNotes: [];
}
