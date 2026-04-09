import axiosClient from '@/services/apis/axiosClient';
import { User } from '@/types/user.td';

export const userService = {
    getUserByUsername: async (username: string): Promise<User> => {
        const response = await axiosClient.get(`/users/${username}`);
        return response.data.result;
    },

    updateByUserName: async (username: string, data: any): Promise<User> => {
        const response = await axiosClient.put(`/users/${username}`, data);

        return response.data.result;
    },
};
