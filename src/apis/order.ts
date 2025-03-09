import { urlApiOrder } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddOrder } from '~/utils/interfaces/interfaceOrder';

const orderApi = {
    async getAllOrder(params: IParamsPagination) {
        const url = `${urlApiOrder.getAllOrder}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async addOrder(body: IAddOrder | FormData) {
        const headers =
            body instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' };
        const url = `${urlApiOrder.addOrder}`;
        const response = await axiosClient.post(url, body, { headers });
        return response.data;
    },
};

export default orderApi;
