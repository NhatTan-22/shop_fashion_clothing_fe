import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '~/apis/product';
import { ADD_PRODUCT, GET_PRODUCT } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddProduct } from '~/utils/interfaces/interfaceProduct';

export const getProductThunk = createAsyncThunk(
    GET_PRODUCT,
    async (params: IParamsPagination, { rejectWithValue }) => {
        try {
            const response = await productApi.getAllProduct(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addProductThunk = createAsyncThunk(
    ADD_PRODUCT,
    async (formData: IAddProduct | FormData, { rejectWithValue }) => {
        try {
            const response = await productApi.addProduct(formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
