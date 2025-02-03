import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { baseURL } from '../utils/constants/env';
import { StorageEnum } from '~/utils/constants/enum';

const axiosClient = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        // Do something before request is sent
        const token = localStorage.getItem(StorageEnum.ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    function (error: AxiosError | Error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },

    function (error: AxiosError | Error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;
