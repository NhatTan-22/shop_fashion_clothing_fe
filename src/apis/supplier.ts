import { urlApiSupplier } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';

const supplierApi = {
    async getAllSupplier(params: IParamsPagination) {
        const url = `${urlApiSupplier.getAllSupplier}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async addSupplier(body: ISupplier | FormData) {
        const headers =
            body instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' };
        const url = `${urlApiSupplier.addSupplier}`;
        const response = await axiosClient.post(url, body, { headers });
        return response.data;
    },
};

export default supplierApi;
