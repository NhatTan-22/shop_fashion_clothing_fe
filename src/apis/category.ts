import { urlApiCategory } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddCategory } from '~/utils/interfaces/interfaceCategory';

const categoryApi = {
    async getAllCategory(params: IParamsPagination) {
        const url = `${urlApiCategory.getAllCategory}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async searchAllCategory(search: string) {
        const url = `${urlApiCategory.getSearchCategory}`;
        const response = await axiosClient.get(url, { params: { search } });
        return response.data;
    },

    async addCategory(body: IAddCategory | FormData) {
        const headers =
            body instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' };
        const url = `${urlApiCategory.addCategory}`;
        const response = await axiosClient.post(url, body, { headers });
        return response.data;
    },
};

export default categoryApi;
