import { ENDPOINT } from '../endpoint';
import axiosClient from './axiosClient';

type LoginResponse = {
    token: string;
};

export class AuthService {
    static async login(data: { accountName: string; password: string }): Promise<LoginResponse> {
        return axiosClient.post<LoginResponse>(ENDPOINT.AUTH.LOGIN, data);
    }
}
