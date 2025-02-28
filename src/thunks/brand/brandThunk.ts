import { createAsyncThunk } from '@reduxjs/toolkit';
import brandApi from '~/apis/brand';
import { ADD_BRAND, GET_BRAND, SEARCH_BRAND } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddBrand } from '~/utils/interfaces/interfaceBrand';

export const getBrandThunk = createAsyncThunk(GET_BRAND, async (params: IParamsPagination, { rejectWithValue }) => {
    try {
        const response = await brandApi.getAllBrand(params);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data);
    }
});

export const searchBrandThunk = createAsyncThunk(
    SEARCH_BRAND,
    async ({ search }: { search: string }, { rejectWithValue }) => {
        try {
            const response = await brandApi.searchAllBrand(search);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const addBrandThunk = createAsyncThunk(
    ADD_BRAND,
    async (formData: IAddBrand | FormData, { rejectWithValue }) => {
        try {
            const response = await brandApi.addBrand(formData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);
