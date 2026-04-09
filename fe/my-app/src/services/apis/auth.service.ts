import axiosClient from './axiosClient';
import { ENDPOINT } from '../endpoint';
import Cookies from 'js-cookie';

export const authService = {
    login: async (data: any) => {
        const response: any = await axiosClient.post(ENDPOINT.AUTH.LOGIN, data);

        const token = response?.token;
        if (token) {
            const isAdmin =
                data.accountName === 'admin' ||
                response?.role === 'ADMIN' ||
                response?.roles?.includes('ADMIN');

            Cookies.set('accessToken', token, { expires: 7, path: '/' });
            Cookies.set('role', isAdmin ? 'ADMIN' : 'USER', { expires: 7, path: '/' });

            return { isAdmin, ...response };
        }

        return response;
    },

    register: async (data: any) => {
        const response = await axiosClient.post(ENDPOINT.AUTH.REGISTER, data);
        return response;
    },
};
