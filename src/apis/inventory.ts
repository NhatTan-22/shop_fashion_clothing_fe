import { urlApiInventory } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import axiosClient from './axiosClient';
import { IProduct } from '~/utils/interfaces/interfaceProduct';

const inventoryApi = {
    async getAllInventory(params: IParamsPagination) {
        const url = `${urlApiInventory.getAllInventory}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },

    async addInventory(body: IProduct | FormData) {
        const headers =
            body instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' };
        const url = `${urlApiInventory.addInventory}`;
        const response = await axiosClient.post(url, body, { headers });
        return response.data;
    },
};

export default inventoryApi;
