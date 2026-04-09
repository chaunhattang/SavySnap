import axiosClient from '@/services/apis/axiosClient';
import { ENDPOINT } from '../endpoint';
import { Snap } from '@/types/snap.td';

export class SnapService {
    static async getAll(): Promise<Snap[]> {
        return axiosClient.get(ENDPOINT.NOTES.GET_ALL);
    }

    static async create(formData: FormData): Promise<Snap> {
        return axiosClient.post(ENDPOINT.NOTES.CREATE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async update(id: string, formData: FormData): Promise<Snap> {
        return axiosClient.put(ENDPOINT.NOTES.UPDATE(id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async delete(id: string): Promise<void> {
        return axiosClient.delete(ENDPOINT.NOTES.DELETE(id));
    }
}
