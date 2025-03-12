import { createAsyncThunk } from '@reduxjs/toolkit';
import orderApi from '~/apis/order';
import { ADD_ORDER, GET_ORDER } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddOrder } from '~/utils/interfaces/interfaceOrder';

export const getOrderThunk = createAsyncThunk(GET_ORDER, async (params: IParamsPagination, { rejectWithValue }) => {
    try {
        const response = await orderApi.getAllOrder(params);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const addOrderThunk = createAsyncThunk(
    ADD_ORDER,
    async (payload: IAddOrder, { rejectWithValue }) => {
        try {
            const response = await orderApi.addOrder(payload);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
