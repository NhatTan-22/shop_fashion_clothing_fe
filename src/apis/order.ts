import { urlApiOrder } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';

const orderApi = {
    async getAllOrder(params: IParamsPagination) {
        const url = `${urlApiOrder.getAllOrder}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },
};

export default orderApi;
