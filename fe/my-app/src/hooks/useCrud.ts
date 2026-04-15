'use client';

import { create } from 'zustand';

interface Service<T> {
    create: (data: any) => Promise<T>;
    update: (id: string, data: any) => Promise<T>;
    delete: (id: string) => Promise<void>;
    getAll: () => Promise<T[]>;
}

interface CrudState<T> {
    data: T[];
    loading: boolean;

    fetchAll: () => Promise<void>;
    create: (payload: any) => Promise<void>;
    update: (id: string, payload: any) => Promise<void>;
    remove: (id: string) => Promise<void>;
    search: string;
    setSearch: (s: string) => void;
}

/*
Factory function
→ tạo store cho từng service
*/

export const createCrudStore = <T extends { id: string }>(service: Service<T>) => {
    return create<CrudState<T>>((set) => ({
        data: [],
        loading: false,
        search: '',
        setSearch: (s) => set({ search: s }),

        fetchAll: async () => {
            try {
                set({ loading: true });

                const res = await service.getAll();

                set({
                    data: res,
                    loading: false,
                });
            } catch (err) {
                console.error(err);
                set({ loading: false });
            }
        },

        create: async (payload) => {
            try {
                set({ loading: true });

                const newItem = await service.create(payload);

                set((state) => ({
                    data: [newItem, ...state.data],
                    loading: false,
                }));
            } catch {
                set({ loading: false });
            }
        },

        update: async (id, payload) => {
            try {
                set({ loading: true });

                const updated = await service.update(id, payload);

                set((state) => ({
                    data: state.data.map((item) => (item.id === id ? updated : item)),
                    loading: false,
                }));
            } catch {
                set({ loading: false });
            }
        },

        remove: async (id) => {
            try {
                set({ loading: true });

                await service.delete(id);

                set((state) => ({
                    data: state.data.filter((item) => item.id !== id),
                    loading: false,
                }));
            } catch {
                set({ loading: false });
            }
        },
    }));
};
