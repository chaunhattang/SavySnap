import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API ERROR:', error);

        return Promise.reject(error?.response?.data || error.message);
    }
);

export default axiosClient;
