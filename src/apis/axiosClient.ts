import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { baseURL } from '../utils/constants/env';
import { StorageEnum } from '~/utils/constants/enum';

const axiosClient = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem(StorageEnum.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post<{ accessToken: string }>(`${baseURL}/auth/refresh`, { refreshToken });

        localStorage.setItem(StorageEnum.ACCESS_TOKEN, response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            localStorage.removeItem(StorageEnum.ACCESS_TOKEN);
            localStorage.removeItem(StorageEnum.REFRESH_TOKEN);
            window.location.href = '/auth/login';
        }
        return null;
    }
};

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

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

async function refreshTokenHandler(originalRequest: CustomAxiosRequestConfig) {
    const newToken = await refreshToken();
    if (newToken) {
        originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
        return axiosClient(originalRequest);
    }
    return Promise.reject(new Error('Refresh token failed'));
}

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },

    async function (error: AxiosError | Error) {
        // Do something with response error
        if (
            axios.isAxiosError(error) &&
            error.response?.status === 403 &&
            error.response.data?.message === 'Token expired'
        ) {
            const originalRequest = error.config as CustomAxiosRequestConfig;

            if (!originalRequest || originalRequest._retry) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                return await refreshTokenHandler(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
