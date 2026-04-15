import axiosClient from './axiosClient';
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

        // LOG ĐỂ XEM BACKEND TRẢ VỀ GÌ TRONG JWT
        console.log('JWT decoded:', decoded);

        // Hỗ trợ cả roleNum (số) lẫn scope (chuỗi)
        let role: string;
        let isAdmin: boolean;

        if (decoded.roleNum !== undefined) {
            // Backend trả về roleNum dạng số: 1 = ADMIN, 0 = USER
            isAdmin = decoded.roleNum === 1;
            role = isAdmin ? 'ADMIN' : 'USER';
        } else {
            // Fallback: lấy scope dạng chuỗi
            role = decoded.scope ?? decoded.role ?? '';
            isAdmin = role === 'ROLE_ADMIN' || role === 'ADMIN';
        }

        // lưu cookie
        Cookies.set('accessToken', token, {
            expires: 7,
            path: '/'
        });

        Cookies.set('role', role, {
            expires: 7,
            path: '/'
        });

        return {
            ...response,
            role,
            isAdmin
        };
    },

    register: async (data: any) => {
        const response = await axiosClient.post(ENDPOINT.AUTH.REGISTER, data);
        return response;
    },
};