export interface Snap {
    id: string;
    title: string;
    amount: number | null;
    type: 'income' | 'expense';
    note?: string;
    createdAt: string;
    category: string;
    image: string; // FIX
}
export type CreateSnapDto = Omit<Snap, 'id' | 'createdAt'>;
export type UpdateSnapDto = Partial<CreateSnapDto> & { id: string };
