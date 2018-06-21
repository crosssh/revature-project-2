import axios from 'axios';
export const productInterceptor = axios.create();
productInterceptor.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
})