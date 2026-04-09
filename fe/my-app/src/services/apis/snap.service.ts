

import axiosClient from '@/services/apis/axiosClient';
import { Snap } from '@/types/snap.td'; // Không cần Create/Update DTO ở đây nữa vì mình dùng FormData

export const snapService = {
    // GET ALL
    getAll: async (): Promise<Snap[]> => {
        return axiosClient.get('/notes');
    },

    // CREATE
    // Tham số nhận vào giờ là FormData
    create: async (formData: FormData): Promise<Snap> => {
        // Ném thẳng formData vào, KHÔNG bọc trong dấu {}
        return axiosClient.post('/notes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // UPDATE
    // Tương tự, nhận id và FormData
    update: async (id: string, formData: FormData): Promise<Snap> => {
        return axiosClient.put(`/notes/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // DELETE
    delete: async (id: string): Promise<void> => {
        return axiosClient.delete(`/notes/${id}`);
    },
};
