import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '~/apis/product';
import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    GET_COLOR_PRODUCT,
    GET_DETAIL_PRODUCT,
    GET_POPULAR_PRODUCT,
    GET_PRODUCT,
    GET_SIZE_PRODUCT,
} from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddProduct } from '~/utils/interfaces/interfaceProduct';

export const getProductThunk = createAsyncThunk(GET_PRODUCT, async (params: IParamsPagination, { rejectWithValue }) => {
    try {
        const response = await productApi.getAllProduct(params);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Unknown error!');
    }
});

export const getPopularProductThunk = createAsyncThunk(GET_POPULAR_PRODUCT, async (_, { rejectWithValue }) => {
    try {
        const response = await productApi.getPopularProduct({});
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Unknown error!');
    }
});

export const getColorProductThunk = createAsyncThunk(GET_COLOR_PRODUCT, async (_, { rejectWithValue }) => {
    try {
        const response = await productApi.getColorProduct();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Unknown error!');
    }
});

export const getSizeProductThunk = createAsyncThunk(GET_SIZE_PRODUCT, async (_, { rejectWithValue }) => {
    try {
        const response = await productApi.getSizeProduct();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Unknown error!');
    }
});

export const getDetailProductThunk = createAsyncThunk(GET_DETAIL_PRODUCT, async (slug: string, { rejectWithValue }) => {
    try {
        const response = await productApi.getDetailProduct(slug);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const addProductThunk = createAsyncThunk(
    ADD_PRODUCT,
    async (formData: IAddProduct | FormData, { rejectWithValue }) => {
        try {
            const response = await productApi.addProduct(formData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProductThunk = createAsyncThunk(DELETE_PRODUCT, async (_id: string, { rejectWithValue }) => {
    try {
        const response = await productApi.deleteProduct(_id);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
