import axiosClient from './axios';
import { Snap, CreateSnapDto, UpdateSnapDto } from '../../types/snap';

export const snapService = {
    getAll: async (): Promise<Snap[]> => {
        return axiosClient.get('/snaps');
    },

    create: async (data: CreateSnapDto): Promise<Snap> => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('amount', String(data.amount));
        formData.append('type', data.type);
        formData.append('category', data.category);

        if (data.image) {
            formData.append('image', data.image);
        }

        return axiosClient.post('/snaps', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    update: async (data: UpdateSnapDto): Promise<Snap> => {
        return axiosClient.put(`/snaps/${data.id}`, data);
    },

    delete: async (id: string): Promise<void> => {
        return axiosClient.delete(`/snaps/${id}`);
    },
};
