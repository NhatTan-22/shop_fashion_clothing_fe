import { urlApiSupplier } from '~/utils/constants/actionType';
import axiosClient from './axiosClient';
import { IParamsPagination } from '~/utils/interfaces/common';

const supplierApi = {
    async getAllSupplier(params: IParamsPagination) {
        const url = `${urlApiSupplier.getAllSupplier}`;
        const response = await axiosClient.get(url, { params });
        return response.data;
    },
};

export default supplierApi;
