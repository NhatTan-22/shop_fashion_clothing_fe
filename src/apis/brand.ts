import { urlApiBrand } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddBrand } from '~/utils/interfaces/interfaceBrand';

const brandApi = {
    async getAllBrand(params: IParamsPagination) {
        const url = `${urlApiBrand.getAllBrand}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async searchAllBrand(search: string) {
        const url = `${urlApiBrand.getSearchBrand}`;
        const response = await axiosClient.get(url, { params: { search } });
        return response.data;
    },

    async addBrand(body: IAddBrand | FormData) {
        const headers =
            body instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' };
        const url = `${urlApiBrand.addBrand}`;
        const response = await axiosClient.post(url, body, { headers });
        return response.data;
    },
};

export default brandApi;
