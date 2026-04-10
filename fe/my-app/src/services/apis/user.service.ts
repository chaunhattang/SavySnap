import axiosClient from '@/services/apis/axiosClient';
import { ENDPOINT } from '@/services/endpoint';
import { User } from '@/types/user.td';

export const userService = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await axiosClient.get(`${ENDPOINT.USERS.BASE}/all`);
        // We know axiosClient unwraps the ApiResponse inside the interceptor, so it should return User[]
        return response as unknown as User[];
    },

    getMyInfo: async (): Promise<User> => {
        const response = await axiosClient.get(`${ENDPOINT.USERS.BASE}/my-info`);
        return response as unknown as User;
    },

    getUserByUsername: async (username: string): Promise<User> => {
        const response = await axiosClient.get(`${ENDPOINT.USERS.BASE}/${username}`);
        return response as unknown as User;
    },

    updateByUserName: async (username: string, data: any): Promise<User> => {
        const response = await axiosClient.put(`${ENDPOINT.USERS.BASE}/${username}`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response as unknown as User;
    },

    updateProfile: async (username: string, formData: FormData): Promise<User> => {
        const response = await axiosClient.put(`${ENDPOINT.USERS.BASE}/${username}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response as unknown as User;
    },

    deleteByUsername: async (username: string): Promise<string> => {
        const response = await axiosClient.delete(`${ENDPOINT.USERS.BASE}/${username}`);
        return response as unknown as string;
    },
};
