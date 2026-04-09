import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: 'http://10.60.250.222:8080/api',
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    config.headers.Accept = 'application/json';

    return config;
});

axiosClient.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status >= 200 && res.status < 300) {
            return res.data?.result;
        }

        return Promise.reject(res.data);
    },

    (error) => {
        const message = error?.response?.data?.message || 'Server error';

        return Promise.reject(message);
    }
);

export default axiosClient;
