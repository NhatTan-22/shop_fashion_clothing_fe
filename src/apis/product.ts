import { urlApiProduct } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import axiosClient from './axiosClient';
import { IAddProduct } from '~/utils/interfaces/interfaceProduct';

const productApi = {
    async getAllProduct(params: IParamsPagination) {
        const url = `${urlApiProduct.getAllProduct}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async addProduct(body: IAddProduct | FormData) {
        const headers =
            body instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' };
        const url = `${urlApiProduct.addProduct}`;
        const response = await axiosClient.post(url, body, { headers });
        return response.data;
    },
};

export default productApi;
