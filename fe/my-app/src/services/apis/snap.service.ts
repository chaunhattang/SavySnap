// import axiosClient from '@/services/apis/axiosClient';
// import { Snap, CreateSnapDto, UpdateSnapDto } from '@/types/snap.td';

// export const snapService = {
//     // GET ALL
//     getAll: async (): Promise<Snap[]> => {
//         return axiosClient.get('/notes');
//     },

//     // CREATE
//     create: async (data: CreateSnapDto): Promise<Snap> => {
//         return axiosClient.post('/notes', {
//             title: data.title,
//             amount: data.amount,
//             category: data.category,
//             description: data.description,
//             imageUrl: data.imageUrl,
//         });
//     },

//     // UPDATE
//     update: async (data: UpdateSnapDto): Promise<Snap> => {
//         return axiosClient.put(`/notes/${data.id}`, data);
//     },

//     // DELETE
//     delete: async (id: string): Promise<void> => {
//         return axiosClient.delete(`/notes/${id}`);
//     },
// };

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
