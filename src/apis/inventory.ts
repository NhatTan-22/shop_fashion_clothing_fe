import { urlApiInventory } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import axiosClient from './axiosClient';

const inventoryApi = {
    async getAllInventory(params: IParamsPagination) {
        const url = `${urlApiInventory.getAllInventory}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },
};

export default inventoryApi;
