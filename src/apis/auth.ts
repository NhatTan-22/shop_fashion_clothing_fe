import { urlApiAuth } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IRegister, ILogin } from '~/utils/interfaces/auth';

const authApi = {
    async register(body: IRegister) {
        const url = `${urlApiAuth.register}`;
        const response = await axiosClient.post(url, body);
        return response;
    },

    async login(payload: ILogin) {
        const url = `${urlApiAuth.login}`;
        const response = await axiosClient.post(url, payload);
        return response;
    },
};

export default authApi;
