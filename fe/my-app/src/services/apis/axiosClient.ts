/** @format */

import axios, { InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // base url server
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const accesstoken = Cookies.get('accessToken');

    if (accesstoken) {
        config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    config.headers.Accept = 'application/json';

    return config;
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res.data && res.status >= 200 && res.status < 300) {
            return res.data.result;
        } else {
            return Promise.reject(res.data);
        }
    },
    (error) => {
        const { response } = error;
        return Promise.reject(response.data.message as string);
    }
);

export default axiosClient;
