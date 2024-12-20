import { createAsyncThunk } from '@reduxjs/toolkit';
import supplierApi from '~/apis/supplier';
import { GET_SUPPLIER } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';

export const supplierThunk = createAsyncThunk(GET_SUPPLIER, async (params: IParamsPagination, { rejectWithValue }) => {
    try {
        const response = await supplierApi.getAllSupplier(params);
        return response.data;
    } catch (error: any) {
        rejectWithValue(error.response.data);
    }
});
