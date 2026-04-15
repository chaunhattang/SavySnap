import axiosClient from '@/services/apis/axiosClient';
import { ENDPOINT } from '@/services/endpoint';
import { Snap } from '@/types/snap.td';

export const snapService = {
    // GET ALL
    getAll: async (): Promise<Snap[]> => {
        return axiosClient.get(ENDPOINT.NOTES.BASE);
    },

    // GET RECENT SNAPS FORMATTED FOR DASHBOARD UI
    getDashboardSnaps: async (): Promise<any[]> => {
        const data: any[] = await axiosClient.get(ENDPOINT.NOTES.BASE);
        const formatted = data.map((snap) => ({
            id: snap.id,
            user: snap.user?.username || snap.username || 'System User',
            email: snap.user?.email || snap.email || 'N/A',
            title: snap.title || 'Untitled',
            amount: snap.amount || 0,
            date: snap.createdAt ? new Date(snap.createdAt).toLocaleDateString('vi-VN') : 'N/A',
            status: snap.status || 'Duyệt',
        }));
        return formatted.reverse();
    },

    // CREATE
    create: async (formData: FormData): Promise<Snap> => {
        return axiosClient.post(ENDPOINT.NOTES.BASE, formData);
    },

    update: async (id: string, formData: FormData): Promise<Snap> => {
        return axiosClient.put(`${ENDPOINT.NOTES.BASE}/${id}`, formData);
    },

    // DELETE
    delete: async (id: string): Promise<void> => {
        return axiosClient.delete(`${ENDPOINT.NOTES.BASE}/${id}`);
    },
};
