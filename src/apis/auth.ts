import { urlApiAuth } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IRegister, ILogin } from '~/utils/interfaces/auth';

const authApi = {
    async register(body: IRegister) {
        try {
            const url = `${urlApiAuth.register}`;
            const response = await axiosClient.post(url, body);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async login(payload: ILogin) {
        try {
            const url = `${urlApiAuth.login}`;
            const response = await axiosClient.post(url, payload);
            return response.data;
        } catch (error) {
            return error;
        }
    },
};

export default authApi;
