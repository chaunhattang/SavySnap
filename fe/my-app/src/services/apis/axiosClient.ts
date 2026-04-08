/** @format */

import axios, { InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';

/**
 *
 * This module sets up a customized Axios client for making HTTP requests.
 * Features:
 * - Uses query-string for serializing query parameters.
 * - Automatically attaches JWT access token from localStorage to Authorization header.
 * - Handles response formatting and error extraction.
 *
 * Usage:
 *   import axiosClient from './apis/axiosClient';
 *   axiosClient.get('/endpoint');
 *
 * Guidelines:
 * 1. Store your JWT access token in localStorage under the key 'accessToken'.
 * 2. Use axiosClient for all API requests to ensure consistent headers and error handling.
 * 3. The response interceptor returns only the 'data' property from the API response.
 * 4. Errors are returned as rejected Promises with the error message.
 * 5. You can customize the baseURL by uncommenting and editing the baseURL property.
 */

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // base url server
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const accesstoken = localStorage.getItem('accessToken');

    if (accesstoken) {
        config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    config.headers.Accept = 'application/json';

    return config;
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res.data && res.status >= 200 && res.status < 300) {
            // Support both { data: { data: [...] } } and { data: [...] } shapes
            return res.data.data !== undefined ? res.data.data : res.data;
        } else {
            return Promise.reject(res.data);
        }
    },
    (error) => {
        const { response } = error;
        // Guard against network errors where response is undefined
        if (!response) {
            return Promise.reject(error.message ?? 'Network error');
        }
        const message = response?.data?.message ?? response?.data ?? 'An error occurred';
        return Promise.reject(message as string);
    }
);

export default axiosClient;
