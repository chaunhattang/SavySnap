export interface Snap {
    id: string;
    title: string;
    amount: number;
    category: string;
    description: string;
    imageUrl: string;
    createdAt: string;
}

export type CreateSnapDto = {
    title: string;
    amount: number;
    category: string;
    description?: string;
    imageUrl?: string;
};

export type UpdateSnapDto = Partial<CreateSnapDto> & {
    id: string;
};
