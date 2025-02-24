import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '~/apis/category';
import { ADD_CATEGORY, GET_CATEGORY, SEARCH_CATEGORY } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { ICategory } from '~/utils/interfaces/interfaceCategory';

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

export const addCategoryThunk = createAsyncThunk(ADD_CATEGORY, async (body: ICategory, { rejectWithValue }) => {
    try {
        const response = await categoryApi.addCategory(body);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data);
    }
});
