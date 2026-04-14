import axiosClient from '@/utils/axiosClient';
import { ENDPOINT } from '../endpoint';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const authService = {
    login: async (data: any) => {
        const response: any = await axiosClient.post(ENDPOINT.AUTH.LOGIN, data);

        console.log('Login response:', response);

        const token = response?.token;

        if (!token) return response;

        const decoded: any = jwtDecode(token);
        console.log(decoded);

        const role = decoded.role;

        const isAdmin = role === 'ADMIN';

        // lưu cookie
        Cookies.set('accessToken', token, {
            expires: 7,
            path: '/',
        });

        Cookies.set('role', role, {
            expires: 7,
            path: '/',
        });

        return {
            ...response,
            role,
            isAdmin,
        };
    },

    register: async (data: any) => {
        const response = await axiosClient.post(ENDPOINT.AUTH.REGISTER, data);
        return response;
    },
};
