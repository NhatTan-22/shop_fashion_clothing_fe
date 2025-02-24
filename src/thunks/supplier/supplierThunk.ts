import { createAsyncThunk } from '@reduxjs/toolkit';
import supplierApi from '~/apis/supplier';
import { ADD_SUPPLIER, DELETE_SUPPLIER, GET_SUPPLIER, SEARCH_SUPPLIER } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';

export const getSupplierThunk = createAsyncThunk(
    GET_SUPPLIER,
    async (params: IParamsPagination, { rejectWithValue }) => {
        try {
            const response = await supplierApi.getAllSupplier(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const searchSupplierThunk = createAsyncThunk(
    SEARCH_SUPPLIER,
    async ({ search }: { search: string }, { rejectWithValue }) => {
        try {
            const response = await supplierApi.searchAllSupplier(search);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addSupplierThunk = createAsyncThunk(
    ADD_SUPPLIER,
    async (formData: ISupplier | FormData, { rejectWithValue }) => {
        try {
            const response = await supplierApi.addSupplier(formData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteSupplierThunk = createAsyncThunk(DELETE_SUPPLIER, async (payload: Object, { rejectWithValue }) => {
    try {
        const response = await supplierApi.deleteSupplier(payload);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
