import { createAsyncThunk } from '@reduxjs/toolkit';
import inventoryApi from '~/apis/inventory';
import { GET_INVENTORY } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';

export const inventoryThunk = createAsyncThunk(
    GET_INVENTORY,
    async (params: IParamsPagination, { rejectWithValue }) => {
        try {
            const response = await inventoryApi.getAllInventory(params);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
);
