import { urlApiSupplier } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';

const supplierApi = {
    async getAllSupplier(params: IParamsPagination & { search?: string }) {
        const url = `${urlApiSupplier.getAllSupplier}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async searchAllSupplier(search: string) {
        const url = `${urlApiSupplier.searchSupplier}`;
        const response = await axiosClient.get(url, { params: { search } });
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

    async deleteSupplier(payload: Object) {
        const url = `${urlApiSupplier.deleteSupplier(payload)}`;
        const response = await axiosClient.delete(url, payload);
        return response.data;
    },
};

export default supplierApi;
