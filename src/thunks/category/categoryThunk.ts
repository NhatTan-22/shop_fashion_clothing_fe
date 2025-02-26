import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '~/apis/category';
import { ADD_CATEGORY, GET_CATEGORY, SEARCH_CATEGORY } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { IAddCategory } from '~/utils/interfaces/interfaceCategory';

export const getCategoryThunk = createAsyncThunk(
    GET_CATEGORY,
    async (params: IParamsPagination, { rejectWithValue }) => {
        try {
            const response = await categoryApi.getAllCategory(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const searchCategoryThunk = createAsyncThunk(
    SEARCH_CATEGORY,
    async ({ search }: { search: string }, { rejectWithValue }) => {
        try {
            const response = await categoryApi.searchAllCategory(search);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const addCategoryThunk = createAsyncThunk(
    ADD_CATEGORY,
    async (formData: IAddCategory | FormData, { rejectWithValue }) => {
        try {
            const response = await categoryApi.addCategory(formData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);
