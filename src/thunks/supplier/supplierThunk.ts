import { createAsyncThunk } from '@reduxjs/toolkit';
import supplierApi from '~/apis/supplier';
import { ADD_SUPPLIER, GET_SUPPLIER } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { ISupplier } from '~/utils/interfaces/interfaceSupplier';

export const getSupplierThunk = createAsyncThunk(
    GET_SUPPLIER,
    async (params: IParamsPagination & { search?: string }, { rejectWithValue }) => {
        try {
            const filteredParams = { ...params };
            if (!params.search) delete filteredParams.search;

            const response = await supplierApi.getAllSupplier(filteredParams);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
);

export const addSupplierThunk = createAsyncThunk(
    ADD_SUPPLIER,
    async (body: ISupplier | FormData, { rejectWithValue }) => {
        try {
            const response = await supplierApi.addSupplier(body);
            return response;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
);
