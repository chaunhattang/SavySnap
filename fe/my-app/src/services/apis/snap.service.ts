import axiosClient from '@/services/apis/axiosClient';
import { Snap, CreateSnapDto, UpdateSnapDto } from '@/types/snap.td';

export const snapService = {
    // GET ALL
    getAll: async (): Promise<Snap[]> => {
        return axiosClient.get('/notes');
    },

    // CREATE
    create: async (data: CreateSnapDto): Promise<Snap> => {
        return axiosClient.post('/notes', {
            title: data.title,
            amount: data.amount,
            category: data.category,
            description: data.description,
            imageUrl: data.imageUrl,
        });
    },

    // UPDATE
    update: async (data: UpdateSnapDto): Promise<Snap> => {
        return axiosClient.put(`/notes/${data.id}`, data);
    },

    // DELETE
    delete: async (id: string): Promise<void> => {
        return axiosClient.delete(`/notes/${id}`);
    },
};
