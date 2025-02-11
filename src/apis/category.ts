import { urlApiCategory } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';
import { ICategory } from '~/utils/interfaces/interfaceCategory';

const categoryApi = {
    async getAllCategory(params: IParamsPagination & { search?: string }) {
        const url = `${urlApiCategory.getAllCategory}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async addCategory(body: ICategory) {
        const url = `${urlApiCategory.addCategory}`;
        const response = await axiosClient.post(url, body);
        return response.data;
    },
};

export default categoryApi;
