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

    async addOrder(payload: IAddOrder) {
        const url = `${urlApiOrder.addOrder}`;
        const response = await axiosClient.post(url, payload);
        return response.data;
    },
};

export default orderApi;
