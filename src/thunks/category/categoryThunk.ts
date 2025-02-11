import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '~/apis/category';
import { ADD_CATEGORY, GET_CATEGORY } from '~/utils/constants/actionType';
import { IParamsPagination } from '~/utils/interfaces/common';
import { ICategory } from '~/utils/interfaces/interfaceCategory';

export const getCategoryThunk = createAsyncThunk(
    GET_CATEGORY,
    async (params: IParamsPagination & { search?: string }, { rejectWithValue }) => {
        try {
            const filteredParams = { ...params };
            if (!params.search) delete filteredParams.search;

            const response = await categoryApi.getAllCategory(filteredParams);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response?.data);
        }
    }
);

export const addCategoryThunk = createAsyncThunk(ADD_CATEGORY, async (body: ICategory, { rejectWithValue }) => {
    try {
        const response = await categoryApi.addCategory(body);
        return response;
    } catch (error: any) {
        rejectWithValue(error.response?.data);
    }
});
